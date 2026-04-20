"use client";

import React, { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { RegionalSalesWeekly } from "@/types/insights";
import { formatter } from "@/lib/helpers";

const DEFAULT_DROPDOWN_ITEMS = [
  { title: "Action", link: "#" },
  { title: "Another action", link: "#" },
  { title: "Something else", link: "#" },
];

interface DropdownItemProps {
  title: string;
  link?: string;
}

interface WidgetProps {
  regional_sales_data: RegionalSalesWeekly[];
  dropdownItems?: DropdownItemProps[];
}

const SalesByRegionWidget = ({
  regional_sales_data,
  dropdownItems=DEFAULT_DROPDOWN_ITEMS
}: WidgetProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Card className="h-full py-6 gap-6">
      <CardHeader className="flex items-center justify-between px-6">
        <CardTitle className="text-lg font-medium text-foreground">
          Sales by Regions
        </CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer">
                <Icon
                  icon="solar:menu-dots-bold"
                  width={22}
                  height={22}
                  className="rotate-90"
                />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dropdownItems.map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="font-normal cursor-pointer"
                >
                  {item.link ? (
                    <a href={item.link} className="w-full">
                      {item.title}
                    </a>
                  ) : (
                    <span className="w-full justify-start">{item.title}</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <motion.div
          ref={ref}
          className="flex flex-col gap-3"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {regional_sales_data.map((item, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="flex gap-3 items-center px-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between flex-1">
                  <div>
                    <h5 className="text-base font-medium text-foreground">
                      Kes {formatter.format(item.total_sales)}
                    </h5>
                    <p className="text-sm font-normal tracking-wide text-muted-foreground">
                      {item.region}
                    </p>
                  </div>
                  <Badge
                    className={cn(`${"bg-orange-400/10"}`, "text-muted-foreground")}
                  >
                    {"coming soon"}
                  </Badge>
                </div>
              </motion.div>
              {index < regional_sales_data.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default SalesByRegionWidget;
