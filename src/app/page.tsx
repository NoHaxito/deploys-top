import {
  ArrowUpRight,
  ChevronRight,
  LucideLayoutPanelLeft,
} from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative mx-auto flex h-[calc(100vh-4.5rem)] max-w-2xl flex-col items-center justify-center duration-300 animate-in fade-in-0 slide-in-from-bottom-10">
      <div className="mb-8 flex">
        {/* <Link href="/compare" className="inline-flex">
          <Badge variant="secondary" className="h-8 rounded-lg">
            NEW › Compare providers
            <span className="inline-flex items-center pl-2 text-black dark:text-white">
              <ArrowRight
                className="pl-0.5 text-black dark:text-white"
                size={16}
              />
            </span>
          </Badge>
        </Link> */}
      </div>
      <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl">
        Search & compare free and paid providers
      </h2>
      <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo quia
        officiis velit explicabo, error repellendus aut sed placeat.
      </p>
      <div className="mt-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Link className="w-full" href="/providers">
            <Button
              className="group w-full"
              iconPlacement="right"
              Icon={ChevronRight}
            >
              <LucideLayoutPanelLeft className="size-4" />
              See providers
            </Button>
          </Link>
          <Link
            href="https://github.com/nohaxito/deploys-top"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center"
          >
            <Button
              variant="secondary"
              className="group w-full"
              iconPlacement="right"
              Icon={ArrowUpRight}
            >
              <GithubIcon className="size-4" />
              Go to GitHub
            </Button>{" "}
          </Link>
        </div>

        <Link
          href="https://github.com/nohaxito/deploys-top"
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-full inline-flex items-center"
        >
          <Button className="w-full text-muted-foreground" variant="link">
            Request a provider
          </Button>
        </Link>
      </div>
    </div>
  );
}
