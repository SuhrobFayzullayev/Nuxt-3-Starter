import { createFetch } from "@vueuse/core";
import { useCookieStore } from "~/stores/common/cookie";

export default defineNuxtPlugin(() => {
  const { apiURL } = useRuntimeConfig().public;
  const { getAccessToken } = useCookieStore();

  // fetch without token
  const baseFetch = $fetch.create({ baseURL: `${apiURL}/api` });

  // fetch with token
  const authFetch = createFetch({
    baseUrl: `${apiURL}/api/admin`,
    options: {
      beforeFetch: ({ options }) => {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${getAccessToken()}`,
        };

        return { options };
      },
    },
  });

  return {
    provide: {
      baseFetch,
      authFetch,
    },
  };
});
