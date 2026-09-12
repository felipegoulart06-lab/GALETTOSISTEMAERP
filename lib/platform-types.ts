export type WorkflowStatus =
  | "RASCUNHO"
  | "EM_REVISAO"
  | "PUBLICADO"
  | "AGENDADO"
  | "PAUSADO"
  | "ARQUIVADO"
  | "EXPIRADO";

export type AdminRole = "ADMIN_MASTER" | "ADMIN" | "EDITOR" | "USER";

export type ManagedModuleKey =
  | "users"
  | "products"
  | "mentorships"
  | "lives"
  | "clubOffers"
  | "companies"
  | "supplierLists"
  | "referralServices"
  | "referrals"
  | "opportunities"
  | "campaigns"
  | "missions"
  | "rewards"
  | "spinWheels"
  | "sweepstakes"
  | "couponRedemptions"
  | "shareKits"
  | "rankingBoards"
  | "financeTickets"
  | "notifications"
  | "requests"
  | "settings";

export interface AuditEntry {
  id: string;
  module: ManagedModuleKey;
  entityId: string;
  entityTitle: string;
  action: "CREATE" | "UPDATE" | "PUBLISH" | "UNPUBLISH" | "PAUSE" | "ARCHIVE" | "DELETE" | "DUPLICATE";
  changedByUserId: string;
  changedByName: string;
  changedAt: string;
  previousStatus?: WorkflowStatus | string;
  nextStatus?: WorkflowStatus | string;
  summary: string;
}

export interface BaseManagedEntity {
  id: string;
  slug: string;
  publicCode: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  featured: boolean;
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
  createdByUserId: string;
  updatedByUserId: string;
  publishedAt?: string;
  publishedByUserId?: string;
  startAt?: string;
  endAt?: string;
}

export interface PlatformUser {
  id: string;
  slug: string;
  fullName: string;
  email: string;
  avatar: string;
  role: AdminRole;
  status: "ATIVO" | "PENDENTE" | "BLOQUEADO";
  plan: "Membro Pro" | "Premium" | "Essencial";
  joinedAt: string;
  points: number;
  salesCount: number;
  commissionTotal: number;
  referralsCount: number;
  redeemedCouponsCount: number;
  rankingPosition: number;
  progressPercent: number;
}

export interface ProductRecord extends BaseManagedEntity {
  kind: "product";
  badge: string;
  accent: "blue" | "green" | "orange" | "violet";
  brand: string;
  manufacturer: string;
  price: string;
  commissionRate: string;
  commissionValue: string;
  commercialInfo: string;
  audience: string;
  payoutWindow: string;
  approvalFlow: string;
  affiliateLink: string;
  affiliationRules: string[];
  materials: string[];
  facts: string[];
  chips: string[];
}

export interface LessonRecord {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  materials: string[];
}

export interface MentorshipModuleRecord {
  id: string;
  title: string;
  description: string;
  lessons: LessonRecord[];
}

export interface MentorshipRecord extends BaseManagedEntity {
  kind: "mentorship";
  badge: string;
  accent: "blue" | "green" | "orange" | "violet";
  coverImage: string;
  mentorName: string;
  mentorAvatar: string;
  level: string;
  duration: string;
  progressPercent: number;
  progressLabel: string;
  modules: MentorshipModuleRecord[];
  files: string[];
  exercises: string[];
  facts: string[];
  chips: string[];
}

export interface LiveRecord extends BaseManagedEntity {
  kind: "live";
  presenterName: string;
  presenterAvatar: string;
  provider?: "internal" | "tiktok";
  guests: string[];
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  transmissionLink: string;
  recordingUrl?: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  materials: string[];
  relatedProductIds: string[];
  facts: string[];
  chips: string[];
}

export interface CompanyOfferRelation {
  offerId: string;
}

export interface CompanyServiceRelation {
  serviceId: string;
}

