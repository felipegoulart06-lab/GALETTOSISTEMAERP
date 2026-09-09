import type { SectionKey } from "@/lib/dashboard-data";
import { supplierListCatalog } from "@/lib/supplier-list-catalog";

export type CtaLayoutType =
  | "home"
  | "lives"
  | "produtos"
  | "mentorias"
  | "clubao"
  | "empresas"
  | "listas"
  | "indicacoes"
  | "oportunidades"
  | "campanhas"
  | "divulgue"
  | "missoes"
  | "ranking"
  | "recompensas"
  | "renda"
  | "desempenho"
  | "notificacoes"
  | "perfil";

export interface CtaMetric {
  label: string;
  value: string;
  detail: string;
  tone: "blue" | "green" | "orange" | "violet";
}

export interface CtaVisualCard {
  title: string;
  subtitle: string;
  meta: string;
  badge: string;
  image: string;
}

export interface ClientCtaPageConfig {
  sectionKey: SectionKey;
  layout: CtaLayoutType;
  ctaLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  metrics: CtaMetric[];
  primaryCards: CtaVisualCard[];
  secondaryItems: string[];
}

const image = (prompt: string, imageSize = "landscape_16_9") =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=${imageSize}`;

const card = (
  title: string,
  subtitle: string,
  meta: string,
  badge: string,
  prompt: string
): CtaVisualCard => ({
  title,
  subtitle,
  meta,
  badge,
  image: image(prompt)
});

const supplierListVisualCard = (item: (typeof supplierListCatalog)[number]): CtaVisualCard => ({
  title: item.title,
  subtitle: item.subtitle,
  meta: item.meta,
  badge: item.badge,
  image: image(item.prompt)
});

export const clientCtaPages: Record<SectionKey, ClientCtaPageConfig> = {
  home: {
    sectionKey: "home",
    layout: "home",
    ctaLabel: "Ver oportunidades",
    eyebrow: "Central de oportunidade",
    title: "Oportunidades filtradas para hoje.",
    description: "Aqui o sistema mostra o que faz sentido atacar agora, com prioridade visual, contexto comercial e próximos passos claros.",
    heroImage: image("opportunities command center for creator platform, premium clean dashboard with actionable cards, realistic"),
    metrics: [
      { label: "Recomendadas", value: "12", detail: "Ordenadas por encaixe", tone: "green" },
      { label: "Ganho potencial", value: "R$ 1.280", detail: "Se agir hoje", tone: "blue" },
      { label: "Rapidas", value: "05", detail: "Executaveis em minutos", tone: "orange" },
      { label: "Em destaque", value: "03", detail: "Mais quentes", tone: "violet" }
    ],
    primaryCards: [
      card("Produto com alta chance de venda", "Tecnologia + prova social + material pronto", "Bom encaixe para seu publico atual", "Mais quente", "premium tech product opportunity card, realistic creator commerce scene"),
      card("Live com oferta ja vinculada", "Entrar ao vivo agora pode acelerar seu dia", "Produto com CTA e comissao prontos", "Ao vivo", "live commerce event card with sales opportunity, realistic"),
      card("Missao que libera pontos hoje", "Meta curta para destravar recompensa", "Boa para subir no ranking ainda hoje", "Missao", "gamification mission opportunity card, realistic")
    ],
    secondaryItems: [
      "A plataforma pode sugerir produtos, campanhas e indicacoes com base no seu historico.",
      "Cada bloco desta pagina precisa levar para uma acao direta, nao apenas informar.",
      "Essa area funciona como o coracao comercial do dia do usuario."
    ]
  },
  lives: {
    sectionKey: "lives",
    layout: "lives",
    ctaLabel: "Ver programacao",
    eyebrow: "Grade de transmissao",
    title: "Uma area mais visual, com live, produto e agenda lado a lado.",
    description: "Quando o usuario clica na CTA de Lives, ele entra em uma pagina mais imersiva, parecida com uma central de live commerce.",
    heroImage: image("live commerce stage page with video area, product sidebar and schedule rail, realistic"),
    metrics: [
      { label: "Ao vivo", value: "03", detail: "Agora", tone: "orange" },
      { label: "Hoje", value: "06", detail: "Na grade", tone: "blue" },
      { label: "Mais assistida", value: "1.248", detail: "Espectadores", tone: "green" },
      { label: "Com produto", value: "100%", detail: "Vinculadas", tone: "violet" }
    ],
    primaryCards: [
      card("Smartwatch X", "Produto em destaque na transmissao", "R$ 199,90 • comissao R$ 39,98", "Ver produto", "smartwatch product side card for live commerce page, realistic"),
      card("HOJE 18:30", "Oferta especial para redes sociais", "Ative lembrete e entre no horario certo", "Lembrar-me", "upcoming live schedule card for creator platform, realistic"),
      card("AMANHA 12:00", "Sessao com perguntas e replay liberado", "Boa para continuar aprendendo depois", "Agenda", "live schedule and replay preview card, realistic")
    ],
    secondaryItems: [
      "A arquitetura deve suportar live propria e integracao oficial futura.",
      "Nao assumir embed irrestrito de provedor externo.",
      "Produto apresentado e agenda precisam estar sempre visiveis."
    ]
  },
  produtos: {
    sectionKey: "produtos",
    layout: "produtos",
    ctaLabel: "Ver produtos recomendados",
    eyebrow: "Vitrine de recomendacao",
    title: "Uma pagina editorial para os produtos certos do seu perfil.",
    description: "Depois do clique, o usuario entra em uma selecao mais bonita e comercial, com produto lider, comparativo e provas visuais.",
    heroImage: image("editorial affiliate products page with premium product grid and recommendation cards, realistic"),
    metrics: [
      { label: "Recomendados", value: "09", detail: "Para voce", tone: "green" },
      { label: "Maior comissao", value: "50%", detail: "Campanha atual", tone: "blue" },
      { label: "Melhor conversao", value: "6,8%", detail: "No periodo", tone: "orange" },
      { label: "Mais clicado", value: "Tecnologia", detail: "Categoria", tone: "violet" }
    ],
    primaryCards: [
      card("Fone Bluetooth Pro", "Produto lider para redes sociais", "Preco R$ 129,90 • voce ganha R$ 25,98", "Quero me afiliar", "premium bluetooth product sales card, realistic"),
      card("Pack IA Creator", "Produto recomendado pelo seu historico", "Bom para creator economy e conteudo", "Recomendado", "AI creator product bundle showcase, realistic"),
      card("Kit Stories que convertem", "Produto visual e facil de divulgar", "Pronto para o menu Divulgue", "Social", "social media marketing kit product visual, realistic")
    ],
    secondaryItems: [
      "Aqui o foco e selecao, comparacao e contexto comercial, nao tabela seca.",
      "Depois da afilicao, o usuario deve seguir para materiais e desempenho.",
      "A pagina precisa deixar claro por que cada produto foi sugerido."
    ]
  },
  mentorias: {
    sectionKey: "mentorias",
    layout: "mentorias",
    ctaLabel: "Conhecer cursos",
    eyebrow: "Biblioteca premium",
    title: "Uma vitrine forte de cursos, trilhas e progresso.",
    description: "A CTA de Mentorias abre uma area mais rica visualmente, com capa grande, trilhas, progresso, modulos e conexao com gamificacao.",
    heroImage: image("premium online course library page with large thumbnails and progress modules, realistic"),
    metrics: [
      { label: "Cursos", value: "28", detail: "Na biblioteca", tone: "blue" },
      { label: "Em andamento", value: "03", detail: "No seu perfil", tone: "green" },
      { label: "Pontos", value: "+100", detail: "Ao concluir modulo", tone: "orange" },
      { label: "Trilhas", value: "06", detail: "Disponiveis", tone: "violet" }
    ],
    primaryCards: [
      {
        ...card("Como criar conteudo que vende", "Filipe Galetto • 80% concluido", "Modulo 3 em progresso", "Continuar", "premium content marketing course thumbnail, realistic"),
        image: "/images/admin-filipe-galetto-01-v1.png"
      },
      {
        ...card("IA para criadores", "Felipe Goulart • aula nova liberada", "Boa para aprender e executar rapido", "Comecar", "AI course thumbnail for creators, realistic"),
        image: "/images/admin-felipe-goulart-01-v1.jpg"
      },
      {
        ...card("Negocios e posicionamento", "Filipe Galetto • foco em escala", "Bom para evolucao de longo prazo", "Nova trilha", "business positioning course cover, realistic"),
        image: "/images/admin-filipe-galetto-02-v1.png"
      }
    ],
    secondaryItems: [
      "A pagina deve ser dominada por thumbs e capas, nao por texto demais.",
      "O usuario precisa enxergar continuidade de estudo e proximos modulos.",
      "Aprender aqui deve repercutir em missoes, ranking e recompensas."
    ]
  },
  clubao: {
    sectionKey: "clubao",
    layout: "clubao",
    ctaLabel: "Ver benefícios",
    eyebrow: "Clube de vantagens",
    title: "Uma area mais premium, com cara de clube e nao de prateleira comum.",
    description: "Depois do clique, o usuario entra em um ambiente mais aspiracional, visual e elegante, com ofertas, regras e ativacao.",
    heroImage: image("exclusive benefits club page with premium offers and elegant commerce cards, realistic"),
    metrics: [
      { label: "Ofertas", value: "18", detail: "Ativas agora", tone: "green" },
      { label: "Exclusivas", value: "06", detail: "So para membros", tone: "violet" },
      { label: "Locais", value: "07", detail: "Perto de voce", tone: "blue" },
      { label: "Expirando", value: "03", detail: "Nos proximos dias", tone: "orange" }
    ],
    primaryCards: [
      card("Empresa XPTO", "20% OFF com codigo e validade claros", "Pagina completa com regras e link", "20% OFF", "premium business club discount offer, realistic"),
      card("Coworking parceiro", "Beneficio local com uso imediato", "Bom para rotina e percepcao de valor", "Perto de voce", "coworking benefit offer page visual, realistic"),
      card("Voucher encerrado", "Historico preservado sem quebrar experiencia", "Bom para manter integridade do ecossistema", "Encerrada", "expired coupon offer with preserved history visual, realistic")
    ],
    secondaryItems: [
      "O Clubao deve vender exclusividade e pertencimento.",
      "Beneficios encerrados nao devem sumir do nada.",
      "Cada oferta precisa de regras, validade, local e acao clara."
    ]
  },
  empresas: {
    sectionKey: "empresas",
    layout: "empresas",
    ctaLabel: "Buscar empresas",
    eyebrow: "Marketplace de servicos",
    title: "Uma busca visual por empresa, categoria e servico.",
    description: "Ao clicar, o usuario entra em uma exploracao mais bonita e visual do diretorio, com capas grandes, logos e servicos destacados.",
    heroImage: image("business directory page with search, company covers and service cards, realistic"),
    metrics: [
      { label: "Empresas", value: "128", detail: "No ecossistema", tone: "blue" },
      { label: "Servicos", value: "312", detail: "Ativos", tone: "green" },
      { label: "Categorias", value: "10", detail: "Mapeadas", tone: "violet" },
      { label: "Com indicacao", value: "22", detail: "Com ganho", tone: "orange" }
    ],
    primaryCards: [
      card("Empresa XPTO", "Tecnologia • Balneario Camboriu", "Capa forte, logo e indicacao disponivel", "Ver empresa", "technology company cover for marketplace page, realistic"),
      card("Transporte Executivo Prime", "Servico com comissao clara por indicacao", "Bom para puxar o fluxo de indicacoes", "Indicar", "executive transport business cover page, realistic"),
      card("Academia de Negocios Local", "Beneficio, campanha e servico no mesmo ecossistema", "Boa empresa para varias areas da plataforma", "Explorar", "local business education company page, realistic")
    ],
    secondaryItems: [
      "A busca deve permitir empresa, servico ou categoria.",
      "A pagina da empresa precisa misturar sobre, servicos e beneficio.",
      "Empresas servem como ponte entre descoberta e indicacao."
    ]
  },
  listas: {
    sectionKey: "listas",
    layout: "listas",
    ctaLabel: "Abrir listas",
    eyebrow: "Central de fornecedores",
    title: "Listas comerciais para lojistas comprarem melhor no atacado.",
    description:
      "Depois do clique, o usuário entra em uma leitura mais estratégica das listas de contatos cadastradas pelo Admin Master, separadas por região, categoria e perfil operacional.",
    heroImage: image("wholesale supplier contact directory page for brazil retailers, clean commercial dashboard with region blocks and procurement notes, realistic"),
    metrics: [
      { label: "Contatos", value: "148", detail: "Curados", tone: "green" },
      { label: "São Paulo", value: "86", detail: "Brás, 25 e Bom Retiro", tone: "blue" },
      { label: "Santa Catarina", value: "62", detail: "Joinville e região", tone: "violet" },
      { label: "Tipos", value: `${supplierListCatalog.length}`, detail: "Listas disponíveis", tone: "orange" }
    ],
    primaryCards: supplierListCatalog.map(supplierListVisualCard),
    secondaryItems: [
      "A proposta da área é compra no atacado, não catálogo de varejo.",
      "O Admin Master mantém a curadoria dos contatos e atualiza disponibilidade por região.",
      "A página deve permitir comparar SP com a operação regional de SC antes do contato."
    ]
  },
  indicacoes: {
    sectionKey: "indicacoes",
    layout: "indicacoes",
    ctaLabel: "Indicar agora",
    eyebrow: "Pagina de acao",
    title: "Uma area mais explicativa, comercial e pratica para criar indicacoes.",
    description: "Depois do clique, o usuario ve o servico, o fluxo de funcionamento, as formas de indicar e o acompanhamento dos status.",
    heroImage: image("referral action page with service card, status flow and contact methods, realistic"),
    metrics: [
      { label: "Indicacoes", value: "28", detail: "No seu historico", tone: "blue" },
      { label: "Em analise", value: "12", detail: "Aguardando", tone: "orange" },
      { label: "Convertidas", value: "05", detail: "Validadas", tone: "green" },
      { label: "Comissao", value: "R$ 1.240", detail: "Gerada", tone: "violet" }
    ],
    primaryCards: [
      card("Transporte Executivo", "R$ 30 por conversao valida", "Indique com link, WhatsApp, QR Code ou formulario", "Servico", "executive transport referral card, realistic"),
      card("Fluxo da indicacao", "Voce indica → empresa recebe → cliente e atendido", "Depois a conversao e validada e a comissao e registrada", "Passo a passo", "referral workflow visual with arrows and stages, realistic"),
      card("Minhas indicacoes", "Em analise, em atendimento, convertida e paga", "Status claros para reduzir ansiedade e duvida", "Acompanhar", "referral status tracking dashboard visual, realistic")
    ],
    secondaryItems: [
      "Essa pagina precisa ensinar rapidamente como indicar.",
      "O usuario deve perceber que indicacao nao vira dinheiro automaticamente.",
      "A visualizacao de status e obrigatoria para dar confianca."
    ]
  },
  oportunidades: {
    sectionKey: "oportunidades",
    layout: "oportunidades",
    ctaLabel: "Entrar em ação",
    eyebrow: "Sala de execucao",
    title: "Uma central de movimentos para o usuario agir sem pensar demais.",
    description: "O clique abre uma tela mais visual e estrategica, com cards de acao, urgencia, recomendacao e ganho potencial.",
    heroImage: image("action center for creator monetization opportunities, colorful cards and premium layout, realistic"),
    metrics: [
      { label: "Para voce", value: "03", detail: "Recomendadas", tone: "green" },
      { label: "Ganhe hoje", value: "05", detail: "Acoes curtas", tone: "blue" },
      { label: "Desafios", value: "02", detail: "Ativos", tone: "orange" },
      { label: "Potencial", value: "+900 pts", detail: "E comissao", tone: "violet" }
    ],
    primaryCards: [
      card("Compartilhe este produto", "Acao simples para hoje", "Comissao ativa e material pronto", "Ganhe hoje", "quick product sharing opportunity card, realistic"),
      card("Indique este servico", "Bom para leads quentes da sua rede", "Comissao fixa por conversao", "Indique", "service referral opportunity action card, realistic"),
      card("Fique entre os 10 primeiros", "Desafio de temporada conectado ao ranking", "Recompensas especiais para quem subir", "Desafio", "leaderboard challenge opportunity card, realistic")
    ],
    secondaryItems: [
      "Essa tela precisa ter urgencia, clareza e bons blocos de acao.",
      "Idealmente o usuario entra aqui no comeco do dia.",
      "Essa e a tela que mais puxa a plataforma para monetizacao pratica."
    ]
  },
  campanhas: {
    sectionKey: "campanhas",
    layout: "campanhas",
    ctaLabel: "Participar",
    eyebrow: "Quadro de campanhas",
    title: "Uma pagina para entrar em desafios, acoes e campanhas com leitura forte.",
    description: "Depois do clique, o usuario entra em um mural mais visual, com vagas, prazo, regras e progresso das campanhas abertas.",
    heroImage: image("campaign board page with deadlines, participants and challenge cards, realistic"),
    metrics: [
      { label: "Abertas", value: "07", detail: "Disponiveis", tone: "blue" },
      { label: "Participando", value: "02", detail: "No momento", tone: "green" },
      { label: "Prazo curto", value: "03", detail: "Expiram logo", tone: "orange" },
      { label: "Com premio", value: "05", detail: "Ativas", tone: "violet" }
    ],
    primaryCards: [
      card("Divulgue Produto X", "100 vagas • prazo 7 dias", "Campanha com brief e recompensa definidos", "Participar", "marketing campaign opportunity board, realistic"),
      card("Campanha de indicacao", "Meta progressiva para leads validos", "Boa para quem ja usa o CRM do usuario", "Meta ativa", "referral campaign challenge board, realistic"),
      card("Desafio de vendas", "Faça 20 vendas e entre na disputa principal", "Conecta direto com ranking e recompensas", "Temporada", "sales challenge campaign board, realistic")
    ],
    secondaryItems: [
      "Campanhas devem parecer convites vivos, nao listas frias.",
      "Prazo, vagas e recompensa precisam estar na primeira leitura.",
      "O caminho de participacao deve ser simples e imediato."
    ]
  },
  divulgue: {
    sectionKey: "divulgue",
    layout: "divulgue",
    ctaLabel: "Abrir materiais",
    eyebrow: "Studio de materiais",
    title: "Tudo pronto para divulgar, com visual forte e pouca friccao.",
    description: "Apos o clique, o usuario entra em uma pagina mais pratica e visual, com previews de assets, downloads e copias prontas.",
    heroImage: image("promo assets studio page with banners, videos, captions and QR codes, realistic"),
    metrics: [
      { label: "Imagens", value: "24", detail: "Prontas", tone: "green" },
      { label: "Videos", value: "08", detail: "Curtos", tone: "blue" },
      { label: "Legendas", value: "18", detail: "Copiaveis", tone: "orange" },
      { label: "QR Codes", value: "09", detail: "Geraveis", tone: "violet" }
    ],
    primaryCards: [
      card("Imagem principal", "Criativo visual para feed ou story", "Download rapido com link associado", "Baixar", "marketing creative image asset page, realistic"),
      card("Video vertical", "Pronto para reels ou stories", "Acelera muito a execucao do usuario", "Compartilhar", "vertical promo video asset page, realistic"),
      card("Legenda pronta", "Texto comercial para WhatsApp e Instagram", "Ajuda muito quem esta comecando", "Copiar", "copywriting and caption asset panel, realistic")
    ],
    secondaryItems: [
      "O menu Divulgue precisa parecer ferramenta de uso, nao so deposito de arquivos.",
      "O usuario deve sentir que consegue agir em poucos cliques.",
      "Essa area reduz a distancia entre querer vender e realmente executar."
    ]
  },
  missoes: {
    sectionKey: "missoes",
    layout: "missoes",
    ctaLabel: "Ver missões",
    eyebrow: "Painel de progresso",
    title: "Uma pagina mais emocionante para ver metas, passos e premios.",
    description: "Depois do clique, o usuario entra em um layout de progresso com escada de missao, missao do dia e proximas conquistas.",
    heroImage: image("mission progress page with ladder steps, points and reward preview, realistic"),
    metrics: [
      { label: "Hoje", value: "03", detail: "Missoes diarias", tone: "orange" },
      { label: "Semanais", value: "02", detail: "Em andamento", tone: "blue" },
      { label: "Pontos", value: "+100", detail: "Se concluir agora", tone: "green" },
      { label: "Progressivas", value: "05", detail: "Escalonadas", tone: "violet" }
    ],
    primaryCards: [
      card("Compartilhe 3 produtos", "2/3 concluido", "Missao diaria com baixa friccao", "Hoje", "daily mission progress card, realistic"),
      card("Primeira venda", "500 pontos ao concluir", "Missao chave para ativar o usuario", "Meta", "first sale mission card with reward, realistic"),
      card("Mestre das vendas", "10 vendas para subir muito na plataforma", "Missao maior com alto peso no ranking", "Progressiva", "sales master mission progression visual, realistic")
    ],
    secondaryItems: [
      "Missoes precisam mostrar progresso, premio e proximo passo.",
      "Essa pagina precisa comunicar movimento e avance constante.",
      "E uma das telas que mais conectam com ranking e recompensas."
    ]
  },
  ranking: {
    sectionKey: "ranking",
    layout: "ranking",
    ctaLabel: "Ver ranking",
    eyebrow: "Competicao visivel",
    title: "Uma pagina mais dramatica para a disputa e para a sua posicao.",
    description: "O clique leva para uma pagina mais forte visualmente, com podio, categorias e o lugar do usuario destacado.",
    heroImage: image("leaderboard page with podium, categories and highlighted user position, realistic"),
    metrics: [
      { label: "Sua posicao", value: "#27", detail: "Ranking geral", tone: "blue" },
      { label: "Subida", value: "+3", detail: "Ultimo ciclo", tone: "green" },
      { label: "Melhor categoria", value: "Vendas", detail: "Para voce", tone: "orange" },
      { label: "Pontos", value: "4.820", detail: "No perfil", tone: "violet" }
    ],
    primaryCards: [
      {
        ...card("Bruno Martins", "Maior faturamento da temporada", "Top 1 com performance dominante", "1º", "top leaderboard winner portrait, realistic"),
        image: "/images/user-avatar-01-v1.png"
      },
      {
        ...card("Camila Rocha", "Mais vendas na semana", "Boa combinacao de live e produtos", "2º", "female sales leaderboard portrait, realistic"),
        image: "/images/user-avatar-02-v1.png"
      },
      {
        ...card("Diego Alves", "Mais indicacoes convertidas", "Canal forte no WhatsApp", "3º", "referral leaderboard portrait, realistic"),
        image: "/images/user-avatar-03-v1.png"
      }
    ],
    secondaryItems: [
      "O ranking precisa misturar pertencimento, ambicao e contexto.",
      "Sua posicao deve aparecer com clareza para gerar desejo de subir.",
      "Categorias diferentes ampliam a chance de mais usuarios se verem no jogo."
    ]
  },
  recompensas: {
    sectionKey: "recompensas",
    layout: "recompensas",
    ctaLabel: "Abrir catálogo",
    eyebrow: "Sala de conquistas",
    title: "Uma vitrine mais desejavel para premios, acessos e beneficios.",
    description: "Depois do clique, a plataforma mostra o catalogo de recompensas como uma area aspiracional, com pontos, estoque e resgate.",
    heroImage: image("rewards showcase page with gadgets, vip access and premium benefits, realistic"),
    metrics: [
      { label: "Pontos", value: "4.820", detail: "Saldo atual", tone: "blue" },
      { label: "Ativas", value: "14", detail: "No catalogo", tone: "green" },
      { label: "VIP", value: "03", detail: "Acessos especiais", tone: "violet" },
      { label: "Resgatadas", value: "09", detail: "Historico", tone: "orange" }
    ],
    primaryCards: [
      card("Fone Bluetooth", "2.500 pontos", "Produto com alto valor percebido", "Resgatar", "bluetooth reward product showcase, realistic"),
      card("Mentoria VIP", "5.000 pontos", "Experiencia premium com escassez", "VIP", "vip mentorship reward experience visual, realistic"),
      card("Acesso Embaixador", "10.000 pontos", "Status, badge e oportunidades exclusivas", "Desbloquear", "ambassador access reward badge and membership visual, realistic")
    ],
    secondaryItems: [
      "Recompensa precisa parecer conquista e nao lista morta.",
      "Produtos, experiencias e status devem conviver bem nessa tela.",
      "Essa pagina fecha bem o ciclo de esforco e retorno."
    ]
  },
  sorteios: {
    sectionKey: "sorteios",
    layout: "recompensas",
    ctaLabel: "Ver central",
    eyebrow: "Premiacao gamificada",
    title: "Uma central premium para sorteios ao vivo, proximos eventos e ultimos ganhadores.",
    description: "Depois do clique, o usuario entra em uma pagina com clima de evento, premios claros, contagem regressiva e sensacao de exclusividade.",
    heroImage: image("premium giveaway hub with live draws, luxury prizes, countdown lights and community excitement, realistic"),
    metrics: [
      { label: "Ao vivo", value: "01", detail: "Agora", tone: "orange" },
      { label: "Hoje", value: "04", detail: "Na agenda", tone: "blue" },
      { label: "Participantes", value: "8,4 mil", detail: "No ciclo", tone: "violet" },
      { label: "Premios", value: "26", detail: "Ativos", tone: "green" }
    ],
    primaryCards: [
      card("Sorteio de produtos", "Kit creator premium com palco ao vivo", "Participantes em alta e visual de evento", "AO VIVO", "premium product giveaway event card with spotlight and prize box, realistic"),
      card("Sorteio por missoes", "Cada meta concluida libera tickets extras", "Bom para retenção e competicao", "MISSÕES", "mission-based giveaway card with target and tickets, realistic"),
      card("Mega sorteio", "Grande rodada com setup creator e varios vencedores", "Evento de destaque da temporada", "MEGA", "mega creator giveaway card with luxury gear and dramatic lighting, realistic")
    ],
    secondaryItems: [
      "Sorteios precisam parecer evento, nao simples lista de premios.",
      "Ao vivo, proximos e historico devem conviver numa mesma narrativa visual.",
      "A experiencia precisa reforcar diversao, exclusividade e competitividade."
    ]
  },
  "minha-renda": {
    sectionKey: "minha-renda",
    layout: "renda",
    ctaLabel: "Ver histórico",
    eyebrow: "Resultado gerado",
    title: "Uma tela mais clara para entender origem, status e linha do dinheiro gerado.",
    description: "Depois do clique, o usuario entra em uma leitura mais organizada do que gerou, de onde veio e em que etapa cada valor esta.",
    heroImage: image("earnings breakdown page with source cards and transaction ledger, realistic"),
    metrics: [
      { label: "Total", value: "R$ 18.420", detail: "Gerado", tone: "green" },
      { label: "Disponivel", value: "R$ 2.840", detail: "Liberado", tone: "blue" },
      { label: "Pendente", value: "R$ 1.260", detail: "Em validacao", tone: "orange" },
      { label: "Fontes", value: "05", detail: "Ativas", tone: "violet" }
    ],
    primaryCards: [
      card("Produtos", "Principal origem da sua renda atual", "Comissao por venda aprovada", "Origem", "affiliate earnings source products page visual, realistic"),
      card("Indicacoes", "Comissoes validadas por servico concluido", "Boa leitura para origem de rede", "Origem", "referral income source card, realistic"),
      card("Campanhas", "Bonificacoes e metas cumpridas", "Complemento importante do ciclo", "Bônus", "campaign bonus income source card, realistic")
    ],
    secondaryItems: [
      "A area precisa ser financeira, mas sem parecer banco.",
      "Cada origem de renda deve ser facil de reconhecer.",
      "O historico tem que reduzir duvida sobre status e valores."
    ]
  },
  desempenho: {
    sectionKey: "desempenho",
    layout: "desempenho",
    ctaLabel: "Ver análise",
    eyebrow: "Leitura inteligente",
    title: "Uma pagina mais analitica, visual e orientada a melhorar resultado.",
    description: "Depois do clique, o usuario entra em uma experiencia mais forte de performance, com graficos, comparativos e insights.",
    heroImage: image("performance analysis page with conversion charts and smart insights, realistic"),
    metrics: [
      { label: "Vendas", value: "47", detail: "No periodo", tone: "green" },
      { label: "Cliques", value: "1.284", detail: "Rastreados", tone: "blue" },
      { label: "Conversoes", value: "82", detail: "Validadas", tone: "orange" },
      { label: "Melhor categoria", value: "Tecnologia", detail: "No momento", tone: "violet" }
    ],
    primaryCards: [
      card("Produto A", "450 cliques • 31 vendas • 6,8%", "Seu melhor produto no ciclo", "Top conversão", "product performance analytics card, realistic"),
      card("Produto B", "220 cliques • 12 vendas • 5,4%", "Bom produto para ajuste fino", "Comparar", "analytics comparison product card, realistic"),
      card("Insight de perfil", "Suas indicacoes convertem 22% melhor que a media", "A plataforma pode recomendar foco e priorizacao", "Insight", "smart analytics insight card, realistic")
    ],
    secondaryItems: [
      "Desempenho deve responder se o usuario esta indo bem e onde melhorar.",
      "Essa tela e onde a plataforma comeca a parecer inteligente.",
      "Graficos e comparativos precisam ajudar decisao, nao decorar a tela."
    ]
  },
  notificacoes: {
    sectionKey: "notificacoes",
    layout: "notificacoes",
    ctaLabel: "Abrir notificações",
    eyebrow: "Inbox de acao",
    title: "Uma central mais viva, com acao clara em cada mensagem.",
    description: "Depois do clique, o usuario entra em uma tela com mensagens visualmente fortes e destinos concretos para agir.",
    heroImage: image("notification action center page with live alerts, product updates and mission prompts, realistic"),
    metrics: [
      { label: "Nao lidas", value: "12", detail: "Pendentes", tone: "orange" },
      { label: "Com acao", value: "09", detail: "Diretas", tone: "green" },
      { label: "Lives", value: "03", detail: "Agora", tone: "blue" },
      { label: "Missoes", value: "02", detail: "Quase la", tone: "violet" }
    ],
    primaryCards: [
      card("Marcos entrou ao vivo", "Produto que voce ja divulga", "A acao aqui e assistir agora", "🔴 LIVE", "live notification detail page visual, realistic"),
      card("Novo produto disponivel", "Comissao de ate 25%", "A acao aqui e ver produto ou se afiliar", "🛍️ PRODUTO", "new product notification page visual, realistic"),
      card("Voce esta a 1 venda da sua missao", "A acao aqui e abrir a missao", "Pode impactar ranking e recompensa ainda hoje", "🎯 MISSÃO", "mission alert notification detail page, realistic")
    ],
    secondaryItems: [
      "Notificacao boa e a que leva para uma proxima acao concreta.",
      "A area deve parecer caixa de entrada com prioridade visual.",
      "O usuario deve entender em segundos o que aconteceu e o que fazer."
    ]
  },
  perfil: {
    sectionKey: "perfil",
    layout: "perfil",
    ctaLabel: "Editar perfil",
    eyebrow: "Identidade do usuario",
    title: "Uma pagina de perfil mais rica, bonita e com sensacao de status.",
    description: "Depois do clique, o usuario entra em um perfil mais completo, com avatar, nivel, badge, pontuacao, conquistas, estatisticas e modulos de conta.",
    heroImage: image("premium user profile page with avatar, achievements and stats, realistic"),
    metrics: [
      { label: "Nivel", value: "7 Pro", detail: "Atual", tone: "green" },
      { label: "Pontos", value: "4.820", detail: "No ciclo", tone: "blue" },
      { label: "Conquistas", value: "14", detail: "Desbloqueadas", tone: "orange" },
      { label: "Ranking", value: "#27", detail: "Posicao", tone: "violet" }
    ],
    primaryCards: [
      card("Dados pessoais", "Nome, e-mail, telefone, cidade e foto", "Modulo claro para edicao de conta", "Conta", "user account data profile module, realistic"),
      card("Estatisticas", "Vendas, indicacoes, produtos afiliados e missoes", "Perfil como espelho da evolucao", "Progresso", "user profile stats module, realistic"),
      card("Seguranca", "Senha, sessoes e dispositivos", "Base para protecao e confianca", "Segurança", "account security settings module, realistic")
    ],
    secondaryItems: [
      "Perfil nao e so cadastro: ele precisa mostrar identidade dentro da plataforma.",
      "Nivel, badge e pontuacao ajudam muito na percepcao de valor.",
      "Conta e evolucao precisam conviver bem nesta tela."
    ]
  }
};
