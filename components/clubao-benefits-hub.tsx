"use client";

import { useEffect, useMemo, useState } from "react";
import { ManagedMedia } from "@/components/managed-media";

type OfferState = "DISPONÍVEL" | "PRÓXIMA DO FIM" | "RESGATADA" | "ESGOTADA" | "ENCERRADA";
type CouponStatus = "ATIVO" | "EXPIRADO" | "UTILIZADO";

interface ClubOffer {
  id: string;
  offerCode: string;
  title: string;
  subtitle: string;
  shortLabel: string;
  description: string;
  image: string;
  partnerName: string;
  partnerLocation: string;
  category: string;
  discountLabel: string;
  originalPrice?: string;
  discountedPrice?: string;
  startAt: string;
  endAt: string;
  validityLabel: string;
  redemptionLimit: number;
  redeemedCount: number;
  singleUsePerUser: boolean;
  rules: string[];
  conditions: string[];
  importantInfo: string[];
}

interface ClubUserProfile {
  id: string;
  fullName: string;
  email: string;
}

interface CouponRedemption {
  id: string;
  couponId: string;
  publicCode?: string;
  offerTitle?: string;
  qrValidationToken?: string;
  userId: string;
  userName: string;
  userEmail: string;
  offerId: string;
  couponCode: string;
  validationToken: string;
  qrPayload: string;
  redeemedAt: string;
  validUntil: string;
  status: CouponStatus;
  pdfReference: string;
  downloadCount?: number;
  downloadedAt?: string;
}

const STORAGE_KEY = "fgexacta.clubao.redemptions.v2";

