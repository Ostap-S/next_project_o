type SalesEntry = {
    created_at: string;
    revenue: number;
    sale: number;
};
  
  type WeeklyDataEntry = {
    day: string;
    revenue: number;
    sales: number;
  };
  
  export const convertToWeeklyData = (db: SalesEntry[]): WeeklyDataEntry[] => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    // Initialize weekly structure with 0 values
    const weeklyDataMap = new Map<string, WeeklyDataEntry>();
    for (const day of daysOfWeek) {
      weeklyDataMap.set(day, { day, revenue: 0, sales: 0 });
    }
  
    // Accumulate revenue and sales by day
    for (const entry of db) {
      const date = new Date(entry.created_at);
      const dayName = daysOfWeek[date.getUTCDay()];
  
      const current = weeklyDataMap.get(dayName)!;
      current.revenue += entry.revenue;
      current.sales += entry.sale;
    }
  
    return daysOfWeek.map(day => weeklyDataMap.get(day)!);
  };