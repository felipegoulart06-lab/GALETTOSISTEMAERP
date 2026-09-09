"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ManagedMedia } from "@/components/managed-media";
import { adminMasterLabels, adminMasterNavGroups, type AdminMasterSectionKey } from "@/lib/admin-master-config";
import type { AdminSession, PlatformDb, WorkflowStatus } from "@/lib/platform-types";

type EditorFieldType = "text" | "textarea" | "number" | "date" | "datetime" | "boolean" | "select" | "list";

interface EditorField {
  name: string;
  label: string;
  type: EditorFieldType;
  section: string;
  options?: string[];
  placeholder?: string;
}

type RecordShape = Record<string, unknown>;

const workflowOptions: WorkflowStatus[] = [
  "RASCUNHO",
  "EM_REVISAO",
  "PUBLICADO",
  "AGENDADO",
  "PAUSADO",
  "ARQUIVADO",
  "EXPIRADO"
];

const moduleConfig: Partial<
  Record<
    AdminMasterSectionKey,
    {
      collection: keyof PlatformDb;
      label: string;
      description: string;
      previewLabel?: string;
      getPreviewHref?: (record: RecordShape) => string | null;
      fields: EditorField[];
    }
  >
> = {
  produtos: {
    collection: "products",
    label: "Produtos",
    description: "Cadastre, publique, duplique e revise o catálogo que alimenta o menu Produtos do usuário.",
    previewLabel: "Visualizar como usuário",
    getPreviewHref: (record) => `/detalhes/produtos/${String(record.slug ?? "")}`,
    fields: [
      { name: "title", label: "Nome / título", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Imagem principal", type: "text", section: "Mídia" },
      { name: "gallery", label: "Galeria (1 por linha)", type: "list", section: "Mídia" },
      { name: "category", label: "Categoria", type: "text", section: "Comercial" },
      { name: "subCategory", label: "Subcategoria", type: "text", section: "Comercial" },
      { name: "brand", label: "Marca", type: "text", section: "Comercial" },
      { name: "manufacturer", label: "Fabricante", type: "text", section: "Comercial" },
      { name: "price", label: "Preço", type: "text", section: "Comercial" },
      { name: "commissionRate", label: "Percentual de comissão", type: "text", section: "Comercial" },
      { name: "commissionValue", label: "Valor da comissão", type: "text", section: "Comercial" },
      { name: "affiliateLink", label: "Link de afiliado", type: "text", section: "Comercial" },
      { name: "materials", label: "Materiais de divulgação (1 por linha)", type: "list", section: "Comercial" },
      { name: "affiliationRules", label: "Regras de afiliação (1 por linha)", type: "list", section: "Governança" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  mentorias: {
    collection: "mentorships",
    label: "Mentorias",
    description: "Crie mentorias, módulos, aulas e publique a estrutura exibida ao usuário.",
    previewLabel: "Ver no menu Mentorias",
    getPreviewHref: () => "/mentorias",
    fields: [
      { name: "title", label: "Título", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "coverImage", label: "Capa", type: "text", section: "Mídia" },
      { name: "mentorName", label: "Mentor", type: "text", section: "Estrutura" },
      { name: "mentorAvatar", label: "Avatar do mentor", type: "text", section: "Estrutura" },
      { name: "category", label: "Categoria", type: "text", section: "Estrutura" },
      { name: "level", label: "Nível", type: "text", section: "Estrutura" },
      { name: "duration", label: "Duração", type: "text", section: "Estrutura" },
      { name: "moduleBlueprint", label: "Módulos e aulas (Módulo::Aula 1|Aula 2)", type: "textarea", section: "Estrutura" },
      { name: "files", label: "Materiais / arquivos (1 por linha)", type: "list", section: "Estrutura" },
      { name: "exercises", label: "Exercícios (1 por linha)", type: "list", section: "Estrutura" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  lives: {
    collection: "lives",
    label: "Lives",
    description: "Agende, inicie, encerre, destaque e relacione lives aos produtos publicados.",
    previewLabel: "Ver no menu Lives",
    getPreviewHref: () => "/lives",
    fields: [
      { name: "title", label: "Título", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Capa", type: "text", section: "Mídia" },
      { name: "presenterName", label: "Apresentador / mentor", type: "text", section: "Programação" },
      { name: "scheduledDate", label: "Data", type: "date", section: "Programação" },
      { name: "scheduledTime", label: "Horário", type: "text", section: "Programação" },
      { name: "duration", label: "Duração", type: "text", section: "Programação" },
      { name: "transmissionLink", label: "Link da transmissão", type: "text", section: "Programação" },
      { name: "recordingUrl", label: "Gravação", type: "text", section: "Programação" },
      { name: "guests", label: "Convidados (1 por linha)", type: "list", section: "Programação" },
      { name: "materials", label: "Materiais relacionados (1 por linha)", type: "list", section: "Programação" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  clubao: {
    collection: "clubOffers",
    label: "Clubão",
    description: "Administre ofertas, cupons, limites de resgate, validade e histórico do Clubão.",
    previewLabel: "Ver no Clubão",
    getPreviewHref: () => "/clubao",
    fields: [
      { name: "title", label: "Oferta", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Imagem principal", type: "text", section: "Mídia" },
      { name: "partnerName", label: "Parceiro", type: "text", section: "Operação" },
      { name: "partnerLocation", label: "Localização / info do parceiro", type: "text", section: "Operação" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "discountLabel", label: "Percentual / valor do desconto", type: "text", section: "Operação" },
      { name: "originalPrice", label: "Preço original", type: "text", section: "Operação" },
      { name: "discountedPrice", label: "Preço promocional", type: "text", section: "Operação" },
      { name: "startAt", label: "Data de início", type: "datetime", section: "Operação" },
      { name: "endAt", label: "Data de encerramento", type: "datetime", section: "Operação" },
      { name: "redemptionLimit", label: "Limite de resgates", type: "number", section: "Cupom" },
      { name: "couponPrefix", label: "Prefixo do cupom", type: "text", section: "Cupom" },
      { name: "singleUsePerUser", label: "Resgate único por usuário", type: "boolean", section: "Cupom" },
      { name: "rules", label: "Regras (1 por linha)", type: "list", section: "Cupom" },
      { name: "conditions", label: "Condições (1 por linha)", type: "list", section: "Cupom" },
      { name: "importantInfo", label: "Informações importantes (1 por linha)", type: "list", section: "Cupom" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  "giro-da-sorte": {
    collection: "spinWheels",
    label: "Giro da Sorte",
    description: "Crie roletas, defina regras, giros, prêmios, período, histórico e experiência premium do usuário.",
    previewLabel: "Ver no menu Giro da Sorte",
    getPreviewHref: () => "/giro-da-sorte",
    fields: [
      { name: "title", label: "Nome da roleta", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Banner / imagem", type: "text", section: "Mídia" },
      { name: "wheelType", label: "Tipo de roleta", type: "text", section: "Operação" },
      { name: "spinFrequency", label: "Frequência", type: "select", section: "Operação", options: ["Diário", "Semanal", "Mensal", "Condicionado", "Especial"] },
      { name: "availableSpins", label: "Giros disponíveis", type: "number", section: "Operação" },
      { name: "completedSpins", label: "Giros realizados", type: "number", section: "Operação" },
      { name: "totalPrizesWon", label: "Prêmios ganhos", type: "number", section: "Operação" },
      { name: "nextSpinAt", label: "Próximo giro em", type: "datetime", section: "Operação" },
      { name: "nextSpinLabel", label: "Label do próximo giro", type: "text", section: "Operação" },
      { name: "pointsLabel", label: "Pontos / benefícios", type: "text", section: "Operação" },
      { name: "benefitsLabel", label: "Benefício acumulado", type: "text", section: "Operação" },
      { name: "audienceRule", label: "Regra de público", type: "text", section: "Regras" },
      { name: "releaseRule", label: "Regra de liberação", type: "text", section: "Regras" },
      { name: "priorityLabel", label: "Prioridade da campanha", type: "text", section: "Regras" },
      { name: "campaignLabel", label: "Campanha / contexto", type: "text", section: "Regras" },
      { name: "visualTone", label: "Tom visual", type: "select", section: "Visual", options: ["blue", "green", "orange", "violet"] },
      { name: "rewardsBlueprint", label: "Prêmios (Nome::Categoria::Tipo::Probabilidade::Qtd::Código::Valor::Validade::Status::Imagem)", type: "textarea", section: "Prêmios" },
      { name: "winnerBlueprint", label: "Últimos ganhadores (Nome::Prêmio::Roleta::Data::Tom)", type: "textarea", section: "Histórico" },
      { name: "historyBlueprint", label: "Histórico (Data::Roleta::Resultado::Prêmio::Status::Código::Validade)", type: "textarea", section: "Histórico" },
      { name: "rules", label: "Regras (1 por linha)", type: "list", section: "Governança" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  empresas: {
    collection: "companies",
    label: "Empresas",
    description: "Cadastre empresas, vínculos comerciais e relações com ofertas, serviços, produtos e oportunidades.",
    previewLabel: "Visualizar empresa",
    getPreviewHref: (record) => `/detalhes/empresas/${String(record.slug ?? "")}`,
    
    fields: [
      { name: "title", label: "Nome da empresa", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descriação curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descriação completa", type: "textarea", section: "Descrição" },
      { name: "logo", label: "Logo", type: "text", section: "Mídia" },
      { name: "image", label: "Imagem principal", type: "text", section: "Mítia" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "segment", label: "Segmento", type: "text", section: "Operação" },
      { name: "type", label: "Tipo / descrição comercial", type: "text", section: "Operação" },
      { name: "address", label: "Endereço", type: "text", section: "Localização da empresa" },
      { name: "city", label: "Cidade", type: "text", section: "Localização da empresa" },
      { name: "state", label: "Estado", type: "text", section: "Localização da empresa" },
      { name: "zipCode", label: "CEP", type: "text", section: "Localização da empresa" },
      { name: "latitude", label: "Latitude", type: "number", section: "Localização da empresa" },
      { name: "longitude", label: "Longitude", type: "number", section: "Localização da empresa" },
      { name: "mapZoom", label: "Zoom do Mapa", type: "number", section: "Localização da empresa" },
      { name: "phone", label: "Telefone", type: "text", section: "Contato" },
      { name: "whatsapp", label: "WhatsApp", type: "text", section: "Contato" },
      { name: "contactEmail", label: "E-mail", type: "text", section: "Contato" },
      { name: "website", label: "Site", type: "text", section: "Contato" },
      { name: "instagram", label: "Instagram", type: "text", section: "Contato" },
      { name: "linkedin", label: "LinkedIn", type: "text", section: "Contato" },
      { name: "operatingHours", label: "Horário de funcionamento", type: "text", section: "Operação" },
      { name: "targetAudience", label: "Público atendido", type: "text", section: "Operação" },
      { name: "valueProposition", label: "Proposta de valor", type: "textarea", section: "Operação" },
      { name: "businessArea", label: "Área de atuação", type: "text", section: "Operação" },
      { name: "timeInBusiness", label: "Tempo de atuação", type: "text", section: "Operação" },
      { name: "specialties", label: "Benefícios / especialidades (1 por linha)", type: "list", section: "Operação" },
      { name: "credentialedStatus", label: "Status comercial", type: "text", section: "Operação" },
      { name: "linkedProductIds", label: "IDs de produtos vinculados (1 por linha)", type: "list", section: "Relações" },
      { name: "linkedOfferIds", label: "IDs de ofertas vinculadas (1 por linha)", type: "list", section: "Relações" },
      { name: "linkedServiceIds", label: "IDs de serviços vinculados (1 por linha)", type: "list", section: "Relações" },
      { name: "linkedCampaignIds", label: "IDs de campanhas vinculadas (1 por linha)", type: "list", section: "Relações" },
      { name: "linkedOpportunityIds", label: "IDs de oportunidades vinculadas (1 por linha)", type: "list", section: "Relações" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }

    ]
  },
  listas: {
    collection: "supplierLists",
    label: "Listas",
    description: "Organize fornecedores em listas e categorias operacionais.",
    previewLabel: "Ver no menu Listas",
    getPreviewHref: () => "/listas",
    fields: [
      { name: "title", label: "Título da lista", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Imagem", type: "text", section: "Mídia" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "badge", label: "Badge", type: "text", section: "Operação" },
      { name: "suppliersBlueprint", label: "Fornecedores (Nome::Categoria::Contato)", type: "textarea", section: "Operação" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  indicacoes: {
    collection: "referralServices",
    label: "Serviços de indicação",
    description: "Cadastre serviços disponíveis para indicação e acompanhe regras, critérios e premiação.",
    previewLabel: "Ver em Indicações",
    getPreviewHref: () => "/indicacoes",
    fields: [
      { name: "title", label: "Nome do serviço", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Imagem", type: "text", section: "Mídia" },
      { name: "companyName", label: "Empresa", type: "text", section: "Operação" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "valueLabel", label: "Valor / ticket", type: "text", section: "Operação" },
      { name: "rewardLabel", label: "Comissão / premiação", type: "text", section: "Operação" },
      { name: "deadlineLabel", label: "Prazo", type: "text", section: "Operação" },
      { name: "rules", label: "Regras (1 por linha)", type: "list", section: "Governança" },
      { name: "criteria", label: "Critérios (1 por linha)", type: "list", section: "Governança" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  oportunidades: {
    collection: "opportunities",
    label: "Oportunidades",
    description: "Controle completo das oportunidades publicadas para a base.",
    previewLabel: "Ver em Oportunidades",
    getPreviewHref: () => "/oportunidades",
    fields: [
      { name: "title", label: "Título", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Imagem", type: "text", section: "Mídia" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "companyName", label: "Empresa", type: "text", section: "Operação" },
      { name: "benefit", label: "Benefício", type: "text", section: "Operação" },
      { name: "valueLabel", label: "Valor", type: "text", section: "Operação" },
      { name: "ctaLabel", label: "CTA", type: "text", section: "Operação" },
      { name: "ctaHref", label: "Link / CTA href", type: "text", section: "Operação" },
      { name: "requirements", label: "Requisitos (1 por linha)", type: "list", section: "Governança" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  campanhas: {
    collection: "campaigns",
    label: "Campanhas",
    description: "Gerencie campanhas, período, objetivo, pontuação e materiais.",
    previewLabel: "Ver em Campanhas",
    getPreviewHref: () => "/campanhas",
    fields: [
      { name: "title", label: "Nome / título", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Imagem", type: "text", section: "Mídia" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "objective", label: "Objetivo", type: "text", section: "Operação" },
      { name: "periodLabel", label: "Período", type: "text", section: "Operação" },
      { name: "rewardLabel", label: "Recompensa", type: "text", section: "Operação" },
      { name: "scoreLabel", label: "Pontuação", type: "text", section: "Operação" },
      { name: "materials", label: "Materiais (1 por linha)", type: "list", section: "Operação" },
      { name: "rules", label: "Regras (1 por linha)", type: "list", section: "Governança" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  missoes: {
    collection: "missions",
    label: "Missões",
    description: "Crie missões, pontos, recompensas e critérios de progresso.",
    fields: [
      { name: "title", label: "Título", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Imagem", type: "text", section: "Mídia" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "objective", label: "Objetivo", type: "text", section: "Operação" },
      { name: "taskLabel", label: "Tarefa", type: "text", section: "Operação" },
      { name: "scoreLabel", label: "Pontuação", type: "text", section: "Operação" },
      { name: "rewardLabel", label: "Recompensa", type: "text", section: "Operação" },
      { name: "difficulty", label: "Dificuldade", type: "select", section: "Operação", options: ["Baixa", "Média", "Alta"] },
      { name: "requirements", label: "Requisitos (1 por linha)", type: "list", section: "Governança" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  recompensas: {
    collection: "rewards",
    label: "Recompensas",
    description: "Administre catálogo de recompensas, estoque, pontos e validade.",
    fields: [
      { name: "title", label: "Nome", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Imagem", type: "text", section: "Mídia" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "rewardType", label: "Tipo", type: "text", section: "Operação" },
      { name: "valueLabel", label: "Valor", type: "text", section: "Operação" },
      { name: "pointsRequired", label: "Pontos necessários", type: "number", section: "Operação" },
      { name: "quantityAvailable", label: "Quantidade disponível", type: "number", section: "Operação" },
      { name: "rules", label: "Regras (1 por linha)", type: "list", section: "Governança" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  sorteios: {
    collection: "sweepstakes",
    label: "Sorteios",
    description: "Controle completo dos sorteios da plataforma, agenda, critérios e histórico.",
    previewLabel: "Ver em Sorteios",
    getPreviewHref: () => "/sorteios",
    fields: [
      { name: "title", label: "Nome", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "image", label: "Imagem", type: "text", section: "Mídia" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "sweepstakeType", label: "Tipo de sorteio", type: "text", section: "Operação" },
      { name: "prizeLabel", label: "Prêmio", type: "text", section: "Operação" },
      { name: "scheduledDate", label: "Data", type: "date", section: "Operação" },
      { name: "scheduledTime", label: "Horário", type: "text", section: "Operação" },
      { name: "participantCount", label: "Participantes", type: "number", section: "Operação" },
      { name: "criteria", label: "Critérios (1 por linha)", type: "list", section: "Governança" },
      { name: "rules", label: "Regras (1 por linha)", type: "list", section: "Governança" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }
    ]
  },
  usuarios: {
    collection: "users",
    label: "Usuários",
    description: "Leitura administrativa da base, status, plano, progresso e resultados.",
    fields: [
      { name: "fullName", label: "Nome", type: "text", section: "Conta" },
      { name: "email", label: "E-mail", type: "text", section: "Conta" },
      { name: "status", label: "Status", type: "select", section: "Conta", options: ["ATIVO", "PENDENTE", "BLOQUEADO"] },
      { name: "plan", label: "Plano", type: "select", section: "Conta", options: ["Membro Pro", "Premium", "Essencial"] },
      { name: "points", label: "Pontos", type: "number", section: "Performance" },
      { name: "salesCount", label: "Vendas", type: "number", section: "Performance" },
      { name: "commissionTotal", label: "Comissões", type: "number", section: "Performance" },
      { name: "referralsCount", label: "Indicações", type: "number", section: "Performance" },
      { name: "redeemedCouponsCount", label: "Cupons", type: "number", section: "Performance" },
      { name: "progressPercent", label: "Progresso", type: "number", section: "Performance" }
    ]
  }
};

const defaultMedia = [
  "/images/product-card-01-real-v2.png",
  "/images/product-card-02-real-v2.png",
  "/images/product-card-03-real-v2.png",
  "/images/product-card-04-real-v2.png",
  "/images/product-card-05-real-v2.png",
  "/images/mentorias-hero-real-v2.png",
  "/images/lives-card-01-v1.jpg",
  "/images/clubao-card-01-real-v1.png"
];

function toMultiline(value: unknown) {
  if (Array.isArray(value)) {
    return value.join("\n");
  }

  return String(value ?? "");
}

function parseList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createPublicCode(prefix: string, total: number) {
  return `${prefix}-${String(total + 1).padStart(3, "0")}`;
}

function buildModuleBlueprintInput(record: RecordShape) {
  const modules = Array.isArray(record.modules) ? record.modules : [];

  return modules
    .map((moduleItem) => {
      const title = String((moduleItem as RecordShape).title ?? "Módulo");
      const lessons = Array.isArray((moduleItem as RecordShape).lessons)
        ? ((moduleItem as RecordShape).lessons as RecordShape[]).map((lesson) => String(lesson.title ?? "Aula")).join("|")
        : "";
      return `${title}::${lessons}`;
    })
    .join("\n");
}

function parseModuleBlueprint(value: string) {
  return parseList(value).map((line, index) => {
    const [moduleTitle, lessonsRaw = ""] = line.split("::");
    const lessons = lessonsRaw
      .split("|")
      .map((lesson) => lesson.trim())
      .filter(Boolean)
      .map((lessonTitle, lessonIndex) => ({
        id: `lesson-${index + 1}-${lessonIndex + 1}-${globalThis.crypto.randomUUID().slice(0, 6)}`,
        title: lessonTitle,
        duration: "20 min",
        videoUrl: "https://fgexacta.com/video",
        materials: ["Resumo"]
      }));

    return {
      id: `module-${index + 1}-${globalThis.crypto.randomUUID().slice(0, 6)}`,
      title: moduleTitle.trim(),
      description: `Módulo ${index + 1} criado pelo Admin Master.`,
      lessons
    };
  });
}

function buildSuppliersBlueprintInput(record: RecordShape) {
  const suppliers = Array.isArray(record.suppliers) ? record.suppliers : [];
  return suppliers
    .map((supplier) => `${String((supplier as RecordShape).name ?? "")}::${String((supplier as RecordShape).category ?? "")}::${String((supplier as RecordShape).contact ?? "")}`)
    .join("\n");
}

function parseSuppliersBlueprint(value: string) {
  return parseList(value).map((line, index) => {
    const [name, category, contact] = line.split("::");
    return {
      id: `supplier-${globalThis.crypto.randomUUID().slice(0, 8)}`,
      name: (name ?? "").trim(),
      company: `${(name ?? "").trim()} Distribuição`,
      category: (category ?? "").trim(),
      segment: (category ?? "").trim(),
      description: `Fornecedor criado pelo Admin Master para ${category ?? "categoria"}.`,
      location: "Atendimento nacional",
      contact: (contact ?? "").trim() || "Comercial",
      phone: "(11) 3000-0000",
      email: `fornecedor${index + 1}@fgexacta-demo.com`,
      website: "https://fgexacta-demo.com",
      notes: "Registro criado no painel administrativo.",
      status: "PUBLICADO"
    };
  });
}

function buildSpinRewardsBlueprintInput(record: RecordShape) {
  const rewards = Array.isArray(record.rewards) ? record.rewards : [];
  return rewards
    .map((reward) =>
      [
        String((reward as RecordShape).title ?? ""),
        String((reward as RecordShape).category ?? ""),
        String((reward as RecordShape).rewardType ?? ""),
        String((reward as RecordShape).probability ?? ""),
        String((reward as RecordShape).quantityAvailable ?? ""),
        String((reward as RecordShape).internalCode ?? ""),
        String((reward as RecordShape).estimatedValue ?? ""),
        String((reward as RecordShape).expiresAt ?? ""),
        String((reward as RecordShape).status ?? "ATIVO"),
        String((reward as RecordShape).image ?? "")
      ].join("::")
    )
    .join("\n");
}

function parseSpinRewardsBlueprint(value: string) {
  return parseList(value).map((line, index) => {
    const [title, category, rewardType, probability, quantityAvailable, internalCode, estimatedValue, expiresAt, status, image] = line.split("::");
    return {
      id: `spin-reward-${globalThis.crypto.randomUUID().slice(0, 8)}`,
      title: (title ?? "").trim(),
      category: (category ?? "Geral").trim(),
      rewardType: (rewardType ?? "Benefício").trim(),
      probability: Number(probability ?? 0) || 0,
      quantityAvailable: Number(quantityAvailable ?? 0) || 0,
      internalCode: ((internalCode ?? "").trim() || `GIRO-${index + 1}`),
      estimatedValue: (estimatedValue ?? "Sob consulta").trim(),
      expiresAt: (expiresAt ?? "").trim() || undefined,
      status: (((status ?? "ATIVO").trim() || "ATIVO") as "ATIVO" | "ESGOTADO" | "ENCERRADO"),
      image: (image ?? "").trim() || defaultMedia[index % defaultMedia.length],
      description: `Recompensa administrada pelo Admin Master para a roleta ${title ?? "premium"}.`,
      rules: ["Resgate sujeito às regras publicadas da roleta."]
    };
  });
}

function buildSpinWinnerBlueprintInput(record: RecordShape) {
  const winners = Array.isArray(record.recentWinners) ? record.recentWinners : [];
  return winners
    .map((winner) =>
      [
        String((winner as RecordShape).userNameMasked ?? ""),
        String((winner as RecordShape).rewardTitle ?? ""),
        String((winner as RecordShape).wheelTitle ?? ""),
        String((winner as RecordShape).wonAt ?? ""),
        String((winner as RecordShape).tone ?? "blue")
      ].join("::")
    )
    .join("\n");
}

function parseSpinWinnerBlueprint(value: string) {
  return parseList(value).map((line) => {
    const [userNameMasked, rewardTitle, wheelTitle, wonAt, tone] = line.split("::");
    return {
      id: `spin-winner-${globalThis.crypto.randomUUID().slice(0, 8)}`,
      userNameMasked: (userNameMasked ?? "").trim(),
      rewardTitle: (rewardTitle ?? "").trim(),
      wheelTitle: (wheelTitle ?? "").trim(),
      wonAt: (wonAt ?? "").trim() || new Date().toISOString(),
      tone: (((tone ?? "blue").trim() || "blue") as "blue" | "green" | "orange" | "violet")
    };
  });
}

function buildSpinHistoryBlueprintInput(record: RecordShape) {
  const history = Array.isArray(record.history) ? record.history : [];
  return history
    .map((item) =>
      [
        String((item as RecordShape).playedAt ?? ""),
        String((item as RecordShape).wheelTitle ?? ""),
        String((item as RecordShape).resultLabel ?? ""),
        String((item as RecordShape).rewardTitle ?? ""),
        String((item as RecordShape).status ?? "ATIVO"),
        String((item as RecordShape).internalCode ?? ""),
        String((item as RecordShape).expiresAt ?? "")
      ].join("::")
    )
    .join("\n");
}

function parseSpinHistoryBlueprint(value: string) {
  return parseList(value).map((line) => {
    const [playedAt, wheelTitle, resultLabel, rewardTitle, status, internalCode, expiresAt] = line.split("::");
    return {
      id: `spin-history-${globalThis.crypto.randomUUID().slice(0, 8)}`,
      userId: "user-01",
      userNameMasked: "Rafael M.",
      wheelTitle: (wheelTitle ?? "").trim(),
      resultLabel: (resultLabel ?? "").trim(),
      rewardTitle: (rewardTitle ?? "").trim(),
      status: (((status ?? "ATIVO").trim() || "ATIVO") as "ATIVO" | "UTILIZADO" | "EXPIRADO" | "AGUARDANDO_RESGATE"),
      internalCode: (internalCode ?? "").trim(),
      expiresAt: (expiresAt ?? "").trim() || undefined,
      playedAt: (playedAt ?? "").trim() || new Date().toISOString()
    };
  });
}

function getCollectionItems(db: PlatformDb, sectionKey: AdminMasterSectionKey) {
  const config = moduleConfig[sectionKey];
  if (!config) {
    return [];
  }

  return (db[config.collection] as unknown as RecordShape[]) ?? [];
}

function recordToForm(sectionKey: AdminMasterSectionKey, record?: RecordShape | null) {
  if (!record) {
    return {} as Record<string, string | boolean>;
  }

  const result: Record<string, string | boolean> = {};

  moduleConfig[sectionKey]?.fields.forEach((field) => {
    if (field.name === "moduleBlueprint") {
      result[field.name] = buildModuleBlueprintInput(record);
      return;
    }

    if (field.name === "suppliersBlueprint") {
      result[field.name] = buildSuppliersBlueprintInput(record);
      return;
    }

    if (field.name === "rewardsBlueprint") {
      result[field.name] = buildSpinRewardsBlueprintInput(record);
      return;
    }

    if (field.name === "winnerBlueprint") {
      result[field.name] = buildSpinWinnerBlueprintInput(record);
      return;
    }

    if (field.name === "historyBlueprint") {
      result[field.name] = buildSpinHistoryBlueprintInput(record);
      return;
    }

    if (field.type === "boolean") {
      result[field.name] = Boolean(record[field.name]);
      return;
    }

    if (field.type === "list") {
      result[field.name] = toMultiline(record[field.name]);
      return;
    }

    result[field.name] = String(record[field.name] ?? "");
  });

  return result;
}

function buildBaseManagedRecord(sectionKey: AdminMasterSectionKey, formState: Record<string, string | boolean>, existing: RecordShape | null, actor: AdminSession, total: number) {
  const title = String(formState.title ?? existing?.title ?? `Novo ${adminMasterLabels[sectionKey]}`);
  const slug = String(existing?.slug ?? createSlug(title));
  const image = String(formState.image ?? existing?.image ?? defaultMedia[total % defaultMedia.length]);
  const nowIso = new Date().toISOString();

  return {
    ...(existing ?? {}),
    id: String(existing?.id ?? `${sectionKey}-${globalThis.crypto.randomUUID()}`),
    slug,
    publicCode: String(existing?.publicCode ?? createPublicCode(sectionKey.toUpperCase().slice(0, 4), total)),
    title,
    subtitle: String(formState.subtitle ?? existing?.subtitle ?? ""),
    shortDescription: String(formState.shortDescription ?? existing?.shortDescription ?? ""),
    description: String(formState.description ?? existing?.description ?? ""),
    image,
    gallery: parseList(String(formState.gallery ?? image)),
    category: String(formState.category ?? existing?.category ?? "Geral"),
    subcategory: String(formState.subCategory ?? existing?.subcategory ?? ""),
    tags: parseList(String(formState.tags ?? toMultiline(existing?.tags))),
    featured: Boolean(formState.featured ?? existing?.featured ?? false),
    status: String(formState.status ?? existing?.status ?? "RASCUNHO"),
    createdAt: String(existing?.createdAt ?? nowIso),
    updatedAt: nowIso,
    createdByUserId: String(existing?.createdByUserId ?? actor.userId),
    updatedByUserId: actor.userId,
    publishedAt:
      String(formState.status ?? existing?.status ?? "") === "PUBLICADO"
        ? String(existing?.publishedAt ?? nowIso)
        : undefined,
    publishedByUserId:
      String(formState.status ?? existing?.status ?? "") === "PUBLICADO"
        ? String(existing?.publishedByUserId ?? actor.userId)
        : undefined,
    startAt: String(formState.startAt ?? existing?.startAt ?? ""),
    endAt: String(formState.endAt ?? existing?.endAt ?? "")
  };
}

function formToRecord(sectionKey: AdminMasterSectionKey, formState: Record<string, string | boolean>, existing: RecordShape | null, actor: AdminSession, db: PlatformDb) {
  const base = buildBaseManagedRecord(sectionKey, formState, existing, actor, getCollectionItems(db, sectionKey).length);

  switch (sectionKey) {
    case "produtos":
      return {
        ...base,
        kind: "product",
        badge: String(existing?.badge ?? "Novo"),
        accent: String(existing?.accent ?? "blue"),
        brand: String(formState.brand ?? existing?.brand ?? ""),
        manufacturer: String(formState.manufacturer ?? existing?.manufacturer ?? ""),
        price: String(formState.price ?? existing?.price ?? ""),
        commissionRate: String(formState.commissionRate ?? existing?.commissionRate ?? ""),
        commissionValue: String(formState.commissionValue ?? existing?.commissionValue ?? ""),
        commercialInfo: String(existing?.commercialInfo ?? base.shortDescription),
        audience: String(existing?.audience ?? "Audiência geral"),
        payoutWindow: String(existing?.payoutWindow ?? "Após aprovação da venda"),
        approvalFlow: String(existing?.approvalFlow ?? "Afiliação aprovada no painel"),
        affiliateLink: String(formState.affiliateLink ?? existing?.affiliateLink ?? "https://fgexacta.com"),
        affiliationRules: parseList(String(formState.affiliationRules ?? toMultiline(existing?.affiliationRules))),
        materials: parseList(String(formState.materials ?? toMultiline(existing?.materials))),
        facts: parseList(String(formState.materials ?? toMultiline(existing?.facts))),
        chips: parseList(String(formState.tags ?? toMultiline(existing?.chips)))
      };
    case "mentorias":
      return {
        ...base,
        kind: "mentorship",
        badge: String(existing?.badge ?? "Nova trilha"),
        accent: String(existing?.accent ?? "green"),
        coverImage: String(formState.coverImage ?? existing?.coverImage ?? base.image),
        mentorName: String(formState.mentorName ?? existing?.mentorName ?? actor.fullName),
        mentorAvatar: String(formState.mentorAvatar ?? existing?.mentorAvatar ?? "/images/admin-filipe-galetto-01-v1.png"),
        level: String(formState.level ?? existing?.level ?? "Intermediário"),
        duration: String(formState.duration ?? existing?.duration ?? "4h 00min"),
        progressPercent: Number(existing?.progressPercent ?? 0),
        progressLabel: String(existing?.progressLabel ?? "Começar agora"),
        modules: parseModuleBlueprint(String(formState.moduleBlueprint ?? "")),
        files: parseList(String(formState.files ?? toMultiline(existing?.files))),
        exercises: parseList(String(formState.exercises ?? toMultiline(existing?.exercises))),
        facts: parseList(String(formState.exercises ?? toMultiline(existing?.facts))),
        chips: parseList(String(formState.tags ?? toMultiline(existing?.chips)))
      };
    case "lives":
      return {
        ...base,
        kind: "live",
        presenterName: String(formState.presenterName ?? existing?.presenterName ?? actor.fullName),
        presenterAvatar: String(existing?.presenterAvatar ?? "/images/admin-filipe-galetto-01-v1.png"),
        guests: parseList(String(formState.guests ?? toMultiline(existing?.guests))),
        scheduledDate: String(formState.scheduledDate ?? existing?.scheduledDate ?? ""),
        scheduledTime: String(formState.scheduledTime ?? existing?.scheduledTime ?? ""),
        duration: String(formState.duration ?? existing?.duration ?? "01h00"),
        transmissionLink: String(formState.transmissionLink ?? existing?.transmissionLink ?? ""),
        recordingUrl: String(formState.recordingUrl ?? existing?.recordingUrl ?? ""),
        heroCtaLabel: "Assistir live",
        heroCtaHref: "/lives",
        materials: parseList(String(formState.materials ?? toMultiline(existing?.materials))),
        relatedProductIds: Array.isArray(existing?.relatedProductIds) ? existing?.relatedProductIds : [],
        facts: parseList(String(formState.materials ?? toMultiline(existing?.facts))),
        chips: parseList(String(formState.tags ?? toMultiline(existing?.chips)))
      };
    case "clubao":
      return {
        ...base,
        kind: "clubOffer",
        offerCode: String(existing?.offerCode ?? createPublicCode("OFR", getCollectionItems(db, sectionKey).length)),
        partnerCompanyId: String(existing?.partnerCompanyId ?? ""),
        partnerName: String(formState.partnerName ?? existing?.partnerName ?? ""),
        partnerLocation: String(formState.partnerLocation ?? existing?.partnerLocation ?? ""),
        discountLabel: String(formState.discountLabel ?? existing?.discountLabel ?? ""),
        originalPrice: String(formState.originalPrice ?? existing?.originalPrice ?? ""),
        discountedPrice: String(formState.discountedPrice ?? existing?.discountedPrice ?? ""),
        validityLabel: String(existing?.validityLabel ?? "Válida enquanto publicada"),
        redemptionLimit: Number(formState.redemptionLimit ?? existing?.redemptionLimit ?? 100),
        redeemedCount: Number(existing?.redeemedCount ?? 0),
        singleUsePerUser: Boolean(formState.singleUsePerUser ?? existing?.singleUsePerUser ?? true),
        rules: parseList(String(formState.rules ?? toMultiline(existing?.rules))),
        conditions: parseList(String(formState.conditions ?? toMultiline(existing?.conditions))),
        importantInfo: parseList(String(formState.importantInfo ?? toMultiline(existing?.importantInfo))),
        couponPrefix: String(formState.couponPrefix ?? existing?.couponPrefix ?? "FGX")
      };
    case "giro-da-sorte":
      return {
        ...base,
        kind: "spinWheel",
        wheelType: String(formState.wheelType ?? existing?.wheelType ?? "Giro Diário"),
        spinFrequency: String(formState.spinFrequency ?? existing?.spinFrequency ?? "Diário"),
        availableSpins: Number(formState.availableSpins ?? existing?.availableSpins ?? 0),
        completedSpins: Number(formState.completedSpins ?? existing?.completedSpins ?? 0),
        totalPrizesWon: Number(formState.totalPrizesWon ?? existing?.totalPrizesWon ?? 0),
        nextSpinAt: String(formState.nextSpinAt ?? existing?.nextSpinAt ?? new Date().toISOString()),
        nextSpinLabel: String(formState.nextSpinLabel ?? existing?.nextSpinLabel ?? "Próximo giro em breve"),
        pointsLabel: String(formState.pointsLabel ?? existing?.pointsLabel ?? "Pontos e benefícios acumulados"),
        benefitsLabel: String(formState.benefitsLabel ?? existing?.benefitsLabel ?? "Clubão + recompensas premium"),
        audienceRule: String(formState.audienceRule ?? existing?.audienceRule ?? "Todos os usuários elegíveis"),
        releaseRule: String(formState.releaseRule ?? existing?.releaseRule ?? "Liberado pelo Admin Master"),
        priorityLabel: String(formState.priorityLabel ?? existing?.priorityLabel ?? "Prioridade normal"),
        campaignLabel: String(formState.campaignLabel ?? existing?.campaignLabel ?? "Campanha contínua"),
        visualTone: String(formState.visualTone ?? existing?.visualTone ?? "blue"),
        rewards: parseSpinRewardsBlueprint(String(formState.rewardsBlueprint ?? "")),
        recentWinners: parseSpinWinnerBlueprint(String(formState.winnerBlueprint ?? "")),
        history: parseSpinHistoryBlueprint(String(formState.historyBlueprint ?? "")),
        rules: parseList(String(formState.rules ?? toMultiline(existing?.rules)))
      };
    case "empresas":
      return {
        ...base,
        kind: "company",
        badge: String(existing?.badge ?? "Ver empresa"),
        accent: String(existing?.accent ?? "blue"),
        logo: String(formState.logo ?? existing?.logo ?? base.image),
        segment: String(formState.segment ?? existing?.segment ?? ""),
        type: String(formState.type ?? existing?.type ?? ""),
        city: String(formState.city ?? existing?.city ?? ""),
        state: String(formState.state ?? existing?.state ?? ""),
        neighborhood: String(existing?.neighborhood ?? "Centro"),
        address: String(formState.address ?? existing?.address ?? ""),
        zipCode: String(formState.zipCode ?? existing?.zipCode ?? ""),
        phone: String(formState.phone ?? existing?.phone ?? ""),
        whatsapp: String(formState.whatsapp ?? existing?.whatsapp ?? ""),
        contactEmail: String(formState.contactEmail ?? existing?.contactEmail ?? ""),
        website: String(formState.website ?? existing?.website ?? ""),
        instagram: String(formState.instagram ?? existing?.instagram ?? ""),
        linkedin: String(formState.linkedin ?? existing?.linkedin ?? ""),
        socialLinks: Array.isArray(existing?.socialLinks) ? existing?.socialLinks : [],
        contactName: String(existing?.contactName ?? "Contato comercial"),
        credentialedStatus: String(formState.credentialedStatus ?? existing?.credentialedStatus ?? ""),
        operatingHours: String(formState.operatingHours ?? existing?.operatingHours ?? ""),
        targetAudience: String(formState.targetAudience ?? existing?.targetAudience ?? ""),
        valueProposition: String(formState.valueProposition ?? existing?.valueProposition ?? ""),
        businessArea: String(formState.businessArea ?? existing?.businessArea ?? ""),
        timeInBusiness: String(formState.timeInBusiness ?? existing?.timeInBusiness ?? ""),
        specialties: parseList(String(formState.specialties ?? toMultiline(existing?.specialties))),
        facts: parseList(String(formState.specialties ?? toMultiline(existing?.facts))),
        chips: parseList(String(formState.tags ?? toMultiline(existing?.chips))),
        linkedOfferIds: parseList(String(formState.linkedOfferIds ?? toMultiline(existing?.linkedOfferIds))),
        linkedProductIds: parseList(String(formState.linkedProductIds ?? toMultiline(existing?.linkedProductIds))),
        linkedServiceIds: parseList(String(formState.linkedServiceIds ?? toMultiline(existing?.linkedServiceIds))),
        linkedCampaignIds: parseList(String(formState.linkedCampaignIds ?? toMultiline(existing?.linkedCampaignIds))),
        linkedOpportunityIds: parseList(String(formState.linkedOpportunityIds ?? toMultiline(existing?.linkedOpportunityIds))),
        latitude: Number(formState.latitude ?? existing?.latitude ?? -26.9),
        longitude: Number(formState.longitude ?? existing?.longitude ?? -48.6),
        mapZoom: Number(formState.mapZoom ?? existing?.mapZoom ?? 15)
      };
    case "listas":
      return {
        ...base,
        kind: "supplierList",
        badge: String(formState.badge ?? existing?.badge ?? "Lista"),
        prompt: String(existing?.prompt ?? ""),
        facts: parseList(String(formState.tags ?? toMultiline(existing?.facts))),
        chips: parseList(String(formState.tags ?? toMultiline(existing?.chips))),
        suppliers: parseSuppliersBlueprint(String(formState.suppliersBlueprint ?? ""))
      };
    case "indicacoes":
      return {
        ...base,
        kind: "referralService",
        companyId: String(existing?.companyId ?? ""),
        companyName: String(formState.companyName ?? existing?.companyName ?? ""),
        valueLabel: String(formState.valueLabel ?? existing?.valueLabel ?? ""),
        rewardLabel: String(formState.rewardLabel ?? existing?.rewardLabel ?? ""),
        rules: parseList(String(formState.rules ?? toMultiline(existing?.rules))),
        criteria: parseList(String(formState.criteria ?? toMultiline(existing?.criteria))),
        deadlineLabel: String(formState.deadlineLabel ?? existing?.deadlineLabel ?? ""),
        facts: parseList(String(formState.criteria ?? toMultiline(existing?.facts))),
        chips: parseList(String(formState.tags ?? toMultiline(existing?.chips)))
      };
    case "oportunidades":
      return {
        ...base,
        kind: "opportunity",
        companyId: String(existing?.companyId ?? ""),
        companyName: String(formState.companyName ?? existing?.companyName ?? ""),
        benefit: String(formState.benefit ?? existing?.benefit ?? ""),
        requirements: parseList(String(formState.requirements ?? toMultiline(existing?.requirements))),
        ctaLabel: String(formState.ctaLabel ?? existing?.ctaLabel ?? "Ver oportunidade"),
        ctaHref: String(formState.ctaHref ?? existing?.ctaHref ?? "/oportunidades"),
        valueLabel: String(formState.valueLabel ?? existing?.valueLabel ?? ""),
        facts: parseList(String(formState.requirements ?? toMultiline(existing?.facts))),
        chips: parseList(String(formState.tags ?? toMultiline(existing?.chips)))
      };
    case "campanhas":
      return {
        ...base,
        kind: "campaign",
        objective: String(formState.objective ?? existing?.objective ?? ""),
        periodLabel: String(formState.periodLabel ?? existing?.periodLabel ?? ""),
        rewardLabel: String(formState.rewardLabel ?? existing?.rewardLabel ?? ""),
        scoreLabel: String(formState.scoreLabel ?? existing?.scoreLabel ?? ""),
        relatedProductIds: Array.isArray(existing?.relatedProductIds) ? existing?.relatedProductIds : [],
        materials: parseList(String(formState.materials ?? toMultiline(existing?.materials))),
        participantCount: Number(existing?.participantCount ?? 0),
        resultsSummary: String(existing?.resultsSummary ?? ""),
        rules: parseList(String(formState.rules ?? toMultiline(existing?.rules)))
      };
    case "missoes":
      return {
        ...base,
        kind: "mission",
        objective: String(formState.objective ?? existing?.objective ?? ""),
        taskLabel: String(formState.taskLabel ?? existing?.taskLabel ?? ""),
        scoreLabel: String(formState.scoreLabel ?? existing?.scoreLabel ?? ""),
        rewardLabel: String(formState.rewardLabel ?? existing?.rewardLabel ?? ""),
        requirements: parseList(String(formState.requirements ?? toMultiline(existing?.requirements))),
        difficulty: String(formState.difficulty ?? existing?.difficulty ?? "Média")
      };
    case "recompensas":
      return {
        ...base,
        kind: "reward",
        rewardType: String(formState.rewardType ?? existing?.rewardType ?? ""),
        valueLabel: String(formState.valueLabel ?? existing?.valueLabel ?? ""),
        pointsRequired: Number(formState.pointsRequired ?? existing?.pointsRequired ?? 0),
        quantityAvailable: Number(formState.quantityAvailable ?? existing?.quantityAvailable ?? 0),
        rules: parseList(String(formState.rules ?? toMultiline(existing?.rules)))
      };
    case "sorteios":
      return {
        ...base,
        kind: "sweepstake",
        sweepstakeType: String(formState.sweepstakeType ?? existing?.sweepstakeType ?? ""),
        prizeLabel: String(formState.prizeLabel ?? existing?.prizeLabel ?? ""),
        rules: parseList(String(formState.rules ?? toMultiline(existing?.rules))),
        participantCount: Number(formState.participantCount ?? existing?.participantCount ?? 0),
        scheduledDate: String(formState.scheduledDate ?? existing?.scheduledDate ?? ""),
        scheduledTime: String(formState.scheduledTime ?? existing?.scheduledTime ?? ""),
        criteria: parseList(String(formState.criteria ?? toMultiline(existing?.criteria))),
        winnerUserId: String(existing?.winnerUserId ?? "")
      };
    case "usuarios":
      return {
        ...(existing ?? {}),
        id: String(existing?.id ?? `user-${globalThis.crypto.randomUUID()}`),
        slug: String(existing?.slug ?? createSlug(String(formState.fullName ?? "usuario"))),
        fullName: String(formState.fullName ?? existing?.fullName ?? ""),
        email: String(formState.email ?? existing?.email ?? ""),
        avatar: String(existing?.avatar ?? "/images/user-avatar-01-v1.png"),
        role: String(existing?.role ?? "USER"),
        status: String(formState.status ?? existing?.status ?? "ATIVO"),
        plan: String(formState.plan ?? existing?.plan ?? "Membro Pro"),
        joinedAt: String(existing?.joinedAt ?? new Date().toISOString()),
        points: Number(formState.points ?? existing?.points ?? 0),
        salesCount: Number(formState.salesCount ?? existing?.salesCount ?? 0),
        commissionTotal: Number(formState.commissionTotal ?? existing?.commissionTotal ?? 0),
        referralsCount: Number(formState.referralsCount ?? existing?.referralsCount ?? 0),
        redeemedCouponsCount: Number(formState.redeemedCouponsCount ?? existing?.redeemedCouponsCount ?? 0),
        rankingPosition: Number(existing?.rankingPosition ?? 0),
        progressPercent: Number(formState.progressPercent ?? existing?.progressPercent ?? 0)
      };
    default:
      return base;
  }
}

function buildSummaryMetrics(db: PlatformDb) {
  return [
    { label: "Usuários cadastrados", value: db.users.length, tone: "blue" },
    { label: "Usuários ativos", value: db.users.filter((item) => item.status === "ATIVO").length, tone: "green" },
    { label: "Produtos publicados", value: db.products.filter((item) => item.status === "PUBLICADO").length, tone: "violet" },
    { label: "Mentorias publicadas", value: db.mentorships.filter((item) => item.status === "PUBLICADO").length, tone: "orange" },
    { label: "Lives agendadas", value: db.lives.filter((item) => item.status === "AGENDADO").length, tone: "blue" },
    { label: "Ofertas ativas", value: db.clubOffers.filter((item) => item.status === "PUBLICADO").length, tone: "green" },
    { label: "Empresas", value: db.companies.length, tone: "orange" },
    { label: "Serviços de indicação", value: db.referralServices.length, tone: "violet" },
    { label: "Oportunidades", value: db.opportunities.length, tone: "blue" },
    { label: "Campanhas", value: db.campaigns.length, tone: "green" },
    { label: "Missões", value: db.missions.length, tone: "violet" },
    { label: "Giro da Sorte", value: db.spinWheels.length, tone: "blue" },
    { label: "Sorteios", value: db.sweepstakes.length, tone: "orange" }
  ];
}

export function AdminMasterClient({
  sectionKey,
  initialDb,
  session
}: {
  sectionKey: AdminMasterSectionKey;
  initialDb: PlatformDb;
  session: AdminSession;
}) {
  const router = useRouter();
  const [db, setDb] = useState(initialDb);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Record<string, string | boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sectionConfig = moduleConfig[sectionKey];
  const sectionRecords = useMemo(() => getCollectionItems(db, sectionKey), [db, sectionKey]);
  const selectedRecord = useMemo(
    () => sectionRecords.find((item) => String(item.id) === selectedId) ?? null,
    [sectionRecords, selectedId]
  );

  const filteredRecords = useMemo(() => {
    return sectionRecords.filter((item) => {
      const title = String(item.title ?? item.fullName ?? "");
      const subtitle = String(item.subtitle ?? item.email ?? "");
      const matchesSearch =
        search.trim().length === 0 ||
        title.toLowerCase().includes(search.toLowerCase()) ||
        subtitle.toLowerCase().includes(search.toLowerCase());
      const recordStatus = String(item.status ?? "ATIVO");
      const matchesStatus = statusFilter === "Todos" || recordStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [sectionRecords, search, statusFilter]);

  const summaryMetrics = useMemo(() => buildSummaryMetrics(db), [db]);

  const openNewRecord = () => {
    setSelectedId(null);
    setFormState({});
    setErrorMessage("");
  };

  const openRecord = (record: RecordShape) => {
    setSelectedId(String(record.id));
    setFormState(recordToForm(sectionKey, record));
    setErrorMessage("");
  };

  const persistMutation = async (body: Record<string, unknown>) => {
    setIsSaving(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const result = (await response.json()) as { ok: boolean; db?: PlatformDb; error?: string };

      if (!response.ok || !result.ok || !result.db) {
        throw new Error(result.error ?? "Não foi possível concluir a ação.");
      }

      setDb(result.db);
      router.refresh();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Erro ao salvar.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveRecord = async () => {
    if (!sectionConfig) {
      return;
    }

    const record = formToRecord(sectionKey, formState, selectedRecord, session, db);
    await persistMutation({
      module: sectionKey,
      action: "save",
      record,
      summary: `${sectionConfig.label} salvo pelo Admin Master.`
    });
    setSelectedId(String(record.id ?? ""));
  };

  const applyStatus = async (status: WorkflowStatus) => {
    if (!sectionConfig) {
      return;
    }

    const nextFormState = { ...formState, status };
    setFormState(nextFormState);
    const record = formToRecord(sectionKey, nextFormState, selectedRecord, session, db);
    await persistMutation({
      module: sectionKey,
      action: "save",
      record,
      summary: `${sectionConfig.label} alterado para ${status}.`
    });
  };

  const duplicateRecord = async (id: string) => {
    await persistMutation({
      module: sectionKey,
      action: "duplicate",
      id,
      summary: `${adminMasterLabels[sectionKey]} duplicado pelo Admin Master.`
    });
  };

  const deleteRecord = async (id: string) => {
    await persistMutation({
      module: sectionKey,
      action: "delete",
      id,
      summary: `${adminMasterLabels[sectionKey]} excluído pelo Admin Master.`
    });
    if (selectedId === id) {
      openNewRecord();
    }
  };

  const renderSummary = () => (
    <div className="master-admin-content">
      <section className="master-admin-hero">
        <div>
          <span>Painel Admin Master</span>
          <h2>Fonte de verdade da plataforma FG EXACTA</h2>
          <p>
            O que o Admin Master publica aqui passa a alimentar o painel do usuário comum, respeitando fluxo editorial, auditoria e disponibilidade.
          </p>
        </div>
        <div className="master-admin-kpi-grid">
          {summaryMetrics.slice(0, 8).map((metric) => (
            <article key={metric.label} className={`master-admin-kpi tone-${metric.tone}`}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="master-admin-grid">
        <div className="master-admin-surface">
          <div className="master-admin-head">
            <div>
              <span>Radar operacional</span>
              <h3>Publicações e módulos</h3>
            </div>
          </div>
          <div className="master-admin-module-grid">
            {adminMasterNavGroups.flatMap((group) => group.items).filter((item) => item.key !== "resumo").map((item) => {
              const count = getCollectionItems(db, item.key).length;
              const href = item.key === "resumo" ? "/admin" : `/admin/${item.key}`;
              return (
                <Link key={item.key} href={href} className="master-admin-module-card">
                  <strong>{item.label}</strong>
                  <p>{count} registros administráveis</p>
                </Link>
              );
            })}
          </div>
        </div>

        <aside className="master-admin-side">
          <div className="master-admin-surface">
            <div className="master-admin-head">
              <div>
                <span>Alertas</span>
                <h3>Pontos de atenção</h3>
              </div>
            </div>
            <ul className="master-admin-list">
              <li>{db.clubOffers.filter((item) => item.status === "AGENDADO").length} ofertas agendadas aguardando janela de publicação.</li>
              <li>{db.lives.filter((item) => item.status === "AGENDADO").length} lives agendadas com transmissão próxima.</li>
              <li>{db.couponRedemptions.filter((item) => item.status === "ATIVO").length} cupons ativos ainda válidos no Clubão.</li>
              <li>{db.referrals.filter((item) => item.status === "EM_ANALISE").length} indicações em análise precisam de acompanhamento.</li>
            </ul>
          </div>

          <div className="master-admin-surface">
            <div className="master-admin-head">
              <div>
                <span>Auditoria recente</span>
                <h3>Últimas alterações</h3>
              </div>
            </div>
            <div className="master-admin-audit-stack">
              {db.auditLog.slice(0, 6).map((entry) => (
                <article key={entry.id} className="master-admin-audit-card">
                  <strong>{entry.entityTitle}</strong>
                  <p>{entry.summary}</p>
                  <small>
                    {entry.changedByName} • {new Date(entry.changedAt).toLocaleString("pt-BR")}
                  </small>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );

  const renderReadOnlySection = () => {
    if (sectionKey === "auditoria") {
      return (
        <div className="master-admin-surface">
          <div className="master-admin-head">
            <div>
              <span>Auditoria</span>
              <h3>Histórico administrativo</h3>
            </div>
          </div>
          <div className="master-admin-table">
            {db.auditLog.map((entry) => (
              <article key={entry.id} className="master-admin-row">
                <strong>{entry.entityTitle}</strong>
                <span>{entry.summary}</span>
                <small>
                  {entry.changedByName} • {entry.action} • {new Date(entry.changedAt).toLocaleString("pt-BR")}
                </small>
              </article>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="master-admin-surface">
        <div className="master-admin-head">
          <div>
            <span>RBAC</span>
            <h3>Perfis administrativos</h3>
          </div>
        </div>
        <div className="master-admin-table">
          <article className="master-admin-row">
            <strong>ADMIN MASTER</strong>
            <span>Controle total sobre publicação, usuários, auditoria e configurações estruturais.</span>
            <small>Backend protegido por permissão `manage:all`.</small>
          </article>
          <article className="master-admin-row">
            <strong>ADMIN</strong>
            <span>Gerencia conteúdo, publicação e leitura operacional da plataforma.</span>
            <small>Pronto para escopos por módulo.</small>
          </article>
          <article className="master-admin-row">
            <strong>EDITOR</strong>
            <span>Prepara rascunhos e revisões, sem controle total de governança.</span>
            <small>Fluxo editorial preparado para aprovação posterior.</small>
          </article>
        </div>
      </div>
    );
  };

  const renderEditableSection = () => {
    if (!sectionConfig) {
      return null;
    }

    const sections = Array.from(new Set(sectionConfig.fields.map((field) => field.section)));

    return (
      <div className="master-admin-content">
        <section className="master-admin-toolbar">
          <div>
            <span>{sectionConfig.label}</span>
            <h2>{sectionConfig.description}</h2>
          </div>
          <div className="master-admin-toolbar-actions">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="master-admin-input"
              placeholder={`Buscar em ${sectionConfig.label.toLowerCase()}...`}
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="master-admin-select">
              <option>Todos</option>
              {workflowOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <button type="button" className="master-admin-primary" onClick={openNewRecord}>
              Novo registro
            </button>
          </div>
        </section>

        <section className="master-admin-grid">
          <div className="master-admin-surface">
            <div className="master-admin-head">
              <div>
                <span>Lista</span>
                <h3>{filteredRecords.length} registros</h3>
              </div>
            </div>
            <div className="master-admin-table">
              {filteredRecords.map((record) => (
                <article key={String(record.id)} className={`master-admin-row${selectedId === String(record.id) ? " is-active" : ""}`}>
                  <div className="master-admin-row-main" onClick={() => openRecord(record)}>
                    {"image" in record ? (
                      <ManagedMedia
                        alt={String(record.title ?? record.fullName ?? "Registro")}
                        sizeLabel="512 x 512"
                        src={String(record.image ?? record.logo ?? record.avatar ?? defaultMedia[0])}
                        className="managed-media-admin-table-avatar managed-media-fit-contain"
                        tone="soft"
                      />
                    ) : null}
                    <div>
                      <strong>{String(record.title ?? record.fullName ?? "Registro")}</strong>
                      <p>{String(record.subtitle ?? record.email ?? record.shortDescription ?? "")}</p>
                      <small>{String(record.status ?? record.plan ?? "")}</small>
                    </div>
                  </div>
                  <div className="master-admin-row-actions">
                    <button type="button" className="master-admin-inline" onClick={() => duplicateRecord(String(record.id))}>
                      Duplicar
                    </button>
                    <button type="button" className="master-admin-inline is-danger" onClick={() => deleteRecord(String(record.id))}>
                      Excluir
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="master-admin-editor">
            <div className="master-admin-surface">
              <div className="master-admin-head">
                <div>
                  <span>Editor</span>
                  <h3>{selectedRecord ? "Editar registro" : "Criar novo registro"}</h3>
                </div>
              </div>

              {errorMessage ? <div className="master-admin-error">{errorMessage}</div> : null}

              <div className="master-admin-editor-stack">
                {sections.map((sectionTitle) => (
                  <section key={sectionTitle} className="master-admin-form-section">
                    <h4>{sectionTitle}</h4>
                    <div className="master-admin-form-grid">
                      {sectionConfig.fields
                        .filter((field) => field.section === sectionTitle)
                        .map((field) => {
                          const value = formState[field.name] ?? (field.type === "boolean" ? false : "");

                          if (field.type === "textarea") {
                            return (
                              <label key={field.name} className="master-admin-field master-admin-field-wide">
                                <span>{field.label}</span>
                                <textarea
                                  value={String(value)}
                                  onChange={(event) => setFormState((current) => ({ ...current, [field.name]: event.target.value }))}
                                  placeholder={field.placeholder}
                                />
                              </label>
                            );
                          }

                          if (field.type === "list") {
                            return (
                              <label key={field.name} className="master-admin-field master-admin-field-wide">
                                <span>{field.label}</span>
                                <textarea
                                  value={String(value)}
                                  onChange={(event) => setFormState((current) => ({ ...current, [field.name]: event.target.value }))}
                                  placeholder="Um item por linha"
                                />
                              </label>
                            );
                          }

                          if (field.type === "boolean") {
                            return (
                              <label key={field.name} className="master-admin-check">
                                <input
                                  type="checkbox"
                                  checked={Boolean(value)}
                                  onChange={(event) => setFormState((current) => ({ ...current, [field.name]: event.target.checked }))}
                                />
                                <span>{field.label}</span>
                              </label>
                            );
                          }

                          if (field.type === "select") {
                            return (
                              <label key={field.name} className="master-admin-field">
                                <span>{field.label}</span>
                                <select
                                  value={String(value)}
                                  onChange={(event) => setFormState((current) => ({ ...current, [field.name]: event.target.value }))}
                                >
                                  {(field.options ?? []).map((option) => (
                                    <option key={option}>{option}</option>
                                  ))}
                                </select>
                              </label>
                            );
                          }

                          return (
                            <label key={field.name} className="master-admin-field">
                              <span>{field.label}</span>
                              <input
                                type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                                value={String(value)}
                                onChange={(event) => setFormState((current) => ({ ...current, [field.name]: event.target.value }))}
                                placeholder={field.placeholder}
                              />
                            </label>
                          );
                        })}
                    </div>
                  </section>
                ))}
              </div>

              <div className="master-admin-editor-actions">
                <button type="button" className="master-admin-primary" onClick={saveRecord} disabled={isSaving}>
                  {isSaving ? "Salvando..." : "Salvar registro"}
                </button>
                <button type="button" className="master-admin-inline" onClick={() => applyStatus("PUBLICADO")} disabled={isSaving}>
                  Publicar
                </button>
                <button type="button" className="master-admin-inline" onClick={() => applyStatus("PAUSADO")} disabled={isSaving}>
                  Pausar
                </button>
                <button type="button" className="master-admin-inline" onClick={() => applyStatus("ARQUIVADO")} disabled={isSaving}>
                  Arquivar
                </button>
                {selectedRecord && sectionConfig.getPreviewHref ? (
                  <Link href={sectionConfig.getPreviewHref(selectedRecord) ?? "#"} className="master-admin-inline">
                    {sectionConfig.previewLabel ?? "Visualizar como usuário"}
                  </Link>
                ) : null}
              </div>
            </div>
          </aside>
        </section>
      </div>
    );
  };

  return (
    <div className="admin-shell master-admin-shell">
      <aside className="admin-sidebar master-admin-sidebar">
        <div className="brand-row">
          <div>
            <p className="brand-title">FG EXACTA</p>
            <p className="brand-subtitle">admin master</p>
          </div>
        </div>

        <div className="workspace-card master-admin-workspace">
          <div className="workspace-avatar">A</div>
          <div className="workspace-copy">
            <strong>{session.fullName}</strong>
            <span>{session.role}</span>
          </div>
        </div>

        {adminMasterNavGroups.map((group) => (
          <div key={group.label} className="sidebar-group">
            <span className="sidebar-label">{group.label}</span>
            <nav className="sidebar-nav" aria-label={group.label}>
              {group.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.key === "resumo" ? "/admin" : `/admin/${item.key}`}
                  className={`nav-item${item.key === sectionKey ? " is-active" : ""}`}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </aside>

      <main className="admin-content master-admin-main">
        <header className="admin-topbar master-admin-topbar">
          <div>
            <p className="breadcrumb">FG EXACTA / ADMIN MASTER / {adminMasterLabels[sectionKey].toUpperCase()}</p>
            <h1>{adminMasterLabels[sectionKey]}</h1>
          </div>
          <div className="topbar-actions">
            <Link href="/" className="hero-link-button hero-link-button-secondary">
              Ir para painel do usuário
            </Link>
          </div>
        </header>

        {sectionKey === "resumo" ? renderSummary() : sectionKey === "auditoria" || sectionKey === "administradores" ? renderReadOnlySection() : renderEditableSection()}
      </main>
    </div>
  );
}
