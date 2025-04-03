<script lang="ts" setup>
onMounted(async () => {
  console.log("fetching");
  const historyData = await $fetch("/api/data");

  console.log(historyData);
});

const data = [
  {
    name: "Jan",
    temp: Math.floor(Math.random() * 2000) + 500,
    hum: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    temp: Math.floor(Math.random() * 2000) + 500,
    hum: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    temp: Math.floor(Math.random() * 2000) + 500,
    hum: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    temp: Math.floor(Math.random() * 2000) + 500,
    hum: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    temp: Math.floor(Math.random() * 2000) + 500,
    hum: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    temp: Math.floor(Math.random() * 2000) + 500,
    hum: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jul",
    temp: Math.floor(Math.random() * 2000) + 500,
    hum: Math.floor(Math.random() * 2000) + 500,
  },
];
</script>

<template>
  <div class="size-full">
    <div class="w-full flex items-center justify-end mb-5">
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
    <AreaChart
      :data="data"
      index="name"
      :categories="['temp', 'hum']"
      class="!max-w-[50%]"
    />
    <!-- <div class="w-full grid grid-cols-2 gap-4">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent> Card Content </CardContent>
          <CardFooter> Card Footer </CardFooter>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent> Card Content </CardContent>
          <CardFooter> Card Footer </CardFooter>
        </Card>
      </div>
    </div> -->
  </div>
</template>

<style></style>
