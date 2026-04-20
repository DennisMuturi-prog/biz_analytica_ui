import StatisticsBlock from "@/components/shadcn-space/blocks/dashboard-shell-01/statistics";
import SalesOverviewChart from "@/components/shadcn-space/blocks/dashboard-shell-01/sales-overview-chart";
import EarningReportChart from "@/components/shadcn-space/blocks/dashboard-shell-01/earning-report-chart";
import SalesByCountryWidget from "@/components/shadcn-space/blocks/dashboard-shell-01/salesbyregionwidget";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { SalesInsights } from "@/types/insights";
import {
  CalendarDays,
  ShoppingBag,
} from "lucide-react";
import TopSalesMenTable from "./shadcn-space/blocks/dashboard-shell-01/top-sales-reps-table";
import SalesByRegionWidget from "@/components/shadcn-space/blocks/dashboard-shell-01/salesbyregionwidget";
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
export default function DashBoard() {
  const {data,isPending} = useQuery({
    queryKey: ["sales_insights"],
    queryFn:get_sales_insights
  })
  if (isPending) {
    return (<div>Loading...</div>)
  }
  if (data) {
    return (
        <div className="grid grid-cols-12 gap-6 p-6 max-w-7xl mx-auto">
          <div className="col-span-12">
          <StatisticsBlock
          mainDashboard={{
            title: "Analytics Dashboard",
            description: "Check all the statistics",
            metrics: [
              {
                label: "Earnings",
                value: `Kes ${formatter.format(data.today_sales_and_growth.today_sales)}`,
                percentage: `${data.today_sales_and_growth.growth_percent}%`,
                isPositive: data.today_sales_and_growth.growth_percent>=0,
              },
              {
                label: "Expense",
                value: "Coming soon",
                percentage: "0%",
                isPositive: false,
              },
            ],
            }}
            secondaryStats={
              [
                {
                  title: "Weekly Sales",
                  value: `Kes ${formatter.format(data.weekly_sales_and_growth.current_week_sales)}`,
                  percentage: `${data.weekly_sales_and_growth.growth_percent}%`,
                  icon: CalendarDays,
                  isPositive: data.weekly_sales_and_growth.growth_percent>=0
                },
                {
                  title: "Purchase Orders",
                  value: "Coming soon",
                  percentage: "0%",
                  icon: ShoppingBag,
                  isPositive: false,
                },
              ]
          }
          />
          </div>
          <div className="xl:col-span-8 col-span-12">
          <SalesOverviewChart
            sales_chart_info={data.last_12_months_sales } />
          </div>
          <div className="xl:col-span-4 col-span-12">
          <EarningReportChart
          salesChannelInfo={data.sales_channel_sales_weekly}
          />
          </div>
          <div className="xl:col-span-8 col-span-12">
          <TopSalesMenTable
          top_10_sales_rep={data.top_10_sales_representatives_weekly}
          />
          </div>
          <div className="xl:col-span-4 col-span-12">
            <SalesByRegionWidget regional_sales_data={data.regional_sales_weekly} />
          </div>
      </div>
    );
    
  }
  
  
}
const url="http://localhost:8000/sales_insights"
async function get_sales_insights():Promise<SalesInsights> {
  const response = await axios.get(url)
  return response.data
}

