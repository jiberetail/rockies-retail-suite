import { BrowserRouter as Router, Routes, Route } from "react-router";
import { DateRangeProvider } from "@/app/contexts/DateRangeContext";
import { InventoryProvider } from "@/app/contexts/InventoryContext";
import { Sidebar } from "@/app/components/Sidebar";
import { Dashboard } from "@/app/components/Dashboard";
import { DashboardV2 } from "@/app/components/DashboardV2";
import { DashboardV3 } from "@/app/components/DashboardV3";
import { SettingsPage } from "@/app/pages/SettingsPage";
import { ReportsPage } from "@/app/pages/ReportsPage";
import { ReportViewPage } from "@/app/pages/ReportViewPage";
import { V3Page } from "@/app/pages/V3Page";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export default function App() {
  return (
    <Router basename={routerBasename}>
      <DateRangeProvider>
        <InventoryProvider>
          <div className="size-full flex relative">
            {/* Stadium background image - very subtle/faded */}
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backgroundImage: `
                  linear-gradient(to bottom, rgba(226, 232, 240, 0.92), rgba(226, 232, 240, 0.95)),
                  url('https://images.unsplash.com/photo-1659617929571-98383e4baf82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMHN0YWRpdW0lMjBmaWVsZCUyMGVtcHR5JTIwc2VhdHN8ZW58MXx8fHwxNzcxNDMyNjE0fDA&ixlib=rb-4.1.0&q=80&w=1080')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />

            <div className="relative z-10 flex size-full">
              <Sidebar />
              <Routes>
                <Route path="/" element={<DashboardV2 />} />
                <Route path="/dashboard-v2" element={<Dashboard />} />
                <Route path="/dashboard-v3" element={<DashboardV3 />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/reports/:reportId" element={<ReportViewPage />} />
                <Route path="/v3" element={<V3Page />} />
              </Routes>
            </div>
          </div>
        </InventoryProvider>
      </DateRangeProvider>
    </Router>
  );
}
