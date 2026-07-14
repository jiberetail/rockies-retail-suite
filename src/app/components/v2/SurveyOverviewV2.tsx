import worldMap from "figma:asset/63ce3284c798e57a28c3e1a993ddad3ef10f97ba.png";
import { useDateRange } from "@/app/contexts/DateRangeContext";
import { calculateKPIData, calculateMerchandiseData, BASE_MERCHANDISE } from "@/app/utils/dataCalculations";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingBag, X, HelpCircle, ThumbsUp, AlertCircle, MapPin } from "lucide-react";
import { getTeamLogo } from "@/app/utils/teamLogos";
import { useState, useMemo } from "react";
import { format, subDays } from "date-fns";
import { createPortal } from "react-dom";

interface SurveyOverviewV2Props {
  viewMode: 'survey' | 'satisfaction' | 'location';
  setViewMode: (mode: 'survey' | 'satisfaction' | 'location') => void;
}

export function SurveyOverviewV2({ viewMode, setViewMode }: SurveyOverviewV2Props) {
  const { getDayCount, isCurrentDay, dateRange } = useDateRange();
  const daysInRange = getDayCount();
  const isTodayView = isCurrentDay();
  const calculatedData = calculateKPIData(daysInRange, isTodayView);
  const [showModal, setShowModal] = useState(false);

  // Generate chart data based on date range - memoized to prevent regeneration
  const chartData = useMemo(() => {
    const missingPercentage = calculatedData.itemsMissing / calculatedData.totalSurveys;

    // Satisfaction mode: Show percentage data
    if (viewMode === 'satisfaction') {
      // Single day view: Show hourly data
      if (daysInRange === 1) {
        const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'];
        const currentHourIndex = isTodayView ? 9 : hours.length - 1;
        
        return hours.map((hour, i) => {
          if (isTodayView && i > currentHourIndex) {
            return {
              label: hour,
              id: `hour-${i}`,
              engagement: 0,
              satisfaction: 0,
            };
          }
          
          // Generate realistic percentages with DIFFERENT variations for each metric
          const baseEngagement = calculatedData.staffContact;
          const baseSatisfaction = calculatedData.staffSatisfaction;
          const engagementVariation = 0.85 + Math.random() * 0.3; // Wider variation for engagement
          const satisfactionVariation = 0.95 + Math.random() * 0.1; // Tighter variation for satisfaction
          
          return {
            label: hour,
            id: `hour-${i}`,
            engagement: Math.round(baseEngagement * engagementVariation),
            satisfaction: Math.round(baseSatisfaction * satisfactionVariation),
          };
        });
      } 
      
      // Multiple days view: Show daily data
      else {
        const days = [];
        
        for (let i = daysInRange - 1; i >= 0; i--) {
          const date = subDays(dateRange.to, i);
          const dateLabel = format(date, 'M/d');
          
          // Add DIFFERENT variations for each metric to make them distinct
          const baseEngagement = calculatedData.staffContact;
          const baseSatisfaction = calculatedData.staffSatisfaction;
          const engagementVariation = 0.85 + Math.random() * 0.3; // Wider variation for engagement
          const satisfactionVariation = 0.95 + Math.random() * 0.1; // Tighter variation for satisfaction
          
          days.push({
            label: dateLabel,
            id: `day-${daysInRange - 1 - i}`,
            engagement: Math.round(baseEngagement * engagementVariation),
            satisfaction: Math.round(baseSatisfaction * satisfactionVariation),
          });
        }
        
        return days;
      }
    }

    // Survey mode: Show count data (original logic)
    // Single day view: Show hourly data
    if (daysInRange === 1) {
      const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'];
      const hourlyPatterns = [5, 6, 7, 12, 14, 13, 10, 8, 11, 9, 6, 4];
      
      // If viewing "Today", assume it's currently 6 PM (index 9 in the array)
      // Only show data up to the current hour
      const currentHourIndex = isTodayView ? 9 : hours.length - 1; // 6PM is at index 9
      
      return hours.map((hour, i) => {
        // For future hours (after current time), show 0 data
        if (isTodayView && i > currentHourIndex) {
          return {
            id: `survey-hour-${i}`,
            label: hour,
            surveys: 0,
            missingItems: 0,
          };
        }
        
        const surveys = hourlyPatterns[i];
        const missingItems = Math.round(surveys * missingPercentage);
        
        return {
          id: `survey-hour-${i}`,
          label: hour,
          surveys,
          missingItems,
        };
      });
    } 
    
    // Multiple days view: Show daily data
    else {
      const days = [];
      const dailyAverage = Math.round(calculatedData.totalSurveys / daysInRange);
      
      for (let i = daysInRange - 1; i >= 0; i--) {
        const date = subDays(dateRange.to, i);
        const dateLabel = format(date, 'M/d'); // Show date for all multi-day ranges (2/10, 2/11, etc)
        
        // Add some variation to make it realistic (+/- 30%)
        const variation = 0.7 + Math.random() * 0.6;
        const surveys = Math.round(dailyAverage * variation);
        const missingItems = Math.round(surveys * missingPercentage);
        
        days.push({
          id: `survey-day-${daysInRange - 1 - i}`,
          label: dateLabel,
          surveys,
          missingItems,
        });
      }
      
      return days;
    }
  }, [viewMode, daysInRange, isTodayView, calculatedData.itemsMissing, calculatedData.totalSurveys, calculatedData.staffContact, calculatedData.staffSatisfaction, dateRange.to]);

  const surveyData = (() => {
    const missingPercentage = calculatedData.itemsMissing / calculatedData.totalSurveys;
    
    if (daysInRange === 1) {
      const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'];
      const hourlyPatterns = [5, 6, 7, 12, 14, 13, 10, 8, 11, 9, 6, 4];
      const currentHourIndex = isTodayView ? 9 : hours.length - 1;
      
      return hours.map((hour, i) => {
        if (isTodayView && i > currentHourIndex) {
          return { label: hour, surveys: 0, missingItems: 0 };
        }
        const surveys = hourlyPatterns[i];
        const missingItems = Math.round(surveys * missingPercentage);
        return { label: hour, surveys, missingItems };
      });
    } else {
      const days = [];
      const dailyAverage = Math.round(calculatedData.totalSurveys / daysInRange);
      
      for (let i = daysInRange - 1; i >= 0; i--) {
        const date = subDays(dateRange.to, i);
        const dateLabel = format(date, 'M/d');
        // Add some variation to make it realistic (+/- 30%)
        const variation = 0.7 + Math.random() * 0.6;
        const surveys = Math.round(dailyAverage * variation);
        const missingItems = Math.round(surveys * missingPercentage);
        days.push({ label: dateLabel, surveys, missingItems });
      }
      return days;
    }
  })();

  const actualTotalSurveys = surveyData.reduce((sum, item) => sum + item.surveys, 0);
  const actualMissingItems = surveyData.reduce((sum, item) => sum + item.missingItems, 0);

  // Calculate merchandise data to match actualMissingItems
  const itemsToShow = (isTodayView || daysInRange === 1) ? 5 : daysInRange <= 7 ? 10 : 15;
  const baseItems = BASE_MERCHANDISE.slice(0, itemsToShow);
  const baseTotal = baseItems.reduce((sum, item) => sum + item.count, 0);
  
  // Scale each item proportionally so the total equals actualMissingItems
  const merchandiseData = baseItems.map(item => ({
    ...item,
    count: Math.max(1, Math.round((item.count / baseTotal) * actualMissingItems)),
    revenue: `$${Math.round((item.revenue / baseTotal) * actualMissingItems * 50).toLocaleString()}`, // Assume ~$50 avg per item
  }));

  // Customer locations data - dynamically calculated based on date range
  const BASE_LOCATIONS = [
    { country: "Colorado, USA", city: "Denver", baseCount: 700, basePercentage: 52.0, coordinates: { x: 21, y: 39.5 } },
    { country: "Colorado, USA", city: "Colorado Springs", baseCount: 188, basePercentage: 14.0, coordinates: { x: 21.5, y: 43 } },
    { country: "Colorado, USA", city: "Fort Collins", baseCount: 135, basePercentage: 10.0, coordinates: { x: 20.5, y: 36 } },
    { country: "Colorado, USA", city: "Boulder", baseCount: 94, basePercentage: 7.0, coordinates: { x: 19.5, y: 38 } },
    { country: "Colorado, USA", city: "Aurora", baseCount: 81, basePercentage: 6.0, coordinates: { x: 22.5, y: 39 } },
    { country: "Colorado, USA", city: "Lakewood", baseCount: 54, basePercentage: 4.0, coordinates: { x: 19.5, y: 41.5 } },
    { country: "Colorado, USA", city: "Grand Junction", baseCount: 40, basePercentage: 3.0, coordinates: { x: 18.5, y: 40 } },
    { country: "Wyoming, USA", city: "Cheyenne", baseCount: 34, basePercentage: 2.5, coordinates: { x: 20.5, y: 34.5 } },
    { country: "New Mexico, USA", city: "Albuquerque", baseCount: 20, basePercentage: 1.5, coordinates: { x: 21, y: 46 } },
  ];

  // Scale location counts based on the total surveys for the date range
  const baseTotalVisitors = BASE_LOCATIONS.reduce((sum, loc) => sum + loc.baseCount, 0);
  const customerLocations = BASE_LOCATIONS.map(location => {
    const scaledCount = Math.round((location.baseCount / baseTotalVisitors) * actualTotalSurveys);
    return {
      ...location,
      count: scaledCount,
      percentage: location.basePercentage, // Keep percentages relatively stable
    };
  });

  return (
    <>
      <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-3 border-b border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1e293b]">
                {viewMode === 'survey' ? 'Survey Response Overview' : viewMode === 'satisfaction' ? 'Associate Performance Overview' : 'Fan Locations'}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {format(dateRange.from, 'MMM d, yyyy')} - {format(dateRange.to, 'MMM d, yyyy')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Toggle Button */}
              <div className="bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg p-1 shadow-sm">
                <div className="flex items-center rounded-lg p-0.5">
                  <button
                    onClick={() => setViewMode('survey')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      viewMode === 'survey'
                        ? 'bg-[#041E42] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Missing
                  </button>
                  <button
                    onClick={() => setViewMode('satisfaction')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      viewMode === 'satisfaction'
                        ? 'bg-[#041E42] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Satisfaction
                  </button>
                  <button
                    onClick={() => setViewMode('location')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                      viewMode === 'location'
                        ? 'bg-[#041E42] text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Location
                  </button>
                </div>
              </div>
              
              {/* Survey Count */}
              <Users size={20} className="text-[#33006F]" />
              <span className="text-2xl font-black text-[#333333]">
                {actualTotalSurveys.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600">Surveys</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {viewMode === 'location' ? (
            // World Map View
            <div>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '280px',
                background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}>
                <img 
                  src={worldMap} 
                  alt="World Map"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
                
                {/* Rockies regional fan locations */}
                {/* Denver - LARGER */}
                <div style={{
                  position: 'absolute',
                  left: '21%',
                  top: '39.5%',
                  transform: 'translate(-50%, -50%)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#BF0D3E',
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 8px rgba(191, 13, 62, 0.6), 0 2px 4px rgba(0, 0, 0, 0.2)',
                  zIndex: 10,
                  animation: 'flash 1.5s ease-in-out infinite'
                }} />
                
                {/* Colorado Springs - LARGER */}
                <div style={{
                  position: 'absolute',
                  left: '21.5%',
                  top: '43%',
                  transform: 'translate(-50%, -50%)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#BF0D3E',
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 8px rgba(191, 13, 62, 0.6), 0 2px 4px rgba(0, 0, 0, 0.2)',
                  zIndex: 10,
                  animation: 'flash 1.5s ease-in-out infinite 0.2s'
                }} />
                
                {/* Fort Collins - small */}
                <div style={{
                  position: 'absolute',
                  left: '20.5%',
                  top: '36%',
                  transform: 'translate(-50%, -50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#BF0D3E',
                  border: '1.5px solid #ffffff',
                  boxShadow: '0 0 6px rgba(191, 13, 62, 0.6), 0 1px 3px rgba(0, 0, 0, 0.2)',
                  zIndex: 10,
                  animation: 'flash 1.5s ease-in-out infinite 0.4s'
                }} />
                
                {/* Boulder - small */}
                <div style={{
                  position: 'absolute',
                  left: '19.5%',
                  top: '38%',
                  transform: 'translate(-50%, -50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#BF0D3E',
                  border: '1.5px solid #ffffff',
                  boxShadow: '0 0 6px rgba(191, 13, 62, 0.6), 0 1px 3px rgba(0, 0, 0, 0.2)',
                  zIndex: 10,
                  animation: 'flash 1.5s ease-in-out infinite 0.6s'
                }} />
                
                {/* Aurora - small */}
                <div style={{
                  position: 'absolute',
                  left: '22.5%',
                  top: '39%',
                  transform: 'translate(-50%, -50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#BF0D3E',
                  border: '1.5px solid #ffffff',
                  boxShadow: '0 0 6px rgba(191, 13, 62, 0.6), 0 1px 3px rgba(0, 0, 0, 0.2)',
                  zIndex: 10,
                  animation: 'flash 1.5s ease-in-out infinite 0.8s'
                }} />
                
                {/* Lakewood - small */}
                <div style={{
                  position: 'absolute',
                  left: '19.5%',
                  top: '41.5%',
                  transform: 'translate(-50%, -50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#BF0D3E',
                  border: '1.5px solid #ffffff',
                  boxShadow: '0 0 6px rgba(191, 13, 62, 0.6), 0 1px 3px rgba(0, 0, 0, 0.2)',
                  zIndex: 10,
                  animation: 'flash 1.5s ease-in-out infinite 1s'
                }} />
                
                <style>{`
                  @keyframes flash {
                    0%, 100% {
                      opacity: 1;
                    }
                    50% {
                      opacity: 0.3;
                    }
                  }
                `}</style>
              </div>
              
              {/* Top 6 Locations */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {customerLocations.slice(0, 6).map((location) => (
                  <div 
                    key={`${location.city}-${location.country}`}
                    className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <MapPin size={12} className="text-[#BF0D3E] flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-[#041E42] truncate">{location.city}</div>
                          <div className="text-[10px] text-slate-600 truncate">{location.country}</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-black text-[#BF0D3E]">{location.count}</div>
                        <div className="text-[9px] text-slate-500">{location.percentage}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Bar Chart View
            <ResponsiveContainer width="100%" height={280} key={`chart-${viewMode}-${daysInRange}`}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  tick={{ fontSize: 12, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#666' }}
                  axisLine={{ stroke: '#e0e0e0' }}
                  domain={viewMode === 'satisfaction' ? [0, 100] : undefined}
                />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                  formatter={(value: any, name: string) => {
                    if (viewMode === 'satisfaction') {
                      return [`${value}%`, name];
                    }
                    return [value, name];
                  }}
                />
                {viewMode === 'survey' ? (
                  <>
                    <Bar key="surveys-bar" dataKey="surveys" fill="#000000" radius={[4, 4, 0, 0]} name="Total Surveys" />
                    <Bar key="missing-items-bar" dataKey="missingItems" fill="#9333EA" radius={[4, 4, 0, 0]} name="Missing Items" />
                  </>
                ) : (
                  <>
                    <Bar key="engagement-bar" dataKey="engagement" fill="#10b981" radius={[4, 4, 0, 0]} name="Associate Engagement" />
                    <Bar key="satisfaction-bar" dataKey="satisfaction" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Associate Satisfaction" />
                  </>
                )}
              </BarChart>
            </ResponsiveContainer>
          )}

          <div className="mt-6 grid grid-cols-2 gap-4">
            {viewMode === 'survey' ? (
              <>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign size={16} className="text-[#33006F]" />
                      <span className="text-sm font-medium text-[#333333]">Revenue Loss</span>
                      <div className="group relative">
                        <HelpCircle size={14} className="text-slate-400 cursor-help" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                          Estimated revenue lost from unfulfilled customer requests for out-of-stock merchandise.
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-[#BF0D3E] mb-1">
                      ${calculatedData.potentialRevenueLoss.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#33006F]">Missing merchandise</div>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm cursor-pointer hover:bg-white/70 transition-colors" onClick={() => setShowModal(true)}>
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ShoppingBag size={16} className="text-[#33006F]" />
                      <span className="text-sm font-medium text-[#333333]">Items Missing</span>
                      <div className="group relative" onClick={(e) => e.stopPropagation()}>
                        <HelpCircle size={14} className="text-slate-400 cursor-help" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                          Total number of customer requests for items that were out of stock.
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-[#BF0D3E] mb-1">
                      {actualMissingItems.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#33006F]">Unfulfilled requests</div>
                  </div>
                </div>
              </>
            ) : viewMode === 'satisfaction' ? (
              <>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsUp size={16} className="text-[#33006F]" />
                      <span className="text-sm font-medium text-[#333333]">Associate Satisfaction</span>
                      <div className="group relative">
                        <HelpCircle size={14} className="text-slate-400 cursor-help" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                          Percentage of customers who rated their associate interaction as positive.
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-[#22c55e] mb-1">
                      {calculatedData.staffSatisfaction}%
                    </div>
                    <div className="text-xs text-[#33006F]">+2% vs yesterday</div>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm">
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={16} className="text-[#33006F]" />
                      <span className="text-sm font-medium text-[#333333]">Associate Engagement</span>
                      <div className="group relative">
                        <HelpCircle size={14} className="text-slate-400 cursor-help" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                          Percentage of customers who were greeted or assisted by a store associate.
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-gray-900"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-[#22c55e] mb-1">
                      {calculatedData.staffContact}%
                    </div>
                    <div className="text-xs text-[#33006F]">+5% vs yesterday</div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Modal - using Portal to render outside component tree */}
      {showModal && createPortal(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6" onClick={() => setShowModal(false)}>
          <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-xl p-[1px] max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden h-full">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#333333]">Missing Merchandise - Full Report</h2>
                  <p className="text-sm text-gray-500 mt-1">Complete list of out-of-stock items for selected date range</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-3">
                  {merchandiseData.map((item, index) => {
                    const logo = getTeamLogo(item.team);
                    
                    return (
                      <div key={index} className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-lg p-[1px]">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                          <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-1">
                            {logo ? (
                              <img src={logo} alt={item.team} className="w-full h-full object-contain" />
                            ) : (
                              <div className="text-[10px] font-bold text-gray-400">CR</div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-sm text-[#333333] truncate">{item.team}</div>
                            <div className="text-xs text-gray-600 truncate">{item.item} - {item.gender} ({item.size})</div>
                            <div className="text-xs text-gray-500">Age: {item.age}</div>
                          </div>

                          <div className="text-right">
                            <div className="font-black text-[#BF0D3E] text-lg">{item.count}</div>
                            <div className="text-xs text-gray-500">requests</div>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-[#333333] text-sm">{item.revenue}</div>
                            <div className="text-xs text-gray-500">potential</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
