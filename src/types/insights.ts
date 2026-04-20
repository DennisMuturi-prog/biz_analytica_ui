export interface SalesInsights {
    today_sales_and_growth:              TodaySalesAndGrowth;
    weekly_sales_and_growth:             WeeklySalesAndGrowth;
    last_12_months_sales:                Last12_MonthsSale[];
    top_10_sales_representatives_weekly: Top10_SalesRepresentativesWeekly[];
    sales_channel_sales_weekly:          SalesChannelSalesWeekly[];
    regional_sales_weekly:               RegionalSalesWeekly[];
}

export interface Last12_MonthsSale {
    month: string;
    sales: number;
}

export interface RegionalSalesWeekly {
    region:      string;
    total_sales: number;
}

export interface SalesChannelSalesWeekly {
    sales_channel: string;
    total_sales:   number;
}

export interface TodaySalesAndGrowth {
    today_sales:     number;
    yesterday_sales: number;
    growth_percent:  number;
}

export interface Top10_SalesRepresentativesWeekly {
    sales_representative: string;
    total_sales:          number;
}

export interface WeeklySalesAndGrowth {
    current_week_sales:  number;
    previous_week_sales: number;
    growth_percent:      number;
}
