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
