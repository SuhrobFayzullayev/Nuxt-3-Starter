import type { CookieRef } from "#app";
import type { UserRolesType } from "~/constants";

export const useCookieStore = defineStore("cookie", () => {
  // state
  const accessToken = useCookie("access_token", {
    maxAge: 86400 * 7,
  });

  const userRole: CookieRef<UserRolesType | null> = useCookie("user_role", {
    maxAge: 86400 * 7,
  });

  // getter
  const getAccessToken = () => accessToken.value;

  const getUserRole = () => userRole.value;

  // setter
  const setAccessToken = (token: string | null) => {
    if (token) {
      accessToken.value = token;
    } else {
      accessToken.value = null;
    }
  };

  const setUserRole = (role: UserRolesType | null) => {
    if (role) {
      userRole.value = role;
    } else {
      userRole.value = null;
    }
  };

  return { getAccessToken, setAccessToken, getUserRole, setUserRole };
});
