"use client";

import { useMemo, useState } from "react";
import type { SectionKey } from "@/lib/dashboard-data";

export function SectionExperience({ sectionKey }: { sectionKey: SectionKey }) {
  switch (sectionKey) {
    case "home":
      return <HomeExperience />;
    case "lives":
      return <LivesExperience />;
    case "produtos":
      return <ProductsExperience />;
    case "mentorias":
      return <MentoriasExperience />;
    case "clubao":
      return <ClubaoExperience />;
    case "empresas":
      return <EmpresasExperience />;
    case "indicacoes":
      return <IndicacoesExperience />;
    case "minha-renda":
      return <RendaExperience />;
    case "desempenho":
      return <DesempenhoExperience />;
    case "missoes":
      return <MissoesExperience />;
    case "ranking":
      return <RankingExperience />;
    case "recompensas":
      return <RecompensasExperience />;
    case "notificacoes":
      return <NotificacoesExperience />;
    case "perfil":
      return <PerfilExperience />;
    default:
      return null;
  }
}

function Box({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="experience-box">
      <div className="experience-box-head">
        <div>
          <p>{description}</p>
          <h3>{title}</h3>
        </div>
      </div>
      {children}
    </section>
  );
}

function HomeExperience() {
  const [tasks, setTasks] = useState([
    { label: "Revisar campanha com maior clique", done: true },
    { label: "Entrar na live das 19:30", done: false },
    { label: "Liberar vitrine do produto principal", done: false }
  ]);

  return (
    <div className="experience-grid experience-grid-home">
      <Box title="Rotina do dia" description="Ações rápidas">
        <div className="action-grid">
          {["Abrir vitrine", "Ver comissões", "Continuar curso", "Criar indicação"].map((action) => (
            <button key={action} type="button" className="action-card">
              {action}
            </button>
          ))}
        </div>
      </Box>

      <Box title="Checklist operacional" description="Prioridades">
        <div className="check-grid">
          {tasks.map((task, index) => (
            <button
              key={task.label}
              type="button"
              className={`task-row${task.done ? " is-done" : ""}`}
              onClick={() =>
                setTasks((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, done: !item.done } : item
                  )
                )
              }
            >
              <span className="task-mark" />
              <span>{task.label}</span>
            </button>
          ))}
        </div>
      </Box>
    </div>
  );
}

