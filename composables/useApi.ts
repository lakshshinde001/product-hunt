// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;

  return {
    USER_API: `${baseUrl}/users`,
    PRODUCT_API: `${baseUrl}/products`,
    COMMENT_API: `${baseUrl}/comments`
  };
};