const image = (prompt: string, imageSize = "landscape_16_9") =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${imageSize}`;

const CURRENT_USER: ClubUserProfile = {
  id: "usr-felipe-goulart-01",
  fullName: "Felipe Goulart",
  email: "felipe@fgexacta.com"
};

const addTime = (base: Date, days: number, hours = 0, minutes = 0) =>
  new Date(base.getTime() + days * 86400000 + hours * 3600000 + minutes * 60000).toISOString();

function buildOffers(base = new Date()): ClubOffer[] {
  return [
    {
      id: "offer-restaurant",
      offerCode: "OFR-REST-01",
      title: "Desconto em restaurante",
      subtitle: "Menu degustação com benefício para membros",
      shortLabel: "Restaurante italiano parceiro",
      description:
        "Oferta exclusiva no restaurante Casa Nobile com experiência gastronômica premium, menu de entrada + prato principal e atendimento prioritário para membros do Clubão.",
      image: image("luxury restaurant dining offer, elegant italian table setting, premium lifestyle, realistic"),
      partnerName: "Casa Nobile Cucina",
      partnerLocation: "Balneário Camboriú • SC",
      category: "Gastronomia",
      discountLabel: "25% OFF no menu degustação",
      originalPrice: "R$ 219,00",
      discountedPrice: "R$ 164,25",
      startAt: addTime(base, -1, -3),
      endAt: addTime(base, 9, 4),
      validityLabel: "Válido para jantar e reservas antecipadas",
      redemptionLimit: 240,
      redeemedCount: 108,
      singleUsePerUser: true,
      rules: [
        "Válido de segunda a quinta para mesa de até 4 pessoas.",
        "Necessário apresentar o cupom junto com documento.",
        "Não cumulativo com outras promoções."
      ],
      conditions: [
        "Reserva com 6h de antecedência.",
        "Uso único por usuário.",
        "Sujeito à disponibilidade da casa."
      ],
      importantInfo: [
        "Estacionamento conveniado com 2h de cortesia.",
        "Benefício válido apenas na unidade principal."
      ]
    },
    {
      id: "offer-hotel",
      offerCode: "OFR-HOTL-02",
      title: "Desconto em hotel",
      subtitle: "Hospedagem premium de fim de semana",
      shortLabel: "Hotel boutique com spa incluso",
      description:
        "Oferta especial no Aurora Boutique Hotel com tarifa reduzida, café da manhã premium, acesso ao spa e late checkout para membros do Clubão.",
      image: image("luxury boutique hotel offer with premium room and spa view, realistic"),
      partnerName: "Aurora Boutique Hotel",
      partnerLocation: "Gramado • RS",
      category: "Hotelaria",
      discountLabel: "30% OFF em hospedagem selecionada",
      originalPrice: "R$ 1.180,00",
      discountedPrice: "R$ 826,00",
      startAt: addTime(base, -2),
      endAt: addTime(base, 1, 7),
      validityLabel: "Oferta próxima do fim",
      redemptionLimit: 120,
      redeemedCount: 89,
      singleUsePerUser: true,
      rules: [
        "Válido para check-in até domingo.",
        "Necessário agendamento com confirmação do parceiro.",
        "Não válido em feriados prolongados."
      ],
      conditions: [
        "Uma reserva por usuário.",
        "Apresentar voucher no check-in.",
        "Sujeito à disponibilidade de quartos."
      ],
      importantInfo: ["Café da manhã premium incluso.", "Late checkout até 14h conforme disponibilidade."]
    },
    {
      id: "offer-travel",
      offerCode: "OFR-TRVL-03",
      title: "Desconto em viagens",
      subtitle: "Pacote com passagem e hospedagem",
      shortLabel: "Agência com roteiros exclusivos",
      description:
        "Condição especial na Travel Key para pacotes nacionais com passagem, hotel e suporte de concierge para membros do Clubão.",
      image: image("premium travel offer with beach destination, flight and resort package, realistic"),
      partnerName: "Travel Key Experience",
      partnerLocation: "Atendimento nacional",
      category: "Viagens",
      discountLabel: "R$ 600 OFF em pacotes selecionados",
      originalPrice: "R$ 4.990,00",
      discountedPrice: "R$ 4.390,00",
      startAt: addTime(base, -4),
      endAt: addTime(base, 15),
      validityLabel: "Válido para embarque em até 60 dias",
      redemptionLimit: 80,
      redeemedCount: 22,
      singleUsePerUser: true,
      rules: [
        "Cupom aplicado em pacotes acima de R$ 3.500.",
        "Não cumulativo com promoções sazonais.",
        "Reembolso segue a política do parceiro."
      ],
      conditions: ["Uso único.", "Sujeito a datas elegíveis.", "Atendimento com consultor dedicado."],
      importantInfo: ["Inclui concierge digital.", "Taxas aeroportuárias não inclusas."]
    },
    {
      id: "offer-fitness",
      offerCode: "OFR-FITN-04",
      title: "Desconto em academia",
      subtitle: "Plano trimestral com aula premium",
      shortLabel: "Academia com estúdio e personal class",
      description:
        "Plano trimestral com valor reduzido, avaliação física e uma aula premium de personal class para novos membros da rede Core Move.",
      image: image("premium gym membership offer, modern fitness studio with stylish equipment, realistic"),
      partnerName: "Core Move Club",
      partnerLocation: "Itajaí • SC",
      category: "Bem-estar",
      discountLabel: "35% OFF no plano trimestral",
      originalPrice: "R$ 599,00",
      discountedPrice: "R$ 389,00",
      startAt: addTime(base, -3),
      endAt: addTime(base, 20),
      validityLabel: "Ativação presencial em até 7 dias",
      redemptionLimit: 160,
      redeemedCount: 47,
      singleUsePerUser: true,
      rules: ["Apenas para novos contratos.", "Necessário agendar avaliação física.", "Uso pessoal e intransferível."],
      conditions: ["Uma ativação por CPF.", "Documentação básica no check-in.", "Válido nas unidades participantes."],
      importantInfo: ["Inclui uma aula premium experimental.", "Armário digital disponível na unidade."]
    },
    {
      id: "offer-tech",
      offerCode: "OFR-TECH-05",
      title: "Desconto em tecnologia",
      subtitle: "Acessórios premium e gadgets selecionados",
      shortLabel: "Oferta encerrada por lote esgotado",
      description:
        "Campanha relâmpago para produtos de tecnologia com seleção de fones, hubs e acessórios premium da Nexus Gear.",
      image: image("premium technology sale with gadgets and headphones on dark elegant surface, realistic"),
      partnerName: "Nexus Gear Store",
      partnerLocation: "E-commerce parceiro",
      category: "Tecnologia",
      discountLabel: "Até 40% OFF em gadgets",
      originalPrice: "R$ 799,00",
      discountedPrice: "R$ 479,00",
      startAt: addTime(base, -5),
      endAt: addTime(base, 6),
      validityLabel: "Lote esgotado",
      redemptionLimit: 150,
      redeemedCount: 150,
      singleUsePerUser: true,
      rules: ["Oferta válida enquanto durarem os estoques.", "Cupom vinculado ao e-commerce do parceiro."],
      conditions: ["Sem nova emissão após esgotar.", "Frete calculado no checkout."],
      importantInfo: ["Produto sujeito à variação de disponibilidade.", "Lote encerrado nesta rodada."]
    },
    {
      id: "offer-courses",
      offerCode: "OFR-COUR-06",
      title: "Desconto em cursos",
      subtitle: "Trilha premium com aulas e bônus",
      shortLabel: "Curso parceiro com certificado",
      description:
        "Benefício para uma trilha parceira com certificado, aulas gravadas, encontros bônus e material complementar liberado no resgate.",
      image: image("premium online course offer with laptop, elegant study desk and learning dashboard, realistic"),
      partnerName: "Skill Masters Academy",
      partnerLocation: "Plataforma online",
      category: "Educação",
      discountLabel: "50% OFF na trilha completa",
      originalPrice: "R$ 1.240,00",
      discountedPrice: "R$ 620,00",
      startAt: addTime(base, -1),
      endAt: addTime(base, 12),
      validityLabel: "Acesso liberado após validação do cupom",
      redemptionLimit: 200,
      redeemedCount: 74,
      singleUsePerUser: true,
      rules: ["Válido em uma compra por usuário.", "Ativação mediante e-mail do parceiro.", "Não reembolsável após ativação."],
      conditions: ["Certificado digital incluso.", "Suporte em horário comercial.", "Acesso individual."],
      importantInfo: ["Material complementar incluso.", "Bônus liberado em até 24h."]
    },
    {
      id: "offer-auto",
      offerCode: "OFR-AUTO-07",
      title: "Desconto em serviços automotivos",
      subtitle: "Revisão premium com check-up completo",
      shortLabel: "Centro automotivo parceiro",
      description:
        "Revisão com alinhamento, check-up de 20 itens e mão de obra especial para membros da plataforma.",
      image: image("premium automotive service offer with luxury car workshop and detailing, realistic"),
      partnerName: "Torque Prime Center",
      partnerLocation: "Joinville • SC",
      category: "Automotivo",
      discountLabel: "20% OFF na revisão premium",
      originalPrice: "R$ 540,00",
      discountedPrice: "R$ 432,00",
      startAt: addTime(base, -2),
      endAt: addTime(base, 8),
      validityLabel: "Uso com agendamento",
      redemptionLimit: 90,
      redeemedCount: 33,
      singleUsePerUser: true,
      rules: ["Necessário agendar com antecedência mínima de 24h.", "Válido para carros de passeio."],
      conditions: ["Peças extras não inclusas.", "Uso único por placa."],
      importantInfo: ["Sala VIP com café no local.", "Válido apenas na unidade Joinville."]
    },
    {
      id: "offer-beauty",
      offerCode: "OFR-BEAU-08",
      title: "Desconto em beleza e estética",
      subtitle: "Pacote premium de estética facial",
      shortLabel: "Oferta já resgatada por este usuário",
      description:
        "Protocolo facial com avaliação, limpeza premium e sessão de hidratação profunda em clínica parceira do Clubão.",
      image: image("premium beauty and aesthetic treatment offer in elegant clinic, realistic"),
      partnerName: "Maison Lumière Estética",
      partnerLocation: "Florianópolis • SC",
      category: "Beleza e estética",
      discountLabel: "R$ 180 OFF no protocolo facial",
      originalPrice: "R$ 690,00",
      discountedPrice: "R$ 510,00",
      startAt: addTime(base, -6),
      endAt: addTime(base, 14),
      validityLabel: "Resgate único por usuário",
      redemptionLimit: 140,
      redeemedCount: 54,
      singleUsePerUser: true,
      rules: ["Necessária avaliação prévia.", "Uso único por CPF.", "Não cumulativo."],
      conditions: ["Agendamento obrigatório.", "A clínica pode solicitar confirmação por telefone."],
      importantInfo: ["Inclui kit pós-procedimento.", "Unidades elegíveis informadas no contato."]
    },
    {
      id: "offer-fashion",
      offerCode: "OFR-FASH-09",
      title: "Desconto em lojas de roupas",
      subtitle: "Cupom especial para coleção premium",
      shortLabel: "Histórico de cupom já utilizado",
      description:
        "Desconto exclusivo na coleção premium da Maison Nord com curadoria de peças urbanas e atendimento especial para membros.",
      image: image("premium fashion store discount offer with elegant clothing boutique, realistic"),
      partnerName: "Maison Nord",
      partnerLocation: "Curitiba • PR",
      category: "Moda",
      discountLabel: "R$ 200 OFF em compras acima de R$ 900",
      originalPrice: "R$ 900,00",
      discountedPrice: "R$ 700,00",
      startAt: addTime(base, -15),
      endAt: addTime(base, 5),
      validityLabel: "Resgate histórico mantido",
      redemptionLimit: 180,
      redeemedCount: 121,
      singleUsePerUser: true,
      rules: ["Aplicação automática na compra mínima.", "Uso único por CPF.", "Não válido em outlet."],
      conditions: ["Cupom intransferível.", "Válido em loja física e site parceiro."],
      importantInfo: ["Atendimento premium mediante agendamento.", "Coleção limitada por grade."]
    },
    {
      id: "offer-leisure",
      offerCode: "OFR-LAZR-10",
      title: "Desconto em experiências e lazer",
      subtitle: "Ingresso premium para experiência imersiva",
      shortLabel: "Lazer com vagas especiais",
      description:
        "Experiência imersiva com acesso premium, fila preferencial e kit especial para membros do Clubão nas datas participantes.",
      image: image("premium leisure experience offer with immersive event and elegant entertainment scene, realistic"),
      partnerName: "Immersion Hall",
      partnerLocation: "São Paulo • SP",
      category: "Experiências e lazer",
      discountLabel: "15% OFF + acesso premium",
      originalPrice: "R$ 380,00",
      discountedPrice: "R$ 323,00",
      startAt: addTime(base, -1),
      endAt: addTime(base, 18),
      validityLabel: "Uso em datas participantes",
      redemptionLimit: 220,
      redeemedCount: 64,
      singleUsePerUser: true,
      rules: ["Necessário agendar data e horário.", "Benefício pessoal e intransferível."],
      conditions: ["Válido em datas específicas.", "Sujeito à disponibilidade da sessão."],
      importantInfo: ["Fila premium inclusa.", "Kit welcome disponível para membros."]
    },
    {
      id: "offer-business",
      offerCode: "OFR-B2B-11",
      title: "Desconto em serviços para empresas",
      subtitle: "Consultoria com condição corporativa",
      shortLabel: "Oferta encerrada e mantida no histórico",
      description:
        "Condição especial para serviços empresariais, branding e consultoria comercial com horas bonificadas para membros da plataforma.",
      image: image("premium business services offer with modern office and consulting presentation, realistic"),
      partnerName: "Scale Partners Consulting",
      partnerLocation: "Atendimento híbrido",
      category: "Serviços para empresas",
      discountLabel: "25% OFF + 2h bônus",
      originalPrice: "R$ 3.200,00",
      discountedPrice: "R$ 2.400,00",
      startAt: addTime(base, -18),
      endAt: addTime(base, -1, -2),
      validityLabel: "Oferta encerrada",
      redemptionLimit: 60,
      redeemedCount: 41,
      singleUsePerUser: true,
      rules: ["Oferta válida enquanto ativa.", "Contrato fechado diretamente com o parceiro."],
      conditions: ["Encerrada para novos resgates.", "Histórico preservado para consulta."],
      importantInfo: ["Última rodada encerrada.", "Nova janela poderá ser aberta futuramente."]
    },
    {
      id: "offer-premium",
      offerCode: "OFR-PREM-12",
      title: "Oferta exclusiva / benefício premium",
      subtitle: "Pacote insider com concierge e acesso VIP",
      shortLabel: "Benefício premium da temporada",
      description:
        "Pacote premium com atendimento concierge, acesso a experiências exclusivas, prioridade em novas ofertas e benefícios extras para membros selecionados.",
      image: image("exclusive premium member benefit with concierge, luxury card and elegant premium experience, realistic"),
      partnerName: "FG EXACTA Premium Desk",
      partnerLocation: "Benefício híbrido • atendimento dedicado",
      category: "Premium",
      discountLabel: "Benefício VIP com concierge",
      originalPrice: "R$ 1.990,00",
      discountedPrice: "Acesso exclusivo para membros elegíveis",
      startAt: addTime(base, -2),
      endAt: addTime(base, 2, 5),
      validityLabel: "Próxima do vencimento",
      redemptionLimit: 40,
      redeemedCount: 28,
      singleUsePerUser: true,
      rules: ["Elegibilidade sujeita a análise interna.", "Uso único por membro.", "Atendimento com agenda dedicada."],
      conditions: ["Não transferível.", "Benefício premium sujeito a disponibilidade."],
      importantInfo: ["Atendimento concierge incluso.", "Oferta com destaque por tempo limitado."]
    }
  ];
}

function buildCouponStatus(redemption: CouponRedemption, now = new Date()): CouponStatus {
  if (redemption.status === "UTILIZADO") {
    return "UTILIZADO";
  }

  return new Date(redemption.validUntil) <= now ? "EXPIRADO" : "ATIVO";
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

function getCountdownParts(target: string, now = new Date()) {
  const diff = new Date(target).getTime() - now.getTime();

  if (diff <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  return { expired: false, days, hours, minutes };
}

function getOfferRemainingLabel(target: string, now = new Date()) {
  const countdown = getCountdownParts(target, now);

  if (countdown.expired) {
    return "Oferta encerrada";
  }

  if (countdown.days === 0) {
    return `Expira hoje em ${countdown.hours}h ${countdown.minutes}min`;
  }

  return `Expira em ${countdown.days} dias`;
}

function getCouponRemainingLabel(target: string, now = new Date()) {
  const countdown = getCountdownParts(target, now);

  if (countdown.expired) {
    return "Expirado";
  }

  if (countdown.days === 0) {
    return `Expira hoje às ${new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(target))}`;
  }

  return `Expira em ${countdown.days} dias`;
}

function getOfferState(offer: ClubOffer, redemptions: CouponRedemption[], now = new Date()): OfferState {
  const hasUserRedemption = redemptions.some((item) => item.offerId === offer.id && item.userId === CURRENT_USER.id);
  const ended = new Date(offer.endAt) <= now;
  const soldOut = offer.redeemedCount >= offer.redemptionLimit;
  const nearEnd = !ended && new Date(offer.endAt).getTime() - now.getTime() <= 1000 * 60 * 60 * 48;

  if (ended) {
    return "ENCERRADA";
  }

  if (soldOut) {
    return "ESGOTADA";
  }

  if (offer.singleUsePerUser && hasUserRedemption) {
    return "RESGATADA";
  }

  if (nearEnd) {
    return "PRÓXIMA DO FIM";
  }

  return "DISPONÍVEL";
}

function getStateTone(state: OfferState | CouponStatus) {
  switch (state) {
    case "DISPONÍVEL":
    case "ATIVO":
      return "green";
    case "PRÓXIMA DO FIM":
      return "yellow";
    case "RESGATADA":
      return "gray";
    case "ESGOTADA":
    case "ENCERRADA":
    case "EXPIRADO":
      return "red";
    case "UTILIZADO":
      return "gray";
    default:
      return "blue";
  }
}

function buildQrCodeUrl(payload: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(payload)}`;
}

