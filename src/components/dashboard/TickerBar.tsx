import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  unit?: string;
}

const mockTickerData: TickerItem[] = [
  { symbol: 'NIFTY', value: 21731.4, change: 45.2, changePercent: 0.21 },
  { symbol: 'SENSEX', value: 71595.3, change: -123.8, changePercent: -0.17 },
  { symbol: 'REPO RATE', value: 6.50, change: 0, changePercent: 0, unit: '%' },
  { symbol: 'CPI', value: 5.69, change: 0.12, changePercent: 2.15, unit: '%' },
  { symbol: 'FOREX', value: 635.2, change: 2.8, changePercent: 0.44, unit: 'B USD' },
  { symbol: 'GOLD', value: 62840, change: -185, changePercent: -0.29, unit: '₹/10g' },
  { symbol: 'SILVER', value: 75420, change: 312, changePercent: 0.42, unit: '₹/kg' },
];

export function TickerBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockTickerData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card/30 backdrop-blur-md border-b border-border/30 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 overflow-hidden">
          <span className="text-primary font-semibold text-sm">LIVE MARKETS</span>
          <div className="flex items-center gap-8">
            {mockTickerData.map((item, index) => (
              <div
                key={item.symbol}
                className={`ticker-item transition-all duration-500 ${
                  index === currentIndex ? 'scale-105 glow-growth' : ''
                } ${
                  item.change > 0 
                    ? 'ticker-positive' 
                    : item.change < 0 
                    ? 'ticker-negative' 
                    : 'text-muted-foreground'
                }`}
              >
                <span className="font-semibold text-xs">{item.symbol}</span>
                <span className="font-mono text-sm">
                  {item.value.toLocaleString()} {item.unit || ''}
                </span>
                <div className="flex items-center gap-1">
                  {item.change !== 0 && (
                    item.change > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )
                  )}
                  <span className="text-xs font-mono">
                    {item.change > 0 ? '+' : ''}{item.change} ({item.changePercent > 0 ? '+' : ''}{item.changePercent}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}