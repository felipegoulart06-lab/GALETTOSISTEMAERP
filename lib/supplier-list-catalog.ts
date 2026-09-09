export interface SupplierListItem {
  title: string;
  subtitle: string;
  meta: string;
  badge: string;
  prompt: string;
  chips: string[];
  facts: string[];
}

export const supplierListCatalog: SupplierListItem[] = [
  {
    title: "Lista de fornecedores de crédito",
    subtitle: "Operações para crédito, capital de giro, antecipação e soluções financeiras B2B.",
    meta: "Leads de crédito • análise comercial • operação nacional",
    badge: "Crédito",
    prompt: "brazilian commercial credit suppliers directory thumbnail, financial service partners, realistic corporate visual",
    chips: ["Crédito", "Financeiro", "B2B"],
    facts: ["Capital de giro", "Antecipação", "Rede comercial"]
  },
  {
    title: "Lista de fornecedores de produtos agrícolas",
    subtitle: "Contatos de insumos, sementes, defensivos e operação para o agro.",
    meta: "Agro • insumos • distribuição regional",
    badge: "Agrícola",
    prompt: "agricultural suppliers list thumbnail, seeds fertilizers farm products directory, realistic brazil agribusiness visual",
    chips: ["Agro", "Insumos", "Distribuição"],
    facts: ["Sementes", "Defensivos", "Compra em volume"]
  },
  {
    title: "Lista de fornecedores de eletrônicos",
    subtitle: "Mix de tecnologia, acessórios, áudio, vídeo e utilidades eletrônicas.",
    meta: "Tecnologia • alto giro • atacado",
    badge: "Eletrônicos",
    prompt: "electronics wholesale suppliers list thumbnail, gadgets accessories boxes, realistic commerce visual",
    chips: ["Eletrônicos", "Tecnologia", "Giro"],
    facts: ["Acessórios", "Áudio", "Vídeo"]
  },
  {
    title: "Lista de fornecedores de moda feminina",
    subtitle: "Contatos de confecção, private label, tendências e atacado feminino.",
    meta: "Moda feminina • coleções • atacado",
    badge: "Moda",
    prompt: "women fashion wholesale suppliers thumbnail, clothing racks and apparel distribution, realistic retail visual",
    chips: ["Moda", "Feminina", "Coleções"],
    facts: ["Confecção", "Private label", "Tendência"]
  },
  {
    title: "Lista de fornecedores de moda masculina",
    subtitle: "Operação para camisaria, jeans, alfaiataria e básicos masculinos.",
    meta: "Moda masculina • atacado • mix básico e premium",
    badge: "Masculino",
    prompt: "mens fashion wholesale suppliers thumbnail, shirts jeans tailoring apparel, realistic commercial visual",
    chips: ["Moda", "Masculina", "Atacado"],
    facts: ["Jeans", "Básicos", "Alfaiataria"]
  },
  {
    title: "Lista de fornecedores infantis",
    subtitle: "Fornecedores de roupas, acessórios, calçados e utilidades infantis.",
    meta: "Infantil • confecção • acessórios",
    badge: "Infantil",
    prompt: "children products suppliers list thumbnail, kids clothing and accessories wholesale, realistic retail visual",
    chips: ["Infantil", "Confecção", "Acessórios"],
    facts: ["Roupas", "Calçados", "Utilidades"]
  },
  {
    title: "Lista de fornecedores de calçados",
    subtitle: "Marcas e fábricas para tênis, sapatos, chinelos e linha casual.",
    meta: "Calçados • fábricas • atacado",
    badge: "Calçados",
    prompt: "footwear wholesale suppliers thumbnail, shoes sneakers sandals distribution, realistic commercial scene",
    chips: ["Calçados", "Tênis", "Fábricas"],
    facts: ["Casual", "Esportivo", "Linha premium"]
  },
  {
    title: "Lista de fornecedores de cosméticos",
    subtitle: "Distribuição de perfumaria, skincare, maquiagem e beleza profissional.",
    meta: "Beleza • cosméticos • operação recorrente",
    badge: "Cosméticos",
    prompt: "cosmetics suppliers list thumbnail, skincare makeup perfume wholesale, realistic beauty commerce visual",
    chips: ["Beleza", "Skincare", "Perfumaria"],
    facts: ["Makeup", "Skincare", "Beleza profissional"]
  },
  {
    title: "Lista de fornecedores de suplementos",
    subtitle: "Nutrição esportiva, vitaminas, proteínas e produtos de bem-estar.",
    meta: "Suplementos • saúde • alta recorrência",
    badge: "Suplementos",
    prompt: "supplements suppliers list thumbnail, protein vitamins sports nutrition wholesale, realistic fitness commerce visual",
    chips: ["Suplementos", "Fitness", "Saúde"],
    facts: ["Proteínas", "Vitaminas", "Recorrência"]
  },
  {
    title: "Lista de fornecedores de utilidades domésticas",
    subtitle: "Itens de cozinha, organização, limpeza e utilidades para casa.",
    meta: "Casa • utilidades • giro rápido",
    badge: "Utilidades",
    prompt: "home utilities suppliers list thumbnail, kitchen organization household items wholesale, realistic commerce visual",
    chips: ["Casa", "Cozinha", "Utilidades"],
    facts: ["Organização", "Cozinha", "Limpeza"]
  },
  {
    title: "Lista de fornecedores de móveis",
    subtitle: "Catálogo de móveis planejados, decorativos e linha corporativa.",
    meta: "Móveis • decoração • linha corporativa",
    badge: "Móveis",
    prompt: "furniture suppliers list thumbnail, home office and decor wholesale, realistic showroom visual",
    chips: ["Móveis", "Decoração", "Corporativo"],
    facts: ["Planejados", "Office", "Showroom"]
  },
  {
    title: "Lista de fornecedores automotivos",
    subtitle: "Peças, acessórios, som, estética automotiva e linha leve.",
    meta: "Automotivo • peças • acessórios",
    badge: "Automotivo",
    prompt: "automotive suppliers list thumbnail, car parts accessories detailing wholesale, realistic garage commerce visual",
    chips: ["Automotivo", "Peças", "Acessórios"],
    facts: ["Som", "Estética", "Linha leve"]
  },
  {
    title: "Lista de fornecedores de construção",
    subtitle: "Materiais de obra, acabamento, hidráulica, elétrica e ferragens.",
    meta: "Construção • obra • acabamento",
    badge: "Construção",
    prompt: "construction material suppliers list thumbnail, hardware finishing electrical wholesale, realistic building commerce visual",
    chips: ["Construção", "Obra", "Ferragens"],
    facts: ["Acabamento", "Hidráulica", "Elétrica"]
  },
  {
    title: "Lista de fornecedores de pet shop",
    subtitle: "Rações, acessórios, higiene, brinquedos e linha pet em atacado.",
    meta: "Pet • higiene • alimentação",
    badge: "Pet",
    prompt: "pet shop suppliers list thumbnail, pet food accessories hygiene wholesale, realistic retail visual",
    chips: ["Pet", "Rações", "Acessórios"],
    facts: ["Higiene", "Brinquedos", "Alimentação"]
  },
  {
    title: "Lista de fornecedores de embalagens",
    subtitle: "Soluções para e-commerce, delivery, lojas e operação industrial.",
    meta: "Embalagens • e-commerce • delivery",
    badge: "Embalagens",
    prompt: "packaging suppliers list thumbnail, ecommerce boxes labels delivery packaging wholesale, realistic logistics visual",
    chips: ["Embalagens", "Delivery", "E-commerce"],
    facts: ["Caixas", "Etiquetas", "Personalização"]
  },
  {
    title: "Lista de fornecedores de papelaria",
    subtitle: "Papelaria fina, material escolar, escritório e brindes personalizados.",
    meta: "Papelaria • escritório • escolar",
    badge: "Papelaria",
    prompt: "stationery suppliers list thumbnail, office school supplies wholesale, realistic colorful commerce visual",
    chips: ["Papelaria", "Escolar", "Escritório"],
    facts: ["Brindes", "Escritório", "Material escolar"]
  },
  {
    title: "Lista de fornecedores de informática",
    subtitle: "Notebooks, periféricos, redes, acessórios e linha corporativa de TI.",
    meta: "Informática • periféricos • TI",
    badge: "Informática",
    prompt: "computer suppliers list thumbnail, laptops peripherals networking wholesale, realistic technology commerce visual",
    chips: ["Informática", "TI", "Periféricos"],
    facts: ["Notebooks", "Redes", "Acessórios"]
  },
  {
    title: "Lista de fornecedores hospitalares",
    subtitle: "Equipamentos, descartáveis, EPIs e materiais para área da saúde.",
    meta: "Hospitalar • saúde • suprimentos",
    badge: "Hospitalar",
    prompt: "hospital suppliers list thumbnail, medical equipment disposable supplies wholesale, realistic healthcare commerce visual",
    chips: ["Hospitalar", "Saúde", "EPIs"],
    facts: ["Descartáveis", "Equipamentos", "Suprimentos"]
  },
  {
    title: "Lista de fornecedores de alimentos",
    subtitle: "Distribuição de secos, congelados, bebidas e linha food service.",
    meta: "Alimentos • food service • distribuição",
    badge: "Alimentos",
    prompt: "food suppliers list thumbnail, wholesale groceries frozen drinks food service, realistic distribution visual",
    chips: ["Alimentos", "Food service", "Distribuição"],
    facts: ["Secos", "Congelados", "Bebidas"]
  },
  {
    title: "Lista de fornecedores de bebidas",
    subtitle: "Operação para adegas, bares, eventos e distribuição de bebidas.",
    meta: "Bebidas • eventos • atacado",
    badge: "Bebidas",
    prompt: "beverage suppliers list thumbnail, wholesale drinks event distribution, realistic bar warehouse visual",
    chips: ["Bebidas", "Eventos", "Distribuição"],
    facts: ["Adegas", "Bares", "Eventos"]
  },
  {
    title: "Lista de fornecedores de energia solar",
    subtitle: "Equipamentos, kits, inversores e integradores para energia solar.",
    meta: "Solar • equipamentos • integração",
    badge: "Energia solar",
    prompt: "solar energy suppliers list thumbnail, panels inverters kits wholesale, realistic clean energy commerce visual",
    chips: ["Solar", "Energia", "Equipamentos"],
    facts: ["Painéis", "Inversores", "Kits"]
  }
];
