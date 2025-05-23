import { Nitro } from "nitropack";
import cacheManager from "./utils/cacheManager";

export default async function defineNitroPlugin(_nitroApp: Nitro) {
  //console.log(decoder("2e13500a"));

  cacheManager.fetchData();

  setInterval(() => {
    cacheManager.fetchData();
  }, 1000 * 60 * 10); // 10 minutes
}
