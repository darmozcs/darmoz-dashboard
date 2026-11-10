// darmoz-whatsapp: cuentas de Meta, numeros, integraciones, bots, flujos y conversaciones.

export interface WaAccount {
  id: string;
  name: string;
  appId: string | null;
  // Los secretos nunca vuelven en claro, solo enmascarados ("EAAG…x9Q2").
  appSecretMasked: string | null;
  accessTokenMasked: string | null;
  wabaId: string;
  graphApiVersion: string;
  active: boolean;
  lastValidatedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WaAccountValidation {
  valid: boolean;
  wabaName: string | null;
  error: string | null;
  validatedAt: string | null;
}

export interface WaWebhookInfo {
  callbackUrl: string;
  verifyToken: string;
  subscribeFields: string;
}

export interface WaPhoneNumber {
  id: string;
  accountId: string;
  accountName: string;
  phoneNumberId: string;
  displayNumber: string | null;
  verifiedName: string | null;
  botId: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WaIntegration {
  id: string;
  applicationId: string;
  applicationName: string;
  baseUrl: string;
  authHeaderName: string | null;
  authHeaderValueMasked: string | null;
  timeoutMs: number;
  createdAt: string;
  updatedAt: string;
}

export interface WaIntegrationTestResult {
  status: number;
  body: string;
}

export type WaWeekDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface WaTimeRange {
  from: string;
  to: string;
}

export interface WaBusinessHours {
  timezone: string;
  days: Partial<Record<WaWeekDay, WaTimeRange[]>>;
}

export interface WaBot {
  id: string;
  name: string;
  applicationId: string;
  active: boolean;
  entryFlowId: string | null;
  fallbackMessage: string | null;
  sessionTimeoutMinutes: number;
  businessHours: WaBusinessHours | null;
  outOfHoursMessage: string | null;
  staticVariables: Record<string, string> | null;
  createdAt: string;
  updatedAt: string;
}

export type WaNodeType =
  | "message"
  | "buttons"
  | "list"
  | "question"
  | "condition"
  | "http"
  | "set_variable"
  | "goto_flow"
  | "handoff"
  | "end";

export interface WaFlowNode {
  id: string;
  type: WaNodeType;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

export interface WaFlowEdge {
  id: string;
  source: string;
  sourceHandle: string | null;
  target: string;
}

export interface WaFlowDefinition {
  startNodeId: string | null;
  nodes: WaFlowNode[];
  edges: WaFlowEdge[];
}

export interface WaFlowSummary {
  id: string;
  botId: string;
  name: string;
  publishedVersion: number;
  publishedAt: string | null;
  hasUnpublishedChanges: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WaFlow extends WaFlowSummary {
  draftDefinition: WaFlowDefinition;
  publishedDefinition: WaFlowDefinition | null;
}

export interface WaFlowIssue {
  nodeId: string | null;
  severity: "error" | "warning";
  message: string;
}

export type WaConversationStatus = "ACTIVE" | "HANDOFF" | "CLOSED";

export interface WaConversation {
  id: string;
  phoneNumberId: string;
  contactWaId: string;
  contactName: string | null;
  currentFlowId: string | null;
  currentNodeId: string | null;
  variables: Record<string, unknown>;
  status: WaConversationStatus;
  lastInboundAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type WaMessageDirection = "IN" | "OUT";
export type WaMessageStatus = "RECEIVED" | "SENT" | "DELIVERED" | "READ" | "FAILED";

export interface WaMessageLog {
  id: string;
  conversationId: string | null;
  phoneNumberId: string | null;
  direction: WaMessageDirection;
  waMessageId: string | null;
  contactWaId: string | null;
  type: string;
  payload: Record<string, unknown> | null;
  status: WaMessageStatus;
  error: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WaPage<T> {
  content: T[];
  totalElements: number;
  page: number;
  size: number;
}
