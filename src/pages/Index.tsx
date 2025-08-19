import { useState } from 'react';
import { TickerBar } from '@/components/dashboard/TickerBar';
import { TabNavigation, TabType } from '@/components/dashboard/TabNavigation';
import { EconomyDashboard } from '@/components/dashboard/EconomyDashboard';
import { MarketsDashboard } from '@/components/dashboard/MarketsDashboard';
import { DataDashboard } from '@/components/dashboard/DataDashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('economy');
  const [selectedYear, setSelectedYear] = useState('FY24 (2023-24)');

  const renderDashboard = () => {
    switch (activeTab) {
      case 'economy':
        return (
          <EconomyDashboard
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        );
      case 'markets':
        return (
          <MarketsDashboard
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        );
      case 'data':
        return (
          <DataDashboard
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ticker Bar */}
      <TickerBar />
      
      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Dashboard Content */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Index;