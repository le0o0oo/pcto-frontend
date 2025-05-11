<script lang="ts" setup>
import { VisuallyHidden } from "reka-ui";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const colorMode = useColorMode();

const menuItems: { label: string; icon: string; href: string }[] = [
  { label: "Home", icon: "lucide:home", href: "/" },
  { label: "Relazione", icon: "lucide:file-text", href: "/relazione" },
];

const isDesktop = useMediaQuery("(min-width: 768px)");

const isSheetOpen = ref(false);
</script>

<template>
  <div
    class="border-b-[1.5px] flex items-center justify-between px-4 py-2 bg-background shadow-md z-50"
    style="position: sticky; top: 0"
  >
    <h2 class="font-bold md:text-xl md:w-auto w-full text-xs">
      Sensore su rete Lepida IOT per la PA
    </h2>
    <div class="flex justify-end items-center md:hidden">
      <Button variant="ghost" @click="isSheetOpen = true">
        <Icon name="lucide:menu" class="size-5 text-white" />
      </Button>
    </div>
    <NavigationMenu class="hidden md:block">
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

    <Sheet v-model:open="isSheetOpen">
      <SheetContent>
        <SheetHeader>
          <VisuallyHidden><SheetTitle>Menu</SheetTitle></VisuallyHidden>
          <SheetDescription>
            <div class="flex flex-col gap-3 mt-5">
              <NuxtLink
                v-for="i in menuItems"
                :class="cn(buttonVariants({ variant: 'outline' }), 'w-full')"
                :to="i.href"
                @click="isSheetOpen = false"
              >
                <Icon :name="i.icon" class="mr-2 mt-[0.8px]" />
                <span>{{ i.label }}</span>
              </NuxtLink>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  </div>
</template>

<style></style>
