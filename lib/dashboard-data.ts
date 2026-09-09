import { productCatalog, productCatalogFilters } from "@/lib/product-catalog";
import { companyCatalog } from "@/lib/company-catalog";
import { supplierListCatalog } from "@/lib/supplier-list-catalog";

export type SectionKey =
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
  | "sorteios"
  | "minha-renda"
  | "desempenho"
  | "notificacoes"
  | "perfil";

export type IconName =
  | "home"
  | "live"
  | "box"
  | "cap"
  | "gift"
  | "building"
  | "list"
  | "users"
  | "rocket"
  | "megaphone"
  | "share"
  | "target"
  | "trophy"
  | "sparkles"
  | "wallet"
  | "grid"
  | "bell"
  | "profile";

export interface NavItem {
  key: SectionKey;
  label: string;
  icon: IconName;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface HeroMetric {
  label: string;
  value: string;
  detail: string;
  tone: "blue" | "green" | "orange" | "violet";
}

export interface MediaCardData {
  eyebrow: string;
  title: string;
  subtitle: string;
  meta: string;
  badge: string;
  accent: "blue" | "green" | "orange" | "violet";
  image: string;
  logo?: string;
  coverFit?: "cover" | "contain";
  cta: string;
  href?: string;
  ctaHref?: string;
  mentorName?: string;
  mentorAvatar?: string;
  moduleCount?: number;
  lessonCount?: number;
  duration?: string;
  level?: string;
  progressPercent?: number;
  progressLabel?: string;
  facts: string[];
  chips: string[];
}

export interface FeedItem {
  title: string;
  detail: string;
  meta: string;
}

export interface InsightItem {
  label: string;
  value: string;
  tone: "blue" | "green" | "orange" | "violet";
}

export interface SectionConfig {
  key: SectionKey;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  heroTag: string;
  heroNotice: string;
  heroImage: string;
  heroActionLabel: string;
  heroActionHref: string;
  heroSecondaryActionLabel?: string;
  heroSecondaryActionHref?: string;
  metrics: HeroMetric[];
  spotlightTitle: string;
  spotlightDescription: string;
  filters: string[];
  cards: MediaCardData[];
  feedTitle: string;
  feed: FeedItem[];
  insightTitle: string;
  insights: InsightItem[];
  systemTitle: string;
  systemPoints: string[];
}

const countMenuLetters = (label: string) =>
  label
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z]/g, "").length;

const sortNavItemsByLabelLength = (items: NavItem[]) =>
  [...items].sort((a, b) => {
    const labelLengthDifference = countMenuLetters(a.label) - countMenuLetters(b.label);

    if (labelLengthDifference !== 0) {
      return labelLengthDifference;
    }

    return a.label.localeCompare(b.label, "pt-BR");
  });

