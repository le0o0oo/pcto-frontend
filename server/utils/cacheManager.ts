import { consola } from "consola";

const config = useRuntimeConfig();

let cache: any = {};

async function fetchData() {
  consola.info("Fetching data from Lepida API...");
  const res = await $fetch(
    `https://api.retepaiot.it/sensordata/${config.app_eui}`,
    {
      method: "POST",
      body: {
        auth_key: config.lepida_api_key,
        from: "2025-03-25 00:00:00",
      },
    }
  );

  cache = res;
  consola.success("Data fetched & cached");
}

function getCache() {
  return cache;
}

export default { fetchData, getCache };
