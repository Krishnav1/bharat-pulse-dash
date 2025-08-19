import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePercent?: number;
  unit?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isClickable?: boolean;
  onClick?: () => void;
}

export function MetricCard({
  title,
  value,
  change,
  changePercent,
  unit,
  description,
  icon: Icon,
  isClickable = false,
  onClick,
}: MetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === 0 || change === undefined;

  return (
    <div
      className={`metric-card ${isClickable ? 'cursor-pointer' : ''} group`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-primary" />}
          <h3 className="font-semibold text-sm text-muted-foreground">{title}</h3>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 ${
            isPositive ? 'growth-indicator' : isNegative ? 'decline-indicator' : 'text-muted-foreground'
          }`}>
            {isPositive && <TrendingUp className="w-4 h-4" />}
            {isNegative && <TrendingDown className="w-4 h-4" />}
            {isNeutral && <Minus className="w-4 h-4" />}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>

        {change !== undefined && (
          <div className={`text-sm font-medium ${
            isPositive ? 'text-growth' : isNegative ? 'text-decline' : 'text-muted-foreground'
          }`}>
            {change > 0 ? '+' : ''}{change}
            {changePercent !== undefined && (
              <span className="ml-1">
                ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%)
              </span>
            )}
          </div>
        )}

        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        )}
      </div>

      {isClickable && (
        <div className="mt-4 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Click to analyze →
        </div>
      )}
    </div>
  );
}