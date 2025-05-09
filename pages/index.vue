<script lang="ts" setup>
const data: Ref<
  { name: string; Temperature: number; Humidity: number; Battery: number }[]
> = ref([]);

const dataTmp: Ref<{ name: string; Temperature: number }[]> = ref([]);
const dataHum: Ref<{ name: string; Humidity: number }[]> = ref([]);
const dataBatt: Ref<{ name: string; Battery: number }[]> = ref([]);

interface response {
  data: {
    data: string;
    frequenza: string;
    fport: number;
    gateway: string;
    rssi: number;
    time: string;
  }[];
  eui: string;
  from: string;
  "nr payloads": number;
  request_method: string;
}

function formatTime(timeString: string): string {
  const [datePart, timePart] = timeString.split(" ");
  const [year, month, day] = datePart!.split("-");

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentDay = currentDate.getDate().toString().padStart(2, "0");

  if (year === currentYear && month === currentMonth && day === currentDay) {
    return timePart ?? "";
  }

  return `${day}/${month}/${year} ${timePart}`;
}

onMounted(async () => {
  const historyData = (await $fetch("/api/data")) as response;

  historyData.data.map((i) => {
    data.value.push({
      name: formatTime(i!.time),
      Temperature: decoder(i!.data)!.temp,
      Humidity: decoder(i!.data)!.hum,
      Battery: decoder(i!.data)!.battery,
    });

    dataTmp.value.push({
      name: formatTime(i!.time),
      Temperature: decoder(i!.data)!.temp,
    });
    dataHum.value.push({
      name: formatTime(i!.time),
      Humidity: decoder(i!.data)!.hum,
    });
    dataBatt.value.push({
      name: formatTime(i!.time),
      Battery: decoder(i!.data)!.battery,
    });
  });
});
</script>

<template>
  <div class="size-full">
    <div
      class="w-full flex items-center justify-end"
      style="margin-bottom: 20px"
    >
      <div class="w-full"></div>
      <div>
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
              <SelectItem value="year"> Ultimo anno </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div style="margin-bottom: 30px">
      <AreaChart
        :data="data"
        index="name"
        :categories="['Temperature', 'Humidity', 'Battery']"
        :colors="[
          'hsl(var(--vis-secondary-color)',
          'hsl(var(--vis-primary-color)',
          '#3f91d4',
        ]"
      />
    </div>

    <div
      class="grid grid-cols-3 gap-4"
      style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr))"
    >
      <div class="p-3">
        <LineChart
          :data="dataTmp"
          index="name"
          :categories="['Temperature']"
          :colors="['hsl(var(--vis-secondary-color)']"
        />
      </div>
      <div class="p-3">
        <LineChart
          :data="dataHum"
          index="name"
          :categories="['Humidity']"
          :colors="['hsl(var(--vis-primary-color)']"
        />
      </div>
      <div class="p-3">
        <LineChart
          :data="dataBatt"
          index="name"
          :categories="['Battery']"
          :colors="['#3f91d4']"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
