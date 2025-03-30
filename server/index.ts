import { Nitro } from "nitropack";
import cacheManager from "./utils/cacheManager";

export default async function defineNitroPlugin(_nitroApp: Nitro) {
  cacheManager.fetchData();
}