const image = (prompt: string, imageSize = "landscape_16_9") =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt
  )}&image_size=${imageSize}`;

const card = (
  eyebrow: string,
  title: string,
  subtitle: string,
  meta: string,
  badge: string,
  accent: MediaCardData["accent"],
  prompt: string,
  cta: string,
  facts: string[],
  chips: string[]
): MediaCardData => ({
  eyebrow,
  title,
  subtitle,
  meta,
  badge,
  accent,
  image: image(prompt),
  cta,
  facts,
  chips
});

const companyCard = (
  company: (typeof companyCatalog)[number]
): MediaCardData => ({
  eyebrow: `Categoria ${company.category}`,
  title: company.name,
  subtitle: company.summary,
  meta: `${company.city} • ${company.type}`,
  badge: company.badge,
  accent: company.accent,
  image: company.logo,
  coverFit: "contain",
  cta: "Ver empresa",
  href: `/detalhes/empresas/${company.slug}`,
  ctaHref: `/detalhes/empresas/${company.slug}`,
  facts: company.facts,
  chips: company.chips
});

const productCard = (product: (typeof productCatalog)[number]): MediaCardData => ({
  eyebrow: `Categoria ${product.category}`,
  title: product.title,
  subtitle: product.summary,
  meta: `Preço ${product.price} • comissão ${product.commissionRate}`,
  badge: product.badge,
  accent: product.accent,
  image: product.image,
  coverFit: "contain",
  cta: product.ctaLabel,
  href: `/detalhes/produtos/${product.slug}`,
  ctaHref: `/detalhes/produtos/${product.slug}`,
  facts: product.facts,
  chips: product.chips
});

const mentorshipCard = ({
  category,
  title,
  summary,
  badge,
  accent,
  coverPrompt,
  cta,
  mentorName,
  mentorAvatar,
  moduleCount,
  lessonCount,
  duration,
  level,
  progressPercent,
  progressLabel,
  chips
}: {
  category: string;
  title: string;
  summary: string;
  badge: string;
  accent: MediaCardData["accent"];
  coverPrompt: string;
  cta: string;
  mentorName: string;
  mentorAvatar: string;
  moduleCount: number;
  lessonCount: number;
  duration: string;
  level: string;
  progressPercent?: number;
  progressLabel?: string;
  chips: string[];
}): MediaCardData => ({
  eyebrow: category,
  title,
  subtitle: summary,
  meta: `${duration} • ${level}`,
  badge,
  accent,
  image: image(coverPrompt),
  cta,
  ctaHref: "/detalhes/mentorias",
  mentorName,
  mentorAvatar,
  moduleCount,
  lessonCount,
  duration,
  level,
  progressPercent,
  progressLabel,
  facts: [
    `${moduleCount} módulos`,
    `${lessonCount} aulas`,
    `Nível ${level.toLowerCase()}`,
    progressPercent ? `${progressPercent}% concluído` : "Ainda não iniciada"
  ],
  chips
});

const supplierListCard = (list: (typeof supplierListCatalog)[number]): MediaCardData => ({
  eyebrow: "Tipo de lista",
  title: list.title,
  subtitle: list.subtitle,
  meta: list.meta,
  badge: list.badge,
  accent: "blue",
  image: image(list.prompt),
  cta: "Ver lista",
  facts: list.facts,
  chips: list.chips
});

export const navGroups: NavGroup[] = [
  {
    label: "Explorar",
    items: sortNavItemsByLabelLength([
      { key: "home", label: "Home", icon: "home" },
      { key: "lives", label: "Lives", icon: "live" },
      { key: "produtos", label: "Produtos", icon: "box" },
      { key: "mentorias", label: "Mentorias", icon: "cap" },
      { key: "clubao", label: "Clubão", icon: "gift" },
      { key: "empresas", label: "Empresas", icon: "building" },
      { key: "listas", label: "Listas", icon: "list" },
      { key: "indicacoes", label: "Indicações", icon: "users" }
    ])
  },
  {
    label: "Ganhe",
    items: sortNavItemsByLabelLength([
      { key: "oportunidades", label: "Oportunidades", icon: "rocket" },
      { key: "campanhas", label: "Campanhas", icon: "megaphone" }
    ])
  },
  {
    label: "Conquiste",
    items: sortNavItemsByLabelLength([
      { key: "ranking", label: "Ranking", icon: "trophy" },
      { key: "sorteios", label: "Sorteios", icon: "gift" }
    ])
  },
  {
    label: "Seus resultados",
    items: sortNavItemsByLabelLength([
      { key: "minha-renda", label: "Minha renda", icon: "wallet" },
      { key: "desempenho", label: "Desempenho", icon: "grid" }
    ])
  },
  {
    label: "Conta",
    items: sortNavItemsByLabelLength([
      { key: "notificacoes", label: "Notificações", icon: "bell" },
      { key: "perfil", label: "Meu perfil", icon: "profile" }
    ])
  }
];

export const sectionOrder: SectionKey[] = navGroups.flatMap((group) => group.items.map((item) => item.key));

const commonSystemPoints = [
  "A arquitetura da área do cliente segue o ciclo Descobrir → Aprender → Executar → Ganhar → Evoluir.",
  "Todas as telas usam dados fictícios realistas e imagens configuráveis para o protótipo.",
  "Estrutura pronta para backend desacoplado, regras administrativas e futura conexão com Supabase.",
  "A navegação foi reorganizada em grupos para evitar uma sidebar solta e sem fluxo."
];

export const dashboardSections: Record<SectionKey, SectionConfig> = {
  home: {
    key: "home",
    label: "Home",
    eyebrow: "Centro de comando",
    title: "Bom dia, Felipe. Descubra novas formas de ganhar hoje.",
    description:
      "A Home agora responde o que você pode fazer agora: assistir, aprender, divulgar, indicar, vender, cumprir missões e evoluir dentro da plataforma.",
    heroTag: "12 oportunidades disponíveis",
    heroNotice: "Banner configurável pelo administrador para campanha, produto, Live, mentoria ou desafio.",
    heroImage: "/images/home-hero-real-v2.jpg",
    heroActionLabel: "Ver oportunidades",
    heroActionHref: "/oportunidades",
    metrics: [
      { label: "Receita validada", value: "R$ 18.420", detail: "Resultado gerado", tone: "green" },
      { label: "Saldo disponível", value: "R$ 2.840", detail: "Pronto para uso", tone: "blue" },
      { label: "Pendências", value: "R$ 1.260", detail: "Em validação", tone: "orange" },
      { label: "Lives ao vivo", value: "03", detail: "Acontecendo agora", tone: "violet" }
    ],
    spotlightTitle: "O que está acontecendo agora",
    spotlightDescription:
      "Uma leitura rápida de Lives ao vivo, produtos em alta, missões disponíveis, ofertas do Clubão e oportunidades de indicação.",
    filters: ["Lives", "Produtos", "Missões", "Clubão", "Indicações"],
    cards: [
      card(
        "Live ao vivo",
        "Oferta especial de hoje",
        "Smartwatch X com comissão ativa",
        "Marcos Silva • 1.248 assistindo agora",
        "Ao vivo",
        "orange",
        "live commerce presenter showing smartwatch product, premium studio, realistic creator economy scene",
        "Assistir",
        ["Produto apresentado na live", "CTA para assistir agora", "Possibilidade de divulgar depois"],
        ["Live", "Ao vivo", "Produto"]
      ),
      card(
        "Produto em alta",
        "Fone Bluetooth Pro",
        "Você recebe R$ 25,98 por venda aprovada",
        "Preço R$ 129,90 • comissão 20%",
        "Em alta",
        "green",
        "premium bluetooth headphone product card, e-commerce hero image, clean bright background, realistic",
        "Quero me afiliar",
        ["Produto recomendado para redes sociais", "Bom histórico de conversão", "Criativos já disponíveis"],
        ["Produto", "Afiliado", "Comissão"]
      ),
      card(
        "Continue de onde parou",
        "Como criar conteúdo que vende",
        "64% concluído",
        "Mentoria com progresso salvo e pontos por conclusão",
        "Continuar",
        "violet",
        "online mentorship course cover, creator teaching content strategy, premium educational thumbnail, realistic",
        "Continuar",
        ["Trilha em andamento", "Gamificação conectada", "Nova conquista ao concluir"],
        ["Mentoria", "Progresso", "Aprender"]
      )
    ],
    feedTitle: "Sua próxima oportunidade",
    feed: [
      {
        title: "3 novos produtos de tecnologia para o seu público",
        detail: "Você já performou bem nessa categoria. O sistema destacou novas ofertas com maior chance de conversão.",
        meta: "Recomendação da plataforma"
      },
      {
        title: "Missão quase concluída",
        detail: "Falta 1 venda para liberar pontos extras e reforçar sua posição no ranking.",
        meta: "Gamificação"
      },
      {
        title: "Campanha com alta aderência",
        detail: "Uma ação de conteúdo está aberta e combina com seu perfil atual de divulgação.",
        meta: "Campanhas"
      }
    ],
    insightTitle: "Leituras rápidas",
    insights: [
      { label: "Melhor frente hoje", value: "Tecnologia + Lives", tone: "green" },
      { label: "Continue assistindo", value: "Conteúdo que vende", tone: "blue" },
      { label: "Próxima ação", value: "Abrir Oportunidades", tone: "orange" },
      { label: "Meta do dia", value: "1 venda + 1 indicação", tone: "violet" }
    ],
    systemTitle: "Arquitetura da Home",
    systemPoints: [
      "A Home não funciona como carteira, e sim como ponto de ação e descoberta.",
      "Destaques do hero podem ser definidos pelo administrador.",
      "O bloco Continue de onde parou conecta mentorias com missões e recompensas.",
      ...commonSystemPoints
    ]
  },
  lives: {
    key: "lives",
    label: "Lives",
    eyebrow: "Live commerce",
    title: "Assista, descubra produtos e encontre novas oportunidades.",
    description:
      "Área visual inspirada em Live Commerce, com lives ao vivo, programação, produto apresentado, vendedor e camadas preparadas para provedores internos e externos.",
    heroTag: "Ao vivo agora",
    heroNotice: "A plataforma deve suportar Live interna e, no futuro, provedores externos via API oficial, sem scraping.",
    heroImage: "/images/lives-hero-real-v2.jpg",
    heroActionLabel: "Ver programação",
    heroActionHref: "/detalhes/lives",
    metrics: [
      { label: "Ao vivo agora", value: "03", detail: "Lives ativas", tone: "orange" },
      { label: "Próximas", value: "07", detail: "Agenda confirmada", tone: "blue" },
      { label: "Mais assistida", value: "1.248", detail: "Espectadores", tone: "green" },
      { label: "Produtos vinculados", value: "14", detail: "Live commerce", tone: "violet" }
    ],
    spotlightTitle: "Agora ao vivo",
    spotlightDescription:
      "Cards grandes, visuais e orientados à conversão, com thumbnail, vendedor, produto, espectadores e ações rápidas.",
    filters: ["Ao vivo agora", "Próximas", "Em alta", "Mais assistidas", "Produtos", "Categorias"],
    cards: [
      {
        ...card(
          "Vendedor Marcos Silva",
          "Oferta especial de hoje",
          "Smartwatch X com demonstração ao vivo",
          "1.248 assistindo • categoria tecnologia",
          "Ao vivo",
          "orange",
          "male live seller presenting smartwatch in a streaming studio, realistic commerce setup",
          "Assistir",
          ["Produto lateral com comissão de R$ 39,98", "Curtir, compartilhar e seguir vendedor", "Botão para lembrar próximas lives"],
          ["Live", "Produto", "Conversão"]
        ),
        image: "/images/lives-card-01-v1.jpg"
      },
      {
        ...card(
          "Apresentadora Julia Costa",
          "Hoje 18:30 — Fone Bluetooth em destaque",
          "Live focada em demonstração, áudio e criativos prontos",
          "Lembrete ativável com CTA direto",
          "Hoje 18:30",
          "blue",
          "online creator live event banner, countdown style, modern and realistic",
          "Lembrar-me",
          ["Agenda com hoje e amanhã", "Produto associado", "Vendedor definido"],
          ["Agenda", "Reminder", "Live"]
        ),
        image: "/images/lives-card-02-v1.jpg"
      },
      {
        ...card(
          "Showcase premium",
          "Kit executivo FG EXACTA ao vivo",
          "Apresentação visual para oferta premium e posicionamento",
          "Produto principal em foco • pacote visual de alto valor",
          "Destaque",
          "violet",
          "replay cover for commerce live class, premium content platform, realistic thumbnail",
          "Ver detalhes",
          ["Boa leitura para oferta premium", "Conecta com Produtos e Campanhas", "CTA para entrar na live ou rever resumo"],
          ["Premium", "Produto", "Showcase"]
        ),
        image: "/images/lives-card-03-v1.jpg"
      },
      {
        ...card(
          "Demonstração guiada",
          "Rotina beauty com prova social ao vivo",
          "Apresentação prática com host e produto lado a lado",
          "Formato ideal para explicação rápida e conversão visual",
          "Em alta",
          "green",
          "beauty tutorial live cover with host and premium skincare product, realistic",
          "Assistir agora",
          ["Host em destaque com produto visível", "Bom para lives de demonstração", "Permite CTA para oferta e replay"],
          ["Beauty", "Tutorial", "Live"]
        ),
        image: "/images/lives-card-04-v1.jpg"
      },
      {
        ...card(
          "Lifestyle ao vivo",
          "Acessórios premium com abordagem consultiva",
          "Live com host, styling e itens de alto valor percebido",
          "Bom para continuar aprendendo e aplicar nos materiais do produto",
          "Replay",
          "blue",
          "lifestyle live cover with host and premium accessories, realistic commerce thumbnail",
          "Ver replay",
          ["Conecta aprender com executar", "Serve de base para campanhas", "CTA para ver produto e materiais"],
          ["Replay", "Lifestyle", "Ação"]
        ),
        image: "/images/lives-card-05-v1.jpg"
      }
    ],
    feedTitle: "Próximas Lives",
    feed: [
      { title: "Hoje 14:00", detail: "Demonstração de produto para iniciantes.", meta: "Lembrar-me" },
      { title: "Hoje 18:30", detail: "Oferta especial com foco em conversão ao vivo.", meta: "Lembrar-me" },
      { title: "Amanhã 12:00", detail: "Sessão de perguntas com destaque para afiliados.", meta: "Lembrar-me" }
    ],
    insightTitle: "Camada de integração",
    insights: [
      { label: "Provider atual", value: "Live interna", tone: "green" },
      { label: "Futuro", value: "API oficial externa", tone: "blue" },
      { label: "Restrição", value: "Sem scraping", tone: "orange" },
      { label: "Objetivo", value: "Live commerce", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Lives",
    systemPoints: [
      "A interface pode lembrar Live Commerce sem depender de embutir qualquer live externa.",
      "O produto apresentado deve aparecer ao lado da transmissão com preço e comissão.",
      "Próximas Lives precisam de lembrete e contexto de agenda.",
      ...commonSystemPoints
    ]
  },
  produtos: {
    key: "produtos",
    label: "Produtos",
    eyebrow: "O que posso vender?",
    title: "Produtos para você vender",
    description:
      "Escolha produtos, acesse os materiais e acompanhe seus resultados. A área foi pensada para o usuário entrar e entender o que divulgar agora.",
    heroTag: "Marketplace interno",
    heroNotice: "Depois da afiliação, o usuário passa a ver link, desempenho e materiais para compartilhar.",
    heroImage: "/images/produtos-hero-real-v2.png",
    heroActionLabel: "Ver produtos recomendados",
    heroActionHref: "/detalhes/produtos",
    heroSecondaryActionLabel: "Ver todos os produtos",
    heroSecondaryActionHref: "/produtos?catalogo=aberto#catalogo-produtos",
    metrics: [
      { label: "Produtos ativos", value: "05", detail: "Prontos para afiliação", tone: "blue" },
      { label: "Maior comissão", value: "50%", detail: "Campanha destaque", tone: "green" },
      { label: "Cliques no mês", value: "1.284", detail: "Nos seus links", tone: "violet" },
      { label: "Conversão média", value: "5,9%", detail: "Seu desempenho", tone: "orange" }
    ],
    spotlightTitle: "Categorias visuais",
    spotlightDescription:
      "Em alta, maior comissão, novos, recomendados, para redes sociais, ofertas e produtos com bom encaixe para o perfil do usuário.",
    filters: productCatalogFilters.slice(1, 7),
    cards: productCatalog.map(productCard),
    feedTitle: "Antes de se afiliar",
    feed: [
      { title: "Abra o detalhe do produto", detail: "Cada item agora tem uma página própria com comissão, condições e contexto comercial.", meta: "Detalhe individual" },
      { title: "Entenda quanto vai receber", detail: "Preço, percentual, valor estimado e fluxo de validação aparecem antes da afiliação.", meta: "Comissão clara" },
      { title: "Receba seu link na etapa certa", detail: "O link de afiliação só é liberado dentro da página de detalhes do produto.", meta: "Afiliação" }
    ],
    insightTitle: "Leitura comercial",
    insights: [
      { label: "Melhor categoria", value: "Tecnologia", tone: "green" },
      { label: "Melhor origem", value: "Stories", tone: "blue" },
      { label: "Próxima ação", value: "Abrir detalhe do produto", tone: "orange" },
      { label: "Conexão", value: "Desempenho", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Produtos",
    systemPoints: [
      "Produto precisa ter página própria com galeria, descrição, preço, comissão, percentual, vendedor e condições.",
      "O link de afiliação só deve aparecer dentro da página de detalhes do produto.",
      "O desempenho do produto precisa conversar com a área de resultados.",
      ...commonSystemPoints
    ]
  },
  mentorias: {
    key: "mentorias",
    label: "Mentorias",
    eyebrow: "Aprender",
    title: "Aprenda com quem faz.",
    description:
      "Uma vitrine visual de mentorias para aprender com quem está no jogo, evoluir com mais clareza e transformar conteúdo em execução.",
    heroTag: "Continue aprendendo",
    heroNotice: "Ao concluir aulas e trilhas, o usuário soma pontos, desbloqueia missões e aproxima recompensas.",
    heroImage: "/images/mentorias-hero-real-v2.png",
    heroActionLabel: "Conhecer cursos",
    heroActionHref: "/detalhes/mentorias",
    metrics: [
      { label: "Em andamento", value: "03", detail: "Trilhas ativas", tone: "violet" },
      { label: "Concluído", value: "64%", detail: "Seu progresso atual", tone: "green" },
      { label: "Pontos previstos", value: "+100", detail: "Ao concluir módulo", tone: "blue" },
      { label: "Trilhas", value: "06", detail: "Disponíveis", tone: "orange" }
    ],
    spotlightTitle: "Biblioteca de mentorias",
    spotlightDescription:
      "Explore uma biblioteca mais visual, com filtros, progresso, instrutores e trilhas para vendas, marketing, IA, conteúdo e negócios.",
    filters: ["Vendas", "Marketing", "IA", "Conteúdo", "Negócios"],
    cards: [
      mentorshipCard({
        category: "Vendas",
        title: "Como criar conteúdo que vende",
        summary: "Trilha prática para estruturar ofertas, melhorar argumentação e transformar conteúdo em vendas com mais consistência.",
        badge: "Em andamento",
        accent: "blue",
        coverPrompt:
          "premium online course cover about sales content strategy, brazilian mentor studio, dark blue gradients, cinematic 16:9",
        cta: "Continuar",
        mentorName: "Filipe Galetto",
        mentorAvatar: "/images/admin-filipe-galetto-01-v1.png",
        moduleCount: 8,
        lessonCount: 24,
        duration: "4h 20min",
        level: "Intermediário",
        progressPercent: 80,
        progressLabel: "80% concluído",
        chips: ["Vendas", "Conteúdo", "Execução"]
      }),
      mentorshipCard({
        category: "IA",
        title: "IA para criadores",
        summary: "Aprenda a usar IA para acelerar criação, organizar roteiro, aumentar volume de conteúdo e executar mais rápido.",
        badge: "Em destaque",
        accent: "violet",
        coverPrompt:
          "premium educational course cover for AI creators, futuristic interface, studio lighting, cinematic 16:9",
        cta: "Começar",
        mentorName: "Felipe Goulart",
        mentorAvatar: "/images/admin-felipe-goulart-01-v1.jpg",
        moduleCount: 6,
        lessonCount: 18,
        duration: "3h 10min",
        level: "Prático",
        chips: ["IA", "Criadores", "Produtividade"]
      }),
      mentorshipCard({
        category: "Marketing",
        title: "Marketing que gera procura",
        summary: "Posicionamento, campanhas, criativos e leitura de mercado para gerar procura mais qualificada nos canais certos.",
        badge: "Em andamento",
        accent: "green",
        coverPrompt:
          "premium marketing mentorship cover, social media analytics, luxury saas learning card, cinematic 16:9",
        cta: "Continuar",
        mentorName: "Felipe Goulart",
        mentorAvatar: "/images/admin-felipe-goulart-02-v1.jpg",
        moduleCount: 7,
        lessonCount: 20,
        duration: "3h 45min",
        level: "Intermediário",
        progressPercent: 42,
        progressLabel: "42% concluído",
        chips: ["Marketing", "Campanhas", "Performance"]
      }),
      mentorshipCard({
        category: "Conteúdo",
        title: "Conteúdo com presença e autoridade",
        summary: "Biblioteca com visão editorial, presença digital e construção de autoridade para quem quer vender sem parecer genérico.",
        badge: "Nova mentoria",
        accent: "orange",
        coverPrompt:
          "premium course cover for content authority and branding, creator workspace, modern member platform, 16:9",
        cta: "Começar",
        mentorName: "Filipe Galetto",
        mentorAvatar: "/images/admin-filipe-galetto-03-v1.png",
        moduleCount: 5,
        lessonCount: 16,
        duration: "2h 55min",
        level: "Essencial",
        chips: ["Conteúdo", "Marca", "Autoridade"]
      }),
      mentorshipCard({
        category: "Negócios",
        title: "Negócios e posicionamento",
        summary: "Leitura comercial, valor percebido, posicionamento e clareza para escalar sem depender de improviso.",
        badge: "Recomendada",
        accent: "blue",
        coverPrompt:
          "premium business positioning course cover, executive mentor, dark sleek ui, modern education platform, 16:9",
        cta: "Ver mentoria",
        mentorName: "Filipe Galetto",
        mentorAvatar: "/images/admin-filipe-galetto-02-v1.png",
        moduleCount: 9,
        lessonCount: 27,
        duration: "5h 05min",
        level: "Intermediário",
        progressPercent: 15,
        progressLabel: "15% concluído",
        chips: ["Negócios", "Posicionamento", "Escala"]
      }),
      mentorshipCard({
        category: "Vendas",
        title: "Fechamento e rotina comercial",
        summary: "Trilha para acelerar fechamento, organizar rotina e construir previsibilidade na operação comercial do dia a dia.",
        badge: "Nova mentoria",
        accent: "green",
        coverPrompt:
          "premium sales closing mentorship cover, modern digital education library, confident mentor, cinematic 16:9",
        cta: "Começar",
        mentorName: "Felipe Goulart",
        mentorAvatar: "/images/admin-felipe-goulart-03-v1.png",
        moduleCount: 6,
        lessonCount: 19,
        duration: "3h 25min",
        level: "Prático",
        chips: ["Vendas", "Rotina", "Fechamento"]
      })
    ],
    feedTitle: "Gamificação conectada",
    feed: [
      { title: "Missão concluída ao terminar módulo", detail: "Ganhe +100 pontos e aproxime-se da próxima recompensa.", meta: "Missões" },
      { title: "Nova conquista desbloqueada", detail: "Seu histórico de aprendizado agora aparece no perfil.", meta: "Perfil" },
      { title: "Próxima aula sugerida", detail: "A plataforma pode priorizar trilhas alinhadas ao seu melhor desempenho.", meta: "Evoluir" }
    ],
    insightTitle: "Leitura de evolução",
    insights: [
      { label: "Próximo módulo", value: "Oferta e conversão", tone: "green" },
      { label: "Pilar atual", value: "Aprender", tone: "blue" },
      { label: "Impacto", value: "Melhora execução", tone: "orange" },
      { label: "Conexão", value: "Missões", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Mentorias",
    systemPoints: [
      "A página precisa ser dominada por thumbnails e não por blocos muito textuais.",
      "Cada mentoria deve ter capa, instrutor, descrição, duração, nível, progresso e módulos.",
      "Ao concluir, o sistema deve conversar com pontos, missões, ranking e recompensas.",
      ...commonSystemPoints
    ]
  },
  clubao: {
    key: "clubao",
    label: "Clubão",
    eyebrow: "Clube exclusivo",
    title: "Bem-vindo ao Clubão",
    description: "Ofertas, descontos e vantagens exclusivas, com cara de clube premium e não de simples catálogo.",
    heroTag: "Benefícios e acesso",
    heroNotice: "Ofertas encerradas não desaparecem: elas mudam de estado para manter histórico e evitar links quebrados.",
    heroImage: "/images/clubao-hero-real.jpg",
    heroActionLabel: "Ver benefícios",
    heroActionHref: "/detalhes/clubao",
    metrics: [
      { label: "Ofertas ativas", value: "18", detail: "Disponíveis agora", tone: "green" },
      { label: "Descontos", value: "20%", detail: "Faixa média", tone: "blue" },
      { label: "Exclusivos", value: "06", detail: "Só para membros", tone: "violet" },
      { label: "Encerradas", value: "03", detail: "Histórico mantido", tone: "orange" }
    ],
    spotlightTitle: "Categorias do Clubão",
    spotlightDescription: "Ofertas, descontos, benefícios, exclusivos e o que está perto de você.",
    filters: ["Ofertas", "Descontos", "Benefícios", "Exclusivos", "Perto de você"],
    cards: [
      {
        ...card(
          "Barbearia parceira",
          "Corte premium + acabamento exclusivo",
          "Benefício para membros com atendimento diferenciado e ambiente premium",
          "Ativação local • agendamento com vantagem exclusiva",
          "Exclusivo",
          "green",
          "premium barber club benefit offer, realistic lifestyle",
          "Ver benefício",
          ["Página da oferta com regras", "Botão ativar benefício", "Validade e unidade participante"],
          ["Clubão", "Barbearia", "Benefício"]
        ),
        image: "/images/clubao-card-01-real-v1.png"
      },
      {
        ...card(
          "Studio parceiro",
          "Pilates com condição especial para membros",
          "Benefício focado em bem-estar, rotina saudável e percepção premium",
          "Plano com desconto • uso recorrente • local parceiro",
          "20% OFF",
          "blue",
          "pilates premium club benefit, realistic wellness studio",
          "Ativar benefício",
          ["Descrição curta e clara", "Condição exclusiva para membros", "Localização e regras visíveis"],
          ["Saúde", "Bem-estar", "Desconto"]
        ),
        image: "/images/clubao-card-02-real-v1.png"
      },
      {
        ...card(
          "Resort & Spa",
          "Day spa com experiência premium",
          "Oferta de relaxamento com alto valor percebido e comunicação aspiracional",
          "Reserva antecipada • datas elegíveis • benefício premium",
          "Premium",
          "violet",
          "premium resort spa club benefit, realistic travel wellness offer",
          "Reservar agora",
          ["Boa leitura para campanhas de valor", "Serve como destaque aspiracional", "Regras e disponibilidade na página da oferta"],
          ["Spa", "Viagem", "Premium"]
        ),
        image: "/images/clubao-card-03-real-v1.png"
      },
      {
        ...card(
          "Produtividade",
          "Workspace premium com vantagem para membros",
          "Benefício pensado para rotina profissional, foco e conveniência",
          "Uso profissional • reserva simplificada • benefício ativo",
          "Benefício",
          "orange",
          "premium workspace club benefit, elegant business interior, realistic",
          "Usar benefício",
          ["Conecta Clubão com rotina de trabalho", "Valor percebido para retenção", "Página própria com instruções de ativação"],
          ["Workspace", "Rotina", "Membros"]
        ),
        image: "/images/clubao-card-04-real-v1.png"
      }
    ],
    feedTitle: "Clubão agora",
    feed: [
      { title: "Novo benefício liberado", detail: "Oferta exclusiva para membros anuais entrou no ar.", meta: "Hoje" },
      { title: "Oferta perto de você", detail: "Desconto local priorizado pela sua cidade cadastrada.", meta: "Geolocalização futura" },
      { title: "Próximo passo", detail: "Usar benefícios pode virar argumento para retenção e indicação.", meta: "Valor percebido" }
    ],
    insightTitle: "Leituras rápidas",
    insights: [
      { label: "Tom da área", value: "Clube premium", tone: "green" },
      { label: "Destaque", value: "Benefícios vivos", tone: "blue" },
      { label: "Cuidado", value: "Não parecer catálogo", tone: "orange" },
      { label: "Conexão", value: "Retenção", tone: "violet" }
    ],
    systemTitle: "Arquitetura do Clubão",
    systemPoints: [
      "O Clubão deve comunicar pertencimento, benefício e valor exclusivo.",
      "As ofertas precisam ter página própria com regras, validade, local, código e link.",
      "Ofertas encerradas devem virar histórico e não sumir.",
      ...commonSystemPoints
    ]
  },
  empresas: {
    key: "empresas",
    label: "Empresas",
    eyebrow: "Marketplace de empresas",
    title: "Conheça nossas empresas",
    description: "Busque por empresa, serviço ou categoria e descubra onde existem benefícios e indicação disponível.",
    heroTag: "Diretório com valor comercial",
    heroNotice: "A página da empresa deve misturar capa, logo, descrição, serviços, benefícios e programa de indicação quando existir.",
    heroImage: "/images/empresas-hero-real.jpg",
    heroActionLabel: "Buscar empresas",
    heroActionHref: "/detalhes/empresas",
    metrics: [
      { label: "Empresas ativas", value: "63", detail: "No diretório", tone: "blue" },
      { label: "Com indicação", value: "22", detail: "Ganho disponível", tone: "green" },
      { label: "Categorias", value: "10", detail: "Alimentação a tecnologia", tone: "violet" },
      { label: "Cidades", value: "14", detail: "Base atual", tone: "orange" }
    ],
    spotlightTitle: "Categorias e empresas",
    spotlightDescription:
      "Tecnologia, turismo, transporte, educação, saúde, serviços, beleza, automotivo e outras frentes com leitura clara de oportunidade.",
    filters: ["Tecnologia", "Turismo", "Transporte", "Educação", "Saúde", "Serviços", "Beleza"],
    cards: companyCatalog.map(companyCard),
    feedTitle: "Empresas com potencial",
    feed: [
      { title: "Indique este serviço", detail: "Página da empresa deve mostrar comissão e CTA visível.", meta: "Se houver programa" },
      { title: "Busca por categoria", detail: "Ajuda o usuário a descobrir áreas próximas do seu público.", meta: "Descobrir" },
      { title: "Conexão entre menus", detail: "Empresas puxa para Indicações, Clubão e Campanhas.", meta: "Ecossistema" }
    ],
    insightTitle: "Leituras do diretório",
    insights: [
      { label: "Uso principal", value: "Descobrir serviços", tone: "green" },
      { label: "Segundo uso", value: "Indicar e ganhar", tone: "blue" },
      { label: "Conexão", value: "Clubão", tone: "orange" },
      { label: "Pilar", value: "Descobrir", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Empresas",
    systemPoints: [
      "A Home de Empresas deve funcionar como um marketplace de empresas e serviços.",
      "A página da empresa deve exibir capa, logo, descrição, serviços, benefícios e programa de indicação.",
      "Empresas com indicação precisam deixar a comissão explícita.",
      ...commonSystemPoints
    ]
  },
  listas: {
    key: "listas",
    label: "Listas",
    eyebrow: "Contatos de atacado",
    title: "Acesse listas comerciais com contatos mais baratos de SP e da região de SC.",
    description:
      "Esse menu foi pensado para lojistas comprarem melhor no atacado. O Admin Master cadastra contatos de fornecedores e a área organiza tudo por região, perfil de mix, faixa de compra e prioridade operacional.",
    heroTag: "Somente atacado • SP + SC",
    heroNotice:
      "O foco aqui não é varejo: são listas de fornecedores para compra em volume, com leitura rápida para Brás, 25 de Março, Bom Retiro, Joinville, Blumenau e Itajaí.",
    heroImage: "",
    heroActionLabel: "Abrir listas",
    heroActionHref: "/detalhes/listas",
    metrics: [],
    spotlightTitle: "Listas por perfil de compra",
    spotlightDescription:
      "Organização pensada para quem quer comprar no atacado com mais clareza: crédito, agro, eletrônicos, moda, utilidades, hospitalar, informática, alimentos e vários outros segmentos.",
    filters: ["Crédito", "Agrícola", "Eletrônicos", "Moda", "Cosméticos", "Informática", "Hospitalar", "Energia solar"],
    cards: supplierListCatalog.map(supplierListCard),
    feedTitle: "Rotas de compra mais quentes",
    feed: [
      {
        title: "Brás • Eletrônicos e acessórios",
        detail: "Boa entrada para quem quer volume, ticket de compra competitivo e fornecedores com leitura comercial mais agressiva.",
        meta: "Contato direto e negociação"
      },
      {
        title: "25 de Março • Utilidades e presentes",
        detail: "Excelente para composição de mix, sazonalidade e testes de categoria com saída rápida no varejo local.",
        meta: "Mix rápido e diversidade"
      },
      {
        title: "SC regional • Joinville, Blumenau e Itajaí",
        detail: "Melhor para lojistas que valorizam prazo, proximidade e reposição mais simples sem depender só de SP.",
        meta: "Operação local e recorrência"
      }
    ],
    insightTitle: "Leitura comercial",
    insights: [
      { label: "Formato", value: "Contato direto", tone: "green" },
      { label: "Recorte", value: "Somente atacado", tone: "blue" },
      { label: "Regiões", value: "SP + SC", tone: "orange" },
      { label: "Objetivo", value: "Comprar melhor", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Listas",
    systemPoints: [
      "O Admin Master cadastra e atualiza os contatos de fornecedores, mantendo a curadoria viva.",
      "A área precisa separar região, categoria, perfil de compra e leitura operacional para o lojista agir rápido.",
      "A proposta é compra no atacado com foco em contatos mais baratos de São Paulo e da região de Santa Catarina.",
      ...commonSystemPoints
    ]
  },
  indicacoes: {
    key: "indicacoes",
    label: "Indicações",
    eyebrow: "Você conhece alguém que precisa disso?",
    title: "Indique. Conecte. Ganhe.",
    description: "Uma das áreas mais importantes da plataforma: indicar serviços, acompanhar status do lead e ver a comissão aparecer quando a conversão for validada.",
    heroTag: "CRM simplificado para o usuário",
    heroNotice: "Fluxo: você indica → empresa recebe → cliente é atendido → conversão validada → comissão registrada.",
    heroImage: "/images/indicacoes-hero-real.jpg",
    heroActionLabel: "Indicar agora",
    heroActionHref: "/detalhes/indicacoes",
    metrics: [
      { label: "Minhas indicações", value: "28", detail: "Registradas", tone: "blue" },
      { label: "Em análise", value: "12", detail: "Aguardando retorno", tone: "orange" },
      { label: "Convertidas", value: "05", detail: "Validadas", tone: "green" },
      { label: "Comissão gerada", value: "R$ 1.240", detail: "No ciclo", tone: "violet" }
    ],
    spotlightTitle: "Oportunidades para indicar",
    spotlightDescription: "Cards visuais para transporte, serviços e programas com comissão clara por conversão válida.",
    filters: ["Link", "WhatsApp", "QR Code", "Formulário", "Minhas indicações"],
    cards: [
      card(
        "Serviço de transporte",
        "Transporte Executivo",
        "Indique um cliente para este serviço",
        "R$ 30 por conversão válida",
        "Indicar agora",
        "green",
        "executive transport referral opportunity, premium vehicle photo, realistic commerce card",
        "Indicar agora",
        ["Link exclusivo", "Compartilhar no WhatsApp", "Gerar QR Code ou cadastrar lead"],
        ["Serviço", "Lead", "Comissão"]
      ),
      card(
        "Serviço de negócios",
        "Consultoria para empresas locais",
        "Programa ideal para quem conhece empresários da região",
        "Comissão fixa e rastreamento de status",
        "Em análise",
        "blue",
        "business consulting referral opportunity, realistic premium office and client meeting",
        "Ver como funciona",
        ["Status do lead", "Responsável pelo atendimento", "Comissão ao validar"],
        ["Consultoria", "Indicação", "Fluxo"]
      ),
      card(
        "Serviço premium",
        "Clube empresarial",
        "Programa com benefício e comissão recorrente",
        "Bom encaixe para relacionamento e networking",
        "Comissão gerada",
        "violet",
        "premium business club referral campaign, realistic clean business scene",
        "Acompanhar",
        ["Em análise", "Em atendimento", "Convertida", "Paga"],
        ["CRM", "Status", "Rede"]
      )
    ],
    feedTitle: "Minhas indicações",
    feed: [
      { title: "🟡 Em análise", detail: "Lead recebido e em avaliação comercial.", meta: "Status" },
      { title: "🔵 Em atendimento", detail: "Cliente já está em contato com a empresa.", meta: "Status" },
      { title: "🟢 Convertida", detail: "Conversão confirmada e comissão prestes a ser registrada.", meta: "Status" }
    ],
    insightTitle: "Leitura da área",
    insights: [
      { label: "Conceito central", value: "Conecte e ganhe", tone: "green" },
      { label: "Formato forte", value: "WhatsApp", tone: "blue" },
      { label: "Status chave", value: "Em atendimento", tone: "orange" },
      { label: "Conexão", value: "Minha renda", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Indicações",
    systemPoints: [
      "A página da indicação precisa mostrar como funciona passo a passo.",
      "O usuário deve poder compartilhar por link, WhatsApp, QR Code e formulário.",
      "Minhas indicações devem exibir status claros até comissão paga.",
      ...commonSystemPoints
    ]
  },
  oportunidades: {
    key: "oportunidades",
    label: "Oportunidades",
    eyebrow: "Como posso ganhar hoje?",
    title: "Para você: oportunidades recomendadas para agir agora.",
    description:
      "Esta área concentra o coração comercial da plataforma: produtos para divulgar, serviços para indicar, conteúdos para criar, missões e desafios com retorno direto.",
    heroTag: "Central do agora",
    heroNotice: "Oportunidades podem ser personalizadas no futuro pela inteligência da plataforma.",
    heroImage: "/images/oportunidades-hero-real.png",
    heroActionLabel: "Entrar em ação",
    heroActionHref: "/detalhes/oportunidades",
    metrics: [
      { label: "Recomendadas", value: "03", detail: "Para o seu perfil", tone: "green" },
      { label: "Ganhe hoje", value: "05", detail: "Ações rápidas", tone: "blue" },
      { label: "Desafios ativos", value: "02", detail: "Campanhas em aberto", tone: "orange" },
      { label: "Pontuação potencial", value: "+900", detail: "Se concluir hoje", tone: "violet" }
    ],
    spotlightTitle: "Como posso ganhar hoje?",
    spotlightDescription: "Ações curtas e diretas: compartilhar, indicar, criar conteúdo, completar missão e entrar em desafio.",
    filters: ["Para você", "Ganhe hoje", "Indique", "Crie conteúdo", "Missões", "Desafios"],
    cards: [
      card(
        "Ganhe hoje",
        "Compartilhe este produto",
        "Produto com bom encaixe no seu público atual",
        "Comissão ativa e material pronto para divulgar",
        "Ação rápida",
        "green",
        "creator sharing product opportunity with mobile social media context, realistic",
        "Abrir produto",
        ["Conecta Produtos com materiais prontos", "Bom para hoje", "Comissão direta"],
        ["Produto", "Ação", "Ganhar"]
      ),
      card(
        "Indique",
        "Serviço de transporte",
        "R$ 30 por conversão válida",
        "Lead simples para compartilhar ou cadastrar",
        "Indicação",
        "blue",
        "transport service referral opportunity card, clean realistic marketing visual",
        "Indicar",
        ["Link exclusivo", "QR Code", "Formulário opcional"],
        ["Serviço", "Lead", "Comissão"]
      ),
      card(
        "Desafio",
        "Fique entre os 10 primeiros",
        "Recompensas especiais nesta temporada",
        "Campanha limitada com efeito no ranking",
        "Temporada",
        "orange",
        "ranking challenge card for creator platform, premium competition visual, realistic",
        "Ver desafio",
        ["Conecta missões com ranking", "Pontuação extra", "Alta motivação"],
        ["Ranking", "Desafio", "Evoluir"]
      )
    ],
    feedTitle: "Ações sugeridas",
    feed: [
      { title: "⚡ Ganhe hoje", detail: "Compartilhe um produto e capture a próxima venda.", meta: "Executar" },
      { title: "🤝 Indique", detail: "Conecte um lead a um serviço com comissão clara.", meta: "Ganhar" },
      { title: "🎯 Complete missão", detail: "Feche um passo que te empurra para ranking e recompensas.", meta: "Evoluir" }
    ],
    insightTitle: "Leitura estratégica",
    insights: [
      { label: "Pilar ativo", value: "Executar", tone: "green" },
      { label: "Melhor uso", value: "Começar o dia aqui", tone: "blue" },
      { label: "Conexões", value: "Campanhas e Produtos", tone: "orange" },
      { label: "Futuro", value: "Personalização por IA", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Oportunidades",
    systemPoints: [
      "Oportunidades pode se tornar o coração da plataforma.",
      "Deve concentrar recomendações, urgência e ações com ganho potencial.",
      "Conecta Home, Produtos, Indicações, Missões, Ranking e Recompensas.",
      ...commonSystemPoints
    ]
  },
  campanhas: {
    key: "campanhas",
    label: "Campanhas",
    eyebrow: "Ações administradas",
    title: "Campanhas para participar, executar e gerar resultado.",
    description: "Empresas e administradores publicam campanhas de divulgação, indicação e desafio para ativar a base com clareza.",
    heroTag: "Chamados em aberto",
    heroNotice: "Campanhas podem ser para produto, indicação, conteúdo, desafio de vendas ou ações temporárias.",
    heroImage: "/images/campanhas-hero-real.jpg",
    heroActionLabel: "Participar",
    heroActionHref: "/detalhes/campanhas",
    metrics: [
      { label: "Campanhas abertas", value: "07", detail: "Disponíveis agora", tone: "blue" },
      { label: "Prazo curto", value: "03", detail: "Expiram em 7 dias", tone: "orange" },
      { label: "Com recompensa", value: "05", detail: "Pontos ou comissão", tone: "green" },
      { label: "Participando", value: "02", detail: "Seu status", tone: "violet" }
    ],
    spotlightTitle: "Campanhas em destaque",
    spotlightDescription:
      "Ative nosso produto, campanha de indicação, desafio de vendas e outras ações com regras e vagas definidas.",
    filters: ["Divulgação", "Indicação", "Desafio", "Conteúdo", "Temporárias"],
    cards: [
      {
        ...card(
          "Campanha de vendas",
          "Campanha de Vendas (Produto X)",
          "Ação curta para acelerar vendas do produto principal da semana.",
          "Deadline em 7 dias • comissão extra por volume",
          "Prazo curto",
          "orange",
          "sales campaign visual",
          "Participar",
          ["Meta clara", "Volume por período", "Bônus por performance"],
          ["Vendas", "Produto X", "Deadline"]
        ),
        image: "/images/campanha-card-01-v1.jpg"
      },
      {
        ...card(
          "Campanha de indicação",
          "Desafio de Indicação",
          "Convide novos contatos e acompanhe a progressão por rede e conversão.",
          "Deadline em 5 dias • meta progressiva por indicações válidas",
          "Meta ativa",
          "green",
          "referral challenge visual",
          "Ver campanha",
          ["Leads rastreados", "Conversão por status", "Impacto em comissão"],
          ["Indicação", "Rede", "Meta"]
        ),
        image: "/images/campanha-card-02-v1.jpg"
      },
      {
        ...card(
          "Campanha de conteúdo",
          "Campanha de Conteúdo",
          "Produza e publique materiais para destravar pontos, alcance e destaque.",
          "Deadline em 10 dias • avaliação por qualidade e consistência",
          "Criadores",
          "blue",
          "content campaign visual",
          "Entrar agora",
          ["Brief pronto", "Entrega validada", "Conecta com Produtos"],
          ["Conteúdo", "Criativo", "Entrega"]
        ),
        image: "/images/campanha-card-03-v1.jpg"
      },
      {
        ...card(
          "Campanha de lives",
          "Desafio de Lives",
          "Faça transmissões, gere audiência e aumente alcance com rotina ao vivo.",
          "Deadline em 6 dias • ranking especial para lives concluídas",
          "Ao vivo",
          "violet",
          "live challenge visual",
          "Ver desafio",
          ["Ranking sazonal", "Pontuação extra", "Rotina comercial forte"],
          ["Lives", "Ao vivo", "Ranking"]
        ),
        image: "/images/campanha-card-04-v1.jpg"
      },
      {
        ...card(
          "Campanha de lançamento",
          "Semana de Lançamento",
          "Operação concentrada para apresentação, ativação e vendas do lançamento.",
          "Deadline em 7 dias • materiais prontos e foco em conversão",
          "Lançamento",
          "blue",
          "launch week visual",
          "Acompanhar",
          ["Material pronto", "Oferta coordenada", "Boa leitura comercial"],
          ["Lançamento", "Produto", "Semana"]
        ),
        image: "/images/campanha-card-05-v1.jpg"
      },
      {
        ...card(
          "Campanha de conteúdo",
          "Campanha de Conteúdo (Versão 2)",
          "Versão alternativa para creators com foco em produção recorrente e rotina de entrega.",
          "Deadline em 8 dias • validação por consistência e qualidade",
          "Versão 2",
          "blue",
          "content campaign alternate visual",
          "Entrar agora",
          ["Nova peça visual", "Entrega validada", "Campanha de creators"],
          ["Conteúdo", "Versão 2", "Entrega"]
        ),
        image: "/images/campanha-card-06-v1.jpg"
      },
      {
        ...card(
          "Campanha de vendas",
          "Campanha de Vendas (Produto Y)",
          "Campanha complementar para um segundo produto com leitura de top vendedores.",
          "Deadline em 6 dias • destaque para líderes de conversão",
          "Produto Y",
          "green",
          "sales campaign second product visual",
          "Ver campanha",
          ["Top vendedores", "Volume acompanhado", "Deadline curto"],
          ["Vendas", "Produto Y", "Ranking"]
        ),
        image: "/images/campanha-card-07-v1.jpg"
      },
      {
        ...card(
          "Campanha de lançamento",
          "Semana de Lançamento (Versão X)",
          "Outra frente de lançamento com lista de leads, briefing pronto e apoio comercial.",
          "Deadline em 7 dias • ativação para captação e conversão",
          "Versão X",
          "orange",
          "launch week alternate visual",
          "Participar",
          ["Leads em fila", "Apoio comercial", "Material pronto"],
          ["Lançamento", "Versão X", "Leads"]
        ),
        image: "/images/campanha-card-08-v1.jpg"
      },
      {
        ...card(
          "Campanha de indicação",
          "Desafio de Indicação (Versão 2)",
          "Versão com foco em rede ativa, efeito multiplicador e leitura visual de conexões.",
          "Deadline em 5 dias • bonificação por rede convertida",
          "Versão 2",
          "violet",
          "referral challenge alternate network visual",
          "Ver desafio",
          ["Rede ativa", "Conversão por conexão", "Bônus por performance"],
          ["Indicação", "Versão 2", "Rede"]
        ),
        image: "/images/campanha-card-09-v1.jpg"
      }
    ],
    feedTitle: "Como usar campanhas",
    feed: [
      { title: "Entrar na campanha", detail: "Aceite as regras e veja o que precisa ser executado.", meta: "Participar" },
      { title: "Executar com materiais prontos", detail: "Use materiais do produto para diminuir atrito e acelerar resultado.", meta: "Executar" },
      { title: "Ver impacto", detail: "Acompanhe depois em Minha renda, Desempenho e Ranking.", meta: "Ganhar" }
    ],
    insightTitle: "Leitura de ativação",
    insights: [
      { label: "Melhor encaixe", value: "Produto + materiais", tone: "green" },
      { label: "Campanha forte", value: "Desafio de vendas", tone: "blue" },
      { label: "Motor", value: "Urgência", tone: "orange" },
      { label: "Conexão", value: "Oportunidades", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Campanhas",
    systemPoints: [
      "Campanhas ajudam a transformar menus isolados em um ecossistema com ciclos claros.",
      "Cada campanha precisa ter prazo, vagas, recompensa e regras visíveis.",
      "A ação do usuário deve repercutir em resultados, missões e ranking.",
      ...commonSystemPoints
    ]
  },
  divulgue: {
    key: "divulgue",
    label: "Divulgue",
    eyebrow: "Tudo pronto para executar",
    title: "Material pronto para divulgar e vender com menos atrito.",
    description:
      "Aqui o usuário encontra link, imagem, vídeo, legenda, stories, banner e QR Code para começar a divulgar mesmo sendo iniciante.",
    heroTag: "Executar com facilidade",
    heroNotice: "O menu reduz a fricção de quem quer vender, mas não sabe por onde começar.",
    heroImage: image("creator promo assets dashboard with social media templates, qr code, links, realistic clean workspace"),
    heroActionLabel: "Abrir materiais",
    heroActionHref: "/detalhes/divulgue",
    metrics: [
      { label: "Links prontos", value: "09", detail: "Produtos ativos", tone: "blue" },
      { label: "Legendas", value: "24", detail: "Textos curtos", tone: "green" },
      { label: "Stories", value: "18", detail: "Materiais visuais", tone: "violet" },
      { label: "QR Codes", value: "09", detail: "Geráveis", tone: "orange" }
    ],
    spotlightTitle: "Tudo pronto para divulgar",
    spotlightDescription:
      "Produto, imagem, vídeo, legenda, link, stories, banner, botões para copiar, baixar, compartilhar e gerar QR Code.",
    filters: ["Copiar link", "Baixar imagem", "Copiar legenda", "Compartilhar", "Gerar QR Code"],
    cards: [
      card(
        "Produto X",
        "Imagem principal e stories prontos",
        "Material pensado para quem está começando",
        "Use no Instagram, WhatsApp, Facebook ou envio direto",
        "Pronto para uso",
        "green",
        "social media promo kit for product marketing, mobile and stories assets, realistic clean design",
        "Baixar imagem",
        ["Copiar link", "Copiar legenda", "Gerar QR Code"],
        ["Imagem", "Stories", "Link"]
      ),
      card(
        "Vídeo curto",
        "Criativo vertical para redes sociais",
        "Vídeo pronto para publicação rápida",
        "Bom para acelerar a execução sem depender de edição",
        "Vídeo pronto",
        "blue",
        "short vertical video promotion asset dashboard, realistic creator marketing toolkit",
        "Compartilhar",
        ["Reels ou stories", "CTA simples", "Link vinculado"],
        ["Vídeo", "Social", "Execução"]
      ),
      card(
        "Pacote de legenda",
        "Copy curta para começar a vender",
        "Versões para WhatsApp, Instagram e Facebook",
        "Ajuda o iniciante a agir com menos bloqueio",
        "Copy pronta",
        "orange",
        "marketing copy and link sharing toolkit for creators, realistic dashboard visual",
        "Copiar legenda",
        ["Tom comercial", "Mais fácil de usar", "Conecta com campanhas"],
        ["Legenda", "Copy", "Ação"]
      )
    ],
    feedTitle: "Fluxo ideal",
    feed: [
      { title: "1. Escolha o produto", detail: "Entre no produto certo e veja qual material já existe.", meta: "Produtos" },
      { title: "2. Abra Divulgue", detail: "Copie link, pegue imagem, legenda e QR Code.", meta: "Executar" },
      { title: "3. Meça o resultado", detail: "Depois acompanhe tudo em Desempenho e Minha renda.", meta: "Ganhar" }
    ],
    insightTitle: "Leituras da área",
    insights: [
      { label: "Pilar forte", value: "Executar", tone: "green" },
      { label: "Ajuda o iniciante", value: "Muito", tone: "blue" },
      { label: "Conexão", value: "Produtos", tone: "orange" },
      { label: "Saída", value: "Vendas", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Divulgue",
    systemPoints: [
      "Divulgue entrega materiais prontos para reduzir atrito de execução.",
      "Deve reunir imagem, vídeo, legenda, banner, link e QR Code por produto ou campanha.",
      "A experiência conecta diretamente produto, campanha, desempenho e renda.",
      ...commonSystemPoints
    ]
  },
  missoes: {
    key: "missoes",
    label: "Missões",
    eyebrow: "Gamificação pesada",
    title: "Missões diárias, semanais, mensais, especiais e progressivas.",
    description: "A missão responde o que fazer, qual o progresso atual e qual recompensa o usuário recebe ao concluir.",
    heroTag: "Complete hoje",
    heroNotice: "Missões ajudam a puxar ação, criar frequência e sustentar a jornada de evolução.",
    heroImage: "/images/missoes-hero-real.jpg",
    heroActionLabel: "Ver missões",
    heroActionHref: "/detalhes/missoes",
    metrics: [
      { label: "Diárias", value: "03", detail: "Renovam todo dia", tone: "orange" },
      { label: "Semanais", value: "02", detail: "Objetivos da semana", tone: "blue" },
      { label: "Mensais", value: "01", detail: "Desafio maior", tone: "violet" },
      { label: "Pontos hoje", value: "+100", detail: "Se concluir agora", tone: "green" }
    ],
    spotlightTitle: "Missões em andamento",
    spotlightDescription: "Primeira venda, primeira indicação, mestre das vendas e missões progressivas por faixa de resultado.",
    filters: ["Diárias", "Semanais", "Mensais", "Especiais", "Progressivas"],
    cards: [
      card(
        "Missão diária",
        "Compartilhe 3 produtos",
        "2/3 concluído",
        "Recompensa 100 pontos",
        "Hoje",
        "green",
        "daily mission card for sharing products and earning points, realistic gamification visual",
        "Completar",
        ["Missão curta", "Boa para rotina diária", "Conecta com Produtos"],
        ["Diária", "Produtos", "Pontos"]
      ),
      card(
        "Primeira venda",
        "Faça sua primeira venda",
        "+500 pontos",
        "Missão fundamental para ativar o usuário",
        "Progressiva",
        "blue",
        "first sale mission gamification card, realistic reward dashboard visual",
        "Ver missão",
        ["Conecta com Produtos", "Leva para Minha renda", "Ajuda a criar hábito"],
        ["Venda", "Primeira", "Gamificação"]
      ),
      card(
        "Mestre das vendas",
        "Faça 10 vendas",
        "+1.000 pontos",
        "Missão de ciclo maior e impacto forte no ranking",
        "Meta maior",
        "violet",
        "sales master mission card with trophy points, premium realistic visual",
        "Aceitar desafio",
        ["Missão progressiva", "Boa para temporada", "Reforça competição"],
        ["Vendas", "Ranking", "Missão"]
      )
    ],
    feedTitle: "Tipos de missão",
    feed: [
      { title: "Diárias", detail: "Renovam para manter frequência.", meta: "Rotina" },
      { title: "Semanais e mensais", detail: "Criam objetivos mais estruturados.", meta: "Consistência" },
      { title: "Especiais e progressivas", detail: "Levam a campanhas e temporadas maiores.", meta: "Evoluir" }
    ],
    insightTitle: "Leitura da gamificação",
    insights: [
      { label: "Melhor entrada", value: "Missão curta", tone: "green" },
      { label: "Motor", value: "Progresso visível", tone: "blue" },
      { label: "Saída", value: "Pontos", tone: "orange" },
      { label: "Conexão", value: "Ranking", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Missões",
    systemPoints: [
      "As missões devem dar clareza de objetivo, progresso e recompensa.",
      "A área conversa com mentorias, produtos, campanhas, ranking e recompensas.",
      "É um dos motores centrais de retenção e evolução.",
      ...commonSystemPoints
    ]
  },
  ranking: {
    key: "ranking",
    label: "Ranking",
    eyebrow: "Competição e pertencimento",
    title: "Suba no ranking e veja onde você está no jogo.",
    description: "Top 3 com destaque visual forte, ranking geral, categorias por resultado e períodos como hoje, semana, mês e temporada.",
    heroTag: "Top performers",
    heroNotice: "O ranking reforça pertencimento, comparação saudável e consequência para a ação do usuário.",
    heroImage: "/images/ranking-hero-real.jpg",
    heroActionLabel: "Ver ranking",
    heroActionHref: "/detalhes/ranking",
    metrics: [
      { label: "Sua posição", value: "27", detail: "Ranking geral", tone: "blue" },
      { label: "Mais vendas", value: "Categoria", detail: "Uma das disputas", tone: "orange" },
      { label: "Mais pontos", value: "4.820", detail: "Perfil atual", tone: "violet" },
      { label: "Subida recente", value: "+3", detail: "Último ciclo", tone: "green" }
    ],
    spotlightTitle: "Categorias do ranking",
    spotlightDescription: "Maior faturamento, mais vendas, mais indicações, mais pontos, mais missões e melhor conversão.",
    filters: ["Hoje", "Semana", "Mês", "Temporada", "Maior faturamento", "Mais pontos"],
    cards: [
      {
        ...card(
          "🥇 Top 1",
          "Bruno Martins",
          "Maior faturamento da temporada",
          "Resultado puxado por produtos e campanha",
          "1º",
          "green",
          "top performer portrait for leaderboard platform, premium realistic visual",
          "Ver perfil",
          ["Ranking geral", "Alta motivação", "Referência para a comunidade"],
          ["Top", "Faturamento", "Temporada"]
        ),
        image: "/images/user-avatar-01-v1.png",
        coverFit: "contain"
      },
      {
        ...card(
          "🥈 Top 2",
          "Camila Rocha",
          "Mais vendas na semana",
          "Ação forte em lives e produtos",
          "2º",
          "blue",
          "female top performer portrait, premium ranking dashboard, realistic",
          "Ver perfil",
          ["Boa conversão", "Consistência forte", "Campanhas ativas"],
          ["Vendas", "Semana", "Top"]
        ),
        image: "/images/user-avatar-02-v1.png",
        coverFit: "contain"
      },
      {
        ...card(
          "🥉 Top 3",
          "Diego Alves",
          "Mais indicações convertidas",
          "Canal principal no WhatsApp",
          "3º",
          "orange",
          "male referral champion portrait, premium clean ranking visual, realistic",
          "Ver perfil",
          ["Indicações", "CRM forte", "Boa taxa de atendimento"],
          ["Indicação", "Top 3", "Conversão"]
        ),
        image: "/images/user-avatar-03-v1.png",
        coverFit: "contain"
      },
      {
        ...card(
          "4º lugar",
          "Fernanda Lima",
          "Subiu forte com missão e recorrência",
          "Mais pontos no último ciclo",
          "4º",
          "violet",
          "leaderboard profile portrait",
          "Ver perfil",
          ["Missões concluídas", "Boa frequência", "Subida recente"],
          ["Pontos", "Crescimento", "Ranking"]
        ),
        image: "/images/user-avatar-04-v1.png",
        coverFit: "contain"
      },
      {
        ...card(
          "5º lugar",
          "Gustavo Nunes",
          "Melhor conversão em produto premium",
          "Lives + produtos de ticket maior",
          "5º",
          "green",
          "leaderboard profile portrait",
          "Ver perfil",
          ["Produto premium", "Live commerce", "Conversão"],
          ["Premium", "Conversão", "Top 5"]
        ),
        image: "/images/user-avatar-05-v1.png",
        coverFit: "contain"
      },
      {
        ...card(
          "6º lugar",
          "Helena Costa",
          "Cresceu com constância em mentorias",
          "Missões e aprendizado puxando o resultado",
          "6º",
          "blue",
          "leaderboard profile portrait",
          "Ver perfil",
          ["Mentorias", "Pontuação", "Constância"],
          ["Aprender", "Pontos", "Top 10"]
        ),
        image: "/images/user-avatar-06-v1.png",
        coverFit: "contain"
      },
      {
        ...card(
          "7º lugar",
          "Igor Santana",
          "Boa resposta em campanhas de indicação",
          "Rede quente e atendimento rápido",
          "7º",
          "orange",
          "leaderboard profile portrait",
          "Ver perfil",
          ["Rede ativa", "Indicação", "Atendimento"],
          ["CRM", "Leads", "Top 10"]
        ),
        image: "/images/user-avatar-07-v1.png",
        coverFit: "contain"
      },
      {
        ...card(
          "8º lugar",
          "Juliana Prado",
          "Evolução forte em performance semanal",
          "Mistura produtos, conteúdo e rotina",
          "8º",
          "violet",
          "leaderboard profile portrait",
          "Ver perfil",
          ["Conteúdo", "Produtos", "Rotina"],
          ["Performance", "Semana", "Top 10"]
        ),
        image: "/images/user-avatar-08-v1.png",
        coverFit: "contain"
      }
    ],
    feedTitle: "O que move o ranking",
    feed: [
      { title: "Mais vendas", detail: "Conecta com Produtos, Lives e materiais prontos.", meta: "Vender" },
      { title: "Mais indicações", detail: "Conecta com Empresas e Indicações.", meta: "Rede" },
      { title: "Mais pontos", detail: "Conecta com Missões, Mentorias e Recompensas.", meta: "Evoluir" }
    ],
    insightTitle: "Leitura competitiva",
    insights: [
      { label: "Meta clara", value: "Entrar no Top 10", tone: "green" },
      { label: "Motor", value: "Ação recorrente", tone: "blue" },
      { label: "Período forte", value: "Semana", tone: "orange" },
      { label: "Conexão", value: "Recompensas", tone: "violet" }
    ],
    systemTitle: "Arquitetura do Ranking",
    systemPoints: [
      "O ranking serve para competição e pertencimento, não só para exibir números.",
      "Categorias diferentes ajudam usuários com perfis distintos a se enxergarem no sistema.",
      "Os períodos evitam que só quem tem histórico antigo apareça no topo.",
      ...commonSystemPoints
    ]
  },
  recompensas: {
    key: "recompensas",
    label: "Recompensas",
    eyebrow: "Conquistas com valor",
    title: "Desbloqueie produtos, descontos, benefícios e acessos especiais.",
    description: "Recompensas não precisam ser apenas dinheiro: podem ser produtos, cupons, mentorias, acesso VIP, badges e oportunidades exclusivas.",
    heroTag: "Catálogo de valor",
    heroNotice: "A recompensa fecha o ciclo da gamificação e reforça retorno percebido pela ação do usuário.",
    heroImage: "/images/recompensas-hero-real-v3.jpg",
    heroActionLabel: "Abrir catálogo",
    heroActionHref: "/detalhes/recompensas",
    metrics: [
      { label: "Pontos", value: "4.820", detail: "Seu saldo atual", tone: "blue" },
      { label: "Disponíveis", value: "14", detail: "Itens ativos", tone: "green" },
      { label: "Resgatadas", value: "09", detail: "Histórico", tone: "violet" },
      { label: "VIP", value: "03", detail: "Acessos especiais", tone: "orange" }
    ],
    spotlightTitle: "O que você pode conquistar",
    spotlightDescription: "Produtos, descontos, cupons, experiências, acesso VIP, mentorias, benefícios, badges e oportunidades exclusivas.",
    filters: ["Produtos", "Cupons", "Mentorias", "VIP", "Badges", "Exclusivas"],
    cards: [
      card(
        "Produto",
        "Fone Bluetooth",
        "2.500 pontos",
        "Recompensa física para usuários com boa progressão",
        "Resgatar",
        "green",
        "premium bluetooth headphone reward card, realistic product showcase",
        "Resgatar",
        ["Produto físico ou digital", "Valor percebido alto", "Bom para campanhas"],
        ["Produto", "Pontos", "Resgate"]
      ),
      card(
        "Mentoria VIP",
        "Sessão premium com especialista",
        "5.000 pontos",
        "Experiência com valor aspiracional forte",
        "VIP",
        "violet",
        "vip mentorship reward card, premium coaching experience, realistic",
        "Resgatar",
        ["Experiência", "Escassez", "Alto desejo"],
        ["Mentoria", "VIP", "Experiência"]
      ),
      card(
        "Acesso Embaixador",
        "Desbloqueie status e oportunidades exclusivas",
        "10.000 pontos",
        "Acesso antecipado e badge com posição diferenciada",
        "Desbloquear",
        "orange",
        "ambassador program reward badge, premium creator platform access card, realistic",
        "Desbloquear",
        ["Status no perfil", "Oportunidades exclusivas", "Sensação de evolução"],
        ["Badge", "Embaixador", "Exclusivo"]
      )
    ],
    feedTitle: "Valor percebido",
    feed: [
      { title: "Produto", detail: "Mostra retorno concreto e tangível.", meta: "Desejo" },
      { title: "Mentoria VIP", detail: "Reforça aproximação com experts e acesso.", meta: "Prestígio" },
      { title: "Acesso Embaixador", detail: "Cria status, retenção e comunidade.", meta: "Pertencimento" }
    ],
    insightTitle: "Leitura de motivação",
    insights: [
      { label: "Melhor gatilho", value: "Status + utilidade", tone: "green" },
      { label: "Prêmio favorito", value: "Mentoria VIP", tone: "blue" },
      { label: "Conexão", value: "Ranking", tone: "orange" },
      { label: "Pilar", value: "Conquistar", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Recompensas",
    systemPoints: [
      "Recompensas fecham o ciclo da plataforma e dão motivo para voltar todos os dias.",
      "Nem toda recompensa precisa ser financeira; acesso e exclusividade também contam muito.",
      "A sensação de evolução precisa aparecer no catálogo e no perfil.",
      ...commonSystemPoints
    ]
  },
  sorteios: {
    key: "sorteios",
    label: "Sorteios",
    eyebrow: "Premiação ao vivo",
    title: "Entre nos sorteios da plataforma e acompanhe cada rodada em tempo real.",
    description:
      "Uma central visual para acompanhar sorteios ao vivo, próximos eventos, ganhadores recentes, prêmios disponíveis e o histórico completo da plataforma.",
    heroTag: "Diversão + exclusividade + competição",
    heroNotice: "A experiência de sorteios precisa parecer um evento vivo, com urgência, premiação clara e clima de comunidade.",
    heroImage: image(
      "premium gamified giveaway control center, colorful prize platform with live draw stage, glowing tickets, confetti and luxury rewards, realistic"
    ),
    heroActionLabel: "Ver central",
    heroActionHref: "/detalhes/sorteios",
    metrics: [
      { label: "Ao vivo agora", value: "01", detail: "Sorteio principal", tone: "orange" },
      { label: "Próximos hoje", value: "04", detail: "Na agenda", tone: "blue" },
      { label: "Participantes", value: "8,4 mil", detail: "No ciclo atual", tone: "violet" },
      { label: "Prêmios ativos", value: "26", detail: "Disponíveis", tone: "green" }
    ],
    spotlightTitle: "Formatos de sorteio",
    spotlightDescription:
      "Produtos, dinheiro, cupons, pontos, sorteios especiais, relâmpago, exclusivos, por missão, mensais e mega sorteios.",
    filters: ["Ao vivo", "Próximos", "Produtos", "Pontos", "Exclusivos", "Mega sorteio"],
    cards: [
      card(
        "🎁 Sorteio de produtos",
        "Kit Creator Premium",
        "1.284 participantes • hoje às 20:00",
        "AO VIVO",
        "Produto físico + acessórios com clima de palco",
        "orange",
        "premium creator product giveaway with illuminated stage and prize box, realistic",
        "Participar agora",
        ["Produto físico", "Live stage", "Entrega rastreável"],
        ["AO VIVO", "Produtos", "Premium"]
      ),
      card(
        "💰 Sorteio de dinheiro/créditos",
        "Crédito direto na carteira",
        "940 participantes • hoje às 21:00",
        "PRÓXIMO",
        "Créditos para usar na plataforma ou sacar depois",
        "green",
        "money credits giveaway with digital wallet and premium neon lighting, realistic",
        "Entrar no sorteio",
        ["Crédito em conta", "Alta procura", "Rápida ativação"],
        ["Créditos", "Carteira", "Próximo"]
      ),
      card(
        "🎟️ Sorteio de cupons",
        "Cupom Clubão 100%",
        "620 participantes • amanhã às 12:00",
        "PRÓXIMO",
        "Cupom integral para produto parceiro ou benefício do Clubão",
        "blue",
        "exclusive coupon giveaway ticket card with premium marketplace vibe, realistic",
        "Garantir vaga",
        ["Cupom imediato", "Uso rápido", "Parceiros"],
        ["Cupom", "Clubão", "Benefício"]
      ),
      card(
        "⭐ Sorteio de pontos",
        "Pacote de 2.000 pontos",
        "1.920 participantes • amanhã às 18:00",
        "PRÓXIMO",
        "Pontos para subir no ranking e trocar em recompensas",
        "violet",
        "points giveaway reward card with stars and leaderboard glow, realistic",
        "Acumular entrada",
        ["Ranking", "Gamificação", "Recompensa"],
        ["Pontos", "Ranking", "Missões"]
      ),
      card(
        "🏆 Sorteio especial",
        "Experiência VIP de lançamento",
        "312 participantes • sexta às 20:30",
        "EXCLUSIVO",
        "Lote especial para membros mais ativos e convidados",
        "green",
        "exclusive VIP giveaway event with premium trophy and launch experience, realistic",
        "Ver regras",
        ["VIP", "Experiência", "Convite"],
        ["Especial", "VIP", "Exclusivo"]
      ),
      card(
        "🔥 Sorteio relâmpago",
        "Bônus surpresa de 15 min",
        "480 participantes • hoje às 22:15",
        "RELÂMPAGO",
        "Entrada rápida liberada por janela curta",
        "orange",
        "flash giveaway countdown card with fire accents and urgency, realistic",
        "Ativar alerta",
        ["Curto prazo", "Urgência", "Frequência"],
        ["Relâmpago", "Urgência", "Hoje"]
      ),
      card(
        "👥 Sorteio exclusivo para membros",
        "Pacote insider do mês",
        "268 participantes • sábado às 10:00",
        "MEMBROS",
        "Só para quem mantém atividade e status premium",
        "blue",
        "members only giveaway lounge with exclusive premium prize access, realistic",
        "Ver elegibilidade",
        ["Membros ativos", "Acesso premium", "Regras claras"],
        ["Membros", "Premium", "Exclusivo"]
      ),
      card(
        "🎯 Sorteio por missões",
        "Entrada bônus por meta concluída",
        "730 participantes • domingo às 17:00",
        "MISSÕES",
        "Cada missão concluída aumenta o número de tickets",
        "violet",
        "mission based giveaway dashboard with target icons and ticket rewards, realistic",
        "Cumprir missões",
        ["Missões", "Entradas extras", "Competição"],
        ["Missões", "Tickets", "Meta"]
      ),
      card(
        "🎉 Sorteio mensal",
        "Pacote mensal premium",
        "2.804 participantes • dia 30 às 20:00",
        "MENSAL",
        "Rodada maior com acúmulo de engajamento do mês inteiro",
        "green",
        "monthly premium giveaway showcase with celebratory confetti and digital prizes, realistic",
        "Acompanhar mês",
        ["Grande volume", "Recorrência", "Destaque"],
        ["Mensal", "Temporada", "Clube"]
      ),
      card(
        "🚀 Mega sorteio",
        "Setup completo de creator",
        "4.560 participantes • dia 01 às 21:30",
        "MEGA",
        "Grande evento com prêmio principal, bônus e múltiplos vencedores",
        "orange",
        "mega giveaway event with creator setup, studio gear, dramatic premium lighting, realistic",
        "Entrar na fila",
        ["Grande prêmio", "Multivencedores", "Evento principal"],
        ["Mega", "Evento", "Setup"]
      )
    ],
    feedTitle: "Próximos sorteios",
    feed: [
      { title: "Crédito direto na carteira", detail: "Rodada rápida para converter atividade recente em crédito imediato.", meta: "Hoje 21:00" },
      { title: "Pacote de 2.000 pontos", detail: "Boa oportunidade para subir no ranking e destravar recompensas.", meta: "Amanhã 18:00" },
      { title: "Bônus surpresa de 15 min", detail: "Sorteio relâmpago com janela curta e tickets limitados.", meta: "Hoje 22:15" },
      { title: "Setup completo de creator", detail: "Mega evento com prêmio principal e bônus para membros ativos.", meta: "Dia 01 21:30" }
    ],
    insightTitle: "Status do ecossistema",
    insights: [
      { label: "Agora", value: "AO VIVO", tone: "orange" },
      { label: "Status forte", value: "Próximo", tone: "blue" },
      { label: "Entrada extra", value: "Missões", tone: "violet" },
      { label: "Clima", value: "Exclusivo", tone: "green" }
    ],
    systemTitle: "Arquitetura de Sorteios",
    systemPoints: [
      "Sorteios devem unir urgência, prêmio claro, regras visíveis e sensação de evento ao vivo.",
      "A área conversa com missões, ranking, recompensas, desempenho e carteira.",
      "Entradas podem depender de atividade, status, missões, campanhas ou tickets especiais.",
      ...commonSystemPoints
    ]
  },
  "minha-renda": {
    key: "minha-renda",
    label: "Minha renda",
    eyebrow: "Acompanhar resultado",
    title: "Veja o que você gerou e de onde veio.",
    description: "Aqui não é para vender. É para acompanhar o resultado gerado por produtos, indicações, missões, recompensas e campanhas.",
    heroTag: "Total gerado",
    heroNotice: "A leitura precisa ser clara sem transformar a área em um banco.",
    heroImage: "/images/minha-renda-hero-real-v2.jpg",
    heroActionLabel: "Ver histórico",
    heroActionHref: "/detalhes/minha-renda",
    metrics: [
      { label: "Total gerado", value: "R$ 18.420", detail: "Acumulado", tone: "green" },
      { label: "Disponível", value: "R$ 2.840", detail: "Pronto para liberação", tone: "blue" },
      { label: "Pendente", value: "R$ 1.260", detail: "Em análise", tone: "orange" },
      { label: "Fontes", value: "05", detail: "Produtos a campanhas", tone: "violet" }
    ],
    spotlightTitle: "De onde veio?",
    spotlightDescription: "Produtos, indicações, missões, recompensas e campanhas, com histórico por transação e status.",
    filters: ["Produtos", "Indicações", "Missões", "Recompensas", "Campanhas"],
    cards: [
      card(
        "Transação",
        "Fone Bluetooth",
        "Venda confirmada",
        "R$ 25,98 • 08/09/2026",
        "Aprovado",
        "green",
        "clean transaction card for affiliate commission, realistic finance dashboard visual",
        "Ver origem",
        ["Status pendente, em validação, aprovado, disponível, pago e cancelado", "Origem identificada", "Fluxo claro"],
        ["Produto", "Comissão", "Histórico"]
      ),
      card(
        "Origem",
        "Indicação de serviço",
        "Comissão por conversão validada",
        "R$ 30 por lead convertido",
        "Em validação",
        "orange",
        "service referral commission card, realistic clean earnings view",
        "Acompanhar",
        ["Conecta com Indicações", "Status visível", "Histórico preservado"],
        ["Indicação", "Lead", "Renda"]
      ),
      card(
        "Campanha",
        "Desafio de vendas da temporada",
        "Bônus por meta cumprida",
        "Recompensa vinculada à campanha ativa",
        "Bônus",
        "violet",
        "campaign bonus income card, premium creator rewards visual, realistic",
        "Ver campanha",
        ["Origem clara", "Histórico por data", "Conecta com ranking"],
        ["Campanha", "Bônus", "Meta"]
      )
    ],
    feedTitle: "Histórico",
    feed: [
      { title: "Pendente", detail: "A transação existe, mas ainda está aguardando etapa do fluxo.", meta: "Status" },
      { title: "Disponível", detail: "Valor pronto para próxima etapa de liberação.", meta: "Status" },
      { title: "Pago", detail: "Registro concluído e preservado no histórico.", meta: "Status" }
    ],
    insightTitle: "Leitura financeira",
    insights: [
      { label: "Principal origem", value: "Produtos", tone: "green" },
      { label: "Segunda origem", value: "Indicações", tone: "blue" },
      { label: "Tom da área", value: "Resultado, não banco", tone: "orange" },
      { label: "Conexão", value: "Desempenho", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Minha renda",
    systemPoints: [
      "Minha renda deve mostrar resultado gerado com contexto e origem.",
      "Status claros ajudam o usuário a entender o momento de cada transação.",
      "A área precisa conectar fontes de ganho e histórico sem parecer conta bancária.",
      ...commonSystemPoints
    ]
  },
  desempenho: {
    key: "desempenho",
    label: "Desempenho",
    eyebrow: "Estou indo bem?",
    title: "Seu desempenho em vendas, indicações, cliques e conversões.",
    description: "A área resume evolução, gráficos, origem de resultados, comparação entre produtos e futuros insights inteligentes da plataforma.",
    heroTag: "Resultado em leitura rápida",
    heroNotice: "No futuro, a plataforma pode destacar padrões como melhor categoria, melhor origem e taxa acima da média.",
    heroImage: "/images/desempenho-hero-real-v2.jpg",
    heroActionLabel: "Ver análise",
    heroActionHref: "/detalhes/desempenho",
    metrics: [
      { label: "Vendas", value: "47", detail: "No ciclo", tone: "green" },
      { label: "Indicações", value: "28", detail: "Registradas", tone: "blue" },
      { label: "Cliques", value: "1.284", detail: "Links rastreados", tone: "violet" },
      { label: "Conversões", value: "82", detail: "Ações validadas", tone: "orange" }
    ],
    spotlightTitle: "De onde vem o resultado",
    spotlightDescription: "Ganhos ao longo do tempo, cliques para vendas, origem por produtos, indicações e campanhas, além do comparativo por item.",
    filters: ["Evolução", "Conversão", "Origem", "Produtos", "Campanhas"],
    cards: [
      card(
        "Produto A",
        "450 cliques • 31 vendas",
        "Conversão 6,8%",
        "Produto com melhor resposta do período",
        "Top conversão",
        "green",
        "analytics card for product performance with clean data feel, realistic dashboard",
        "Ver produto",
        ["Tabela comparativa por produto", "Conecta com Marketplace", "Ajuda a priorizar"],
        ["Produto", "Cliques", "Vendas"]
      ),
      card(
        "Produto B",
        "220 cliques • 12 vendas",
        "Conversão 5,4%",
        "Produto secundário com bom potencial",
        "Comparar",
        "blue",
        "performance comparison card for product analytics, realistic clean UI",
        "Comparar",
        ["Mostra origem de resultado", "Ajuda na decisão", "Leitura simples"],
        ["Comparativo", "Conversão", "Produto"]
      ),
      card(
        "Insight futuro",
        "Seu melhor desempenho está em produtos de tecnologia",
        "Suas indicações convertem 22% melhor que a média da plataforma",
        "A plataforma pode virar um sistema inteligente",
        "Insight",
        "violet",
        "smart recommendation analytics for creator platform, realistic intelligence dashboard visual",
        "Explorar",
        ["Sugestão personalizada", "Ajuda a direcionar foco", "Próxima camada da plataforma"],
        ["Insight", "IA", "Evoluir"]
      )
    ],
    feedTitle: "Leituras de origem",
    feed: [
      { title: "Produtos", detail: "Bom para medir cliques, vendas e comissão.", meta: "Origem" },
      { title: "Indicações", detail: "Mostra qualidade de lead e eficiência de rede.", meta: "Origem" },
      { title: "Campanhas", detail: "Ajuda a entender efeito das ações administradas.", meta: "Origem" }
    ],
    insightTitle: "Leitura estratégica",
    insights: [
      { label: "Melhor categoria", value: "Tecnologia", tone: "green" },
      { label: "Melhor origem", value: "Stories", tone: "blue" },
      { label: "Pilar", value: "Ganhar", tone: "orange" },
      { label: "Futuro", value: "Plataforma inteligente", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Desempenho",
    systemPoints: [
      "Desempenho responde se o usuário está indo bem e onde está performando melhor.",
      "A leitura deve juntar resumo, gráficos, origem e tabela por produto.",
      "É a ponte entre executar e evoluir.",
      ...commonSystemPoints
    ]
  },
  notificacoes: {
    key: "notificacoes",
    label: "Notificações",
    eyebrow: "Levar a uma ação",
    title: "Alertas que realmente puxam ação.",
    description: "Cada notificação precisa apontar para uma próxima ação clara: assistir, ver produto, acompanhar indicação, concluir missão ou abrir oportunidade.",
    heroTag: "Central de ação",
    heroNotice: "Notificação boa não só informa: ela leva o usuário para o próximo passo.",
    heroImage: "/images/notificacoes-hero-real-v3.jpg",
    heroActionLabel: "Abrir notificações",
    heroActionHref: "/detalhes/notificacoes",
    metrics: [
      { label: "Não lidas", value: "12", detail: "Pendentes", tone: "orange" },
      { label: "Ação imediata", value: "04", detail: "Urgentes", tone: "green" },
      { label: "Produtos", value: "03", detail: "Novas oportunidades", tone: "blue" },
      { label: "Missões", value: "02", detail: "Quase concluídas", tone: "violet" }
    ],
    spotlightTitle: "Notificações úteis",
    spotlightDescription: "Live, produto, indicação, missão e outras notificações com destino claro.",
    filters: ["Live", "Produto", "Indicação", "Missão", "Sistema"],
    cards: [
      card(
        "🔴 Live",
        "Marcos acabou de entrar ao vivo",
        "Ele está apresentando um produto que você já divulga",
        "Ação: assistir agora",
        "Assistir",
        "orange",
        "live alert notification card for creator platform, realistic",
        "Assistir",
        ["Notificação com contexto", "Leva para a Live", "Conecta com produto"],
        ["Live", "Ação", "Agora"]
      ),
      card(
        "🛍️ Produto",
        "Novo produto disponível",
        "Comissão de até 25%",
        "Ação: ver produto",
        "Ver produto",
        "green",
        "new product notification card, affiliate opportunity, realistic clean UI",
        "Ver produto",
        ["Novo item no marketplace", "Boa comissão", "Pode virar campanha"],
        ["Produto", "Comissão", "Oportunidade"]
      ),
      card(
        "🎯 Missão",
        "Você está a 1 venda de concluir sua missão",
        "Pontos e ranking podem mudar hoje",
        "Ação: abrir missão",
        "Quase lá",
        "violet",
        "mission progress alert card, realistic gamification notification",
        "Abrir missão",
        ["Urgência boa", "Conecta com resultados", "Puxa ação imediata"],
        ["Missão", "Pontos", "Urgência"]
      )
    ],
    feedTitle: "Notificações com ação",
    feed: [
      { title: "Live", detail: "Deve levar para assistir.", meta: "Ação" },
      { title: "Produto", detail: "Deve levar para ver ou se afiliar.", meta: "Ação" },
      { title: "Indicação", detail: "Deve levar para acompanhar status.", meta: "Ação" }
    ],
    insightTitle: "Leitura da central",
    insights: [
      { label: "Mais forte", value: "Ao vivo", tone: "green" },
      { label: "Melhor destino", value: "Produtos", tone: "blue" },
      { label: "Objetivo", value: "Puxar ação", tone: "orange" },
      { label: "Conexão", value: "Home", tone: "violet" }
    ],
    systemTitle: "Arquitetura de Notificações",
    systemPoints: [
      "Cada notificação precisa dizer o que aconteceu e o que fazer agora.",
      "O destino deve ser claro para Live, produto, indicação, missão ou outra ação.",
      "Notificações precisam ajudar o ciclo da plataforma e não só gerar ruído.",
      ...commonSystemPoints
    ]
  },
  perfil: {
    key: "perfil",
    label: "Meu perfil",
    eyebrow: "Conta e evolução",
    title: "Felipe — Nível 7 Pro",
    description: "O perfil reúne avatar, badge, pontuação, conquistas, estatísticas, dados pessoais, preferências e segurança.",
    heroTag: "⭐ 4.820 pontos • 🏆 14 conquistas",
    heroNotice: "O perfil mostra quem o usuário é dentro da plataforma, e não apenas seus dados cadastrais.",
    heroImage: "/images/perfil-hero-real-v2.jpg",
    heroActionLabel: "Editar perfil",
    heroActionHref: "/detalhes/perfil",
    metrics: [
      { label: "Vendas", value: "47", detail: "Histórico recente", tone: "green" },
      { label: "Indicações", value: "28", detail: "Rede ativa", tone: "blue" },
      { label: "Missões", value: "14", detail: "Concluídas", tone: "violet" },
      { label: "Ranking", value: "27", detail: "Posição atual", tone: "orange" }
    ],
    spotlightTitle: "Meu perfil em camadas",
    spotlightDescription: "Cabeçalho com nível e conquistas, estatísticas, dados pessoais, preferências e segurança.",
    filters: ["Dados pessoais", "Foto", "Preferências", "Segurança", "Sessões", "Dispositivos"],
    cards: [
      card(
        "Dados pessoais",
        "Nome, e-mail, telefone e cidade",
        "Informações básicas da conta",
        "Editáveis e importantes para experiência e contato",
        "Conta",
        "blue",
        "profile details form card, realistic clean settings visual",
        "Editar dados",
        ["Nome", "E-mail", "Telefone", "Cidade"],
        ["Dados", "Conta", "Perfil"]
      ),
      card(
        "Estatísticas",
        "Produtos afiliados e posição no ranking",
        "Missões concluídas e desempenho geral",
        "Perfil também mostra resultado e evolução",
        "Progresso",
        "green",
        "user progress profile statistics card, realistic dashboard visual",
        "Ver resultados",
        ["Vendas", "Indicações", "Pontuação", "Ranking"],
        ["Stats", "Resultados", "Progresso"]
      ),
      card(
        "Segurança",
        "Alterar senha e acompanhar sessões",
        "Camada futura para autenticação adicional",
        "Dispositivos e proteção de conta",
        "Segurança",
        "violet",
        "security settings card for user account, realistic clean interface",
        "Abrir segurança",
        ["Senha", "Sessões", "Dispositivos", "2FA futura"],
        ["Segurança", "Sessões", "Conta"]
      )
    ],
    feedTitle: "Leitura do perfil",
    feed: [
      { title: "Badge e nível", detail: "Ajudam a comunicar evolução e status.", meta: "Identidade" },
      { title: "Pontuação", detail: "Conecta com ranking e recompensas.", meta: "Gamificação" },
      { title: "Segurança", detail: "Mostra cuidado com a conta e crescimento futuro do sistema.", meta: "Conta" }
    ],
    insightTitle: "Leituras rápidas",
    insights: [
      { label: "Nível", value: "7 Pro", tone: "green" },
      { label: "Pontos", value: "4.820", tone: "blue" },
      { label: "Conquistas", value: "14", tone: "orange" },
      { label: "Conexão", value: "Ranking e recompensas", tone: "violet" }
    ],
    systemTitle: "Arquitetura do Perfil",
    systemPoints: [
      "Perfil é mais do que cadastro: ele mostra identidade, evolução e status do usuário na plataforma.",
      "Cabeçalho, estatísticas e segurança devem conviver com clareza.",
      "A experiência de conta precisa fechar o ciclo de pertencimento.",
      ...commonSystemPoints
    ]
  }
};
