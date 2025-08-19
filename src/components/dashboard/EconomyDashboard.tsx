import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Users } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { TimeSeriesChart } from './TimeSeriesChart';
import { YearSelector } from './YearSelector';

interface EconomyDashboardProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const economyMetrics = [
  {
    title: 'GDP Growth Rate',
    value: 7.2,
    change: 0.3,
    changePercent: 4.35,
    unit: '%',
    description: 'Year-over-year real GDP growth',
    icon: TrendingUp,
  },
  {
    title: 'Inflation (CPI)',
    value: 5.69,
    change: 0.12,
    changePercent: 2.15,
    unit: '%',
    description: 'Consumer Price Index inflation',
    icon: TrendingDown,
  },
  {
    title: 'Fiscal Deficit',
    value: 5.8,
    change: -0.2,
    changePercent: -3.33,
    unit: '% of GDP',
    description: 'Government fiscal deficit ratio',
    icon: DollarSign,
  },
  {
    title: 'Unemployment Rate',
    value: 4.1,
    change: -0.3,
    changePercent: -6.82,
    unit: '%',
    description: 'Urban unemployment percentage',
    icon: Users,
  },
  {
    title: 'Current Account',
    value: -1.3,
    change: 0.4,
    changePercent: 23.53,
    unit: '% of GDP',
    description: 'Current account balance',
    icon: PieChart,
  },
  {
    title: 'Forex Reserves',
    value: 635.2,
    change: 2.8,
    changePercent: 0.44,
    unit: 'B USD',
    description: 'Foreign exchange reserves',
    icon: BarChart3,
  },
];

export function EconomyDashboard({ selectedYear, onYearChange }: EconomyDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const handleMetricClick = (title: string) => {
    setSelectedMetric(selectedMetric === title ? null : title);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header with Year Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Indian Economy Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive macroeconomic indicators and trends
          </p>
        </div>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {economyMetrics.map((metric) => (
          <MetricCard
            key={metric.title}
            {...metric}
            isClickable
            onClick={() => handleMetricClick(metric.title)}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeSeriesChart
          title="GDP Growth Rate (20 Years)"
          dataKey="value"
          color="#00D8FF"
          unit="%"
          height={350}
        />
        
        <TimeSeriesChart
          title="Inflation Rate (CPI)"
          dataKey="value"
          color="#FF6B6B"
          unit="%"
          height={350}
        />
        
        <TimeSeriesChart
          title="Forex Reserves"
          dataKey="value"
          color="#4ECDC4"
          unit=" B USD"
          height={350}
        />
        
        <TimeSeriesChart
          title="Fiscal Deficit (% of GDP)"
          dataKey="value"
          color="#FFE66D"
          unit="%"
          height={350}
        />
      </div>

      {/* Selected Metric Details */}
      {selectedMetric && (
        <div className="metric-card">
          <h3 className="text-xl font-semibold mb-4">
            Analysis: {selectedMetric}
          </h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Detailed analysis and insights for {selectedMetric} will be displayed here.
              This section can include correlation analysis, policy impact assessment,
              and forecasting models.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Key Factors</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Monetary policy decisions</li>
                  <li>• Global economic conditions</li>
                  <li>• Government fiscal policies</li>
                </ul>
              </div>
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Impact Areas</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Consumer spending</li>
                  <li>• Investment flows</li>
                  <li>• Export competitiveness</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}