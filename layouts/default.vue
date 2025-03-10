<script lang="ts" setup>
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Icon } from "@iconify/vue";

const colorMode = useColorMode();
</script>

<template>
  <div
    class="border-b-[1.5px] border-black flex items-center justify-between px-4 py-2"
  >
    <h2 class="font-bold text-xl">Sensore su rete Lepida IOT per la PA</h2>
    <NavigationMenu>
      <NavigationMenuList class="flex items-center">
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/docs/introduction"
            :class="navigationMenuTriggerStyle()"
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>

        <Separator orientation="vertical" />

        <DropdownMenu class="h-full">
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" class="h-full">
              <Icon
                icon="radix-icons:moon"
                class="h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100 transition-all -rotate-90 scale-0"
              />
              <Icon
                icon="radix-icons:sun"
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
  <slot />
</template>

<style></style>
