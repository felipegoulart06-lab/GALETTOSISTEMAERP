export interface CompanyClubaoOffer {
  title: string;
  benefit: string;
  detail: string;
}

export interface CompanyAffiliateOpportunity {
  title: string;
  commission: string;
  detail: string;
}

export interface CompanyCatalogItem {
  slug: string;
  name: string;
  category: string;
  type: string;
  city: string;
  state: string;
  neighborhood: string;
  address: string;
  accent: "blue" | "green" | "orange" | "violet";
  badge: string;
  logo: string;
  summary: string;
  description: string;
  specialties: string[];
  chips: string[];
  facts: string[];
  clubaoOffers: CompanyClubaoOffer[];
  affiliateOpportunities: CompanyAffiliateOpportunity[];
  latitude: number;
  longitude: number;
  credentialedStatus: string;
}

export const companyCatalog: CompanyCatalogItem[] = [
  {
    slug: "axon-nexus",
    name: "Axon Nexus",
    category: "Tecnologia",
    type: "Empresa credenciada de tecnologia comercial",
    city: "Balneário Camboriú",
    state: "SC",
    neighborhood: "Centro",
    address: "Av. Atlântica, 1450 • Centro • Balneário Camboriú / SC",
    accent: "blue",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-01-v1.png",
    summary: "Serviços digitais e integração para operações comerciais de alta demanda.",
    description:
      "A Axon Nexus atua com soluções digitais, integração de operação comercial e programas especiais para parceiros credenciados que divulgam serviços e ofertas pela FG EXACTA.",
    specialties: ["Integração comercial", "Tecnologia B2B", "Ações com parceiros"],
    chips: ["Tecnologia", "Serviços", "Credenciada"],
    facts: [
      "Empresa credenciada para divulgar ofertas e vantagens via Clubão",
      "Página própria com detalhes operacionais e comerciais",
      "Disponibiliza programa de afiliação para rede parceira"
    ],
    clubaoOffers: [
      {
        title: "Pacote setup empresarial",
        benefit: "15% OFF",
        detail: "Condição para empresas credenciadas com implantação inicial e suporte operacional."
      },
      {
        title: "Upgrade premium anual",
        benefit: "Consultoria bônus",
        detail: "Empresas credenciadas recebem acompanhamento comercial adicional no Clubão."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Indicação de contrato empresarial",
        commission: "R$ 320 por contrato aprovado",
        detail: "Ideal para quem já tem relacionamento com empresas em fase de digitalização."
      },
      {
        title: "Captação de lead qualificado",
        commission: "R$ 65 por lead validado",
        detail: "Fluxo simples para aproximação comercial com rastreio interno."
      }
    ],
    latitude: -26.9923,
    longitude: -48.6343,
    credentialedStatus: "Credenciada para Clubão e ações comerciais da plataforma."
  },
  {
    slug: "verde-essencial",
    name: "Verde Essencial",
    category: "Saúde",
    type: "Empresa credenciada de bem-estar",
    city: "Itajaí",
    state: "SC",
    neighborhood: "Fazenda",
    address: "Rua Jorge Tzachel, 220 • Fazenda • Itajaí / SC",
    accent: "green",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-02-v1.png",
    summary: "Marca com proposta de bem-estar, atendimento consultivo e benefícios por recorrência.",
    description:
      "A Verde Essencial conecta saúde, bem-estar e benefícios recorrentes, com ofertas e vantagens liberadas apenas para empresas credenciadas que operam dentro do ecossistema FG EXACTA.",
    specialties: ["Bem-estar", "Programas recorrentes", "Ofertas Clubão"],
    chips: ["Saúde", "Clubão", "Credenciada"],
    facts: [
      "Ofertas recorrentes dentro do Clubão",
      "Empresa preparada para campanhas de retenção e benefício",
      "Afiliações orientadas para base de clientes com perfil wellness"
    ],
    clubaoOffers: [
      {
        title: "Plano bem-estar",
        benefit: "20% OFF",
        detail: "Desconto exclusivo para clientes vinculados por empresas credenciadas."
      },
      {
        title: "Consulta de entrada",
        benefit: "Primeira consulta bônus",
        detail: "Ativação promocional para campanhas locais de recorrência."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Programa indicação wellness",
        commission: "R$ 80 por adesão aprovada",
        detail: "Foco em rede local e clientes com interesse em saúde preventiva."
      }
    ],
    latitude: -26.9088,
    longitude: -48.6619,
    credentialedStatus: "Credenciada para Clubão, recorrência e benefícios especiais."
  },
  {
    slug: "pulse-media",
    name: "Pulse Media",
    category: "Conteúdo",
    type: "Empresa credenciada de branding e mídia",
    city: "Florianópolis",
    state: "SC",
    neighborhood: "Trindade",
    address: "Rua Lauro Linhares, 940 • Trindade • Florianópolis / SC",
    accent: "violet",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-03-v1.png",
    summary: "Operação visual com foco em branding, criativos e campanhas com bom apelo comercial.",
    description:
      "A Pulse Media trabalha com posicionamento visual, mídia e campanhas. A empresa libera ações para parceiros que promovem pacotes, serviços e ofertas credenciadas dentro da plataforma.",
    specialties: ["Branding", "Campanhas", "Criativos"],
    chips: ["Conteúdo", "Campanhas", "Mídia"],
    facts: [
      "Campanhas visuais integradas ao ecossistema",
      "Ações promocionais ligadas à estratégia de marca",
      "Empresa apta para oferta de afiliações em projetos específicos"
    ],
    clubaoOffers: [
      {
        title: "Pacote social media",
        benefit: "10% OFF",
        detail: "Condição comercial para empresas credenciadas em plano trimestral."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Indicação de pacote criativo",
        commission: "R$ 180 por contrato fechado",
        detail: "Comissão por conversão validada em serviços de branding."
      }
    ],
    latitude: -27.6002,
    longitude: -48.5194,
    credentialedStatus: "Credenciada para campanhas, ofertas e ações especiais."
  },
  {
    slug: "domo-juridico",
    name: "Domo Jurídico",
    category: "Jurídico",
    type: "Empresa credenciada de assessoria jurídica",
    city: "Joinville",
    state: "SC",
    neighborhood: "América",
    address: "Rua Max Colin, 1160 • América • Joinville / SC",
    accent: "orange",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-04-v1.png",
    summary: "Atendimento empresarial com programas de indicação e relacionamento local.",
    description:
      "A Domo Jurídico opera com foco em atendimento empresarial e disponibiliza programa de indicação para parceiros da plataforma, com fluxo de lead e comissão bem definidos.",
    specialties: ["Consultoria jurídica", "Relacionamento local", "Programa de lead"],
    chips: ["Jurídico", "Lead", "Comissão"],
    facts: [
      "Programa de indicação ativo",
      "Comissão visível por lead qualificado",
      "Boa leitura para usuários com rede empresarial local"
    ],
    clubaoOffers: [
      {
        title: "Consulta empresarial inicial",
        benefit: "Condição especial",
        detail: "Primeira análise comercial com vantagem para empresas credenciadas."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Lead jurídico empresarial",
        commission: "R$ 120 por lead qualificado",
        detail: "Indicação rastreada até validação comercial da empresa."
      }
    ],
    latitude: -26.3045,
    longitude: -48.8487,
    credentialedStatus: "Credenciada para indicações e vantagens empresariais."
  },
  {
    slug: "costa-keller",
    name: "Costa & Keller",
    category: "Educação",
    type: "Empresa credenciada de consultoria educacional",
    city: "Blumenau",
    state: "SC",
    neighborhood: "Centro",
    address: "Rua XV de Novembro, 730 • Centro • Blumenau / SC",
    accent: "blue",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-05-v1.png",
    summary: "Consultoria educacional com leitura premium e potencial de networking regional.",
    description:
      "A Costa & Keller atua em educação executiva e consultoria, com ofertas e vantagens que podem ser divulgadas apenas por empresas credenciadas dentro do Clubão e de campanhas especiais.",
    specialties: ["Educação executiva", "Consultoria", "Networking"],
    chips: ["Educação", "Consultoria", "Rede"],
    facts: [
      "Empresa com posicionamento premium",
      "Boa para relacionamento local e networking",
      "Conecta Clubão com benefícios formativos"
    ],
    clubaoOffers: [
      {
        title: "Workshop executivo",
        benefit: "25% OFF",
        detail: "Desconto em vagas corporativas para parceiros credenciados."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Indicação de matrícula executiva",
        commission: "R$ 210 por contrato aprovado",
        detail: "Programa focado em rede empresarial e educação premium."
      }
    ],
    latitude: -26.9194,
    longitude: -49.0661,
    credentialedStatus: "Credenciada para Clubão educacional e afiliações executivas."
  },
  {
    slug: "wave-growth",
    name: "Wave Growth",
    category: "Comercial",
    type: "Empresa credenciada de expansão comercial",
    city: "São Paulo",
    state: "SP",
    neighborhood: "Pinheiros",
    address: "Rua dos Pinheiros, 420 • Pinheiros • São Paulo / SP",
    accent: "orange",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-06-v1.png",
    summary: "Parceira para expansão comercial, comissão por contrato e suporte para afiliados.",
    description:
      "A Wave Growth atua em expansão comercial e oferece programa claro de afiliação e indicação, com foco em contratos empresariais, performance e acompanhamento da operação.",
    specialties: ["Expansão comercial", "Contratos", "Afiliados"],
    chips: ["Comercial", "Afiliados", "Contrato"],
    facts: [
      "Programa de afiliação empresarial",
      "Boa leitura para contratos e performance",
      "Comissão ligada à conversão validada"
    ],
    clubaoOffers: [
      {
        title: "Pacote growth trimestral",
        benefit: "Setup reduzido",
        detail: "Condição especial para empresas credenciadas que entram por indicação."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Contrato comercial enterprise",
        commission: "R$ 450 por contrato aprovado",
        detail: "Programa premium para quem possui rede empresarial ativa."
      }
    ],
    latitude: -23.5675,
    longitude: -46.6934,
    credentialedStatus: "Credenciada para afiliação comercial e Clubão corporativo."
  },
  {
    slug: "seed-group",
    name: "Seed Group",
    category: "Sustentabilidade",
    type: "Empresa credenciada de soluções sustentáveis",
    city: "Curitiba",
    state: "PR",
    neighborhood: "Batel",
    address: "Av. do Batel, 1280 • Batel • Curitiba / PR",
    accent: "green",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-07-v1.png",
    summary: "Empresa com proposta sustentável e benefício recorrente para base parceira.",
    description:
      "A Seed Group posiciona suas ofertas e vantagens com apelo sustentável, liberando programas e benefícios somente para empresas credenciadas dentro do ecossistema.",
    specialties: ["Sustentabilidade", "Programas recorrentes", "Benefício corporativo"],
    chips: ["Sustentável", "Benefício", "Recorrência"],
    facts: [
      "Benefícios recorrentes via Clubão",
      "Boa conexão com campanhas de valor percebido",
      "Empresa com storytelling forte para divulgação"
    ],
    clubaoOffers: [
      {
        title: "Plano verde corporativo",
        benefit: "15% OFF",
        detail: "Condição recorrente para empresas credenciadas com operação sustentável."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Afiliação institucional",
        commission: "R$ 170 por adesão aprovada",
        detail: "Indicada para rede empresarial com interesse em ESG e eficiência."
      }
    ],
    latitude: -25.4385,
    longitude: -49.2903,
    credentialedStatus: "Credenciada para benefícios corporativos sustentáveis."
  },
  {
    slug: "prime-point",
    name: "Prime Point",
    category: "Marketing",
    type: "Empresa credenciada de marketing e ativações",
    city: "Campinas",
    state: "SP",
    neighborhood: "Cambuí",
    address: "Rua Coronel Quirino, 860 • Cambuí • Campinas / SP",
    accent: "violet",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-08-v1.png",
    summary: "Operação de marketing com entregas rápidas e conexão com campanhas da plataforma.",
    description:
      "A Prime Point une marketing, ativações e campanhas comerciais, oferecendo oportunidades para afiliados, parceiros e empresas credenciadas da FG EXACTA.",
    specialties: ["Marketing", "Campanhas", "Ativações"],
    chips: ["Marketing", "Campanhas", "Criativos"],
    facts: [
      "Forte em campanha e material promocional",
      "Boa ponte entre marca e afiliados",
      "Possibilidades de afiliação ligadas a performance"
    ],
    clubaoOffers: [
      {
        title: "Sprint criativa",
        benefit: "20% OFF",
        detail: "Oferta para empresas credenciadas em ações comerciais de curto prazo."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Indicação de campanha fechada",
        commission: "R$ 240 por fechamento",
        detail: "Modelo voltado a parceiros com rede de negócios e creators."
      }
    ],
    latitude: -22.8946,
    longitude: -47.0520,
    credentialedStatus: "Credenciada para campanhas, ofertas e afiliação comercial."
  },
  {
    slug: "domo-join",
    name: "Domo Join",
    category: "Serviços",
    type: "Empresa credenciada de serviços consultivos",
    city: "São José",
    state: "SC",
    neighborhood: "Kobrasol",
    address: "Rua Koesa, 55 • Kobrasol • São José / SC",
    accent: "orange",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-09-v1.png",
    summary: "Atendimento consultivo para serviços locais com potencial de indicação direta.",
    description:
      "A Domo Join foca em serviços consultivos e abre espaço para indicações com processo simples, ideal para usuários que já têm networking local e desejam monetizar conexões.",
    specialties: ["Serviços locais", "Indicação direta", "Relacionamento consultivo"],
    chips: ["Serviços", "Indicação", "Lead"],
    facts: [
      "Fluxo simples de indicação",
      "Boa para relacionamento local",
      "Empresa com potencial de monetização rápida por lead"
    ],
    clubaoOffers: [
      {
        title: "Diagnóstico inicial",
        benefit: "Condição especial",
        detail: "Acesso a primeira análise com vantagem comercial para rede credenciada."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Lead de serviço validado",
        commission: "R$ 90 por lead aprovado",
        detail: "Modelo prático para quem quer indicar e acompanhar status."
      }
    ],
    latitude: -27.5966,
    longitude: -48.6188,
    credentialedStatus: "Credenciada para indicações locais e Clubão de serviços."
  },
  {
    slug: "costa-key",
    name: "Costa Key",
    category: "Experiência",
    type: "Empresa credenciada de experiências premium",
    city: "Bombinhas",
    state: "SC",
    neighborhood: "Centro",
    address: "Av. Vereador Manoel dos Santos, 500 • Centro • Bombinhas / SC",
    accent: "blue",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-10-v1.png",
    summary: "Marca focada em experiência premium, assinatura e valor percebido alto.",
    description:
      "A Costa Key opera experiências premium e vantagens exclusivas no Clubão, sempre em formato credenciado, com divulgação controlada e ofertas de alto valor percebido.",
    specialties: ["Experiência premium", "Benefícios exclusivos", "Assinatura"],
    chips: ["Experiência", "Clubão", "Premium"],
    facts: [
      "Forte no Clubão premium",
      "Boa empresa para percepção de status",
      "Ofertas exclusivas e controladas"
    ],
    clubaoOffers: [
      {
        title: "Experiência signature",
        benefit: "Upgrade VIP",
        detail: "Benefício exclusivo para clientes captados por empresas credenciadas."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Pacote premium indicado",
        commission: "R$ 260 por reserva aprovada",
        detail: "Programa ideal para públicos premium e relacionamento."
      }
    ],
    latitude: -27.1466,
    longitude: -48.4880,
    credentialedStatus: "Credenciada para Clubão premium e afiliados de relacionamento."
  },
  {
    slug: "west-line",
    name: "West Line",
    category: "Premium",
    type: "Empresa credenciada de serviços executivos",
    city: "Itapema",
    state: "SC",
    neighborhood: "Meia Praia",
    address: "Av. Nereu Ramos, 4120 • Meia Praia • Itapema / SC",
    accent: "green",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-11-v1.png",
    summary: "Operação premium com serviços para público executivo e relacionamento de alto valor.",
    description:
      "A West Line atende um perfil executivo, com benefícios, vantagens e programas de relacionamento para rede premium credenciada na plataforma.",
    specialties: ["Executivo", "Relacionamento", "Benefícios premium"],
    chips: ["Premium", "Executivo", "Rede"],
    facts: [
      "Público premium e executivo",
      "Programa de relacionamento com valor alto",
      "Boa conversão em nichos de status"
    ],
    clubaoOffers: [
      {
        title: "Executive access",
        benefit: "Atendimento prioritário",
        detail: "Condição liberada para clientes oriundos da base credenciada."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Relacionamento executivo",
        commission: "R$ 290 por contrato aprovado",
        detail: "Modelo ideal para networking e negócios de alta confiança."
      }
    ],
    latitude: -27.0928,
    longitude: -48.6113,
    credentialedStatus: "Credenciada para benefícios premium e afiliações executivas."
  },
  {
    slug: "solar-trade",
    name: "Solar Trade",
    category: "Luxo",
    type: "Empresa credenciada de ofertas de alto ticket",
    city: "Jurerê",
    state: "SC",
    neighborhood: "Jurerê Internacional",
    address: "Av. dos Búzios, 1800 • Jurerê Internacional • Florianópolis / SC",
    accent: "violet",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-12-v1.png",
    summary: "Empresa voltada para ofertas de maior ticket com proposta visual refinada.",
    description:
      "A Solar Trade posiciona soluções e ofertas de alto ticket, com estética refinada e programa de divulgação apenas para empresas e parceiros credenciados.",
    specialties: ["Luxo", "Alto ticket", "Ofertas refinadas"],
    chips: ["Luxo", "Ticket alto", "Campanha"],
    facts: [
      "Boa para campanhas especiais",
      "Ofertas de alto ticket e valor percebido",
      "Afiliação premium com discurso comercial mais consultivo"
    ],
    clubaoOffers: [
      {
        title: "Oferta signature alta",
        benefit: "Bônus exclusivo",
        detail: "Vantagem para conversões originadas por empresas credenciadas."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Venda premium indicada",
        commission: "R$ 520 por contrato aprovado",
        detail: "Fluxo para públicos qualificados e vendas consultivas."
      }
    ],
    latitude: -27.4382,
    longitude: -48.4986,
    credentialedStatus: "Credenciada para campanhas especiais e afiliação premium."
  },
  {
    slug: "evo-max",
    name: "Evo Max",
    category: "Performance",
    type: "Empresa credenciada de crescimento e ativação",
    city: "Belo Horizonte",
    state: "MG",
    neighborhood: "Savassi",
    address: "Rua Pernambuco, 1120 • Savassi • Belo Horizonte / MG",
    accent: "orange",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-13-v1.png",
    summary: "Marca com energia comercial forte, foco em crescimento e programas de ativação.",
    description:
      "A Evo Max se posiciona com foco em crescimento, ativação de base e expansão, oferecendo programas de afiliação e ofertas com bom apelo promocional.",
    specialties: ["Performance", "Ativação", "Crescimento"],
    chips: ["Performance", "Promoção", "Ativação"],
    facts: [
      "Boa leitura para promoções e campanhas",
      "Empresa ligada à expansão comercial",
      "Modelo de afiliação voltado para resultado"
    ],
    clubaoOffers: [
      {
        title: "Pacote growth ativo",
        benefit: "Bônus de ativação",
        detail: "Condição especial liberada para rede credenciada."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Ativação convertida",
        commission: "R$ 230 por contrato aprovado",
        detail: "Bom encaixe para redes com perfil comercial mais agressivo."
      }
    ],
    latitude: -19.9370,
    longitude: -43.9337,
    credentialedStatus: "Credenciada para Clubão promocional e afiliação de performance."
  },
  {
    slug: "box-nine",
    name: "Box Nine",
    category: "Operação",
    type: "Empresa credenciada de serviços operacionais",
    city: "Rio de Janeiro",
    state: "RJ",
    neighborhood: "Barra da Tijuca",
    address: "Av. das Américas, 3500 • Barra da Tijuca • Rio de Janeiro / RJ",
    accent: "blue",
    badge: "Ver empresa",
    logo: "/images/empresa-logo-14-v1.png",
    summary: "Parceira operacional com proposta objetiva para serviços e ativações da base.",
    description:
      "A Box Nine trabalha com serviços operacionais e ativações, abrindo oportunidades para credenciamento, Clubão e programas de afiliação com leitura simples e objetiva.",
    specialties: ["Operação", "Ativação", "Serviços"],
    chips: ["Operação", "Oportunidade", "Serviços"],
    facts: [
      "Empresa com leitura simples e direta",
      "Boa para oportunidades operacionais",
      "Programas de afiliação com contexto comercial claro"
    ],
    clubaoOffers: [
      {
        title: "Onboarding operacional",
        benefit: "Taxa reduzida",
        detail: "Vantagem comercial para entrada de clientes vindos da base credenciada."
      }
    ],
    affiliateOpportunities: [
      {
        title: "Captação operacional",
        commission: "R$ 150 por contrato aprovado",
        detail: "Afiliação com foco em empresas que precisam estruturar operação."
      }
    ],
    latitude: -23.0023,
    longitude: -43.3656,
    credentialedStatus: "Credenciada para Clubão, oportunidades e afiliações operacionais."
  }
];

export function getCompanyBySlug(slug: string) {
  return companyCatalog.find((company) => company.slug === slug);
}

export function getRelatedCompanies(slug: string) {
  return companyCatalog.filter((company) => company.slug !== slug).slice(0, 3);
}