export interface CompanyRecord extends BaseManagedEntity {
  kind: "company";
  badge: string;
  accent: "blue" | "green" | "orange" | "violet";
  logo: string;
  segment: string;
  type: string;
  city: string;
  state: string;
  neighborhood: string;
  address: string;
  zipCode?: string;
  phone: string;
  whatsapp?: string;
  contactEmail: string;
  website: string;
  instagram?: string;
  linkedin?: string;
  socialLinks: string[];
  contactName: string;
  credentialedStatus: string;
  specialties: string[];
  facts: string[];
  chips: string[];
  operatingHours?: string;
  targetAudience?: string;
  valueProposition?: string;
  businessArea?: string;
  timeInBusiness?: string;
  linkedOfferIds: string[];
  linkedProductIds: string[];
  linkedServiceIds: string[];
  linkedCampaignIds: string[];
  linkedOpportunityIds: string[];
  latitude: number;
  longitude: number;
  mapZoom?: number;
}

export interface ClubOfferRecord extends BaseManagedEntity {
  kind: "clubOffer";
  offerCode: string;
  partnerCompanyId: string;
  partnerName: string;
  partnerLocation: string;
  discountLabel: string;
  originalPrice?: string;
  discountedPrice?: string;
  validityLabel: string;
  redemptionLimit: number;
  redeemedCount: number;
  singleUsePerUser: boolean;
  rules: string[];
  conditions: string[];
  importantInfo: string[];
  couponPrefix: string;
}

export interface SupplierRecord {
  id: string;
  name: string;
  company: string;
  companySlug?: string;
  logo?: string;
  image?: string;
  category: string;
  segment: string;
  description: string;
  location: string;
  cityState?: string;
  products?: string[];
  contact: string;
  phone: string;
  email: string;
  website: string;
  whatsapp?: string;
  notes: string;
  status: WorkflowStatus;
}

export interface SupplierListRecord extends BaseManagedEntity {
  kind: "supplierList";
  badge: string;
  prompt: string;
  facts: string[];
  chips: string[];
  suppliers: SupplierRecord[];
}

export interface ReferralServiceRecord extends BaseManagedEntity {
  kind: "referralService";
  companyId: string;
  companyName: string;
  valueLabel: string;
  rewardLabel: string;
  rules: string[];
  criteria: string[];
  deadlineLabel: string;
  facts: string[];
  chips: string[];
}

export interface ReferralRecord {
  id: string;
  userId: string;
  serviceId: string;
  companyId: string;
  createdAt: string;
  status: "CRIADA" | "EM_ANALISE" | "CONTATO_REALIZADO" | "CONVERTIDA" | "RECUSADA" | "CANCELADA" | "PREMIADA";
  convertedAt?: string;
  rewardLabel?: string;
}

export interface OpportunityRecord extends BaseManagedEntity {
  kind: "opportunity";
  companyId?: string;
  companyName?: string;
  benefit: string;
  requirements: string[];
  ctaLabel: string;
  ctaHref: string;
  valueLabel: string;
  facts: string[];
  chips: string[];
}

export interface CampaignRecord extends BaseManagedEntity {
  kind: "campaign";
  objective: string;
  periodLabel: string;
  rewardLabel: string;
  scoreLabel: string;
  relatedProductIds: string[];
  materials: string[];
  participantCount: number;
  resultsSummary: string;
  rules: string[];
}

export interface MissionRecord extends BaseManagedEntity {
  kind: "mission";
  objective: string;
  taskLabel: string;
  scoreLabel: string;
  rewardLabel: string;
  requirements: string[];
  difficulty: "Baixa" | "Média" | "Alta";
}

export interface RewardRecord extends BaseManagedEntity {
  kind: "reward";
  rewardType: string;
  valueLabel: string;
  pointsRequired: number;
  quantityAvailable: number;
  rules: string[];
}

export interface SpinRewardRecord {
  id: string;
  title: string;
  image: string;
  description: string;
  estimatedValue: string;
  quantityAvailable: number;
  category: string;
  internalCode: string;
  expiresAt?: string;
  rules: string[];
  status: "ATIVO" | "ESGOTADO" | "ENCERRADO";
  probability: number;
  rewardType: string;
}

export interface SpinWinnerRecord {
  id: string;
  userNameMasked: string;
  rewardTitle: string;
  wheelTitle: string;
  wonAt: string;
  tone: "blue" | "green" | "orange" | "violet";
}

export interface SpinHistoryRecord {
  id: string;
  userId: string;
  userNameMasked: string;
  wheelTitle: string;
  resultLabel: string;
  rewardTitle: string;
  status: "ATIVO" | "UTILIZADO" | "EXPIRADO" | "AGUARDANDO_RESGATE";
  internalCode: string;
  expiresAt?: string;
  playedAt: string;
}

