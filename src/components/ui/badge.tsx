import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium font-[var(--font-body)] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]",
        secondary:
          "border-[var(--secondary)]/30 bg-[var(--secondary)]/10 text-[var(--secondary)]",
        accent:
          "border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)]",
        outline:
          "border-white/10 text-[var(--muted-foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
