<script lang="ts" setup>
const data: Ref<{ name: string; Temperature: number; Humidity: number }[]> =
  ref([]);

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
  return `${day}/${month}/${year} - ${timePart}`;
}

onMounted(async () => {
  const historyData = (await $fetch("/api/data")) as response;

  for (let i = 26; i < historyData.data.length; i++) {
    console.log(historyData.data[i]!.time);

    data.value.push({
      name: formatTime(historyData.data[i]!.time),
      Temperature: decoder(historyData.data[i]!.data)!.temp,
      Humidity: decoder(historyData.data[i]!.data)!.hum,
    });
  }
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
        :categories="['Temperature', 'Humidity']"
        :colors="[
          'hsl(var(--vis-secondary-color)',
          'hsl(var(--vis-primary-color)',
        ]"
      />
    </div>

    <div
      class="grid grid-cols-2 gap-4"
      style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr))"
    >
      <div>ciao</div>
      <div>ciao</div>
    </div>
  </div>
</template>

<style></style>
