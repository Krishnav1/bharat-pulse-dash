import { useState } from 'react';
import { TrendingUp, DollarSign, Building, Zap } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { TimeSeriesChart } from './TimeSeriesChart';
import { YearSelector } from './YearSelector';

interface MarketsDashboardProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const marketsMetrics = [
  {
    title: 'Nifty 50',
    value: 21731.4,
    change: 45.2,
    changePercent: 0.21,
    unit: '',
    description: 'NSE benchmark index',
    icon: TrendingUp,
  },
  {
    title: 'Sensex',
    value: 71595.3,
    change: -123.8,
    changePercent: -0.17,
    unit: '',
    description: 'BSE flagship index',
    icon: TrendingUp,
  },
  {
    title: 'Bank Nifty',
    value: 48127.5,
    change: 234.7,
    changePercent: 0.49,
    unit: '',
    description: 'Banking sector index',
    icon: Building,
  },
  {
    title: 'IT Index',
    value: 33842.1,
    change: -98.3,
    changePercent: -0.29,
    unit: '',
    description: 'Information Technology sector',
    icon: Zap,
  },
  {
    title: 'FII Investment',
    value: 12.8,
    change: 3.2,
    changePercent: 33.33,
    unit: 'K Cr',
    description: 'Foreign institutional investment',
    icon: DollarSign,
  },
  {
    title: 'Market Cap',
    value: 387.2,
    change: 8.5,
    changePercent: 2.24,
    unit: 'L Cr',
    description: 'Total market capitalization',
    icon: TrendingUp,
  },
];

export function MarketsDashboard({ selectedYear, onYearChange }: MarketsDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const handleMetricClick = (title: string) => {
    setSelectedMetric(selectedMetric === title ? null : title);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Markets</h1>
          <p className="text-muted-foreground mt-2">
            Real-time market data and investment flows
          </p>
        </div>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketsMetrics.map((metric) => (
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
          title="Nifty 50 Historical Performance"
          dataKey="value"
          color="#00D8FF"
          height={350}
        />
        
        <TimeSeriesChart
          title="FII Investment Flows"
          dataKey="value"
          color="#FF6B6B"
          unit=" K Cr"
          height={350}
        />
        
        <TimeSeriesChart
          title="Market Volatility Index"
          dataKey="value"
          color="#4ECDC4"
          unit="%"
          height={350}
        />
        
        <TimeSeriesChart
          title="Sectoral Performance"
          dataKey="value"
          color="#FFE66D"
          unit="%"
          height={350}
        />
      </div>

      {/* Market Analysis */}
      {selectedMetric && (
        <div className="metric-card">
          <h3 className="text-xl font-semibold mb-4">
            Market Analysis: {selectedMetric}
          </h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Comprehensive market analysis for {selectedMetric} including technical indicators,
              fundamental analysis, and correlation with global markets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Technical Indicators</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• RSI: 58.2 (Neutral)</li>
                  <li>• MACD: Bullish crossover</li>
                  <li>• Support: 21,500</li>
                </ul>
              </div>
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Market Drivers</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• RBI monetary policy</li>
                  <li>• Global risk sentiment</li>
                  <li>• Earnings growth</li>
                </ul>
              </div>
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Risk Factors</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Inflation concerns</li>
                  <li>• Geopolitical tensions</li>
                  <li>• Oil price volatility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}