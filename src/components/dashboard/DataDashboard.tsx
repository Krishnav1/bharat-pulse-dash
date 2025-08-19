import { useState } from 'react';
import { Database, Upload, FileSpreadsheet, BarChart } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { YearSelector } from './YearSelector';
import { Button } from '@/components/ui/button';

interface DataDashboardProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const dataMetrics = [
  {
    title: 'Listed Companies',
    value: 5418,
    change: 127,
    changePercent: 2.4,
    unit: '',
    description: 'Active listed companies on exchanges',
    icon: Database,
  },
  {
    title: 'Market Cap (Listed)',
    value: 387.2,
    change: 8.5,
    changePercent: 2.24,
    unit: 'L Cr',
    description: 'Total listed market capitalization',
    icon: BarChart,
  },
  {
    title: 'IPO Fundraising',
    value: 56.8,
    change: 12.3,
    changePercent: 27.64,
    unit: 'K Cr',
    description: 'IPO funds raised this year',
    icon: Upload,
  },
  {
    title: 'Unicorns',
    value: 108,
    change: 15,
    changePercent: 16.13,
    unit: '',
    description: 'Indian unicorn startups',
    icon: Database,
  },
];

export function DataDashboard({ selectedYear, onYearChange }: DataDashboardProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = () => {
    // Simulate file upload
    const newFile = `Economic_Data_${Date.now()}.xlsx`;
    setUploadedFiles(prev => [...prev, newFile]);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Listed & Unlisted Data</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive data on public and private market entities
          </p>
        </div>
        <YearSelector selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>

      {/* File Upload Section */}
      <div className="metric-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Excel Data Upload</h3>
          </div>
          <Button onClick={handleFileUpload} className="bg-primary hover:bg-primary/90">
            <Upload className="w-4 h-4 mr-2" />
            Upload Excel File
          </Button>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Upload Excel files containing economic data to automatically update all charts and metrics.
          </p>
          
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Recent Uploads:</h4>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{file}</span>
                  <span className="text-xs text-green-400">✓ Processed</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Data Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="chart-container">
          <h3 className="font-semibold text-lg mb-4">Top Performing Stocks</h3>
          <div className="space-y-3">
            {[
              { name: 'Reliance Industries', change: 2.45, price: 2847.30 },
              { name: 'TCS', change: 1.87, price: 3628.15 },
              { name: 'HDFC Bank', change: -0.62, price: 1543.75 },
              { name: 'Infosys', change: 1.23, price: 1456.80 },
              { name: 'ICICI Bank', change: 0.89, price: 987.45 },
            ].map((stock, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span className="font-medium">{stock.name}</span>
                <div className="text-right">
                  <div className="font-mono">₹{stock.price.toFixed(2)}</div>
                  <div className={`text-sm ${stock.change > 0 ? 'text-growth' : 'text-decline'}`}>
                    {stock.change > 0 ? '+' : ''}{stock.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3 className="font-semibold text-lg mb-4">Recent IPOs</h3>
          <div className="space-y-3">
            {[
              { name: 'Tech Startup A', size: '₹2,500 Cr', listing: 'NSE', date: '2024-01-15' },
              { name: 'Healthcare Corp', size: '₹1,800 Cr', listing: 'BSE', date: '2024-01-20' },
              { name: 'Green Energy Ltd', size: '₹3,200 Cr', listing: 'NSE', date: '2024-01-25' },
              { name: 'Fintech Solutions', size: '₹950 Cr', listing: 'NSE', date: '2024-02-01' },
            ].map((ipo, index) => (
              <div key={index} className="p-3 bg-muted/20 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{ipo.name}</span>
                  <span className="text-sm text-primary">{ipo.listing}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{ipo.size}</span>
                  <span>{ipo.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}