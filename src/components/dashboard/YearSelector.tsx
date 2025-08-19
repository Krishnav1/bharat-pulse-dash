import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface YearSelectorProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
}

const financialYears = [
  'FY24 (2023-24)',
  'FY23 (2022-23)',
  'FY22 (2021-22)',
  'FY21 (2020-21)',
  'FY20 (2019-20)',
  'FY19 (2018-19)',
  'FY18 (2017-18)',
  'All Years',
];

export function YearSelector({ selectedYear, onYearChange }: YearSelectorProps) {
  return (
    <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-4 py-2">
      <Calendar className="w-4 h-4 text-primary" />
      <span className="text-sm font-medium text-muted-foreground">Financial Year:</span>
      <Select value={selectedYear} onValueChange={onYearChange}>
        <SelectTrigger className="w-48 bg-transparent border-none shadow-none">
          <SelectValue placeholder="Select Financial Year" />
        </SelectTrigger>
        <SelectContent>
          {financialYears.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}