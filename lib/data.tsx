import {
  LucideDatabase,
  LucideImage,
  LucideServer,
  LucideZap,
} from "lucide-react";
import { ReactNode } from "react";

interface Category {
  name: string;
  href: string;
  icon: ReactNode;
}
interface Provider {
  name: string;
  description: string;
  icon: string;
  href: string;
  pricing_href: string;
  services_offered: ServiceOffered[];
  free_tier: ServiceFreeTier | null;
  is_serverless: boolean;
}
interface ServiceOffered {
  name: string;
  supported_types?: string[];
  pricing: {
    free_tier?: any[];
  };
}
interface ServiceFreeTier {
  services_included: {
    name: string;
    description: string;
  }[];
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
        name: "deployments",
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
        name: "databases",
        supported_types: ["PostgreSQL"],
        pricing: {
          free_tier: [
            {
              type: "Compute Hours",
              included: "60 hours",
            },
          ],
        },
      },
    ],
    free_tier: {
      services_included: [
        {
          name: "application_deployments",
          description: "....", // aquí podemos poner codigo html, luego lo parseamos.
        },
      ],
    },
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
        name: "deployments",
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
        name: "databases",
        supported_types: ["PostgreSQL"],
        pricing: {
          free_tier: [
            {
              type: "Compute Hours",
              included: "60 hours",
            },
          ],
        },
      },
    ],
    free_tier: {
      services_included: [
        {
          name: "application_deployments",
          description: "....", // aquí podemos poner codigo html, luego lo parseamos.
        },
      ],
    },
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
        name: "deployments",
        supported_types: ["Next.js", "React", "Gatsby", "Static Pages"],
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
    free_tier: {
      services_included: [
        {
          name: "application_deployments",
          description: "....", // aquí podemos poner codigo html, luego lo parseamos.
        },
      ],
    },
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
        name: "databases",
        supported_types: [
          "MySQL (on DigitalOcean)",
          "PostgreSQL (on DigitalOcean)",
          "Redis (on DigitalOcean)",
        ],
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
    free_tier: {
      services_included: [
        {
          name: "databases",
          description: "....", // aquí podemos poner codigo html, luego lo parseamos.
        },
      ],
    },
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
        name: "authentication",
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
        name: "databases",
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
    ],
    free_tier: {
      services_included: [
        {
          name: "authentication",
          description: "....", // aquí podemos poner codigo html, luego lo parseamos.
        },
        {
          name: "database",
          description: "....", // aquí podemos poner codigo html, luego lo parseamos.
        },
      ],
    },
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
        name: "deployments",
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
    free_tier: {
      services_included: [
        {
          name: "application_deployments",
          description: "....", // aquí podemos poner codigo html, luego lo parseamos.
        },
      ],
    },
    is_serverless: true,
  },
  {
    name: "Render",
    description: "Cloud application hosting for developers.",
    href: "https://render.com",
    pricing_href: "https://render.com/pricing",
    icon: "https://cdn.sanity.io/images/hvk0tap5/production/c4fd92ad649864b4aa2d4985072b9779bd7e8119-128x128.png?fit=max&auto=format",
    services_offered: [
      {
        name: "deployments",
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
    free_tier: {
      services_included: [
        {
          name: "application_deployments",
          description: "....", // aquí podemos poner codigo html, luego lo parseamos.
        },
      ],
    },
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
    free_tier: {
      services_included: [
        {
          name: "application_deployments",
          description: "....", // aquí podemos poner codigo html, luego lo parseamos.
        },
      ],
    },
    is_serverless: false,
  },
];
export const categories: Category[] = [
  {
    name: "Deployments",
    href: "/services?category=deployments",
    icon: <LucideZap className="size-4" />,
  },
  {
    name: "Databases",
    href: "/services?category=databases",
    icon: <LucideDatabase className="size-4" />,
  },
  {
    name: "Images Hosting",
    href: "/services?category=images-hosting",
    icon: <LucideImage className="size-4" />,
  },
  {
    name: "Serverless",
    href: "/services?category=serverless",
    icon: <LucideServer className="size-4" />,
  },
];
