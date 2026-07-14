import { useDateRange } from "@/app/contexts/DateRangeContext";
import { calculateKPIData } from "@/app/utils/dataCalculations";
import { AlertCircle, ThumbsUp, Users, HelpCircle, DollarSign, ShoppingBag } from "lucide-react";

interface KeyMetricsV2Props {
  viewMode: 'survey' | 'satisfaction' | 'location';
}

export function KeyMetricsV2({ viewMode }: KeyMetricsV2Props) {
  const { getDayCount, isCurrentDay } = useDateRange();
  const daysInRange = getDayCount();
  const isTodayView = isCurrentDay();
  const calculatedData = calculateKPIData(daysInRange, isTodayView);

  const surveyMetrics = [
    {
      label: "Associate Satisfaction",
      value: `${calculatedData.staffSatisfaction}%`,
      subtitle: "+2% vs yesterday",
      icon: ThumbsUp,
      valueColor: "text-[#333333]",
      bgColor: "bg-white",
      tooltip: "Percentage of customers who rated their associate interaction as positive.",
    },
    {
      label: "Associate Engagement",
      value: `${calculatedData.staffContact}%`,
      subtitle: "+5% vs yesterday",
      icon: Users,
      valueColor: "text-[#041E42]",
      bgColor: "bg-white",
      tooltip: "Percentage of customers who were greeted or assisted by a store associate.",
    },
    {
      label: "Friction Rate",
      value: `${calculatedData.friction}%`,
      subtitle: "Customer complaints",
      icon: AlertCircle,
      valueColor: "text-[#333333]",
      bgColor: "bg-white",
      tooltip: "Percentage of customers who experienced issues or complaints during their visit.",
    },
  ];

  const satisfactionMetrics = [
    {
      label: "Revenue Loss",
      value: `$${calculatedData.potentialRevenueLoss.toLocaleString()}`,
      subtitle: "Missing merchandise",
      icon: DollarSign,
      valueColor: "text-[#333333]",
      bgColor: "bg-white",
      tooltip: "Estimated revenue lost from unfulfilled customer requests for out-of-stock merchandise.",
    },
    {
      label: "Items Missing",
      value: `${calculatedData.itemsMissing}`,
      subtitle: "Unfulfilled requests",
      icon: ShoppingBag,
      valueColor: "text-[#333333]",
      bgColor: "bg-white",
      tooltip: "Total number of customer requests for items that were out of stock.",
    },
    {
      label: "Friction Rate",
      value: `${calculatedData.friction}%`,
      subtitle: "Customer complaints",
      icon: AlertCircle,
      valueColor: "text-[#333333]",
      bgColor: "bg-white",
      tooltip: "Percentage of customers who experienced issues or complaints during their visit.",
    },
  ];

  const locationMetrics = [
    {
      label: "Associate Satisfaction",
      value: `${calculatedData.staffSatisfaction}%`,
      subtitle: "+2% vs yesterday",
      icon: ThumbsUp,
      valueColor: "text-[#333333]",
      bgColor: "bg-white",
      tooltip: "Percentage of customers who rated their associate interaction as positive.",
    },
    {
      label: "Associate Engagement",
      value: `${calculatedData.staffContact}%`,
      subtitle: "+5% vs yesterday",
      icon: Users,
      valueColor: "text-[#041E42]",
      bgColor: "bg-white",
      tooltip: "Percentage of customers who were greeted or assisted by a store associate.",
    },
    {
      label: "Friction Rate",
      value: `${calculatedData.friction}%`,
      subtitle: "Customer complaints",
      icon: AlertCircle,
      valueColor: "text-[#333333]",
      bgColor: "bg-white",
      tooltip: "Percentage of customers who experienced issues or complaints during their visit.",
    },
  ];

  const metrics = viewMode === 'survey' ? surveyMetrics : viewMode === 'satisfaction' ? satisfactionMetrics : locationMetrics;

  return (
    <div className="space-y-3">
      {metrics.map((metric, index) => (
        <div key={index} className="relative backdrop-blur-md bg-white/60 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 group">
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3">
              <metric.icon size={16} className="text-[#33006F]" />
              <span className="text-sm font-medium text-[#1e293b]">{metric.label}</span>
              <div className="group relative">
                <HelpCircle size={14} className="text-slate-400 cursor-help" />
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10">
                  {metric.tooltip}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-gray-900"></div>
                </div>
              </div>
            </div>
            <div className={`text-2xl font-black ${metric.valueColor} mb-1`}>
              {metric.value}
            </div>
            <div className={`text-xs text-[#33006F]`}>{metric.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}