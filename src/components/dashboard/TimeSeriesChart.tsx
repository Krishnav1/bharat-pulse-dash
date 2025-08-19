import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface DataPoint {
  year: string;
  value: number;
  event?: string;
}

interface TimeSeriesChartProps {
  title: string;
  data?: DataPoint[];
  dataKey: string;
  color?: string;
  unit?: string;
  height?: number;
}

const generateMockData = (years: number = 20): DataPoint[] => {
  const data: DataPoint[] = [];
  const startYear = new Date().getFullYear() - years;
  
  for (let i = 0; i < years; i++) {
    const year = startYear + i;
    let value = 50 + Math.random() * 40;
    
    // Add some events
    let event;
    if (year === 2020) event = 'COVID-19';
    else if (year === 2016) event = 'Demonetization';
    else if (year === 2017) event = 'GST Launch';
    else if (year === 2008) event = 'Global Financial Crisis';
    
    // Add volatility around events
    if (event) {
      value *= event === 'COVID-19' ? 0.7 : event === 'Demonetization' ? 0.85 : 1.1;
    }
    
    data.push({
      year: year.toString(),
      value: Math.round(value * 100) / 100,
      event
    });
  }
  
  return data;
};

export function TimeSeriesChart({
  title,
  data = generateMockData(),
  dataKey = 'value',
  color = '#3B82F6',
  unit = '',
  height = 300,
}: TimeSeriesChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm">{label}</p>
          <p className="text-primary">
            {`${dataKey}: ${payload[0].value}${unit}`}
          </p>
          {data.event && (
            <p className="text-warning text-xs mt-1">📍 {data.event}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3 className="font-semibold text-lg mb-4 text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="year" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={(props: any) => {
              const { payload } = props;
              if (payload?.event) {
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={6}
                    fill="#FFD93D"
                    stroke="#FF4757"
                    strokeWidth={2}
                  />
                );
              }
              return <circle cx={props.cx} cy={props.cy} r={3} fill={color} />;
            }}
            activeDot={{ r: 6, fill: color }}
          />
          
          {/* Event markers */}
          {data.map((point, index) => 
            point.event ? (
              <ReferenceLine
                key={index}
                x={point.year}
                stroke="#FFD93D"
                strokeDasharray="2 2"
                strokeOpacity={0.6}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}