function openCouponVoucher(redemption: CouponRedemption) {
  if (!redemption.validationToken) {
    return;
  }
  const voucherUrl = `/clubao/voucher/${encodeURIComponent(redemption.validationToken)}`;
  const voucherWindow = window.open(voucherUrl, "_blank", "noopener,noreferrer,width=1100,height=900");
  if (voucherWindow) {
    voucherWindow.focus();
  }
}

function buildSeededRedemptions(offers: ClubOffer[]): CouponRedemption[] {
  const beautyOffer = offers.find((offer) => offer.id === "offer-beauty");
  const fashionOffer = offers.find((offer) => offer.id === "offer-fashion");
  const businessOffer = offers.find((offer) => offer.id === "offer-business");

  if (!beautyOffer || !fashionOffer || !businessOffer) {
    return [];
  }

  return [
    {
      id: "redeem-seed-01",
      couponId: "coupon-seed-01",
      publicCode: "CPN-001",
      offerTitle: beautyOffer.title,
      qrValidationToken: "seed-beauty-token-01",
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.fullName,
      userEmail: CURRENT_USER.email,
      offerId: beautyOffer.id,
      couponCode: "FGX-A3K9-P7L2",
      validationToken: "seed-beauty-token-01",
      qrPayload: "https://fgexacta.local/clubao/validate/seed-beauty-token-01",
      redeemedAt: addTime(new Date(), -2, -4),
      validUntil: beautyOffer.endAt,
      status: "ATIVO",
      pdfReference: "voucher-fgx-a3k9-p7l2.pdf",
      downloadCount: 1,
      downloadedAt: addTime(new Date(), -2, -3, 50)
    },
    {
      id: "redeem-seed-02",
      couponId: "coupon-seed-02",
      publicCode: "CPN-002",
      offerTitle: fashionOffer.title,
      qrValidationToken: "seed-fashion-token-02",
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.fullName,
      userEmail: CURRENT_USER.email,
      offerId: fashionOffer.id,
      couponCode: "FGX-M8R2-X5T1",
      validationToken: "seed-fashion-token-02",
      qrPayload: "https://fgexacta.local/clubao/validate/seed-fashion-token-02",
      redeemedAt: addTime(new Date(), -6, -3),
      validUntil: fashionOffer.endAt,
      status: "UTILIZADO",
      pdfReference: "voucher-fgx-m8r2-x5t1.pdf",
      downloadCount: 1,
      downloadedAt: addTime(new Date(), -6, -2, 30)
    },
    {
      id: "redeem-seed-03",
      couponId: "coupon-seed-03",
      publicCode: "CPN-003",
      offerTitle: businessOffer.title,
      qrValidationToken: "seed-business-token-03",
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.fullName,
      userEmail: CURRENT_USER.email,
      offerId: businessOffer.id,
      couponCode: "FGX-Q4N7-B9C6",
      validationToken: "seed-business-token-03",
      qrPayload: "https://fgexacta.local/clubao/validate/seed-business-token-03",
      redeemedAt: addTime(new Date(), -12, -5),
      validUntil: businessOffer.endAt,
      status: "EXPIRADO",
      pdfReference: "voucher-fgx-q4n7-b9c6.pdf",
      downloadCount: 1,
      downloadedAt: addTime(new Date(), -12, -4, 15)
    }
  ];
}

