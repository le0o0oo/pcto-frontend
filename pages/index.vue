<script lang="ts" setup>
import { VisuallyHidden } from "reka-ui";
import Tooltip from "~/components/Tooltip.vue";
import CardContent from "~/components/ui/card/CardContent.vue";

const data: Ref<
  { name: string; Temperature: number; Humidity: number; Battery: number }[]
> = ref([]);

const dataTmp: Ref<{ name: string; Temperature: number }[]> = ref([]);
const dataHum: Ref<{ name: string; Humidity: number }[]> = ref([]);
const dataBatt: Ref<{ name: string; Battery: number }[]> = ref([]);

const selectedIndex: Ref<number | undefined> = ref();
const infoModal = ref(false);

const res: Ref<response | undefined> = ref();
const loading = ref(true);

const reversedTableData = computed(() => {
  if (res.value && res.value.data && Array.isArray(res.value.data)) {
    return [...res.value.data].reverse(); // Create a new reversed array
  }
  return []; // Return an empty array if data is not available
});

let exiting = false;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface response {
  data: {
    id: number;
    data: string;
    frequenza: string;
    fport: number;
    gateway: string;
    rssi: number;
    snr: number;
    sf: number;
    time: string;
  }[];
  eui: string;
  from: string;
  "nr payloads": number;
  request_method: string;
}

