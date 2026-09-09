export type AdminMasterSectionKey =
  | "resumo"
  | "usuarios"
  | "produtos"
  | "mentorias"
  | "lives"
  | "clubao"
  | "empresas"
  | "listas"
  | "indicacoes"
  | "oportunidades"
  | "campanhas"
  | "missoes"
  | "recompensas"
  | "sorteios"
  | "auditoria"
  | "administradores";

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
    label: "Visão geral",
    items: [
      { key: "resumo", label: "Resumo" },
      { key: "usuarios", label: "Usuários" },
      { key: "auditoria", label: "Auditoria" },
      { key: "administradores", label: "Administradores" }
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
      { key: "listas", label: "Listas" },
      { key: "missoes", label: "Missões" },
      { key: "recompensas", label: "Recompensas" },
      { key: "sorteios", label: "Sorteios" }
    ]
  }
];

export const adminMasterSectionOrder = adminMasterNavGroups.flatMap((group) => group.items.map((item) => item.key));

export const adminMasterLabels: Record<AdminMasterSectionKey, string> = {
  resumo: "Resumo",
  usuarios: "Usuários",
  produtos: "Produtos",
  mentorias: "Mentorias",
  lives: "Lives",
  clubao: "Clubão",
  empresas: "Empresas",
  listas: "Listas",
  indicacoes: "Indicações",
  oportunidades: "Oportunidades",
  campanhas: "Campanhas",
  missoes: "Missões",
  recompensas: "Recompensas",
  sorteios: "Sorteios",
  auditoria: "Auditoria",
  administradores: "Administradores"
};
