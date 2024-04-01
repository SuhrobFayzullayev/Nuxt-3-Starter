import { menu, userRoles } from "~/constants";
import { useCookieStore } from "~/stores/cookie";

export default defineNuxtRouteMiddleware((to, _from) => {
  const localePath = useLocalePath();
  const cookieStore = useCookieStore();

  const isUserLoggedIn = !!cookieStore.getAccessToken();
  const userRole = cookieStore.getUserRole();

  const toPath: string = to.path;
  const loginPath: string = localePath("/admin/login");

  if (isUserLoggedIn && userRoles.ROLE_ADMIN === userRole)
    if (toPath === loginPath)
      return navigateTo(localePath(menu[userRole!]?.[0].path!));

  if (
    (!isUserLoggedIn || userRoles.ROLE_ADMIN !== userRole) &&
    toPath !== loginPath
  )
    return navigateTo(loginPath);
});
