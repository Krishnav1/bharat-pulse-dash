import { useState } from 'react';
import { Building2, TrendingUp, Database } from 'lucide-react';

export type TabType = 'economy' | 'markets' | 'data';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'economy' as TabType, label: 'Indian Economy', icon: Building2 },
  { id: 'markets' as TabType, label: 'Financial Markets', icon: TrendingUp },
  { id: 'data' as TabType, label: 'Listed & Unlisted Data', icon: Database },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="bg-card/20 backdrop-blur-sm border-b border-border/30 px-6">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-t-xl transition-all duration-300 ${
                isActive 
                  ? 'tab-active border-t border-l border-r border-primary/30' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-primary-foreground' : ''}`} />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}