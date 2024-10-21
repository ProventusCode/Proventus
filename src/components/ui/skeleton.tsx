import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted-foreground", className)}
      {...props}
    />
  );
}

export { Skeleton };
