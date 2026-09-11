export type AdminSectionKey =
  | "resumo"
  | "usuarios"
  | "solicitacoes"
  | "produtos"
  | "lives"
  | "empresas"
  | "indicacoes"
  | "campanhas"
  | "mentorias"
  | "clubao"
  | "divulgue"
  | "missoes"
  | "ranking"
  | "recompensas"
  | "financeiro"
  | "relatorios"
  | "notificacoes"
  | "equipe"
  | "administradores"
  | "auditoria"
  | "configuracoes";

export type AdminIconName =
  | "shield"
  | "users"
  | "inbox"
  | "box"
  | "live"
  | "building"
  | "crm"
  | "megaphone"
  | "cap"
  | "gift"
  | "share"
  | "target"
  | "trophy"
  | "sparkles"
  | "money"
  | "chart"
  | "bell"
  | "team"
  | "lock"
  | "log"
  | "settings";

export interface AdminNavItem {
  key: AdminSectionKey;
  label: string;
  icon: AdminIconName;
}

export interface AdminNavGroup {
  label: string;
  items: AdminNavItem[];
}

export interface AdminMetric {
  label: string;
  value: string;
  change: string;
  tone: "green" | "blue" | "orange" | "violet";
}

export interface AdminListItem {
  title: string;
  subtitle: string;
  meta: string;
  status: string;
  avatar?: string;
}

export interface AdminSectionConfig {
  key: AdminSectionKey;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  heroNotice: string;
  metrics: AdminMetric[];
  boardTitle: string;
  boardDescription: string;
  primaryItems: AdminListItem[];
  secondaryTitle: string;
  secondaryItems: AdminListItem[];
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: "Controle",
    items: [
      { key: "resumo", label: "Resumo administrativo", icon: "shield" },
      { key: "usuarios", label: "Usuarios", icon: "users" },
      { key: "solicitacoes", label: "Solicitacoes", icon: "inbox" }
    ]
  },
  {
    label: "Comercial",
    items: [
      { key: "produtos", label: "Produtos", icon: "box" },
      { key: "lives", label: "Lives", icon: "live" },
      { key: "empresas", label: "Empresas", icon: "building" },
      { key: "indicacoes", label: "Indicacoes", icon: "crm" },
      { key: "campanhas", label: "Campanhas", icon: "megaphone" }
    ]
  },
  {
    label: "Experiencia",
    items: [
      { key: "mentorias", label: "Mentorias", icon: "cap" },
      { key: "clubao", label: "Clubao", icon: "gift" },
      { key: "divulgue", label: "Divulgue", icon: "share" },
      { key: "missoes", label: "Missoes", icon: "target" },
      { key: "recompensas", label: "Recompensas", icon: "sparkles" }
    ]
  },
  {
    label: "Operacao",
    items: [
      { key: "financeiro", label: "Financeiro", icon: "money" },
      { key: "relatorios", label: "Relatorios", icon: "chart" },
      { key: "notificacoes", label: "Notificacoes", icon: "bell" }
    ]
  },
  {
    label: "Administracao",
    items: [
      { key: "equipe", label: "Equipe", icon: "team" },
      { key: "administradores", label: "Administradores", icon: "lock" },
      { key: "auditoria", label: "Auditoria", icon: "log" },
      { key: "configuracoes", label: "Configuracoes", icon: "settings" }
    ]
  }
];

export const adminSectionOrder: AdminSectionKey[] = adminNavGroups.flatMap((group) =>
  group.items.map((item) => item.key)
);

const baseSystemPoints = [
  "O Admin Master funciona como cerebro da plataforma: cria, aprova, organiza, acompanha e administra.",
  "O painel foi organizado para reduzir cliques desnecessarios e dar leitura operacional mais rapida.",
  "Toda acao importante precisa estar pronta para log de auditoria, permissao e historico.",
  "A base foi pensada para web, mobile e futura evolucao para aplicativo."
];

