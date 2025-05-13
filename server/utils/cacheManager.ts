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
        from: config.start_from,
      },
    }
  );
  console.log(res);

  if ((res as any).data) cache = res;
  consola.success("Data fetched & cached");
}

function getCache() {
  fetchData();
  return cache;
}

export default { fetchData, getCache };
