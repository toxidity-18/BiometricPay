"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "../../utils/cn"
import { ChevronDown } from "lucide-react"

const SelectContext = React.createContext({
  value: "",
  onValueChange: () => {},
  isOpen: false,
  setIsOpen: () => {},
})

export const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

export const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

export const SelectValue = ({ placeholder }) => {
  const { value } = React.useContext(SelectContext)
  return <span>{value || placeholder}</span>
}

export const SelectContent = ({ children }) => {
  const { isOpen, setIsOpen } = React.useContext(SelectContext)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  return (
    <div
      ref={contentRef}
      className="absolute top-full z-50 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
    >
      {children}
    </div>
  )
}

export const SelectItem = ({ value, children }) => {
  const { onValueChange, setIsOpen } = React.useContext(SelectContext)

  return (
    <div
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
      onClick={() => {
        onValueChange(value)
        setIsOpen(false)
      }}
    >
      {children}
    </div>
  )
}