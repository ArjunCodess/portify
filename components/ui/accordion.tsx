"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("mb-2 sm:mb-4", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group w-full rounded-2xl border bg-gray-100 dark:bg-neutral-900 px-4 sm:px-6 py-4 sm:py-5 text-left text-base sm:text-lg font-medium text-gray-900 dark:text-zinc-200 transition-all hover:bg-gray-200 dark:hover:bg-neutral-800",
        "data-[state=open]:rounded-b-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="line-clamp-1">{children}</span>
        <Plus className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-blue-500 dark:text-blue-400 transition-transform duration-500 ease-in-out group-data-[state=open]:rotate-45" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "border border-t-0 overflow-hidden text-sm sm:text-base text-gray-600 dark:text-zinc-400",
      "transition-all duration-300 ease-in-out",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      "bg-gray-50 dark:bg-[rgb(18,18,18)] rounded-b-2xl",
      className
    )}
    {...props}
  >
    <div className={cn(
      "px-4 sm:px-6 py-4 sm:py-5",
      "transition-all duration-300 ease-in-out",
      className
    )}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
