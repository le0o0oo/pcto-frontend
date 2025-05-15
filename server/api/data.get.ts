import cacheManager from "../utils/cacheManager";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  return await cacheManager.getCache();
});
