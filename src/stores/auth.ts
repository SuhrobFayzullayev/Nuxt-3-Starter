import * as zod from "zod";
import { menu, type UserRolesType } from "~/constants";
import { useCookieStore } from "./cookie";

export const formSchema = zod.object({
  name: zod.string().trim().nonempty("help.field_is_required"),
  password: zod
    .string()
    .trim()
    .nonempty("help.field_is_required")
    .min(4, "help.password_min_4"),
});

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const { $baseFetch, $authFetch } = useNuxtApp();
  const { apiURL } = useRuntimeConfig().public;
  const cookieStore = useCookieStore();
  const localePath = useLocalePath();
  const { t } = useI18n();

  const isLoading = ref(false);

  const login = async (payload: zod.infer<typeof formSchema>) => {
    isLoading.value = true;

    const data: {
      data: { token: string; role: UserRolesType };
      status: "success" | "error";
    } = await $baseFetch("/auth/login", {
      method: "POST",
      body: payload,
    });

    if (data.status === "success") {
      const token: string = data.data.token;
      const role: UserRolesType = data.data?.role || "admin"; // by default admin

      cookieStore.setAccessToken(token);
      cookieStore.setUserRole(role);

      router.push(localePath(menu[role]?.[0].path!));
    }

    isLoading.value = false;
  };

  const logout = async () => {
    isLoading.value = true;

    const { data } = await $authFetch(`${apiURL}/api/auth/logout`).get();

    if (data.value) {
      cookieStore.setAccessToken(null);
      cookieStore.setUserRole(null);

      isLoading.value = false;

      router.push(localePath("/"));
    } else {
      t("general.fail");

      isLoading.value = false;
    }
  };

  return {
    isLoading,
    login,
    logout,
  };
});
