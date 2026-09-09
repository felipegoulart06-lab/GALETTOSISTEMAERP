"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "react-router-dom";
import { Icon } from "./dashboard";
import type { SectionConfig, SpinWheelRecord, SpinRewardRecord } from "@/lib/platform-types";

interface SpinWheelHubProps {
  initialWheels: SpinWheelRecord[];
  section: SectionConfig;
}

export function SpinWheelHub({ initialWheels, section }: SpinWheelHubProps) {
  const [wheels, setWheels] = useState<SpinWheelRecord[]>(initialWheels);
  const [activeWheelIndex, setActiveWheelIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resultReward, setResultReward] = useState<SpinRewardRecord | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const activeWheel = wheels[activeWheelIndex];
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = async () => {
    if (isSpinning || !activeWheel || activeWheel.availableSpins <= 0) return;

    setIsSpinning(true);
    setResultReward(null);

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
      
      const { reward, angle, availableSpins } = data;
      
      // A rotação total inclui voltas extras para o efeito visual
      const totalRotation = 360 * 8 + angle;
      setRotation(prev => prev + totalRotation);

      setTimeout(() => {
        setIsSpinning(false);
        setResultReward(reward);
        setShowCelebration(true);
        
        // Atualiza estado local com os dados vindos do servidor
        const updatedWheels = [...wheels];
        updatedWheels[activeWheelIndex] = {
          ...activeWheel,
          availableSpins: availableSpins,
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
              internalCode: data.rewardCode,
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

  if (!activeWheel) return null;

  return (
    <div className="layout-giro-da-sorte">
      {/* HERO PREMIUM */}
      <section className="giro-hero">
        <div className="giro-hero-content">
          <span className="giro-hero-badge">{activeWheel.wheelType}</span>
          <h1>{activeWheel.title}</h1>
          <p>{activeWheel.shortDescription || "Sua sorte está a um giro de distância. Participe agora e conquiste recompensas exclusivas do ecossistema FG EXACTA."}</p>
          
          <div className="giro-hero-actions">
            <div className="spin-counter-card">
              <span className="spin-counter-label">Giros Disponíveis</span>
              <span className="spin-counter-value">{activeWheel.availableSpins}</span>
            </div>
            <button 
              className={`hero-link-button ${isSpinning || activeWheel.availableSpins <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSpin}
              disabled={isSpinning || activeWheel.availableSpins <= 0}
            >
              {isSpinning ? "GIRANDO..." : "GIRAR AGORA"}
            </button>
          </div>
          
          <div className="mt-8 flex items-center gap-2 text-slate-400 text-sm">
            <Icon name="clock" />
            <span>Próximo giro disponível em: {activeWheel.nextSpinAt || "24h"}</span>
          </div>
        </div>

        {/* VISUAL DA ROLETA */}
        <div className="wheel-stage">
          <div className="wheel-pointer"></div>
          <div 
            className="wheel-outer" 
            style={{ transform: `rotate(${rotation}deg)` }}
            ref={wheelRef}
          >
            {activeWheel.rewards?.map((reward, idx) => {
              const sliceAngle = 360 / activeWheel.rewards.length;
              const rotate = idx * sliceAngle;
              const skew = 90 - sliceAngle;
              
              return (
                <div 
                  key={reward.id} 
                  className="wheel-slice"
                  style={{ 
                    transform: `rotate(${rotate}deg) skewY(-${skew}deg)`,
                    backgroundColor: idx % 2 === 0 ? '#1e293b' : '#0f172a',
                    borderLeft: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{ transform: `skewY(${skew}deg) rotate(${sliceAngle/2}deg)`, textAlign: 'center' }}>
                    {reward.title.split(' ').map((word, i) => <div key={i}>{word}</div>)}
                  </div>
                </div>
              );
            })}
            <div className="wheel-center">
              <div className="wheel-center-logo">FG</div>
            </div>
          </div>
        </div>
      </section>

      {/* PAINEL DE STATUS */}
      <section className="giro-status-grid">
        <div className="status-card-compact">
          <span>Giros Realizados</span>
          <strong>{activeWheel.totalPrizesWon + (activeWheel.history?.length || 0)}</strong>
        </div>
        <div className="status-card-compact">
          <span>Prêmios Ganhos</span>
          <strong>{activeWheel.totalPrizesWon}</strong>
        </div>
        <div className="status-card-compact">
          <span>Último Prêmio</span>
          <strong>{activeWheel.history?.[0]?.rewardTitle || "Nenhum"}</strong>
        </div>
        <div className="status-card-compact">
          <span>Nível de Sorte</span>
          <strong>Premium</strong>
        </div>
      </section>

      {/* OUTRAS ROLETAS */}
      {wheels.length > 1 && (
        <section className="other-wheels-panel mt-8">
          <div className="section-head mb-6">
            <div>
              <p>Explorar</p>
              <h2>Outras Roletas</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {wheels.map((w, idx) => (
              <button 
                key={w.id}
                className={`p-6 border text-left transition-all ${idx === activeWheelIndex ? 'border-blue-500 bg-blue-50/5' : 'border-slate-200 hover:border-blue-300'}`}
                onClick={() => setActiveWheelIndex(idx)}
              >
                <span className="text-xs uppercase tracking-widest text-slate-400 block mb-2">{w.wheelType}</span>
                <strong className="text-lg block mb-1">{w.title}</strong>
                <span className="text-sm text-slate-500">{w.availableSpins} giros restantes</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* HISTÓRICO */}
      <section className="listas-table-panel mt-12">
        <div className="section-head p-6 border-b">
          <div>
            <p>Registro</p>
            <h2>Meu Histórico de Giros</h2>
          </div>
        </div>
        <div className="listas-table-header">
          <span>Data</span>
          <span>Roleta</span>
          <span>Prêmio</span>
          <span>Código</span>
          <span className="text-right">Status</span>
        </div>
        <div className="listas-table-body">
          {activeWheel.history?.length ? activeWheel.history.map((entry, idx) => (
            <article key={idx} className="listas-table-row">
              <div className="text-sm text-slate-500">{entry.date}</div>
              <div className="font-medium text-slate-700">{entry.wheelTitle}</div>
              <div className="text-blue-600 font-bold">{entry.rewardTitle}</div>
              <div className="font-mono text-xs bg-slate-100 px-2 py-1 rounded">{entry.rewardCode}</div>
              <div className="listas-item-action">
                <span className={`status-active`}>{entry.status}</span>
              </div>
            </article>
          )) : (
            <div className="p-12 text-center text-slate-400">
              Nenhum giro realizado nesta roleta ainda.
            </div>
          )}
        </div>
      </section>

      {/* MODAL DE CELEBRAÇÃO */}
      {showCelebration && resultReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full p-8 border-4 border-blue-500 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>
            
            <div className="mb-6 inline-grid place-items-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 mx-auto">
              <Icon name="award" />
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-2">PARABÉNS!</h2>
            <p className="text-slate-500 mb-8">Você acabou de conquistar uma recompensa exclusiva.</p>
            
            <div className="p-6 bg-slate-50 border border-slate-100 mb-8">
              <span className="text-xs uppercase tracking-widest text-slate-400 block mb-2">{resultReward.category}</span>
              <strong className="text-2xl block text-blue-700 mb-2">{resultReward.title}</strong>
              <p className="text-sm text-slate-600">{resultReward.estimatedValue && `Valor estimado: ${resultReward.estimatedValue}`}</p>
            </div>
            
            <button 
              className="hero-link-button w-full"
              onClick={() => setShowCelebration(false)}
            >
              RESGATAR AGORA
            </button>
            
            <p className="mt-4 text-xs text-slate-400">
              O prêmio foi adicionado ao seu histórico e está pronto para uso.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
