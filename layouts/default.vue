<script lang="ts" setup>
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const colorMode = useColorMode();

const menuItems: { label: string; icon: string; href: string }[] = [
  { label: "Home", icon: "lucide:home", href: "/" },
  { label: "Relazione", icon: "lucide:file-text", href: "/relazione" },
];
</script>

<template>
  <div
    class="border-b-[1.5px] border-black flex items-center justify-between px-4 py-2 mb-5"
  >
    <h2 class="font-bold text-xl">Sensore su rete Lepida IOT per la PA</h2>
    <NavigationMenu>
      <NavigationMenuList class="flex items-center">
        <NavigationMenuItem v-for="i in menuItems">
          <NuxtLink :href="i.href" :class="navigationMenuTriggerStyle()">
            <Icon :name="i.icon" class="mr-2 mt-[0.8px]" />
            <span>{{ i.label }}</span>
          </NuxtLink>
        </NavigationMenuItem>

        <Separator orientation="vertical" />

        <DropdownMenu class="h-full">
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="h-full">
              <Icon
                name="lucide:moon"
                class="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100 transition-all -rotate-90 scale-0"
              />
              <Icon
                name="lucide:sun"
                class="absolute h-[1.2rem] w-[1.2rem] dark:rotate-90 dark:scale-0 transition-all rotate-0 scale-100"
              />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="colorMode.preference = 'light'">
              Light
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'dark'">
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'system'">
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
  <div class="p-3 size-full">
    <slot />
  </div>
</template>

<style></style>
