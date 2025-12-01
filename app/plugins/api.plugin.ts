export default defineNuxtPlugin(() => {
  const apiFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
      credentials: "include",

      // manual csrf :(
    onRequest({ options }) {
      const isMethodProtected = options.method && !["GET", "HEAD", "OPTIONS"].includes(options.method.toUpperCase());
      if (import.meta.client && isMethodProtected) {
        const token = useCookie("XSRF-TOKEN").value;

        if (token) {
          options.headers.set("X-XSRF-TOKEN", token);
        }
      }
    },
  });

  return {
    provide: {
      api: apiFetch,
    },
  };
});