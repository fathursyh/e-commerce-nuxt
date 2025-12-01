export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  return {
    provide: {
      api,
    },
  };
});
