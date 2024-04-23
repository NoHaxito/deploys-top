import React from "react";
import { pickChildren } from "@/lib/children";
import { cn } from "@/lib/utils";

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [childrenWithoutActions, actions] = pickChildren(
    children,
    PageHeaderActions,
  );
  return (
    <div
      className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2", className)}
      {...props}
    >
      <div>{childrenWithoutActions}</div>
      {actions}
    </div>
  );
}

function PageHeaderTitle({
  icon,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && icon}
      <h1
        className={cn(
          "text-lg font-bold tracking-tight md:text-3xl",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <span
      className={cn("text-xs text-muted-foreground sm:text-sm", className)}
      {...props}
    />
  );
}

function PageHeaderActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center space-x-1",
        className,
      )}
      {...props}
    />
  );
}

export {
  PageHeader,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
};