function formatTime(timeString: string): string {
  // Parse the input date string
  const date = new Date(timeString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Add 2 hours to the date
  date.setHours(date.getHours() + 2);

  // Get the current date for comparison
  const currentDate = new Date();
  const isToday =
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate();

  // Format the date and time
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  if (isToday) {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

async function loadData() {
  res.value = (await $fetch("/api/data")) as response;
  const historyData = res.value;

  data.value = [];
  dataTmp.value = [];
  dataHum.value = [];
  dataBatt.value = [];

  historyData.data.map((i) => {
    const decoderData = decoder(i.data);

    data.value.push({
      name: formatTime(i!.time),
      Temperature: decoderData!.temp,
      Humidity: decoderData!.hum,
      Battery: decoderData!.battery,
    });

    dataTmp.value.push({
      name: formatTime(i!.time),
      Temperature: decoderData!.temp,
    });
    dataHum.value.push({
      name: formatTime(i!.time),
      Humidity: decoderData!.hum,
    });
    dataBatt.value.push({
      name: formatTime(i!.time),
      Battery: decoderData!.battery,
    });
  });
  loading.value = false;
}

const { pause, resume, isActive } = useIntervalFn(() => {
  loadData();
}, 60000); // every 60 seconds

onMounted(async () => {
  loadData();
  exiting = false;
  resume();

  // await nextTick();

  await delay(1000);
  try {
    for (let i = 0; i < 3; i++) {
      if (exiting) break;
      //@ts-ignore
      document.getElementsByClassName("css-1hu7fn8-legendItem")[i].click();
      await delay(450);
    }
    if (!exiting) {
      //@ts-ignore
      document.getElementsByClassName("css-1hu7fn8-legendItem")[2].click();
    }
  } catch (e) {}
});

onBeforeUnmount(() => {
  pause();
  exiting = true;
});
</script>

<template>
  <div class="size-full">
    <div class="w-full flex items-center justify-end">
      <div v-if="false">
        <Select>
          <SelectTrigger>
            <SelectValue
              placeholder="Select a range"
              class="mr-2"
              default="year"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Range</SelectLabel>
              <SelectItem value="beginning"> Dall'inizio </SelectItem>
              <SelectItem value="month"> Ultimo mese </SelectItem>
              <SelectItem value="week"> Ultima settimana </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 grid-cols-1 gap-3 mb-3">
      <div class="size-full">
        <Card class="size-full">
          <CardHeader>
            <CardTitle
              >Lista dati
              {{ !loading ? `(${res?.data.length} voci)` : "" }}</CardTitle
            >
            <VisuallyHidden>
              <CardDescription></CardDescription>
            </VisuallyHidden>
          </CardHeader>
          <CardContent class="max-h-[39vh] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead> Time </TableHead>
                  <TableHead>Hex</TableHead>
                  <TableHead>Decodificato</TableHead>
                  <TableHead class="text-right"> </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody v-auto-animate>
                <TableRow
                  v-if="!loading"
                  v-for="(i, index) in reversedTableData"
                  :key="i.id"
                >
                  <TableCell class="font-medium">
                    {{ formatTime(i.time) }}
                  </TableCell>
                  <TableCell>{{ i.data }}</TableCell>
                  <TableCell
                    >Temp: {{ decoder(i.data)!.temp }}°C - Hum:
                    {{ decoder(i.data)!.hum }}% - Batt:
                    {{ decoder(i.data)!.battery }}V</TableCell
                  >
                  <TableCell class="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      @click="
                        selectedIndex = index;
                        infoModal = true;
                      "
                      ><Icon name="lucide:eye" /> Dettagli
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow v-else v-for="i in 50">
                  <TableCell class="font-medium">
                    <Skeleton class="h-[20px]" />
                  </TableCell>
                  <TableCell><Skeleton class="h-[20px]" /></TableCell>
                  <TableCell><Skeleton class="h-[20px]" /></TableCell>
                  <TableCell class="text-right">
                    <Skeleton class="h-[20px]" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dati in tabella</CardTitle>
        </CardHeader>
        <CardContent class="h-full max-h-[38.9vh]">
          <AreaChart
            v-if="!loading"
            :data="data"
            index="name"
            :categories="['Temperature', 'Humidity', 'Battery']"
            :colors="[
              'hsl(var(--vis-secondary-color)',
              'hsl(var(--vis-primary-color)',
              '#3f91d4',
            ]"
            :custom-tooltip="Tooltip"
            class="!h-full"
          />
          <Skeleton class="size-full" v-else />
        </CardContent>
      </Card>
    </div>

    <div class="grid lg:grid-cols-3 grid-cols-1 gap-3">
      <div class="size-full">
        <Card>
          <CardHeader>
            <CardTitle>Temperatura</CardTitle>
          </CardHeader>
          <CardContent class="h-full max-h-[38vh]">
            <LineChart
              v-if="!loading"
              :data="dataTmp"
              index="name"
              :categories="['Temperature']"
              :colors="['hsl(var(--vis-secondary-color)']"
              :custom-tooltip="Tooltip"
              class="max-h-[33.5vh]"
            />
            <Skeleton class="size-full h-[300px]" v-else />
          </CardContent>
        </Card>
      </div>
      <div class="size-full">
        <Card>
          <CardHeader>
            <CardTitle>Umidità</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              v-if="!loading"
              :data="dataHum"
              index="name"
              :categories="['Humidity']"
              :colors="['hsl(var(--vis-primary-color)']"
              :custom-tooltip="Tooltip"
              class="max-h-[33.5vh]"
            />
            <Skeleton class="size-full h-[300px]" v-else />
          </CardContent>
        </Card>
      </div>
      <div class="size-full">
        <Card>
          <CardHeader>
            <CardTitle>Batteria (voltaggio)</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              v-if="!loading"
              :data="dataBatt"
              index="name"
              :categories="['Battery']"
              :colors="['#3f91d4']"
              :custom-tooltip="Tooltip"
              class="max-h-[33.5vh]"
            />
            <Skeleton class="size-full h-[300px]" v-else />
          </CardContent>
        </Card>
      </div>
    </div>

    <Dialog v-model:open="infoModal">
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            >Raw data - {{ res?.data[selectedIndex!]?.id }}</DialogTitle
          >
          <DialogDescription class="mt-5">
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableCell>{{ res?.data[selectedIndex!]?.id }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead class="font-medium">Time</TableHead>
                  <TableCell>{{ res?.data[selectedIndex!]?.time }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead class="font-medium">RSSI</TableHead>
                  <TableCell>{{ res?.data[selectedIndex!]?.rssi }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead class="font-medium">SNR</TableHead>
                  <TableCell>{{ res?.data[selectedIndex!]?.snr }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead class="font-medium">SF</TableHead>
                  <TableCell>{{ res?.data[selectedIndex!]?.sf }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead class="font-medium">Gateway</TableHead>
                  <TableCell>{{
                    res?.data[selectedIndex!]?.gateway
                  }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead class="font-medium">FPort</TableHead>
                  <TableCell>{{ res?.data[selectedIndex!]?.fport }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead class="font-medium">Data</TableHead>
                  <TableCell>{{ res?.data[selectedIndex!]?.data }}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead class="font-medium">Frequenza</TableHead>
                  <TableCell>{{
                    res?.data[selectedIndex!]?.frequenza
                  }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</template>

<style></style>
