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
  | "sweepstakes"
  | "couponRedemptions";

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
  phone: string;
  contactEmail: string;
  website: string;
  socialLinks: string[];
  contactName: string;
  credentialedStatus: string;
  specialties: string[];
  facts: string[];
  chips: string[];
  linkedOfferIds: string[];
  linkedProductIds: string[];
  linkedServiceIds: string[];
  linkedCampaignIds: string[];
  linkedOpportunityIds: string[];
  latitude: number;
  longitude: number;
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
  logo?: string;
  image?: string;
  category: string;
  segment: string;
  description: string;
  location: string;
  contact: string;
  phone: string;
  email: string;
  website: string;
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
  sweepstakes: SweepstakesRecord[];
  couponRedemptions: CouponRedemptionRecord[];
  auditLog: AuditEntry[];
}

export interface AdminSession {
  userId: string;
  fullName: string;
  email: string;
  role: AdminRole;
}