export const adminSections: Record<AdminSectionKey, AdminSectionConfig> = {
  resumo: {
    key: "resumo",
    label: "Resumo administrativo",
    eyebrow: "Central de comando",
    title: "O que esta acontecendo na plataforma e o que precisa de voce agora.",
    description:
      "O resumo administrativo mostra a operacao inteira em uma tela: usuarios, empresas, produtos, lives, indicacoes, resultados e financeiro com foco em decisao imediata.",
    heroNotice: "O dashboard precisa apontar prioridades, nao so exibir numeros bonitos.",
    metrics: [
      { label: "Usuarios ativos", value: "8.492", change: "+146 hoje", tone: "green" },
      { label: "Volume em vendas", value: "R$ 184.200", change: "Plataforma inteira", tone: "blue" },
      { label: "Comissoes geradas", value: "R$ 42.800", change: "Ciclo atual", tone: "violet" },
      { label: "Indicacoes", value: "1.284", change: "Fluxo ativo", tone: "orange" },
      { label: "Produtos ativos", value: "347", change: "Publicados", tone: "green" },
      { label: "Empresas ativas", value: "128", change: "Aprovadas", tone: "blue" },
      { label: "Lives", value: "12", change: "Agendadas e ao vivo", tone: "orange" },
      { label: "Novos usuarios", value: "+146", change: "Hoje", tone: "violet" }
    ],
    boardTitle: "Central de decisoes",
    boardDescription: "O que precisa da sua atencao agora.",
    primaryItems: [
      { title: "12 produtos aguardando aprovacao", subtitle: "Produtos novos ou alterados esperando analise", meta: "Produtos", status: "Revisar" },
      { title: "7 solicitacoes de saque", subtitle: "Itens em aguardando conferencia financeira", meta: "Financeiro", status: "Conferir" },
      { title: "5 empresas aguardando aprovacao", subtitle: "Cadastros novos e atualizacoes dependem de analise", meta: "Empresas", status: "Analisar" },
      { title: "Live programada para hoje", subtitle: "Evento com produto em destaque e vendedor escalado", meta: "Lives", status: "Ver live" },
      { title: "3 denuncias aguardando analise", subtitle: "Solicitacoes sensiveis com potencial de bloqueio ou ajuste", meta: "Solicitacoes", status: "Revisar" }
    ],
    secondaryTitle: "Radar do ecossistema",
    secondaryItems: [
      { title: "Campanhas ativas", subtitle: "18 campanhas rodando entre produto, indicacao e desafio", meta: "Campanhas", status: "Ativas" },
      { title: "Conversao geral", subtitle: "A plataforma manteve taxa de 4,8% na semana", meta: "Resultados", status: "Saudavel" },
      { title: "Ponto de atencao", subtitle: "Saques e aprovacoes concentram os maiores gargalos do dia", meta: "Operacao", status: "Acompanhar" }
    ]
  },
  usuarios: {
    key: "usuarios",
    label: "Usuarios",
    eyebrow: "Visao 360 do usuario",
    title: "Cada pessoa precisa ser acompanhada como parte do ecossistema.",
    description:
      "O Admin Master acompanha cadastro, origem, atividade, consumo, desempenho, financeiro, campanhas, missoes e historico completo de cada usuario.",
    heroNotice: "Toda acao administrativa sensivel deve gerar log de auditoria.",
    metrics: [
      { label: "Base total", value: "12.481", change: "Usuarios cadastrados", tone: "blue" },
      { label: "Ativos", value: "8.492", change: "Ultimos 30 dias", tone: "green" },
      { label: "Em analise", value: "91", change: "Cadastro ou atividade", tone: "orange" },
      { label: "Bloqueados", value: "38", change: "Acoes administrativas", tone: "violet" }
    ],
    boardTitle: "Lista de usuarios",
    boardDescription: "Tabela operacional com dados de conta, resultado e nivel.",
    primaryItems: [
      { title: "Rafael Martins", subtitle: "Usuario • 12 vendas • 4 indicacoes • nivel 3", meta: "Origem campanha premium", status: "Ativo", avatar: "/images/user-avatar-01-v1.png" },
      { title: "Lucas Almeida", subtitle: "Afiliado • 18 vendas • 6 produtos ativos", meta: "Origem live de produto", status: "Ativo", avatar: "/images/user-avatar-02-v1.png" },
      { title: "Marina Sato", subtitle: "Vendedora • 9 vendas • 2 campanhas em execucao", meta: "Origem organica", status: "Ativo", avatar: "/images/user-avatar-03-v1.png" },
      { title: "Henrique Bauer", subtitle: "Usuario • 3 vendas • onboarding concluido", meta: "Origem lista VIP", status: "Novo", avatar: "/images/user-avatar-04-v1.png" },
      { title: "Diego Freitas", subtitle: "Afiliado • 14 vendas • 11 leads em analise", meta: "Origem WhatsApp", status: "Acompanhar", avatar: "/images/user-avatar-05-v1.png" },
      { title: "Bruno Castro", subtitle: "Vendedor • 26 vendas • live marcada para hoje", meta: "Origem equipe interna", status: "Escalado", avatar: "/images/user-avatar-06-v1.png" },
      { title: "Thiago Melo", subtitle: "Usuario • 5 vendas • foco em empresas locais", meta: "Origem indicacao", status: "Ativo", avatar: "/images/user-avatar-07-v1.png" },
      { title: "Gabriela Nunes", subtitle: "Afiliada • 22 vendas • 3 campanhas vinculadas", meta: "Origem campanha social", status: "Ativo", avatar: "/images/user-avatar-08-v1.png" },
      { title: "Camila Duarte", subtitle: "Vendedora • 17 vendas • 8 produtos em destaque", meta: "Origem mentoria", status: "Ativo", avatar: "/images/user-avatar-09-v1.png" },
      { title: "Helena Moraes", subtitle: "Usuario • 7 vendas • bom desempenho no Clubao", meta: "Origem organica", status: "Ativo", avatar: "/images/user-avatar-10-v1.png" },
      { title: "Victor Paes", subtitle: "Afiliado • 10 vendas • 2 indicacoes convertidas", meta: "Origem ranking", status: "Ativo", avatar: "/images/user-avatar-11-v1.png" },
      { title: "Leonardo Rocha", subtitle: "Vendedor • 31 vendas • top performance da semana", meta: "Origem equipe comercial", status: "Destaque", avatar: "/images/user-avatar-12-v1.png" },
      { title: "Eduardo Vieira", subtitle: "Usuario • 1 venda • 3 lives assistidas", meta: "Origem home", status: "Novo", avatar: "/images/user-avatar-13-v1.png" },
      { title: "Patricia Lopes", subtitle: "Afiliada • 15 vendas • funil de divulgacao forte", meta: "Origem campanhas", status: "Ativo", avatar: "/images/user-avatar-14-v1.png" },
      { title: "Juliana Torres", subtitle: "Vendedora • 21 vendas • alta taxa de conversao", meta: "Origem squad de lives", status: "Ativo", avatar: "/images/user-avatar-15-v1.png" },
      { title: "Mateus Prado", subtitle: "Usuario • 8 vendas • 5 indicacoes registradas", meta: "Origem lista premium", status: "Ativo", avatar: "/images/user-avatar-16-v1.png" }
    ],
    secondaryTitle: "Acoes administrativas",
    secondaryItems: [
      { title: "Editar, bloquear e desbloquear", subtitle: "Ajuste de status e acao sobre conta do usuario", meta: "Governanca", status: "Ativo" },
      { title: "Alterar nivel e aprovar cadastro", subtitle: "Controle manual para escalar ou restringir conta", meta: "Moderacao", status: "Pronto" },
      { title: "Historico completo", subtitle: "Linha do tempo com login, venda, indicacao, campanha e primeira venda", meta: "Timeline", status: "Essencial" }
    ]
  },
  solicitacoes: {
    key: "solicitacoes",
    label: "Solicitacoes",
    eyebrow: "Central unica",
    title: "Uma fila unica para o que precisa ser resolvido na plataforma.",
    description:
      "Solicitacoes concentram problemas, alteracoes cadastrais, aprovacoes, contestacoes, denuncias e pedidos que surgem em usuarios, empresas, financeiro, produtos e indicacoes.",
    heroNotice: "A central evita que a operacao precise abrir 15 telas para encontrar um problema.",
    metrics: [
      { label: "Abertas", value: "73", change: "Fila do dia", tone: "orange" },
      { label: "Usuarios", value: "18", change: "Cadastro e suporte", tone: "blue" },
      { label: "Financeiro", value: "21", change: "Saque e contestacao", tone: "green" },
      { label: "Criticas", value: "09", change: "Prioridade alta", tone: "violet" }
    ],
    boardTitle: "Central de solicitacoes",
    boardDescription: "Categorias e filas mais sensiveis da operacao.",
    primaryItems: [
      { title: "Alteracao cadastral de usuario", subtitle: "Pedido para atualizar telefone, cidade e status documental", meta: "Usuarios", status: "Em analise" },
      { title: "Empresa aguardando aprovacao", subtitle: "Cadastro novo com documentacao e servicos para validar", meta: "Empresas", status: "Analisar" },
      { title: "Contestacao de comissao", subtitle: "Usuario questiona cancelamento de comissao apos validacao", meta: "Financeiro", status: "Prioridade" },
      { title: "Denuncia em produto", subtitle: "Criativo divergente das regras de divulgacao", meta: "Produtos", status: "Revisar" }
    ],
    secondaryTitle: "Categorias",
    secondaryItems: [
      { title: "Usuarios", subtitle: "Problemas, alteracoes cadastrais e contestacoes de conta", meta: "Fila", status: "Ativa" },
      { title: "Financeiro", subtitle: "Saques, contestacoes e divergencias de comissao", meta: "Fila", status: "Ativa" },
      { title: "Indicacoes", subtitle: "Validacao, conversao e contestacao de status", meta: "Fila", status: "Ativa" }
    ]
  },
  produtos: {
    key: "produtos",
    label: "Produtos",
    eyebrow: "Cadastro e afiliacoes",
    title: "Tudo que aparece para o usuario nasce e e controlado aqui.",
    description:
      "O Admin Master cria produtos, define regras de afiliacao, comissoes, materiais, status, aprovacoes e acompanha cliques, vendas, afiliados e comissoes.",
    heroNotice: "Produto precisa nascer pronto para comercial, aprovacao e leitura de performance.",
    metrics: [
      { label: "Produtos ativos", value: "347", change: "Publicados", tone: "green" },
      { label: "Em analise", value: "12", change: "Aguardando aprovacao", tone: "orange" },
      { label: "Afiliados", value: "842", change: "No produto principal", tone: "blue" },
      { label: "Comissoes", value: "R$ 13.140", change: "Produto lider", tone: "violet" }
    ],
    boardTitle: "Fila de produtos",
    boardDescription: "Criacao, status, aprovacao e configuracao de afiliacao.",
    primaryItems: [
      { title: "Produto X", subtitle: "Comissao 20% • aprovacao manual • limite 1.000 afiliados", meta: "Status em analise", status: "Revisar" },
      { title: "Fone Bluetooth Pro", subtitle: "842 afiliados • 12.400 cliques • 438 vendas", meta: "Produto ativo", status: "Acompanhar" },
      { title: "Pack IA Creator", subtitle: "Materiais disponiveis e comissao fixa opcional", meta: "Categoria IA", status: "Ativo" },
      { title: "Nova oferta premium", subtitle: "Rascunho com videos, regras e prazo em preenchimento", meta: "Cadastro", status: "Rascunho" }
    ],
    secondaryTitle: "Regras de afiliacao",
    secondaryItems: [
      { title: "Comissao percentual ou fixa", subtitle: "20% ou R$ 30 por venda aprovada", meta: "Configuracao", status: "Flexivel" },
      { title: "Aprovacao automatica ou manual", subtitle: "Controle sobre quem pode se afiliar", meta: "Governanca", status: "Definido" },
      { title: "Materiais e regras de divulgacao", subtitle: "Ligacao direta com o menu Divulgue", meta: "Experiencia", status: "Conectado" }
    ]
  },
  lives: {
    key: "lives",
    label: "Lives",
    eyebrow: "Agendar, iniciar e acompanhar",
    title: "A operacao de Lives precisa ser controlada como uma maquina comercial.",
    description:
      "Aqui o Admin Master agenda, edita, inicia, encerra, destaca, define vendedor, thumbnail, produto e acompanha espectadores, vendas e conversoes.",
    heroNotice: "Arquitetura preparada para lives proprias e futuras integracoes oficiais sem scraping.",
    metrics: [
      { label: "Lives hoje", value: "12", change: "Agendadas e ao vivo", tone: "orange" },
      { label: "Vendedores ativos", value: "08", change: "Funcionarios escalados", tone: "green" },
      { label: "Espectadores", value: "4.8k", change: "Pico do dia", tone: "blue" },
      { label: "Vendas geradas", value: "R$ 87.400", change: "Equipe de live", tone: "violet" }
    ],
    boardTitle: "Controle da live",
    boardDescription: "Tudo que a operacao precisa ver sem sair da tela.",
    primaryItems: [
      { title: "Carlos", subtitle: "42 lives realizadas • vendas geradas R$ 87.400", meta: "Vendedor ativo", status: "Escalado" },
      { title: "Live Oferta do dia", subtitle: "Produto vinculado, thumbnail pronta e horario 19:30", meta: "Hoje", status: "Agendada" },
      { title: "Live de fechamento", subtitle: "Operacao com CTA final em revisao e destaque de produto", meta: "Amanha", status: "Editar" },
      { title: "Replay comercial", subtitle: "Conteudo com bom volume para reforco de campanha", meta: "Biblioteca", status: "Ativo" }
    ],
    secondaryTitle: "Arquitetura de integracao",
    secondaryItems: [
      { title: "Live propria", subtitle: "Primeira camada recomendada para a plataforma", meta: "Atual", status: "Ativo" },
      { title: "Integracao oficial futura", subtitle: "TikTok ou outro provedor por API oficial", meta: "Roadmap", status: "Planejado" },
      { title: "Sem scraping", subtitle: "A plataforma nao deve depender disso para operar", meta: "Regra", status: "Obrigatorio" }
    ]
  },
  empresas: {
    key: "empresas",
    label: "Empresas",
    eyebrow: "Cadastro e aprovacao",
    title: "Empresas, servicos e programas de indicacao precisam nascer bem organizados.",
    description:
      "O Admin Master cadastra, aprova e administra empresas, seus servicos, categorias, cidades, logos, capas, beneficios e programas de indicacao.",
    heroNotice: "Cada empresa pode ter varios servicos e cada servico pode ter programa proprio de indicacao.",
    metrics: [
      { label: "Empresas ativas", value: "128", change: "Aprovadas", tone: "green" },
      { label: "Aguardando aprovacao", value: "05", change: "Pendentes", tone: "orange" },
      { label: "Servicos cadastrados", value: "312", change: "Catalogo ativo", tone: "blue" },
      { label: "Comissao media", value: "R$ 30", change: "Por servico de indicacao", tone: "violet" }
    ],
    boardTitle: "Fila de empresas",
    boardDescription: "Cadastro, aprovacao e operacao de servicos.",
    primaryItems: [
      { title: "Empresa Transporte X", subtitle: "Transfer, transporte executivo, eventos e motorista particular", meta: "Balneario Camboriu", status: "Aguardando aprovacao" },
      { title: "Empresa XPTO", subtitle: "Logo, capa, descricao e servicos publicados", meta: "Tecnologia", status: "Aprovada" },
      { title: "Empresa Clube Local", subtitle: "Oferta e beneficio vinculados ao Clubao", meta: "Parceria", status: "Ativa" },
      { title: "Studio Ventures", subtitle: "Programa premium com servico e comissao fixa", meta: "Sao Paulo", status: "Analisar" }
    ],
    secondaryTitle: "Programas de indicacao",
    secondaryItems: [
      { title: "Servico com comissao", subtitle: "Comissao por servico confirmado e validado", meta: "Indicacoes", status: "Pronto" },
      { title: "Aprovacao administrativa", subtitle: "Empresa so aparece para o usuario apos avaliacao", meta: "Controle", status: "Essencial" },
      { title: "Conexao com Clubao e campanhas", subtitle: "Empresas podem entrar em varios modulos da plataforma", meta: "Ecossistema", status: "Conectado" }
    ]
  },
  indicacoes: {
    key: "indicacoes",
    label: "Indicacoes",
    eyebrow: "Fluxo de lead a pagamento",
    title: "Nenhuma indicacao deve virar dinheiro automaticamente.",
    description:
      "O modulo acompanha a trilha completa: usuario, lead, contato, negociacao, conversao, servico realizado, comissao validada e pagamento.",
    heroNotice: "Esse modulo e central para dar confianca operacional e evitar confusao no resultado financeiro.",
    metrics: [
      { label: "Indicacoes criadas", value: "1.284", change: "Historico", tone: "blue" },
      { label: "Em atendimento", value: "146", change: "Fluxo atual", tone: "orange" },
      { label: "Convertidas", value: "318", change: "Validadas", tone: "green" },
      { label: "Aguardando pagamento", value: "41", change: "Financeiro", tone: "violet" }
    ],
    boardTitle: "Pipeline de indicacoes",
    boardDescription: "Status e regras para impedir automatismos indevidos.",
    primaryItems: [
      { title: "Transporte Executivo", subtitle: "Comissao R$ 30 apos servico confirmado", meta: "Oportunidade criada", status: "Ativa" },
      { title: "Lead Joao Silva", subtitle: "Contato realizado e cliente em negociacao", meta: "Responsavel Carla", status: "Em negociacao" },
      { title: "Lead Maria Costa", subtitle: "Servico realizado e comissao aguardando validacao", meta: "Financeiro", status: "Em validacao" },
      { title: "Lead Pedro Lima", subtitle: "Cancelado por nao conversao no prazo", meta: "Encerrado", status: "Nao convertida" }
    ],
    secondaryTitle: "Status operacionais",
    secondaryItems: [
      { title: "Nova a recebida", subtitle: "Entrada inicial e triagem do lead", meta: "Pipeline", status: "Ativo" },
      { title: "Em atendimento a convertida", subtitle: "Camada comercial antes da comissao", meta: "Pipeline", status: "Ativo" },
      { title: "Em validacao a pagamento", subtitle: "Conexao direta com financeiro", meta: "Pipeline", status: "Ativo" }
    ]
  },
  campanhas: {
    key: "campanhas",
    label: "Campanhas",
    eyebrow: "Oportunidades temporarias",
    title: "Campanhas criam urgencia, foco e movimento na plataforma.",
    description:
      "O Admin Master cria campanhas com produto, empresa, banner, periodo, publico, recompensa, materiais, limite de participantes e regras.",
    heroNotice: "Campanhas conectam produto, live, indicacao, missao, ranking e financeiro.",
    metrics: [
      { label: "Campanhas ativas", value: "18", change: "Na plataforma", tone: "green" },
      { label: "Participantes", value: "284", change: "Campanha lider", tone: "blue" },
      { label: "Cliques", value: "8.420", change: "Acumulado", tone: "orange" },
      { label: "Comissoes", value: "R$ 12.480", change: "Campanha lider", tone: "violet" }
    ],
    boardTitle: "Painel de campanhas",
    boardDescription: "Criacao, acompanhamento e inteligencia comercial.",
    primaryItems: [
      { title: "Divulgue Produto X", subtitle: "500 participantes • prazo de 10 dias", meta: "Produto", status: "Ativa" },
      { title: "Campanha de indicacao premium", subtitle: "Publico segmentado e recompensa por conversao", meta: "Indicacoes", status: "Ativa" },
      { title: "Desafio de vendas", subtitle: "Temporada com impacto em ranking e pontos", meta: "Competicao", status: "Em alta" },
      { title: "Campanha local", subtitle: "Empresa parceira com beneficio regional", meta: "Empresas", status: "Planejar" }
    ],
    secondaryTitle: "Leitura de performance",
    secondaryItems: [
      { title: "Participantes e vendas", subtitle: "Cliques, conversao, vendas e comissoes por campanha", meta: "Resultados", status: "Monitorado" },
      { title: "Materiais e regras", subtitle: "Banner, criativos e orientacao operacional", meta: "Divulgue", status: "Conectado" },
      { title: "Relacao com ranking", subtitle: "Campanhas podem interferir em pontos e premiacoes", meta: "Gamificacao", status: "Ativo" }
    ]
  },
  mentorias: {
    key: "mentorias",
    label: "Mentorias",
    eyebrow: "Gerenciamento de conteudo",
    title: "O Admin Master controla o que o usuario aprende e como isso aparece.",
    description:
      "Mentorias reúnem cadastro de titulo, thumb, capa, professor, descricao, modulos, aulas, videos e materiais em um modulo proprio de experiencia.",
    heroNotice: "Esse modulo conversa com missoes, recompensas e progresso do usuario.",
    metrics: [
      { label: "Trilhas ativas", value: "28", change: "Publicadas", tone: "blue" },
      { label: "Aulas", value: "412", change: "Biblioteca", tone: "green" },
      { label: "Rascunhos", value: "19", change: "Em producao", tone: "orange" },
      { label: "Instrutores", value: "14", change: "Equipe atual", tone: "violet" }
    ],
    boardTitle: "Fila editorial de mentorias",
    boardDescription: "O que precisa ser cadastrado, organizado ou publicado.",
    primaryItems: [
      { title: "Como criar conteudo que vende", subtitle: "Thumb forte, modulo 3 revisado e pontos por conclusao", meta: "Vendas", status: "Publicar" },
      { title: "IA para criadores", subtitle: "Curso com materiais e trilha pronta para iniciantes", meta: "IA", status: "Revisar" },
      { title: "Negocios e posicionamento", subtitle: "Turma premium com capa, professor e aulas definidas", meta: "Negocios", status: "Ativa" }
    ],
    secondaryTitle: "Estrutura do modulo",
    secondaryItems: [
      { title: "Cadastrar modulos e aulas", subtitle: "Videos, materiais e ordem pedagogica por trilha", meta: "Conteudo", status: "Pronto" },
      { title: "Conexao com banners e destaques", subtitle: "A mentoria pode ganhar destaque na Home", meta: "Home", status: "Conectado" },
      { title: "Impacto em gamificacao", subtitle: "Assistir e concluir pode disparar missoes e pontos", meta: "Missoes", status: "Ativo" }
    ]
  },
  clubao: {
    key: "clubao",
    label: "Clubao",
    eyebrow: "Beneficios e parceiros",
    title: "Ofertas, descontos e beneficios do Clubao precisam de governanca propria.",
    description:
      "O modulo administra imagem, logo, regras, validade, regioes, limite, codigo, link, parceiros e estados das ofertas do clube.",
    heroNotice: "O Clubao reforca valor percebido e retencao da base.",
    metrics: [
      { label: "Ofertas ativas", value: "46", change: "Clubao", tone: "green" },
      { label: "Parceiros", value: "21", change: "Base atual", tone: "blue" },
      { label: "Cupons", value: "14", change: "Validos", tone: "violet" },
      { label: "Expirando", value: "06", change: "Nos proximos dias", tone: "orange" }
    ],
    boardTitle: "Gestao do Clubao",
    boardDescription: "Ofertas, validade, parceiros e cobertura regional.",
    primaryItems: [
      { title: "Empresa X — 20% OFF", subtitle: "Valido ate 30/09 com limite por regiao", meta: "Oferta", status: "Ativa" },
      { title: "Clube local premium", subtitle: "Beneficio com codigo exclusivo para membros", meta: "Parceiro", status: "Ativo" },
      { title: "Cupom encerrado", subtitle: "Historico preservado para nao quebrar experiencia", meta: "Historico", status: "Encerrado" }
    ],
    secondaryTitle: "Base do Clubao",
    secondaryItems: [
      { title: "Regras e validade", subtitle: "Toda oferta precisa deixar prazo e condicoes claras", meta: "Governanca", status: "Ativo" },
      { title: "Regioes e limites", subtitle: "Controle geografico e de volume por beneficio", meta: "Operacao", status: "Pronto" },
      { title: "Conexao com empresas", subtitle: "Parceiros podem entrar no Clubao e em campanhas", meta: "Ecossistema", status: "Conectado" }
    ]
  },
  divulgue: {
    key: "divulgue",
    label: "Divulgue",
    eyebrow: "Materiais para execucao",
    title: "O Admin Master define o que o usuario recebe pronto para divulgar.",
    description:
      "Imagens, videos, banners, textos, legendas, stories, criativos e links sao administrados aqui para reduzir atrito de execucao do usuario final.",
    heroNotice: "Divulgue e um acelerador operacional para quem vende e para quem esta comecando.",
    metrics: [
      { label: "Materiais", value: "186", change: "Base ativa", tone: "blue" },
      { label: "Links", value: "94", change: "Prontos", tone: "green" },
      { label: "Videos", value: "28", change: "Curtos e verticais", tone: "orange" },
      { label: "Stories", value: "52", change: "Pacotes visuais", tone: "violet" }
    ],
    boardTitle: "Pacotes de divulgacao",
    boardDescription: "Criativos e materiais que abastecem usuario, produto e campanha.",
    primaryItems: [
      { title: "Produto X", subtitle: "Imagem, video, legenda, link e banner organizados", meta: "Kit completo", status: "Ativo" },
      { title: "Campanha local", subtitle: "Criativos regionais e CTA com QR Code", meta: "Campanha", status: "Publicada" },
      { title: "Stories para redes", subtitle: "Pacote com foco em produto visual e acao rapida", meta: "Social", status: "Ativo" }
    ],
    secondaryTitle: "Ligacoes do modulo",
    secondaryItems: [
      { title: "Produto e campanha", subtitle: "Cada material precisa apontar para sua origem correta", meta: "Comercial", status: "Conectado" },
      { title: "Link e QR Code", subtitle: "Camada operacional para facilitar a acao do usuario", meta: "Execucao", status: "Ativo" },
      { title: "Suporte ao iniciante", subtitle: "O modulo reduz muito a dificuldade de comecar a vender", meta: "UX", status: "Essencial" }
    ]
  },
  missoes: {
    key: "missoes",
    label: "Missoes",
    eyebrow: "Motor de gamificacao",
    title: "O Admin Master cria a estrutura que move frequencia e comportamento.",
    description:
      "Missoes diarias, semanais, mensais, especiais, de campanha e progressivas podem ser configuradas com regra, recompensa e taxa de conclusao.",
    heroNotice: "As missoes conectam comportamento a pontos, ranking e recompensas.",
    metrics: [
      { label: "Missoes ativas", value: "32", change: "No ecossistema", tone: "green" },
      { label: "Usuarios participantes", value: "3.842", change: "Base ativa", tone: "blue" },
      { label: "Taxa de conclusao", value: "41%", change: "Media atual", tone: "orange" },
      { label: "Pontos distribuidos", value: "182k", change: "Ciclo", tone: "violet" }
    ],
    boardTitle: "Gestao de missoes",
    boardDescription: "Criacao e acompanhamento por regra e tipo.",
    primaryItems: [
      { title: "Primeira venda", subtitle: "Regra: realizar primeira venda aprovada • recompensa 500 pontos", meta: "Progressiva", status: "Ativa" },
      { title: "10 indicacoes", subtitle: "Recompensa 1.000 pontos • campanha trimestral", meta: "Especial", status: "Ativa" },
      { title: "Assistir mentoria", subtitle: "Recompensa 100 pontos • trilha de conteudo", meta: "Diaria", status: "Ativa" }
    ],
    secondaryTitle: "Controle do modulo",
    secondaryItems: [
      { title: "Usuarios participantes", subtitle: "Visibilidade por campanha e perfil", meta: "Base", status: "Monitorado" },
      { title: "Taxa de conclusao", subtitle: "Ajuda a entender dificuldade e aderencia", meta: "Inteligencia", status: "Ativo" },
      { title: "Recompensas distribuidas", subtitle: "Pontos e premios vinculados a missao", meta: "Conexao", status: "Ativo" }
    ]
  },
  ranking: {
    key: "ranking",
    label: "Ranking",
    eyebrow: "Regras de competicao",
    title: "O Admin Master decide como o ranking funciona e o que ele premia.",
    description:
      "Vendas, indicacoes, pontos, comissao e campanhas podem virar ranking com periodo, criterios de desempate e premiacoes.",
    heroNotice: "Ranking e uma camada de motivacao que depende de criterio bem definido.",
    metrics: [
      { label: "Rankings ativos", value: "06", change: "Categorias", tone: "blue" },
      { label: "Temporadas", value: "02", change: "Em andamento", tone: "orange" },
      { label: "Premiacoes", value: "14", change: "Configuradas", tone: "green" },
      { label: "Criticos", value: "03", change: "Precisam revisao", tone: "violet" }
    ],
    boardTitle: "Configuracao de ranking",
    boardDescription: "O que esta em jogo, por quanto tempo e com qual recompensa.",
    primaryItems: [
      { title: "Ranking por vendas", subtitle: "Periodo semanal com premiacao para top 10", meta: "Comercial", status: "Ativo" },
      { title: "Ranking por indicacoes", subtitle: "Desempate por taxa de conversao valida", meta: "CRM", status: "Ativo" },
      { title: "Ranking de campanha", subtitle: "Temporada especial conectada a uma campanha", meta: "Campanhas", status: "Revisar" }
    ],
    secondaryTitle: "Regras do ranking",
    secondaryItems: [
      { title: "Periodo", subtitle: "Hoje, semana, mes ou temporada", meta: "Regra", status: "Definido" },
      { title: "Desempate", subtitle: "Volume, conversao, pontos ou criterio comercial", meta: "Regra", status: "Definido" },
      { title: "Premiacao", subtitle: "Liga ranking a recompensa e motivacao", meta: "Conexao", status: "Ativo" }
    ]
  },
  recompensas: {
    key: "recompensas",
    label: "Recompensas",
    eyebrow: "Resgate e entrega",
    title: "O que o usuario conquista precisa ser administrado como estoque, beneficio e experiencia.",
    description:
      "O Admin Master cadastra produtos, cupons, mentorias, experiencias, acesso VIP, brindes e acompanha resgatadas, entregues e canceladas.",
    heroNotice: "Recompensa com valor percebido sustenta engajamento e permanencia.",
    metrics: [
      { label: "Disponiveis", value: "64", change: "Catalogo", tone: "green" },
      { label: "Resgatadas", value: "91", change: "Historico recente", tone: "blue" },
      { label: "Entregues", value: "74", change: "Concluidas", tone: "violet" },
      { label: "Canceladas", value: "07", change: "Exigem leitura", tone: "orange" }
    ],
    boardTitle: "Catalogo administrativo",
    boardDescription: "Cadastro, estoque e rastreio de recompensa.",
    primaryItems: [
      { title: "Fone Bluetooth", subtitle: "2.500 pontos • estoque 50", meta: "Produto", status: "Disponivel" },
      { title: "Mentoria VIP", subtitle: "5.000 pontos • vagas limitadas", meta: "Experiencia", status: "Ativa" },
      { title: "Acesso Embaixador", subtitle: "10.000 pontos • acesso especial", meta: "Status", status: "Disponivel" }
    ],
    secondaryTitle: "Controle de entrega",
    secondaryItems: [
      { title: "Disponiveis e resgatadas", subtitle: "Visao do que pode ser pego e do que ja saiu", meta: "Catalogo", status: "Ativo" },
      { title: "Entregues e canceladas", subtitle: "Controle operacional pos-resgate", meta: "Operacao", status: "Ativo" },
      { title: "Conexao com ranking e missoes", subtitle: "A recompensa fecha o ciclo da gamificacao", meta: "Ecossistema", status: "Conectado" }
    ]
  },
  financeiro: {
    key: "financeiro",
    label: "Financeiro",
    eyebrow: "Modulo sensivel",
    title: "Comissoes, pagamentos, saques, ajustes e relatorios precisam de controle fino.",
    description:
      "O Admin Master controla o extrato administrativo, regras financeiras, solicitacoes de saque, aprovacoes, rejeicoes, pendencias, cancelamentos e ajustes.",
    heroNotice: "Esse modulo nao pode depender de logica critica somente no frontend.",
    metrics: [
      { label: "Comissoes", value: "R$ 42.800", change: "Geradas no ciclo", tone: "green" },
      { label: "Saques", value: "17", change: "Aguardando conferencia", tone: "orange" },
      { label: "Pagamentos", value: "R$ 96.300", change: "Ultimos 30 dias", tone: "blue" },
      { label: "Ajustes", value: "11", change: "Auditados", tone: "violet" }
    ],
    boardTitle: "Solicitacoes e extrato",
    boardDescription: "Tudo que exige leitura financeira, aprovacao e rastreio.",
    primaryItems: [
      { title: "Joao Silva", subtitle: "Solicitacao de saque R$ 450 aguardando conferencia", meta: "Saque", status: "Aprovar" },
      { title: "Maria Costa", subtitle: "Pagamento de comissao aprovado e pronto para lote", meta: "Pagamento", status: "Processar" },
      { title: "Ajuste de comissao", subtitle: "Produto com venda cancelada exigiu recalculo", meta: "Ajuste", status: "Auditado" },
      { title: "Relatorio financeiro", subtitle: "Pendencias e cancelamentos do periodo", meta: "Relatorio", status: "Gerar" }
    ],
    secondaryTitle: "Regras financeiras",
    secondaryItems: [
      { title: "Comissao e percentual", subtitle: "Configuracao por produto, campanha e indicacao", meta: "Regra", status: "Ativo" },
      { title: "Periodo de validacao e valor minimo", subtitle: "Prazos e limites para pagamentos e saque", meta: "Regra", status: "Ativo" },
      { title: "Cancelamento e prazo de pagamento", subtitle: "Fluxo completo com rastreio e justificativa", meta: "Regra", status: "Ativo" }
    ]
  },
  relatorios: {
    key: "relatorios",
    label: "Relatorios",
    eyebrow: "Inteligencia operacional",
    title: "Os dados da plataforma precisam virar leitura e decisao.",
    description:
      "Relatorios transformam usuarios, produtos, lives, indicacoes e financeiro em inteligencia para operacao, crescimento e planejamento.",
    heroNotice: "Nao basta ter dado; o admin precisa entender o que esta crescendo, caindo ou travando.",
    metrics: [
      { label: "Usuarios", value: "12.481", change: "Novos, ativos e retencao", tone: "blue" },
      { label: "Produtos", value: "347", change: "Cliques, vendas e conversao", tone: "green" },
      { label: "Lives", value: "12", change: "Duracao e vendas", tone: "orange" },
      { label: "Financeiro", value: "R$ 184.200", change: "Volume consolidado", tone: "violet" }
    ],
    boardTitle: "Modulos de relatorio",
    boardDescription: "Onde a plataforma vira inteligencia em vez de so operacao.",
    primaryItems: [
      { title: "Usuarios", subtitle: "Novos, ativos, retencao e crescimento por periodo", meta: "Base", status: "Ler" },
      { title: "Produtos", subtitle: "Mais vendidos, mais clicados e melhor conversao", meta: "Comercial", status: "Ler" },
      { title: "Lives e indicacoes", subtitle: "Espectadores, duracao, conversao e qualidade de lead", meta: "Operacao", status: "Ler" },
      { title: "Financeiro", subtitle: "Comissoes, pagamentos e pendencias consolidadas", meta: "Resultados", status: "Ler" }
    ],
    secondaryTitle: "Uso tatico",
    secondaryItems: [
      { title: "Ver gargalos", subtitle: "Aprovacoes, retencao, conversao ou pagamento", meta: "Acao", status: "Essencial" },
      { title: "Ver oportunidades", subtitle: "Categorias e modulos que mais puxam resultado", meta: "Acao", status: "Essencial" },
      { title: "Planejar campanhas", subtitle: "Usar inteligencia real na proxima rodada", meta: "Acao", status: "Essencial" }
    ]
  },
  notificacoes: {
    key: "notificacoes",
    label: "Notificacoes",
    eyebrow: "Comunicacao administrativa",
    title: "O Admin Master precisa falar com a base de forma direcionada.",
    description:
      "O modulo permite enviar notificacoes para todos, segmentos ou usuarios especificos e preparar comunicacao de campanha, produto, live e alerta interno.",
    heroNotice: "Hoje interno; depois pode expandir para e-mail e push.",
    metrics: [
      { label: "Envios hoje", value: "14", change: "Internos", tone: "green" },
      { label: "Segmentos", value: "08", change: "Listas prontas", tone: "blue" },
      { label: "Campanhas", value: "05", change: "Mensagens ligadas", tone: "orange" },
      { label: "Templates", value: "22", change: "Biblioteca", tone: "violet" }
    ],
    boardTitle: "Painel de comunicacao",
    boardDescription: "Envio, segmentacao e relacionamento com a base.",
    primaryItems: [
      { title: "Nova campanha disponivel", subtitle: "Mensagem para toda a base com CTA de participacao", meta: "Todos", status: "Enviar" },
      { title: "Usuarios de tecnologia", subtitle: "Segmento com melhor aderencia a produto especifico", meta: "Segmento", status: "Preparar" },
      { title: "Indicacao aprovada", subtitle: "Comunicacao individual com acao direta", meta: "Usuario especifico", status: "Automatizar" }
    ],
    secondaryTitle: "Camadas futuras",
    secondaryItems: [
      { title: "Notificacao interna", subtitle: "Base principal para a primeira fase", meta: "Atual", status: "Ativo" },
      { title: "E-mail e push", subtitle: "Expansao futura com eventos e templates", meta: "Roadmap", status: "Planejado" },
      { title: "Campanhas relacionadas", subtitle: "Mensagens ligadas a comportamento e oportunidade", meta: "Inteligencia", status: "Planejado" }
    ]
  },
  equipe: {
    key: "equipe",
    label: "Equipe",
    eyebrow: "Funcionarios e vendedores",
    title: "Quem opera a plataforma tambem precisa de estrutura propria.",
    description:
      "Equipe contempla funcionarios, vendedores de live, funcoes, status, permissoes, resultados e operacao ligada a vendas e audiencia.",
    heroNotice: "Equipe nao e o mesmo que administradores: pode incluir vendedores e operacao especializada.",
    metrics: [
      { label: "Funcionarios", value: "18", change: "Ativos", tone: "blue" },
      { label: "Vendedores", value: "08", change: "Em escala", tone: "green" },
      { label: "Lives realizadas", value: "42", change: "Equipe lider", tone: "orange" },
      { label: "Conversao", value: "6,1%", change: "Time comercial", tone: "violet" }
    ],
    boardTitle: "Pessoas da operacao",
    boardDescription: "Quem esta executando no bastidor e na frente comercial.",
    primaryItems: [
      { title: "Carlos", subtitle: "Vendedor de live • 42 lives realizadas • ativo", meta: "Live team", status: "Ativo" },
      { title: "Marina", subtitle: "Operacao comercial com campanhas e aprovacao", meta: "Comercial", status: "Ativa" },
      { title: "Ana", subtitle: "Conteudo e mentorias com biblioteca em expansao", meta: "Editorial", status: "Ativa" }
    ],
    secondaryTitle: "Camadas da equipe",
    secondaryItems: [
      { title: "Funcao e permissao", subtitle: "Cada pessoa precisa de escopo coerente com a operacao", meta: "Governanca", status: "Essencial" },
      { title: "Metricas por vendedor", subtitle: "Lives, vendas, espectadores e conversao", meta: "Performance", status: "Ativo" },
      { title: "Conexao com admin", subtitle: "Equipe e administradores se cruzam, mas nao sao a mesma camada", meta: "Arquitetura", status: "Correto" }
    ]
  },
  administradores: {
    key: "administradores",
    label: "Administradores",
    eyebrow: "Permissoes e escopos",
    title: "Admin Master nao pode ser igual a qualquer administrador.",
    description:
      "Aqui ficam os perfis Super Admin, Admin Financeiro, Admin Comercial, Admin Conteudo e Suporte, com escopos separados e principio do menor privilegio.",
    heroNotice: "Permissao errada vira problema operacional e de seguranca.",
    metrics: [
      { label: "Admins ativos", value: "06", change: "Base atual", tone: "blue" },
      { label: "Super Admin", value: "01", change: "Acesso total", tone: "violet" },
      { label: "Financeiro", value: "02", change: "Escopo sensivel", tone: "green" },
      { label: "Suporte", value: "03", change: "Atendimento e solicitacoes", tone: "orange" }
    ],
    boardTitle: "Perfis administrativos",
    boardDescription: "Quem pode fazer o que dentro do backoffice.",
    primaryItems: [
      { title: "Filipe Galetto", subtitle: "Super Admin • acesso total a plataforma, configuracoes estruturais e governanca", meta: "Nivel maximo", status: "Ativo", avatar: "/images/admin-filipe-galetto-01-v1.png" },
      { title: "Felipe Goulart", subtitle: "Administrador • operacao comercial, usuarios, empresas e acompanhamento geral", meta: "Acesso amplo", status: "Ativo", avatar: "/images/admin-felipe-goulart-01-v1.jpg" },
      { title: "Admin Financeiro", subtitle: "Apenas financeiro, saques, pagamentos, ajustes e relatorios", meta: "Restrito", status: "Ativo" },
      { title: "Suporte", subtitle: "Usuarios e solicitacoes com acesso reduzido", meta: "Restrito", status: "Ativo" }
    ],
    secondaryTitle: "Regras de permissao",
    secondaryItems: [
      { title: "Acesso total so para master", subtitle: "Separacao clara entre operacao e governanca total", meta: "Seguranca", status: "Obrigatorio" },
      { title: "Escopo por modulo", subtitle: "Cada admin acessa apenas o que precisa administrar", meta: "Regra", status: "Definido" },
      { title: "Conexao com auditoria", subtitle: "Toda acao sensivel precisa ser rastreada", meta: "Logs", status: "Ativo" }
    ]
  },
  auditoria: {
    key: "auditoria",
    label: "Auditoria",
    eyebrow: "Logs obrigatorios",
    title: "Toda acao importante precisa deixar rastro.",
    description:
      "Alteracoes de comissao, bloqueio de usuario, aprovacao de empresa, mudanca de permissao e operacoes sensiveis entram em logs com antes, depois, IP, data e resultado.",
    heroNotice: "Auditoria protege a operacao, a equipe e a plataforma.",
    metrics: [
      { label: "Logs hoje", value: "382", change: "Acoes registradas", tone: "green" },
      { label: "Sensíveis", value: "41", change: "Com alto impacto", tone: "orange" },
      { label: "Admins ativos", value: "06", change: "Em rastreio", tone: "blue" },
      { label: "Falhas", value: "02", change: "Revisar", tone: "violet" }
    ],
    boardTitle: "Linha de auditoria",
    boardDescription: "O que foi alterado, por quem, quando e com qual resultado.",
    primaryItems: [
      { title: "08/09/2026 09:42 — Super Admin", subtitle: "Alterou comissao do Produto X de 15% para 20%", meta: "IP registrado", status: "Sucesso" },
      { title: "08/09/2026 10:18 — Suporte", subtitle: "Usuario Joao foi bloqueado apos denuncia analisada", meta: "Conta", status: "Sucesso" },
      { title: "08/09/2026 11:03 — Admin Comercial", subtitle: "Empresa X foi aprovada e publicada no diretório", meta: "Empresas", status: "Sucesso" },
      { title: "08/09/2026 12:27 — Admin Financeiro", subtitle: "Saque rejeitado por divergencia de documentacao", meta: "Financeiro", status: "Revisar" }
    ],
    secondaryTitle: "Campos obrigatorios",
    secondaryItems: [
      { title: "Antes e depois", subtitle: "Mudanca precisa mostrar valor anterior e novo valor", meta: "Comparacao", status: "Obrigatorio" },
      { title: "IP e resultado", subtitle: "A acao precisa deixar contexto tecnico minimo", meta: "Rastreio", status: "Obrigatorio" },
      { title: "Usuario administrador", subtitle: "Quem executou a acao e parte central do log", meta: "Identidade", status: "Obrigatorio" }
    ]
  },
  configuracoes: {
    key: "configuracoes",
    label: "Configuracoes",
    eyebrow: "Regras gerais da plataforma",
    title: "Plataforma, usuarios, financeiro, seguranca e templates precisam de um centro de configuracao.",
    description:
      "Configuracoes gerais controlam nome, logo, identidade, regras de cadastro, niveis, saques, validacao, templates, eventos, sessoes e politicas da plataforma.",
    heroNotice: "Configuracao errada pode afetar toda a operacao, entao esse modulo precisa ser tratado com cuidado.",
    metrics: [
      { label: "Blocos", value: "05", change: "Plataforma a seguranca", tone: "blue" },
      { label: "Templates", value: "22", change: "Notificacoes e eventos", tone: "green" },
      { label: "Permissoes", value: "14", change: "Perfis e niveis", tone: "violet" },
      { label: "Alertas", value: "03", change: "Revisao recomendada", tone: "orange" }
    ],
    boardTitle: "Configuracoes gerais",
    boardDescription: "Tudo o que molda comportamento e identidade da plataforma.",
    primaryItems: [
      { title: "Plataforma", subtitle: "Nome, logo, favicon e identidade visual", meta: "Branding", status: "Ativo" },
      { title: "Usuarios", subtitle: "Regras de cadastro, niveis e permissoes gerais", meta: "Base", status: "Ativo" },
      { title: "Financeiro", subtitle: "Comissao, saque, validacao e prazo de pagamento", meta: "Regra", status: "Ativo" },
      { title: "Seguranca", subtitle: "Sessoes, autenticacao, permissoes e logs", meta: "Seguranca", status: "Ativo" }
    ],
    secondaryTitle: "Camadas ligadas",
    secondaryItems: [
      { title: "Templates e eventos", subtitle: "Base para notificacoes e automacoes futuras", meta: "Comunicacao", status: "Pronto" },
      { title: "Logs e permissoes", subtitle: "Seguranca precisa conversar com auditoria e administradores", meta: "Governanca", status: "Conectado" },
      { title: "Base estrutural", subtitle: "Mudancas aqui afetam quase todos os modulos do sistema", meta: "Arquitetura", status: "Critico" }
    ]
  }
};
