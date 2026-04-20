"use client"

import { Label, Pie, PieChart } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import type { SalesChannelSalesWeekly } from "@/types/insights"
import { formatter } from "@/lib/helpers"

type SalesChannelBlock = {
  salesChannelInfo: SalesChannelSalesWeekly[]
}
const colors = [
  "var(--color-blue-500)",
  "var(--color-sky-400)",
  "var(--color-blue-500)",
  "rgba(56, 189, 248, 0.5)"
]
const borderColors = [
  "bg-blue-500",
  "bg-sky-400",
  "bg-sky-400/50"
  
]


export default function EarningReportChart({
  salesChannelInfo,
}: SalesChannelBlock) {
  const pieData=salesChannelInfo.map((item, index) => ({
      ...item,
      fill: colors[index % colors.length],
    }));

  const salesChannelChartConfig: ChartConfig = {}
  
  for (const [index, val] of salesChannelInfo.entries()) {
    salesChannelChartConfig[val.sales_channel] = {
      label: val.sales_channel,
      color: colors[index % colors.length],
    }
  }
  const totalAmount = salesChannelInfo.reduce((sum, item) => sum + item.total_sales, 0);

  return (
    <Card className="h-full w-full gap-6 py-6">
      <CardHeader className="px-6">
        <CardTitle>
          <h4 className="text-lg font-semibold">Weekly Sales Reports</h4>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-2 px-6">
        <ChartContainer
          config={salesChannelChartConfig}
          className="aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="total_sales"
              nameKey="sales_channel"
              innerRadius={65}
              strokeWidth={50}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 10}
                          className="fill-muted-foreground text-sm"
                        >
                          Total
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 15}
                          className="fill-foreground text-xl font-medium"
                        >
                          Kes { formatter.format(totalAmount)}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col gap-3">
          {salesChannelInfo.map((item,index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(borderColors[index%borderColors.length], "h-4 w-1 rounded-full")}
                ></div>
                <h6 className={cn("text-sm leading-tight font-medium")}>
                  {item.sales_channel}
                </h6>
              </div>
              <div className="flex items-center gap-1">
                <h6 className="text-sm font-medium">Kes {formatter.format(item.total_sales)}</h6>
                <Badge
                  className={cn(
                    "bg-teal-400/10",
                    `text-${"muted-foreground"}`,
                    "shadow-none"
                  )}
                >
                  {"coming soon"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