function LivesExperience() {
  const tabs = {
    "Ao vivo agora": [
      "Live de Ana Beatriz com 284 espectadores",
      "Oferta Método Venda Todo Dia conectada",
      "Categoria vendas liderando o tráfego"
    ],
    Agendadas: [
      "Funil simples para afiliados amanhã às 20h",
      "Objeções e fechamento quinta às 19h",
      "Live especial para novos membros domingo"
    ],
    Replays: [
      "7 gatilhos que aumentam conversão",
      "Roteiro de direct para produtos de entrada",
      "Como montar uma live que vende sem parecer pitch"
    ]
  } as const;

  const [activeTab, setActiveTab] = useState<keyof typeof tabs>("Ao vivo agora");

  return (
    <div className="experience-grid experience-grid-lives">
      <Box title="Programação dinâmica" description="Streaming">
        <div className="tab-row">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-chip${activeTab === tab ? " is-active" : ""}`}
              onClick={() => setActiveTab(tab as keyof typeof tabs)}
            >
              {tab}
            </button>
          ))}
        </div>
        <ul className="bullet-list">
          {tabs[activeTab].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Box>

      <Box title="Provider em foco" description="Arquitetura">
        <div className="provider-stack">
          {["InternalLiveProvider", "TikTokLiveProvider", "FutureProvider"].map((provider, index) => (
            <div key={provider} className={`provider-card${index === 0 ? " is-primary" : ""}`}>
              <strong>{provider}</strong>
              <span>{index === 0 ? "Ativo no protótipo" : "Preparado para integração futura"}</span>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

function ProductsExperience() {
  const products = [
    { name: "Kickoff do Afiliado", price: 47, commission: 0.5 },
    { name: "IA para Empreendedores", price: 397, commission: 0.45 },
    { name: "Sala de Conversão Pro", price: 197, commission: 0.4 }
  ];
  const [selected, setSelected] = useState(products[0]);
  const commissionValue = useMemo(
    () => (selected.price * selected.commission).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    [selected]
  );

  return (
    <div className="experience-grid experience-grid-products">
      <Box title="Simulador de comissão" description="Marketplace">
        <div className="select-row">
          {products.map((product) => (
            <button
              key={product.name}
              type="button"
              className={`select-chip${selected.name === product.name ? " is-active" : ""}`}
              onClick={() => setSelected(product)}
            >
              {product.name}
            </button>
          ))}
        </div>
        <div className="summary-inline">
          <div>
            <span>Preço</span>
            <strong>
              {selected.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </strong>
          </div>
          <div>
            <span>Comissão</span>
            <strong>{commissionValue}</strong>
          </div>
        </div>
      </Box>

      <Box title="Ações comerciais" description="Ferramentas">
        <div className="action-grid">
          {["Gerar link", "Copiar link", "Compartilhar", "Ver desempenho"].map((action) => (
            <button key={action} type="button" className="action-card">
              {action}
            </button>
          ))}
        </div>
      </Box>
    </div>
  );
}

function MentoriasExperience() {
  const lessons = [
    { label: "Posicionamento", progress: 100 },
    { label: "Oferta", progress: 62 },
    { label: "Fechamento", progress: 24 }
  ];

  return (
    <div className="experience-grid">
      <Box title="Continue assistindo" description="Progresso">
        <div className="progress-stack">
          {lessons.map((lesson) => (
            <div key={lesson.label} className="progress-row">
              <div className="progress-copy">
                <strong>{lesson.label}</strong>
                <span>{lesson.progress}% concluído</span>
              </div>
              <div className="progress-bar">
                <span style={{ width: `${lesson.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Box>

      <Box title="Aulas em fila" description="Consumo">
        <ul className="bullet-list">
          <li>Módulo 4 abre amanhã às 8h</li>
          <li>Novo comentário do instrutor na aula 12</li>
          <li>Grupo de mentoria coletiva quase lotado</li>
        </ul>
      </Box>
    </div>
  );
}

function ClubaoExperience() {
  const offers = [
    { label: "Plano anual", days: 12 },
    { label: "Ferramenta de IA", days: 8 },
    { label: "Encontro fechado", days: 3 }
  ];

  return (
    <div className="experience-grid">
      <Box title="Ofertas expirando" description="Clubão">
        <div className="mini-grid">
          {offers.map((offer) => (
            <div key={offer.label} className="mini-card">
              <strong>{offer.label}</strong>
              <span>Expira em {offer.days} dias</span>
            </div>
          ))}
        </div>
      </Box>

      <Box title="Benefícios disponíveis" description="Acesso">
        <ul className="bullet-list">
          <li>Biblioteca privada com atualização semanal</li>
          <li>Cupom progressivo para ferramentas parceiras</li>
          <li>Evento premium com vagas limitadas</li>
        </ul>
      </Box>
    </div>
  );
}

function EmpresasExperience() {
  const [city, setCity] = useState("Todas");
  const companies = {
    Todas: ["Zetta Coworking", "Hub Sales Group", "Studio Ventures"],
    Balneário: ["Zetta Coworking"],
    Remoto: ["Hub Sales Group", "Studio Ventures"]
  } as const;

  return (
    <div className="experience-grid">
      <Box title="Busca por cidade" description="Diretório">
        <div className="tab-row">
          {Object.keys(companies).map((key) => (
            <button
              key={key}
              type="button"
              className={`tab-chip${city === key ? " is-active" : ""}`}
              onClick={() => setCity(key)}
            >
              {key}
            </button>
          ))}
        </div>
        <ul className="bullet-list">
          {companies[city as keyof typeof companies].map((company) => (
            <li key={company}>{company}</li>
          ))}
        </ul>
      </Box>

      <Box title="Relacionamentos ativos" description="B2B">
        <div className="mini-grid">
          {["Campanhas", "Clubão", "Produtos", "Indicações"].map((item) => (
            <div key={item} className="mini-card">
              <strong>{item}</strong>
              <span>Vinculação pronta</span>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

function IndicacoesExperience() {
  const stages = [
    { label: "Indicação", value: 28 },
    { label: "Lead", value: 18 },
    { label: "Contato", value: 12 },
    { label: "Convertida", value: 5 }
  ];

  return (
    <div className="experience-grid">
      <Box title="Funil da indicação" description="Rastreamento">
        <div className="funnel-stack">
          {stages.map((stage, index) => (
            <div key={stage.label} className="funnel-row">
              <div className="funnel-head">
                <strong>{stage.label}</strong>
                <span>{stage.value}</span>
              </div>
              <div className="progress-bar">
                <span style={{ width: `${100 - index * 22}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Box>

      <Box title="Status previstos" description="CRM">
        <div className="tag-cloud">
          {["Pendente", "Em análise", "Validada", "Convertida", "Comissão gerada", "Paga"].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </Box>
    </div>
  );
}

function RendaExperience() {
  const [mode, setMode] = useState("Comissões");
  const items = {
    Comissões: ["Produto aprovado", "Indicação em análise", "Bônus liberado"],
    Saques: ["Solicitado", "Em análise", "Pago"],
    Histórico: ["TX-9021", "TX-8842", "TX-7704"]
  } as const;

  return (
    <div className="experience-grid">
      <Box title="Controle financeiro" description="Carteira">
        <div className="tab-row">
          {Object.keys(items).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-chip${mode === tab ? " is-active" : ""}`}
              onClick={() => setMode(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <ul className="bullet-list">
          {items[mode as keyof typeof items].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Box>

      <Box title="Resumo do ciclo" description="Valores">
        <div className="summary-inline">
          <div>
            <span>Aprovado</span>
            <strong>R$ 2.840</strong>
          </div>
          <div>
            <span>Pendente</span>
            <strong>R$ 1.260</strong>
          </div>
        </div>
      </Box>
    </div>
  );
}

function DesempenhoExperience() {
  const [period, setPeriod] = useState("30 dias");
  const bars = period === "30 dias" ? [40, 68, 52, 74, 63] : [22, 44, 38, 49, 31];

  return (
    <div className="experience-grid">
      <Box title="Ritmo por período" description="Performance">
        <div className="tab-row">
          {["7 dias", "30 dias"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-chip${period === tab ? " is-active" : ""}`}
              onClick={() => setPeriod(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bar-chart">
          {bars.map((bar, index) => (
            <div key={`${bar}-${index}`} className="bar-column">
              <span style={{ height: `${bar}%` }} />
            </div>
          ))}
        </div>
      </Box>

      <Box title="Leitura direta" description="Análise">
        <ul className="bullet-list">
          <li>Stories seguem como melhor origem</li>
          <li>Vídeo vertical continua puxando conversão</li>
          <li>Direct precisa de melhor primeira resposta</li>
        </ul>
      </Box>
    </div>
  );
}

function MissoesExperience() {
  const [claimed, setClaimed] = useState(false);

  return (
    <div className="experience-grid">
      <Box title="Missão em destaque" description="Gamificação">
        <div className="progress-row">
          <div className="progress-copy">
            <strong>Faça sua primeira venda</strong>
            <span>74% concluído</span>
          </div>
          <div className="progress-bar">
            <span style={{ width: "74%" }} />
          </div>
        </div>
        <button type="button" className={`claim-button${claimed ? " is-claimed" : ""}`} onClick={() => setClaimed(!claimed)}>
          {claimed ? "Recompensa reservada" : "Reservar recompensa"}
        </button>
      </Box>

      <Box title="Fila de desafios" description="Próximos passos">
        <ul className="bullet-list">
          <li>Compartilhe 5 produtos</li>
          <li>Assista 3 aulas</li>
          <li>Envie 1 indicação válida</li>
        </ul>
      </Box>
    </div>
  );
}

function RankingExperience() {
  const [period, setPeriod] = useState("Semanal");
  const ranking = {
    Diário: ["Ana Beatriz", "Rafael Lima", "João Mendes"],
    Semanal: ["Rafael Lima", "Ana Beatriz", "João Mendes"],
    Mensal: ["Rafael Lima", "Fernanda Costa", "Ana Beatriz"]
  } as const;

  return (
    <div className="experience-grid">
      <Box title="Período do ranking" description="Pódio">
        <div className="tab-row">
          {Object.keys(ranking).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab-chip${period === tab ? " is-active" : ""}`}
              onClick={() => setPeriod(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <ol className="leaderboard-list">
          {ranking[period as keyof typeof ranking].map((person, index) => (
            <li key={person}>
              <span>#{index + 1}</span>
              <strong>{person}</strong>
            </li>
          ))}
        </ol>
      </Box>

      <Box title="Sua meta" description="Competição">
        <div className="summary-inline">
          <div>
            <span>Posição atual</span>
            <strong>#7</strong>
          </div>
          <div>
            <span>Objetivo</span>
            <strong>Top 5</strong>
          </div>
        </div>
      </Box>
    </div>
  );
}

function RecompensasExperience() {
  const [points, setPoints] = useState(1280);

  return (
    <div className="experience-grid">
      <Box title="Resgatar benefício" description="Pontos">
        <div className="summary-inline">
          <div>
            <span>Pontos disponíveis</span>
            <strong>{points}</strong>
          </div>
          <button
            type="button"
            className="claim-button"
            onClick={() => setPoints((current) => Math.max(0, current - 320))}
          >
            Resgatar cupom de 320
          </button>
        </div>
      </Box>

      <Box title="Catálogo rápido" description="Disponíveis">
        <div className="tag-cloud">
          {["Cupom", "Mentoria extra", "Criativos", "Benefício premium"].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </Box>
    </div>
  );
}

function NotificacoesExperience() {
  const [items, setItems] = useState([
    { label: "Comissão aprovada", read: false },
    { label: "Live começou agora", read: false },
    { label: "Recompensa liberada", read: true }
  ]);

  return (
    <div className="experience-grid">
      <Box title="Inbox prioritária" description="Notificações">
        <div className="check-grid">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={`notification-row${item.read ? " is-read" : ""}`}
              onClick={() =>
                setItems((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, read: !entry.read } : entry
                  )
                )
              }
            >
              <span className="task-mark" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </Box>

      <Box title="Destinos rápidos" description="Ações">
        <div className="action-grid">
          {["Abrir live", "Ver comissão", "Ir para recompensas", "Marcar todas"].map((action) => (
            <button key={action} type="button" className="action-card">
              {action}
            </button>
          ))}
        </div>
      </Box>
    </div>
  );
}

function PerfilExperience() {
  const [settings, setSettings] = useState({
    email: true,
    live: true,
    commissions: false
  });

  return (
    <div className="experience-grid">
      <Box title="Preferências rápidas" description="Perfil">
        <div className="toggle-list">
          {[
            { key: "email", label: "Receber alertas por e-mail" },
            { key: "live", label: "Avisar quando uma live começar" },
            { key: "commissions", label: "Avisar novas comissões" }
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              className={`toggle-row${settings[item.key as keyof typeof settings] ? " is-on" : ""}`}
              onClick={() =>
                setSettings((current) => ({
                  ...current,
                  [item.key]: !current[item.key as keyof typeof current]
                }))
              }
            >
              <span>{item.label}</span>
              <span className="toggle-pill" />
            </button>
          ))}
        </div>
      </Box>

      <Box title="Conta" description="Segurança">
        <ul className="bullet-list">
          <li>Senha atualizada no início do mês</li>
          <li>E-mail confirmado com sucesso</li>
          <li>Estrutura pronta para 2FA no futuro</li>
        </ul>
      </Box>
    </div>
  );
}
