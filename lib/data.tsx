import {
  LucideDatabase,
  LucideImage,
  LucideServer,
  LucideZap,
} from "lucide-react";
import { ReactNode } from "react";

export interface Category {
  name: string;
  href: string;
  icon: ReactNode;
  id: string;
}
export interface Provider {
  name: string;
  description: string;
  icon: string;
  href: string;
  pricing_href: string;
  services_offered: ServiceOffered[];
  as_free_tier: boolean;
  is_serverless: boolean;
}
export interface ServiceOffered {
  category_name?: string;
  name: string;
  description?: string;
  supported_types?: string[];
  pricing: {
    free_tier?: any[];
  };
  disabled?: boolean; // for avoiding modal open
}

export const providers: Provider[] = [
  {
    name: "Vercel",
    description:
      "Build and deploy the best Web experiences with The Frontend Cloud.",
    href: "https://vercel.com/home",
    pricing_href: "https://vercel.com/pricing",
    icon: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico",
    services_offered: [
      {
        category_name: "deployments",
        name: "Deployments",
        supported_types: ["Next.js", "React", "Astro"],
        pricing: {
          free_tier: [
            {
              type: "Bandwith",
              included: "100 GB",
              price_per_gb: "$0.15",
            },
            {
              type: "Projects",
              included: "Unlimited",
            },
          ],
        },
      },
      {
        category_name: "databases",
        name: "Databases",
        supported_types: ["PostgreSQL", "Redis KV"],
        pricing: {
          free_tier: [
            {
              type: "Compute Hours",
              included: "60 hours",
            },
            {
              type: "Redis KV Requests",
              included: "30,000 requests",
            },
          ],
        },
      },
      {
        category_name: "bucket_storage",
        name: "Vercel Blob",
        supported_types: ["Files"],
        pricing: {
          free_tier: [
            {
              type: "",
              included: "60 hours",
            },
          ],
        },
        disabled: true,
      },
    ],
    as_free_tier: true,
    is_serverless: false,
  },
  {
    name: "Cloudflare",
    description: "Connect, protect and build everywhere",
    href: "https://cloudflare.com",
    pricing_href: "https://cloudflare.com/plans",
    icon: "https://www.cloudflare.com/favicon.ico",
    services_offered: [
      {
        category_name: "deployments",
        name: "Cloudflare Pages",
        supported_types: ["Static Sites", "React", "Astro", "Remix"],
        pricing: {
          free_tier: [
            {
              type: "Bandwith",
              included: "100 GB",
              price_per_gb: "$0.15",
            },
            {
              type: "Projects",
              included: "Unlimited",
            },
          ],
        },
      },
      {
        category_name: "databases",
        name: "Cloudflare D1",
        supported_types: ["SQLite"],
        pricing: {
          free_tier: [
            {
              type: "Compute Hours",
              included: "60 hours",
            },
          ],
        },
      },  
      {
        category_name: "bucket_storage",
        name: "Cloudflare R2",
        supported_types: ["Files"],
        pricing: {
          free_tier: [
            {
              type: "Storage",
              included: "10 GB / month",
            },
            {
              type: "Class A Operations",
              included: "1 Million / month",
            },
            {
              type: "Class B Operations",
              included: "10 Million / month",
            },
          ],
        },
      },
    ],
    as_free_tier: true,
    is_serverless: false,
  },
  {
    name: "Netlify",
    description: " Scale & Ship Faster with a Composable Web Architecture.",
    href: "https://netlify.com",
    pricing_href: "https://cloudflare.com/plans",
    icon: "https://www.netlify.com/favicon/icon.svg",
    services_offered: [
      {
        category_name: "deployments",
        name: "Deployments",
        supported_types: ["Next.js", "React", "Gatsby", "Static Sites"],
        pricing: {
          free_tier: [
            {
              type: "Bandwith",
              included: "100 GB",
              price_per_gb: "$0.55",
            },
            {
              type: "Websites",
              included: "500",
            },
          ],
        },
      },
    ],
    as_free_tier: true,
    is_serverless: false,
  },
  {
    name: "Aiven.io",
    description: "The trusted open source data platform for everyone.",
    href: "https://aiven.io",
    pricing_href: "https://aiven.io/pricing",
    icon: "https://aiven.io/favicons/favicon-32x32.png",
    services_offered: [
      {
        category_name: "databases",
        name: "Databases",
        supported_types: ["MySQL", "PostgreSQL", "Redis"],
        pricing: {
          free_tier: [
            {
              type: "Storage (not applicable for Redis)",
              included: "5 GB",
            },
          ],
        },
      },
    ],
    as_free_tier: true,
    is_serverless: false,
  },
  {
    name: "Supabase",
    description: "The open source Firebase alternative.",
    href: "https://supabase.com",
    pricing_href: "https://supabase.com/pricing",
    icon: "https://supabase.com/favicon/favicon-32x32.png",
    services_offered: [
      {
        category_name: "authentication",
        name: "User Authentication",
        pricing: {
          free_tier: [
            {
              type: "Users",
              included: "Unlimited",
            },
          ],
        },
      },
      {
        category_name: "databases",
        name: "Database",
        supported_types: ["PostgreSQL"],
        pricing: {
          free_tier: [
            {
              type: "Storage",
              included: "1 GB",
            },
          ],
        },
      },
      {
        category_name: "bucket_storage",
        name: "Storage",
        supported_types: ["Bucket Storage"],
        pricing: {
          free_tier: [
            {
              type: "Storage",
              included: "5 GB",
            },
          ],
        },
      },
    ],
    as_free_tier: true,
    is_serverless: false,
  },
  {
    name: "Zeabur",
    description: "Deploy Painlessly, Scale Infinitely.",
    href: "https://zeabur.com",
    pricing_href: "https://zeabur.com/pricing",
    icon: "https://zeabur.com/favicon.svg",
    services_offered: [
      {
        category_name: "deployments",
        name: "Deployments",
        supported_types: [
          "Static Sites",
          "Node.js",
          "Python",
          "Go",
          "Rust",
          "Ruby",
        ],
        pricing: {
          free_tier: [
            {
              type: "Bandwith",
              included: "---",
            },
            {
              type: "Projects",
              included: "Unlimited",
            },
          ],
        },
      },
    ],
    as_free_tier: true,
    is_serverless: true,
  },
  {
    name: "Render",
    description: "Cloud application hosting for developers.",
    href: "https://render.com",
    pricing_href: "https://render.com/pricing",
    icon: "https://cdn.nohaxito.xyz/render-logo.webp",
    services_offered: [
      {
        category_name: "deployments",
        name: "Deployments",
        supported_types: [
          "Static Sites",
          "Node.js",
          "Python",
          "Go",
          "Rust",
          "Ruby",
        ],
        pricing: {
          free_tier: [
            {
              type: "Bandwith",
              included: "100 GB",
              price_per_gb: "$0.3",
            },
            {
              type: "Projects",
              included: "Unlimited",
            },
          ],
        },
      },
      {
        category_name: "databases",
        name: "Databases",
        supported_types: ["PostgreSQL", "Redis"],
        pricing: {
          free_tier: [
            {
              type: "Automatic Backups",
              included: "Yes",
            },
            {
              type: "Storage",
              included: "1 GB",
            },
          ],
        },
      },
    ],
    as_free_tier: true,
    is_serverless: false,
  },
  {
    name: "Railway",
    description:
      "Infrastructure platform where you can provision infrastructure, develop with that infrastructure locally, and then deploy to the cloud.",
    href: "https://railway.app",
    pricing_href: "https://railway.app/pricing",
    icon: "https://railway.app/favicon-32x32.png",
    services_offered: [
      {
        name: "deployments",
        supported_types: ["Node.js", "Python", "Go", "Rust", "Ruby"],
        pricing: {
          free_tier: [
            {
              type: "Bandwith",
              included: "---",
            },
            {
              type: "Projects",
              included: "Unlimited",
            },
          ],
        },
      },
      {
        name: "databases",
        supported_types: ["PostgreSQL", "Redis"],
        pricing: {
          free_tier: [
            {
              type: "Automatic Backups",
              included: "Yes",
            },
            {
              type: "Storage",
              included: "1 GB",
            },
          ],
        },
      },
    ],
    as_free_tier: true,
    is_serverless: false,
  },
];
export const categories: Category[] = [
  {
    name: "Deployments",
    id: "deployments",
    href: "/services?category=deployments",
    icon: <LucideZap className="size-4" />,
  },
  {
    name: "Databases",
    id: "databases",
    href: "/services?category=databases",
    icon: <LucideDatabase className="size-4" />,
  },
  {
    name: "Bucket Storage",
    id: "bucket_storage",
    href: "/services?category=bucket_storage",
    icon: <LucideImage className="size-4" />,
  },
  {
    name: "Serverless",
    id: "serverless",
    href: "/services?category=serverless",
    icon: <LucideServer className="size-4" />,
  },
];
