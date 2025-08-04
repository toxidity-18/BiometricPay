import React from "react"
import { cn } from "../../utils/cn"

export const Label = React.forwardRef(({ className, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  >
    {children}
  </label>
))
Label.displayName = "Label"
