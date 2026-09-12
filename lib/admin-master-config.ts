export type AdminMasterSectionKey =
  | "resumo"
  | "solicitacoes"
  | "usuarios"
  | "produtos"
  | "mentorias"
  | "lives"
  | "clubao"
  | "giro-da-sorte"
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
  | "financeiro"
  | "relatorios"
  | "notificacoes"
  | "equipe"
  | "auditoria"
  | "administradores"
  | "configuracoes";

export interface AdminMasterNavItem {
  key: AdminMasterSectionKey;
  label: string;
}

export interface AdminMasterNavGroup {
  label: string;
  items: AdminMasterNavItem[];
}

export const adminMasterNavGroups: AdminMasterNavGroup[] = [
  {
    label: "Controle",
    items: [
      { key: "resumo", label: "Resumo" },
      { key: "solicitacoes", label: "Solicitações" },
      { key: "usuarios", label: "Usuários" },
      { key: "auditoria", label: "Auditoria" }
    ]
  },
  {
    label: "Conteúdo comercial",
    items: [
      { key: "produtos", label: "Produtos" },
      { key: "lives", label: "Lives" },
      { key: "empresas", label: "Empresas" },
      { key: "indicacoes", label: "Indicações" },
      { key: "oportunidades", label: "Oportunidades" },
      { key: "campanhas", label: "Campanhas" }
    ]
  },
  {
    label: "Experiência do usuário",
    items: [
      { key: "mentorias", label: "Mentorias" },
      { key: "clubao", label: "Clubão" },
      { key: "giro-da-sorte", label: "Giro da Sorte" },
      { key: "listas", label: "Listas" },
      { key: "divulgue", label: "Divulgue" },
      { key: "missoes", label: "Missões" },
      { key: "ranking", label: "Ranking" },
      { key: "recompensas", label: "Recompensas" },
      { key: "sorteios", label: "Sorteios" }
    ]
  },
  {
    label: "Operação",
    items: [
      { key: "financeiro", label: "Financeiro" },
      { key: "relatorios", label: "Relatórios" },
      { key: "notificacoes", label: "Notificações" }
    ]
  },
  {
    label: "Administração",
    items: [
      { key: "equipe", label: "Equipe" },
      { key: "administradores", label: "Administradores" },
      { key: "configuracoes", label: "Configurações" }
    ]
  }
];

export const adminMasterSectionOrder = adminMasterNavGroups.flatMap((group) => group.items.map((item) => item.key));

export const adminMasterLabels: Record<AdminMasterSectionKey, string> = {
  resumo: "Resumo",
  solicitacoes: "Solicitações",
  usuarios: "Usuários",
  produtos: "Produtos",
  mentorias: "Mentorias",
  lives: "Lives",
  clubao: "Clubão",
  "giro-da-sorte": "Giro da Sorte",
  empresas: "Empresas",
  listas: "Listas",
  indicacoes: "Indicações",
  oportunidades: "Oportunidades",
  campanhas: "Campanhas",
  divulgue: "Divulgue",
  missoes: "Missões",
  ranking: "Ranking",
  recompensas: "Recompensas",
  sorteios: "Sorteios",
  financeiro: "Financeiro",
  relatorios: "Relatórios",
  notificacoes: "Notificações",
  equipe: "Equipe",
  auditoria: "Auditoria",
  administradores: "Administradores",
  configuracoes: "Configurações"
};
