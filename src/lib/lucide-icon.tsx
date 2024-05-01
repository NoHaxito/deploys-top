import { LucideLoader2, LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Suspense } from "react";
import dynamic from "next/dynamic";

interface IconProps extends LucideProps {
  name: string;
}
const fallback = (
  <div>
    <LucideLoader2 className="size-5 min-w-5 min-h-5 animate-spin" />
  </div>
);
export const LucideIcon = ({ name, ...props }: IconProps) => {
  const Icon = dynamic(
    dynamicIconImports[name as keyof typeof dynamicIconImports],
    {
      loading: () => fallback,
    },
  );

  return (
    <Suspense fallback={fallback}>
      <Icon {...props} />
    </Suspense>
  );
};