export interface SpinWheelRecord extends BaseManagedEntity {
  kind: "spinWheel";
  wheelType: string;
  spinFrequency: "Diário" | "Semanal" | "Mensal" | "Condicionado" | "Especial";
  availableSpins: number;
  completedSpins: number;
  totalPrizesWon: number;
  nextSpinAt: string;
  nextSpinLabel: string;
  pointsLabel: string;
  benefitsLabel: string;
  audienceRule: string;
  releaseRule: string;
  priorityLabel: string;
  campaignLabel: string;
  visualTone: "blue" | "green" | "orange" | "violet";
  rewards: SpinRewardRecord[];
  recentWinners: SpinWinnerRecord[];
  history: SpinHistoryRecord[];
  rules: string[];
}

export interface SweepstakesRecord extends BaseManagedEntity {
  kind: "sweepstake";
  sweepstakeType: string;
  prizeLabel: string;
  rules: string[];
  participantCount: number;
  scheduledDate: string;
  scheduledTime: string;
  criteria: string[];
  winnerUserId?: string;
}

export interface ShareKitRecord extends BaseManagedEntity {
  kind: "shareKit";
  channel: string;
  packType: string;
  copyLines: string[];
  materials: string[];
  ctaLabel: string;
  ctaHref: string;
  relatedProductIds: string[];
  facts: string[];
  chips: string[];
}

export interface RankingBoardRecord extends BaseManagedEntity {
  kind: "rankingBoard";
  metric: string;
  periodLabel: string;
  prizeLabel: string;
  criteria: string[];
  facts: string[];
  chips: string[];
}

export interface FinanceTicketRecord extends BaseManagedEntity {
  kind: "financeTicket";
  ticketType: "SAQUE" | "COMISSAO" | "AJUSTE" | "BONUS";
  amountLabel: string;
  userName: string;
  userEmail: string;
  origin: string;
  payoutStatus: "PENDENTE" | "EM_ANALISE" | "APROVADO" | "PAGO" | "RECUSADO";
}

export interface NotificationRecord extends BaseManagedEntity {
  kind: "notification";
  audience: string;
  channel: string;
  ctaLabel: string;
  ctaHref: string;
  priority: "NORMAL" | "URGENTE";
}

export interface RequestRecord extends BaseManagedEntity {
  kind: "request";
  requestType: "CADASTRO" | "PUBLICACAO" | "SAQUE" | "SUPORTE" | "DENUNCIA";
  requesterName: string;
  requesterEmail: string;
  linkedModule: string;
  resolution: string;
}

export interface SettingRecord extends BaseManagedEntity {
  kind: "setting";
  groupLabel: string;
  settingKey: string;
  settingValue: string;
}

export interface CouponRedemptionRecord {
  id: string;
  couponId: string;
  couponCode: string;
  publicCode: string;
  offerId: string;
  offerTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  redeemedAt: string;
  validUntil: string;
  status: "ATIVO" | "EXPIRADO" | "UTILIZADO";
  serialNumber?: string;
  pdfReference: string;
  qrValidationToken: string;
  validationToken: string;
  qrPayload: string;
  downloadCount: number;
  downloadedAt?: string;
}

export interface PlatformDb {
  version: number;
  seededAt: string;
  users: PlatformUser[];
  products: ProductRecord[];
  mentorships: MentorshipRecord[];
  lives: LiveRecord[];
  clubOffers: ClubOfferRecord[];
  companies: CompanyRecord[];
  supplierLists: SupplierListRecord[];
  referralServices: ReferralServiceRecord[];
  referrals: ReferralRecord[];
  opportunities: OpportunityRecord[];
  campaigns: CampaignRecord[];
  missions: MissionRecord[];
  rewards: RewardRecord[];
  spinWheels: SpinWheelRecord[];
  sweepstakes: SweepstakesRecord[];
  couponRedemptions: CouponRedemptionRecord[];
  shareKits: ShareKitRecord[];
  rankingBoards: RankingBoardRecord[];
  financeTickets: FinanceTicketRecord[];
  notifications: NotificationRecord[];
  requests: RequestRecord[];
  settings: SettingRecord[];
  auditLog: AuditEntry[];
}

export interface AdminSession {
  userId: string;
  fullName: string;
  email: string;
  role: AdminRole;
}
