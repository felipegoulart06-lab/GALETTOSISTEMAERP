"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/ui-icon";
import type { SectionConfig } from "@/lib/dashboard-data";
import type { SpinRewardRecord, SpinWheelRecord } from "@/lib/platform-types";

interface SpinWheelHubProps {
  initialWheels: SpinWheelRecord[];
  section: SectionConfig;
}

const WHEEL_TONES = ["#163a6b", "#1e4d8c", "#0f2748", "#2563eb", "#12233f", "#3b82f6"];

function formatSpinDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function shortRewardLabel(title: string) {
  const clean = title.replace(/\s+/g, " ").trim();
  return clean.length > 18 ? `${clean.slice(0, 16)}…` : clean;
}

function wheelGradient(rewards: SpinRewardRecord[]) {
  const count = Math.max(rewards.length, 1);
  const slice = 360 / count;
  return rewards
    .map((_, index) => {
      const color = WHEEL_TONES[index % WHEEL_TONES.length];
      return `${color} ${index * slice}deg ${(index + 1) * slice}deg`;
    })
    .join(", ");
}

export function SpinWheelHub({ initialWheels }: SpinWheelHubProps) {
  const [wheels, setWheels] = useState<SpinWheelRecord[]>(initialWheels);
  const [activeWheelIndex, setActiveWheelIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resultReward, setResultReward] = useState<SpinRewardRecord | null>(null);
  const [rewardCode, setRewardCode] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [highlightedRewardId, setHighlightedRewardId] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const activeWheel = wheels[activeWheelIndex];
  const rewards = activeWheel?.rewards ?? [];
  const sliceAngle = rewards.length ? 360 / rewards.length : 360;
  const canSpin = Boolean(activeWheel && !isSpinning && activeWheel.availableSpins > 0);

  const handleSpin = async () => {
    if (!canSpin || !activeWheel) return;

    setIsSpinning(true);
    setResultReward(null);
    setShowCelebration(false);

    try {
      const response = await fetch("/api/giro-da-sorte/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wheelId: activeWheel.id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar giro");
      }

      const { reward, angle, availableSpins } = data as {
        reward: SpinRewardRecord;
        angle: number;
        availableSpins: number;
        rewardCode?: string;
      };

      const totalRotation = 360 * 8 + angle;
      setRotation((prev) => prev + totalRotation);

      window.setTimeout(() => {
        setIsSpinning(false);
        setResultReward(reward);
        setRewardCode(data.rewardCode || reward.internalCode || "");
        setHighlightedRewardId(reward.id);
        setShowCelebration(true);

        const updatedWheels = [...wheels];
        updatedWheels[activeWheelIndex] = {
          ...activeWheel,
          availableSpins,
          totalPrizesWon: activeWheel.totalPrizesWon + 1,
          history: [
            {
              id: Math.random().toString(),
              userId: "user-123",
              userNameMasked: "Felipe G.",
              wheelTitle: activeWheel.title,
              resultLabel: "GANHOU",
              rewardTitle: reward.title,
              status: "ATIVO",
              internalCode: data.rewardCode || reward.internalCode,
              playedAt: new Date().toISOString()
            },
            ...(activeWheel.history || [])
          ]
        };
        setWheels(updatedWheels);
      }, 5000);
    } catch (error) {
      console.error("Erro ao girar:", error);
      alert(error instanceof Error ? error.message : "Erro ao girar a roleta");
      setIsSpinning(false);
    }
  };

  if (!activeWheel) {
    return (
      <div className="giro-empty">
        <span>Operação</span>
        <strong>Nenhuma roleta publicada</strong>
        <p>Quando o Admin Master publicar um giro, ele aparece aqui para você girar.</p>
      </div>
    );
  }

  return (
    <div className="giro-hub">
      <section className={`giro-arena${isSpinning ? " is-spinning" : ""}`}>
        <div className="giro-arena-copy">
          <span className="giro-kicker">{activeWheel.wheelType}</span>
          <h1>{activeWheel.title}</h1>
          <p>
            {activeWheel.shortDescription ||
              "Sua sorte está a um giro de distância. Participe agora e conquiste recompensas do ecossistema FG EXACTA."}
          </p>

          <dl className="giro-meta-row">
            <div>
              <dt>Frequência</dt>
              <dd>{activeWheel.spinFrequency}</dd>
            </div>
            <div>
              <dt>Regra</dt>
              <dd>{activeWheel.releaseRule}</dd>
            </div>
            <div>
              <dt>Público</dt>
              <dd>{activeWheel.audienceRule}</dd>
            </div>
          </dl>

          <div className="giro-hero-actions">
            <div className={`giro-spin-meter${isSpinning ? " is-live" : ""}`}>
              <span>Giros disponíveis</span>
              <strong>{String(activeWheel.availableSpins).padStart(2, "0")}</strong>
              <small>{isSpinning ? "Roleta em movimento" : activeWheel.nextSpinLabel}</small>
            </div>
            <button
              type="button"
              className={`giro-spin-button${isSpinning ? " is-spinning" : ""}${!canSpin ? " is-disabled" : ""}`}
              onClick={handleSpin}
              disabled={!canSpin}
              aria-busy={isSpinning}
            >
              <span>{isSpinning ? "Girando a roleta" : canSpin ? "Girar agora" : "Sem giros agora"}</span>
            </button>
          </div>

          <div className="giro-next-slot">
            <Icon name="clock" />
            <span>{activeWheel.nextSpinLabel || "Próximo giro em breve"}</span>
          </div>
        </div>

        <div className="giro-wheel-column">
          <div className={`giro-wheel-stage${isSpinning ? " is-spinning" : ""}`}>
            <div className="giro-wheel-lamps" aria-hidden="true">
              {Array.from({ length: 20 }, (_, index) => (
                <i key={index} style={{ ["--i" as string]: index } as CSSProperties} />
              ))}
            </div>
            <div className="giro-wheel-pointer" aria-hidden="true" />
            <div
              ref={wheelRef}
              className="giro-wheel"
              style={{
                background: `conic-gradient(from -90deg, ${wheelGradient(rewards)})`,
                transform: `rotate(${rotation}deg)`
              }}
            >
              <div className="giro-wheel-ticks" aria-hidden="true" />
              {rewards.map((reward, index) => (
                <span
                  key={reward.id}
                  className={`giro-wheel-label${highlightedRewardId === reward.id ? " is-won" : ""}`}
                  style={{ transform: `rotate(${index * sliceAngle + sliceAngle / 2}deg)` }}
                >
                  <em>{shortRewardLabel(reward.title)}</em>
                </span>
              ))}
              <div className="giro-wheel-hub">
                <strong>FG</strong>
                <small>{isSpinning ? "SORTE" : "GIRO"}</small>
              </div>
            </div>
          </div>
          <p className="giro-wheel-caption">
            {isSpinning ? "Aguarde o ponteiro travar no prêmio." : "Toque em Girar agora para acionar a roleta."}
          </p>
        </div>
      </section>

      <section className="giro-status-grid">
        <article className="giro-status-card">
          <span>Giros realizados</span>
          <strong>{activeWheel.completedSpins || activeWheel.history?.length || 0}</strong>
          <small>Nesta roleta</small>
        </article>
        <article className="giro-status-card">
          <span>Prêmios ganhos</span>
          <strong>{activeWheel.totalPrizesWon}</strong>
          <small>Registrados no histórico</small>
        </article>
        <article className="giro-status-card">
          <span>Último prêmio</span>
          <strong>{activeWheel.history?.[0]?.rewardTitle || "Aguardando"}</strong>
          <small>{activeWheel.history?.[0]?.playedAt ? formatSpinDate(activeWheel.history[0].playedAt) : "Sem resultado ainda"}</small>
        </article>
        <article className="giro-status-card">
          <span>Campanha</span>
          <strong>{activeWheel.campaignLabel || "Operação"}</strong>
          <small>{activeWheel.priorityLabel}</small>
        </article>
      </section>

      <section className="giro-board">
        <div className="giro-prize-panel">
          <header className="giro-panel-head">
            <div>
              <span>Pool da roleta</span>
              <h2>Prêmios desta rodada</h2>
            </div>
            <strong>{rewards.length} faixas</strong>
          </header>
          <div className="giro-prize-list">
            {rewards.map((reward, index) => (
              <article
                key={reward.id}
                className={`giro-prize-item${highlightedRewardId === reward.id ? " is-active" : ""}`}
              >
                <i style={{ background: WHEEL_TONES[index % WHEEL_TONES.length] }} />
                <div>
                  <span>{reward.category}</span>
                  <strong>{reward.title}</strong>
                  <small>
                    {reward.estimatedValue} · {reward.probability}% · {reward.quantityAvailable} un.
                  </small>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="giro-rules-panel">
          <header className="giro-panel-head">
            <div>
              <span>Operação</span>
              <h2>Regras do giro</h2>
            </div>
          </header>
          <ul className="giro-rules-list">
            {(activeWheel.rules?.length ? activeWheel.rules : [activeWheel.releaseRule, activeWheel.audienceRule])
              .slice(0, 6)
              .map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
          </ul>
        </div>
      </section>

      {wheels.length > 1 ? (
        <section className="giro-wheels-panel">
          <header className="giro-panel-head">
            <div>
              <span>Explorar</span>
              <h2>Outras roletas</h2>
            </div>
          </header>
          <div className="giro-wheels-grid">
            {wheels.map((wheel, index) => (
              <button
                key={wheel.id}
                type="button"
                className={`giro-wheel-card${index === activeWheelIndex ? " is-selected" : ""}`}
                onClick={() => {
                  if (isSpinning) return;
                  setActiveWheelIndex(index);
                  setHighlightedRewardId(null);
                }}
                disabled={isSpinning}
              >
                <span>{wheel.wheelType}</span>
                <strong>{wheel.title}</strong>
                <small>{wheel.availableSpins} giros restantes</small>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <section className="giro-history-panel">
        <header className="giro-panel-head">
          <div>
            <span>Registro</span>
            <h2>Meu histórico de giros</h2>
          </div>
        </header>
        <div className="giro-history-table">
          <div className="giro-history-head">
            <span>Data</span>
            <span>Roleta</span>
            <span>Prêmio</span>
            <span>Código</span>
            <span>Status</span>
          </div>
          {activeWheel.history?.length ? (
            activeWheel.history.map((entry) => (
              <article key={entry.id} className="giro-history-row">
                <span>{formatSpinDate(entry.playedAt)}</span>
                <strong>{entry.wheelTitle}</strong>
                <span className="giro-history-prize">{entry.rewardTitle}</span>
                <code>{entry.internalCode}</code>
                <em className="giro-history-status">{entry.status}</em>
              </article>
            ))
          ) : (
            <div className="giro-history-empty">Nenhum giro realizado nesta roleta ainda.</div>
          )}
        </div>
      </section>

      {showCelebration && resultReward ? (
        <div className="giro-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="giro-result-title">
          <div className="giro-modal">
            <span>Resultado do giro</span>
            <h2 id="giro-result-title">Você ganhou</h2>
            <p>A recompensa já entrou no seu histórico e pode ser resgatada pela operação.</p>
            <div className="giro-modal-prize">
              <small>{resultReward.category}</small>
              <strong>{resultReward.title}</strong>
              {resultReward.estimatedValue ? <p>Valor estimado: {resultReward.estimatedValue}</p> : null}
              {rewardCode ? <code>{rewardCode}</code> : null}
            </div>
            <button type="button" className="giro-spin-button" onClick={() => setShowCelebration(false)}>
              <span>Fechar e continuar</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
