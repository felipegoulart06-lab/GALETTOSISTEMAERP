const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/admin-master-client.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const oldStr = `    fields: [
      { name: "title", label: "Nome da empresa", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
      { name: "description", label: "Descrição completa", type: "textarea", section: "Descrição" },
      { name: "logo", label: "Logo", type: "text", section: "Mídia" },
      { name: "image", label: "Imagem principal", type: "text", section: "Mítia" },
      { name: "category", label: "Categoria", type: "text", section: "Operação" },
      { name: "segment", label: "Segmento", type: "text", section: "Operação" },
      { name: "type", label: "Tipo / descrição comercial", type: "text", section: "Operação" },
      { name: "address", label: "Endereço", type: "text", section: "Contato" },
      { name: "city", label: "Cidade", type: "text", section: "Contato" },
      { name: "state", label: "Estado", type: "text", section: "Contato" },
      { name: "phone", label: "Telefone", type: "text", section: "Contato" },
      { name: "contactEmail", label: "E-mail", type: "text", section: "Contato" },
      { name: "website", label: "Site", type: "text", section: "Contato" },
      { name: "specialties", label: "Benefícios / especialidades (1 por linha)", type: "list", section: "Operação" },
      { name: "credentialedStatus", label: "Status comercial", type: "text", section: "Operação" },
      { name: "linkedProductIds", label: "IDs de produtos vinculados (1 por linha)", type: "list", section: "Relações" },
      { name: "linkedOfferIds", label: "IDs de ofertas vinculadas (1 por linha)", type: "list", section: "Relações" },
      { name: "linkedServiceIds", label: "IDs de serviços vinculados (1 por linha)", type: "list", section: "Relações" },
      { name: "linkedCampaignIds", label: "IDs de campanhas vinculadas (1 por linha)", type: "list", section: "Relações" },
      { name: "linkedOpportunityIds", label: "IDs de oportunidades vinculadas (1 por linha)", type: "list", section: "Relações" },
      { name: "status", label: "Status", type: "select", section: "Governança", options: workflowOptions },
      { name: "featured", label: "Destaque", type: "boolean", section: "Governança" },
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }`;

const newStr = `    fields: [
      { name: "title", label: "Nome da empresa", type: "text", section: "Identidade" },
      { name: "subtitle", label: "Subtítulo", type: "text", section: "Identidade" },
      { name: "shortDescription", label: "Descrição curta", type: "textarea", section: "Descrição" },
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
      { name: "tags", label: "Tags (1 por linha)", type: "list", section: "Governança" }]
`;

if(content.includes(oldStr)) {
   content = content.replace(oldStr, newStr);
   fs.writeFileSync(filePath, content, 'utf8');
   console.log("Replaced successfully!");
} else {
   console.log("Could not find oldStr!");
}

