export const AUTH_PATH = "/auth";
export const AUTH_REGISTER_PATH = AUTH_PATH + "/register";
export const AUTH_LOGIN_PATH = AUTH_PATH + "/login";
export const AUTH_REFRESH_PATH = AUTH_PATH + "/refresh";
export const AUTH_LOGOUT_PATH = AUTH_PATH + "/logout";
export const AUTH_VERIFY_PATH = AUTH_PATH + "/verify";

export const ADMIN_BASE_PATH = AUTH_PATH + "/admin/api";

export const ADMIN_USERS_PATH = ADMIN_BASE_PATH + "/users";
export const ADMIN_USER_DETAIL_PATH = ({ id }: { id: string }) =>
  `${ADMIN_USERS_PATH}/${id}`;
export const ADMIN_USER_ROLES_PATH = ({ id }: { id: string }) =>
  `${ADMIN_USERS_PATH}/${id}/roles`;

export const ADMIN_APPLICATIONS_PATH = ADMIN_BASE_PATH + "/applications";
export const ADMIN_APPLICATION_DETAIL_PATH = ({ id }: { id: string }) =>
  `${ADMIN_APPLICATIONS_PATH}/${id}`;

export const ADMIN_ROLES_PATH = ADMIN_BASE_PATH + "/roles";
export const ADMIN_ROLE_DETAIL_PATH = ({ id }: { id: string }) =>
  `${ADMIN_ROLES_PATH}/${id}`;

export const ADMIN_ROLE_PERMISSIONS_PATH =
  ADMIN_BASE_PATH + "/role-permissions";
export const ADMIN_ROLE_PERMISSION_DETAIL_PATH = ({ id }: { id: string }) =>
  `${ADMIN_ROLE_PERMISSIONS_PATH}/${id}`;

export const ADMIN_AUDIT_LOG_PATH = ADMIN_BASE_PATH + "/audit-log";

// darmoz-mail: separate service, own context-path (no /auth, no /admin/api
// nesting — its context-path IS "/darmoz-mail", confirmed from its
// application.yml + its own legacy panel's runtime API-base computation).
export const MAIL_BASE_PATH = "/darmoz-mail";

export const MAIL_AUDIT_LOGS_PATH = MAIL_BASE_PATH + "/audit-logs";
export const MAIL_AUDIT_LOG_RESEND_PATH = ({ id }: { id: number }) =>
  `${MAIL_AUDIT_LOGS_PATH}/${id}/resend`;

export const MAIL_SCHEDULED_EMAILS_PATH = MAIL_BASE_PATH + "/scheduled-emails";
export const MAIL_SCHEDULED_EMAIL_DETAIL_PATH = ({ id }: { id: number }) =>
  `${MAIL_SCHEDULED_EMAILS_PATH}/${id}`;

export const MAIL_TEMPLATES_PATH = MAIL_BASE_PATH + "/templates";
export const MAIL_TEMPLATE_DETAIL_PATH = ({ id }: { id: number }) =>
  `${MAIL_TEMPLATES_PATH}/${id}`;

export const MAIL_CLIENT_APPLICATIONS_PATH =
  MAIL_BASE_PATH + "/client-applications";
export const MAIL_CLIENT_APPLICATION_DETAIL_PATH = ({ id }: { id: string }) =>
  `${MAIL_CLIENT_APPLICATIONS_PATH}/${id}`;

// darmoz-whatsapp: servicio separado, context-path "/darmoz-whatsapp",
// protegido con el mismo JWT del dashboard (rol SUPER), errores RFC7807.
export const WA_BASE_PATH = "/darmoz-whatsapp";

export const WA_ACCOUNTS_PATH = WA_BASE_PATH + "/accounts";
export const WA_ACCOUNT_DETAIL_PATH = ({ id }: { id: string }) =>
  `${WA_ACCOUNTS_PATH}/${id}`;
export const WA_ACCOUNT_ACTION_PATH = ({
  id,
  action,
}: {
  id: string;
  action:
    | "validate"
    | "sync-numbers"
    | "subscribe"
    | "webhook-info"
    | "regenerate-verify-token";
}) => `${WA_ACCOUNTS_PATH}/${id}/${action}`;

export const WA_PHONE_NUMBERS_PATH = WA_BASE_PATH + "/phone-numbers";
export const WA_PHONE_NUMBER_DETAIL_PATH = ({ id }: { id: string }) =>
  `${WA_PHONE_NUMBERS_PATH}/${id}`;
export const WA_PHONE_NUMBER_TEST_MESSAGE_PATH = ({ id }: { id: string }) =>
  `${WA_PHONE_NUMBERS_PATH}/${id}/test-message`;

export const WA_INTEGRATIONS_PATH = WA_BASE_PATH + "/integrations";
export const WA_INTEGRATION_DETAIL_PATH = ({ id }: { id: string }) =>
  `${WA_INTEGRATIONS_PATH}/${id}`;
export const WA_INTEGRATION_TEST_PATH = ({ id }: { id: string }) =>
  `${WA_INTEGRATIONS_PATH}/${id}/test`;

export const WA_BOTS_PATH = WA_BASE_PATH + "/bots";
export const WA_BOT_DETAIL_PATH = ({ id }: { id: string }) =>
  `${WA_BOTS_PATH}/${id}`;

export const WA_FLOWS_PATH = ({ botId }: { botId: string }) =>
  `${WA_BOTS_PATH}/${botId}/flows`;
export const WA_FLOW_DETAIL_PATH = ({
  botId,
  flowId,
}: {
  botId: string;
  flowId: string;
}) => `${WA_FLOWS_PATH({ botId })}/${flowId}`;
export const WA_FLOW_ACTION_PATH = ({
  botId,
  flowId,
  action,
}: {
  botId: string;
  flowId: string;
  action: "draft" | "validate" | "publish";
}) => `${WA_FLOW_DETAIL_PATH({ botId, flowId })}/${action}`;

export const WA_CONVERSATIONS_PATH = WA_BASE_PATH + "/conversations";
export const WA_CONVERSATION_DETAIL_PATH = ({ id }: { id: string }) =>
  `${WA_CONVERSATIONS_PATH}/${id}`;
export const WA_CONVERSATION_MESSAGES_PATH = ({ id }: { id: string }) =>
  `${WA_CONVERSATIONS_PATH}/${id}/messages`;
export const WA_CONVERSATION_RESET_PATH = ({ id }: { id: string }) =>
  `${WA_CONVERSATIONS_PATH}/${id}/reset`;

export const WA_MESSAGE_LOGS_PATH = WA_BASE_PATH + "/message-logs";
