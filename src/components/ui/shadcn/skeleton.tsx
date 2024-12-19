import { cn } from "@/lib/tailwind-merge"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-100/80", className)}
      {...props}
    />
  )
}

export { Skeleton }
