import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Calendar as CalendarComponent } from "@/app/components/ui/calendar";
import { useDateRange } from "@/app/contexts/DateRangeContext";

type DateRange = {
  from: Date;
  to: Date;
};

type PresetOption = {
  label: string;
  getValue: () => DateRange;
};

const presetOptions = [
  {
    label: "Today",
    getValue: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "Yesterday",
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 1)),
      to: endOfDay(subDays(new Date(), 1)),
    }),
  },
  {
    label: "Last 7 Days",
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date()),
    }),
  },
  {
    label: "Last 30 Days",
    getValue: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date()),
    }),
  },
];

export function DateRangePicker() {
  const { setDateRange } = useDateRange();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("Today");
  const [customRange, setCustomRange] = useState<DateRange | undefined>();
  const [isCustomMode, setIsCustomMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handlePresetClick = (label: string) => {
    setSelectedPreset(label);
    setIsCustomMode(false);
    const preset = presetOptions.find(opt => opt.label === label);
    if (preset) {
      setDateRange(preset.getValue());
    }
    setIsOpen(false);
  };

  const handleCustomDateSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      setCustomRange(range);
      setIsCustomMode(true);
      setSelectedPreset("Custom Range");
      setDateRange(range);
      setIsOpen(false);
    } else {
      setCustomRange(range);
    }
  };

  const displayText = isCustomMode && customRange?.from && customRange?.to
    ? `${format(customRange.from, "MMM d")} - ${format(customRange.to, "MMM d, yyyy")}`
    : selectedPreset;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="bg-gradient-to-r from-[#041E42]/30 to-[#BF0D3E]/30 rounded-lg p-[1px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-white border-0 rounded-lg hover:bg-gray-50 transition-colors w-full"
        >
          <Calendar size={16} className="text-gray-700" />
          <span className="text-gray-700 font-medium">{displayText}</span>
          <ChevronDown size={16} className="text-gray-700" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[280px]">
          <div className="p-2">
            {/* Preset Options */}
            <div className="space-y-1 mb-2">
              {presetOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handlePresetClick(option.label)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedPreset === option.label && !isCustomMode
                      ? "bg-[#041E42] text-white font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Custom Date Range Separator */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Custom Date Range Label */}
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
              Custom Range
            </div>

            {/* Calendar */}
            <div className="px-2">
              <CalendarComponent
                mode="range"
                selected={customRange}
                onSelect={handleCustomDateSelect}
                numberOfMonths={1}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}