export function ClubaoBenefitsHub({
  initialOffers,
  initialRedemptions
}: {
  initialOffers?: ClubOffer[];
  initialRedemptions?: CouponRedemption[];
}) {
  const fallbackOffers = initialOffers && initialOffers.length > 0 ? initialOffers : buildOffers();
  const fallbackRedemptions =
    initialRedemptions && initialRedemptions.length > 0 ? initialRedemptions : buildSeededRedemptions(fallbackOffers);
  const [offers] = useState<ClubOffer[]>(() => fallbackOffers);
  const [redemptions, setRedemptions] = useState<CouponRedemption[]>(() => fallbackRedemptions);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [now, setNow] = useState(new Date());
  const [redeemingOfferId, setRedeemingOfferId] = useState<string | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CouponRedemption[];
        const merged = [...fallbackRedemptions, ...parsed].reduce<CouponRedemption[]>((accumulator, item) => {
          if (accumulator.some((current) => current.couponCode === item.couponCode)) {
            return accumulator;
          }

          accumulator.push(item);
          return accumulator;
        }, []);

        setRedemptions(merged);
      } catch {
        setRedemptions(fallbackRedemptions);
      }
    }

    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, [fallbackRedemptions]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const dynamicRedemptions = redemptions.filter((item) => !item.id.startsWith("redeem-seed"));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dynamicRedemptions));
  }, [hydrated, redemptions]);

  useEffect(() => {
    setRedeemError(null);
    setRedeemingOfferId(null);
  }, [selectedOfferId]);

  const selectedOffer = useMemo(
    () => offers.find((offer) => offer.id === selectedOfferId) ?? null,
    [offers, selectedOfferId]
  );

  const offerCards = useMemo(
    () =>
      offers.map((offer) => {
        const state = getOfferState(offer, redemptions, now);
        const userRedemption = redemptions.find((item) => item.offerId === offer.id && item.userId === CURRENT_USER.id);

        return {
          ...offer,
          state,
          userRedemption,
          remainingLabel: getOfferRemainingLabel(offer.endAt, now)
        };
      }),
    [offers, redemptions, now]
  );

  const couponCards = useMemo(
    () =>
      redemptions
        .filter((item) => item.userId === CURRENT_USER.id)
        .map((item) => {
          const offer = offers.find((current) => current.id === item.offerId);
          const status = buildCouponStatus(item, now);

          if (!offer) {
            return null;
          }

          return {
            ...item,
            offer,
            status,
            remainingLabel: getCouponRemainingLabel(item.validUntil, now)
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [offers, redemptions, now]
  );

  const groupedCoupons = useMemo(
    () => ({
      ATIVO: couponCards.filter((item) => item.status === "ATIVO"),
      EXPIRADO: couponCards.filter((item) => item.status === "EXPIRADO"),
      UTILIZADO: couponCards.filter((item) => item.status === "UTILIZADO")
    }),
    [couponCards]
  );

  const handleRedeem = async (offer: ClubOffer) => {
    const existing = redemptions.find((item) => item.offerId === offer.id && item.userId === CURRENT_USER.id);
    const state = getOfferState(offer, redemptions, now);

    if (existing) {
      openCouponVoucher(existing);
      return;
    }

    if (state === "ESGOTADA" || state === "ENCERRADA") {
      return;
    }

    setRedeemError(null);
    setRedeemingOfferId(offer.id);

    try {
      const response = await fetch("/api/clubao/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId: offer.id })
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        duplicated?: boolean;
        validationToken?: string;
        couponCode?: string;
        voucherUrl?: string;
        redemption?: CouponRedemption;
      };

      if (!response.ok || !payload.ok) {
        setRedeemError(payload.error ?? "Não foi possível resgatar o cupom agora. Tente novamente.");
        setRedeemingOfferId(null);
        return;
      }

      if (payload.redemption) {
        setRedemptions((current) => {
          const already = current.some((item) => item.id === payload.redemption?.id);
          if (already) {
            return current;
          }
          return [payload.redemption as CouponRedemption, ...current];
        });
      } else if (payload.validationToken && payload.couponCode) {
        setRedemptions((current) => {
          const already = current.some((item) => item.validationToken === payload.validationToken);
          if (already) {
            return current;
          }
          const validationToken = payload.validationToken ?? globalThis.crypto.randomUUID();
          const couponCode = payload.couponCode ?? "FGX-PENDENTE";
          const fallbackRedemption: CouponRedemption = {
            id: globalThis.crypto.randomUUID(),
            couponId: `coupon-${validationToken.slice(0, 12)}`,
            publicCode: couponCode,
            offerTitle: offer.title,
            qrValidationToken: validationToken,
            userId: CURRENT_USER.id,
            userName: CURRENT_USER.fullName,
            userEmail: CURRENT_USER.email,
            offerId: offer.id,
            couponCode,
            validationToken,
            qrPayload: `https://fgexacta.app/clubao/validate/${validationToken}`,
            redeemedAt: new Date().toISOString(),
            validUntil: offer.endAt ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: "ATIVO",
            pdfReference: `voucher-${couponCode.toLowerCase()}.html`,
            downloadCount: 0
          };
          return [fallbackRedemption, ...current];
        });
      }

      if (payload.voucherUrl) {
        const voucherWindow = window.open(payload.voucherUrl, "_blank", "noopener,noreferrer,width=1100,height=900");
        if (voucherWindow) {
          voucherWindow.focus();
        }
      } else if (payload.validationToken) {
        const tokenRedemption: CouponRedemption = {
          id: globalThis.crypto.randomUUID(),
          couponId: `coupon-${payload.validationToken.slice(0, 12)}`,
          publicCode: payload.couponCode,
          offerTitle: offer.title,
          qrValidationToken: payload.validationToken,
          userId: CURRENT_USER.id,
          userName: CURRENT_USER.fullName,
          userEmail: CURRENT_USER.email,
          offerId: offer.id,
          couponCode: payload.couponCode ?? "FGX-XXXXX",
          validationToken: payload.validationToken,
          qrPayload: `https://fgexacta.app/clubao/validate/${payload.validationToken}`,
          redeemedAt: new Date().toISOString(),
          validUntil: offer.endAt,
          status: "ATIVO",
          pdfReference: `voucher-${(payload.couponCode ?? "cupom").toLowerCase()}.html`,
          downloadCount: 0
        };
        openCouponVoucher(tokenRedemption);
      }
    } catch (unknownError) {
      console.error("[clubao] Falha ao resgatar:", unknownError);
      setRedeemError("Falha de conexão ao resgatar cupom. Tente novamente em instantes.");
    } finally {
      setRedeemingOfferId(null);
    }
  };

  return (
    <section className="clubao-benefits-hub">
      <section className="clubao-offers-section">
        <div className="clubao-section-head">
          <div>
            <span>Vitrine de ofertas</span>
            <h2>Central de ofertas e benefícios</h2>
            <p>12 ofertas visuais, premium e prontas para abrir detalhes completos e gerar cupom individual.</p>
          </div>
          <div className="clubao-inline-stats">
            <article>
              <strong>12</strong>
              <small>ofertas na vitrine</small>
            </article>
            <article>
              <strong>{groupedCoupons.ATIVO.length}</strong>
              <small>cupons ativos</small>
            </article>
            <article>
              <strong>{couponCards.length}</strong>
              <small>histórico total</small>
            </article>
          </div>
        </div>

        <div className="clubao-offers-grid" id="clubao-ofertas">
          {offerCards.map((offer) => (
            <article key={offer.id} className="clubao-offer-card">
              <div className="clubao-offer-media">
                <ManagedMedia alt={offer.title} sizeLabel="1600 x 900" src={offer.image} className="managed-media-fill" />
                <span className={`clubao-state-badge tone-${getStateTone(offer.state)}`}>{offer.state}</span>
              </div>
              <div className="clubao-offer-copy">
                <strong>{offer.title}</strong>
                <p>{offer.shortLabel}</p>
                <button type="button" className="clubao-card-action" onClick={() => setSelectedOfferId(offer.id)}>
                  Ver oferta
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="clubao-coupons-section">
        <div className="clubao-section-head">
          <div>
            <span>Meus cupons</span>
            <h2>Histórico permanente de benefícios resgatados</h2>
            <p>Separamos os cupons por status e mantemos acesso contínuo para baixar novamente ou revisar os detalhes.</p>
          </div>
        </div>

        <div className="clubao-coupon-groups">
          {(["ATIVO", "EXPIRADO", "UTILIZADO"] as CouponStatus[]).map((status) => (
            <section key={status} className="clubao-coupon-group">
              <div className="clubao-group-head">
                <h3>{status === "ATIVO" ? "Ativos" : status === "EXPIRADO" ? "Expirados" : "Utilizados"}</h3>
                <span className={`clubao-state-badge tone-${getStateTone(status)}`}>{groupedCoupons[status].length}</span>
              </div>
              <div className="clubao-coupon-grid">
                {groupedCoupons[status].length === 0 ? (
                  <article className="clubao-empty-card">
                    <strong>Nenhum cupom nesta faixa</strong>
                    <p>Assim que você resgatar uma oferta, o histórico aparece aqui.</p>
                  </article>
                ) : (
                  groupedCoupons[status].map((coupon) => (
                    <article key={coupon.couponCode} className="clubao-coupon-card">
                      <ManagedMedia alt={coupon.offer.title} sizeLabel="1200 x 900" src={coupon.offer.image} className="managed-media-fill" />
                      <div className="clubao-coupon-copy">
                        <div className="clubao-coupon-top">
                          <strong>{coupon.offer.title}</strong>
                          <span className={`clubao-state-badge tone-${getStateTone(coupon.status)}`}>{coupon.status}</span>
                        </div>
                        <p>{coupon.offer.partnerName}</p>
                        <small>Código: {coupon.couponCode}</small>
                        <small>Resgatado em {formatDateTime(coupon.redeemedAt)}</small>
                        <small>Validade: {formatDateTime(coupon.validUntil)}</small>
                        <small className={coupon.status === "ATIVO" && getCountdownParts(coupon.validUntil, now).days <= 2 ? "clubao-warning-text" : ""}>
                          {coupon.remainingLabel}
                        </small>
                        <div className="clubao-coupon-actions">
                          <button type="button" className="clubao-download-action" onClick={() => openCouponVoucher(coupon)}>
                            Baixar cupom
                          </button>
                          <button type="button" className="clubao-detail-action" onClick={() => setSelectedOfferId(coupon.offer.id)}>
                            Ver detalhes
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="clubao-history-section">
        <div className="clubao-section-head">
          <div>
            <span>Histórico de resgates</span>
            <h2>Todos os cupons emitidos para este usuário</h2>
            <p>O mesmo cupom pode ser baixado novamente sem gerar novo código ou duplicar resgate.</p>
          </div>
        </div>

        <div className="clubao-history-table">
          <div className="clubao-history-head">
            <span>Oferta</span>
            <span>Parceiro</span>
            <span>Código</span>
            <span>Resgate</span>
            <span>Validade</span>
            <span>Status</span>
            <span>Ações</span>
          </div>
          <div className="clubao-history-body">
            {couponCards.map((coupon) => (
              <article key={`history-${coupon.couponCode}`} className="clubao-history-row">
                <strong>{coupon.offer.title}</strong>
                <span>{coupon.offer.partnerName}</span>
                <span>{coupon.couponCode}</span>
                <span>{formatDateTime(coupon.redeemedAt)}</span>
                <span>{coupon.remainingLabel}</span>
                <small className={`clubao-state-badge tone-${getStateTone(coupon.status)}`}>{coupon.status}</small>
                <div className="clubao-history-actions">
                  <button type="button" className="clubao-download-action" onClick={() => openCouponVoucher(coupon)}>
                    Baixar novamente
                  </button>
                  <button type="button" className="clubao-detail-action" onClick={() => setSelectedOfferId(coupon.offer.id)}>
                    Ver detalhes
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedOffer ? (
        <div className="clubao-detail-backdrop" role="presentation" onClick={() => setSelectedOfferId(null)}>
          <div className="clubao-detail-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="clubao-close-button" onClick={() => setSelectedOfferId(null)} aria-label="Fechar detalhes da oferta">
              Fechar
            </button>

            <div className="clubao-detail-hero">
              <ManagedMedia alt={selectedOffer.title} sizeLabel="1600 x 900" src={selectedOffer.image} className="managed-media-fill" />
              <div className="clubao-detail-copy">
                <span className={`clubao-state-badge tone-${getStateTone(getOfferState(selectedOffer, redemptions, now))}`}>
                  {getOfferState(selectedOffer, redemptions, now)}
                </span>
                <small>{selectedOffer.partnerName}</small>
                <h3>{selectedOffer.title}</h3>
                <p>{selectedOffer.description}</p>
                <div className="clubao-detail-pricing">
                  <article>
                    <span>Desconto</span>
                    <strong>{selectedOffer.discountLabel}</strong>
                  </article>
                  <article>
                    <span>Preço original</span>
                    <strong>{selectedOffer.originalPrice ?? "Sob consulta"}</strong>
                  </article>
                  <article>
                    <span>Preço com benefício</span>
                    <strong>{selectedOffer.discountedPrice ?? "Aplicado direto no parceiro"}</strong>
                  </article>
                </div>
              </div>
            </div>

            <div className="clubao-detail-grid">
              <section className="clubao-detail-panel">
                <div className="clubao-detail-meta-grid">
                  <article>
                    <span>Empresa / parceiro</span>
                    <strong>{selectedOffer.partnerName}</strong>
                  </article>
                  <article>
                    <span>Categoria</span>
                    <strong>{selectedOffer.category}</strong>
                  </article>
                  <article>
                    <span>Início</span>
                    <strong>{formatDate(selectedOffer.startAt)}</strong>
                  </article>
                  <article>
                    <span>Encerramento</span>
                    <strong>{formatDate(selectedOffer.endAt)}</strong>
                  </article>
                  <article>
                    <span>Localização</span>
                    <strong>{selectedOffer.partnerLocation}</strong>
                  </article>
                  <article>
                    <span>Validade</span>
                    <strong>{selectedOffer.validityLabel}</strong>
                  </article>
                </div>

                <div className={`clubao-countdown-card ${getCountdownParts(selectedOffer.endAt, now).days <= 2 ? "is-urgent" : ""}`}>
                  <span>Oferta termina em</span>
                  {(() => {
                    const countdown = getCountdownParts(selectedOffer.endAt, now);
                    return countdown.expired ? (
                      <strong>Encerrada</strong>
                    ) : (
                      <strong>
                        {String(countdown.days).padStart(2, "0")} dias {String(countdown.hours).padStart(2, "0")}h {String(countdown.minutes).padStart(2, "0")}min
                      </strong>
                    );
                  })()}
                  <small>{getOfferRemainingLabel(selectedOffer.endAt, now)}</small>
                </div>

                <div className="clubao-detail-columns">
                  <div className="clubao-detail-list">
                    <h4>Regras da promoção</h4>
                    <ul>
                      {selectedOffer.rules.map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="clubao-detail-list">
                    <h4>Condições de utilização</h4>
                    <ul>
                      {selectedOffer.conditions.map((condition) => (
                        <li key={condition}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="clubao-detail-list">
                  <h4>Informações importantes</h4>
                  <ul>
                    {selectedOffer.importantInfo.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <aside className="clubao-detail-side">
                <section className="clubao-detail-panel">
                  <h4>Identificação da oferta</h4>
                  <div className="clubao-offer-id-card">
                    <span>Oferta pública</span>
                    <strong>{selectedOffer.offerCode}</strong>
                    <small>Preparada para backend com IDs internos, código público e vínculo de resgate.</small>
                  </div>
                </section>

                <section className="clubao-detail-panel">
                  <h4>Ação principal</h4>
                  {(() => {
                    const existing = redemptions.find((item) => item.offerId === selectedOffer.id && item.userId === CURRENT_USER.id);
                    const state = getOfferState(selectedOffer, redemptions, now);

                    if (existing) {
                      return (
                        <div className="clubao-action-stack">
                          <button type="button" className="clubao-redeemed-button" disabled>
                            Cupom resgatado
                          </button>
                          <button type="button" className="clubao-download-action" onClick={() => openCouponVoucher(existing)}>
                            Baixar cupom
                          </button>
                          <small>{existing.couponCode}</small>
                        </div>
                      );
                    }

                    if (state === "ENCERRADA" || state === "ESGOTADA") {
                      return (
                        <div className="clubao-action-stack">
                          <button type="button" className="clubao-redeemed-button is-ended" disabled>
                            {state === "ENCERRADA" ? "Oferta encerrada" : "Oferta esgotada"}
                          </button>
                          <small>Esse benefício segue visível para manter histórico e contexto.</small>
                        </div>
                      );
                    }

                    return (
                      <div className="clubao-action-stack">
                        <button
                          type="button"
                          className="clubao-redeem-button"
                          disabled={redeemingOfferId === selectedOffer.id}
                          onClick={() => {
                            if (redeemingOfferId === selectedOffer.id) {
                              return;
                            }
                            void handleRedeem(selectedOffer);
                          }}
                        >
                          {redeemingOfferId === selectedOffer.id
                            ? "Registrando resgate..."
                            : "Resgatar cupom"}
                        </button>
                        <small>Gera cupom individual, QR Code único e voucher A4 pronto para PDF.</small>
                        {redeemError && selectedOfferId === selectedOffer.id ? (
                          <small
                            style={{
                              padding: "8px 12px",
                              borderRadius: 12,
                              background: "rgba(239, 68, 68, 0.10)",
                              border: "1px solid rgba(239, 68, 68, 0.26)",
                              color: "#b91c1c",
                              lineHeight: 1.5
                            }}
                          >
                            {redeemError}
                          </small>
                        ) : null}
                      </div>
                    );
                  })()}
                </section>

                <section className="clubao-detail-panel">
                  <h4>Dados do usuário no voucher</h4>
                  <div className="clubao-user-card">
                    <span>Nome completo</span>
                    <strong>{CURRENT_USER.fullName}</strong>
                    <span>E-mail</span>
                    <strong>{CURRENT_USER.email}</strong>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
