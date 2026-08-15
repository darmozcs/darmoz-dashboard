export const BASE_PATH = "/api/v1";
export const EXAMPLE_PATH = BASE_PATH + "/example";
export const EXAMPLE_DETAIL_PATH = ({ id }: { id: string }) =>
  `${EXAMPLE_PATH}/${id}`;

export const AUTH_PATH = "/auth";
export const AUTH_REGISTER_PATH = AUTH_PATH + "/register";
export const AUTH_LOGIN_PATH = AUTH_PATH + "/login";
export const AUTH_REFRESH_PATH = AUTH_PATH + "/refresh";
export const AUTH_LOGOUT_PATH = AUTH_PATH + "/logout";
export const AUTH_VERIFY_PATH = AUTH_PATH + "/verify";
