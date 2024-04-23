import {
  LucideDollarSign,
  LucideGitCompareArrows,
  LucideLayoutGrid,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { providers, categories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function DesktopMenu() {
  const pathname = usePathname();
  const first_4_categories = React.useMemo(() => {
    return categories.slice(0, 4);
  }, []);
  const first_6_free_providers = React.useMemo(() => {
    return providers
      .filter((provider) => provider.free_tier !== null)
      .slice(0, 6);
  }, []);
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem value="free-providers">
          <NavigationMenuTrigger className="h-8 bg-transparent">
            Free Providers
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-4 w-[400px] xl:w-[500px] grid-cols-1 xl:grid-cols-2">
              {first_6_free_providers.map((provider) => (
                <ListItem
                  key={provider.name
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace(".", "-")}
                  icon={provider.icon}
                  href={`/providers/${provider.name
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace(".", "-")}`}
                  title={provider.name}
                >
                  {provider.description}
                </ListItem>
              ))}
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-center col-span-full",
                )}
                href="/providers?free"
              >
                See all free providers ({providers.length})
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-8 bg-transparent">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 p-4 w-[350px] grid-cols-2">
              {first_4_categories.map((category) => (
                <ListItem
                  key={category.name
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace(".", "-")}
                  icon={category.icon}
                  href={category.href}
                  title={category.name}
                />
              ))}
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "text-center col-span-full",
                )}
                href="/providers?categories"
              >
                See all categories ({categories.length})
              </Link>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/compare" legacyBehavior passHref>
            <NavigationMenuLink
              active={pathname === "/compare"}
              className={navigationMenuTriggerStyle({
                className: "h-8 bg-transparent",
              })}
            >
              Compare providers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
export function MobileMenu() {
  const first_4_categories = React.useMemo(() => {
    return categories.slice(0, 4);
  }, []);
  const first_6_free_providers = React.useMemo(() => {
    return providers
      .filter((provider) => provider.free_tier !== null)
      .slice(0, 6);
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="group h-8 w-8 whitespace-nowrap overflow-hidden sm:w-max flex md:hidden"
        >
          <div className="relative group flex flex-col gap-1">
            <div className="w-4 h-px group-data-[state=open]:-rotate-45 group-data-[state=open]:translate-y-1 transition-transform bg-foreground rounded-lg" />
            <div className="w-4 h-px bg-foreground group-data-[state=open]:w-0 transition-[width] rounded-lg" />
            <div className="w-4 h-px bg-foreground group-data-[state=open]:rotate-45 group-data-[state=open]:-translate-y-[5.5px] transition-transform rounded-lg" />
          </div>
          <span className="sr-only">Toggle menu</span>
          <p className="hidden sm:block group-data-[state=open]:after:content-['Close_Menu'] after:content-['Open_Menu']"></p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mr-1 sm:min-w-40">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            icon={<LucideLayoutGrid className="size-4" />}
          >
            Categories
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent alignOffset={-4} className="mr-1 sm:min-w-40">
            {first_4_categories.map((category) => (
              <DropdownMenuItem
                asChild
                key={category.name
                  .toLowerCase()
                  .replace(" ", "-")
                  .replace(".", "-")}
                icon={category.icon}
              >
                <Link href={category.href}>{category.name}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-xs">
              <Link href="/providers?categories">
                See all categories ({categories.length})
              </Link>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            icon={<LucideDollarSign className="size-4" />}
          >
            Free Providers
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="mr-1 max-w-40 sm:min-w-40">
            {first_6_free_providers.map((provider) => (
              <DropdownMenuItem
                asChild
                key={provider.name
                  .toLowerCase()
                  .replace(" ", "-")
                  .replace(".", "-")}
                icon={provider.icon}
              >
                <Link
                  href={`/providers/${provider.name
                    .toLowerCase()
                    .replace(" ", "-")
                    .replace(".", "-")}`}
                >
                  {provider.name}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="text-xs">
              <Link href="/providers?free">
                See all free providers ({providers.length})
              </Link>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem
          asChild
          icon={<LucideGitCompareArrows className="size-4" />}
        >
          <Link href="/compare">Compare</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ReactNode | string;
  }
>(({ className, title, children, icon, href, ...props }, ref) => {
  const pathname = usePathname();
  return (
    <li>
      <NavigationMenuLink asChild active={href === pathname}>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-300 data-[active]:bg-accent hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          href={href!}
          {...props}
        >
          <div className="flex items-center gap-2">
            {typeof icon === "string" ? (
              <img loading="lazy" src={icon} className="size-8 min-w-8" />
            ) : (
              icon
            )}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium leading-none">
                {title}
              </div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
