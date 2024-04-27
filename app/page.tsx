import {
  ChevronRight,
  LucideGithub,
  LucideLayoutPanelLeft,
} from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative mx-auto flex h-[calc(100vh-4.2rem)] max-w-2xl flex-col items-center justify-center">
      {/* <div className="mb-8 flex">
        <a
          href="https://github.com/ibelick/background-snippets"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]" />
            <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
              New snippets ⚡️
              <span className="inline-flex items-center pl-2 text-black dark:text-white">
                Read more{" "}
                <ArrowRight
                  className="pl-0.5 text-black dark:text-white"
                  size={16}
                />
              </span>
            </div>
          </span>
        </a>
      </div> */}
      <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl">
        Lorem ipsum, dolor sit amet consectetur.
      </h2>
      <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
        exercitationem quaerat nemo ullam atque rem, mollitia, reprehenderit
        impedit porro quidem fugit totam animi.
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
              Icon={ChevronRight}
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
