"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab {
  title: string;
  icon: LucideIcon;
  type?: never;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const currentPath = pathname === "/" ? "home" : pathname.slice(1);
    const tabIndex = tabs.findIndex(
      tab => tab.title!.toLowerCase() === currentPath
    );
    setSelected(tabIndex !== -1 ? tabIndex : null);
  }, [pathname, tabs]);

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1 sm:gap-2 rounded-2xl border bg-background p-0.5 sm:p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <div key={index} className="h-6 w-[1px] bg-border" />;
        }

        const Icon = tab.icon;
        return (
          <Link
            href={tab.title.toLowerCase() === 'home' ? '/' : `/${tab.title.toLowerCase().replace(" ", "-")}`}
            key={tab.title}
          >
            <motion.button
              variants={buttonVariants}
              initial={false}
              animate="animate"
              custom={selected === index}
              onClick={() => handleSelect(index)}
              transition={transition}
              className={cn(
                "relative flex items-center rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 text-sm font-medium transition-colors duration-300",
                selected === index
                  ? cn("bg-muted", activeColor)
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={18} className="sm:size-5" />
              <AnimatePresence initial={false}>
                {selected === index && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="ml-2 overflow-hidden hidden sm:inline-block"
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </Link>
        );
      })}
    </div>
  );
}
