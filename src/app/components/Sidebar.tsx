import { Home, FileText, Settings, ClipboardList } from "lucide-react";
import { Link, useLocation } from "react-router";
import jibeLogo from "figma:asset/6f35d83f32f25a1bcf38d54c046450e7f4af8912.png";
import rockiesDugoutStoreLogo from "figma:asset/1717564bc045af2e8f8bd35047159ec02ff7f332.png";

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-36 bg-gradient-to-b from-[#1F0047] to-slate-300 flex flex-col">
      {/* Top Logo Section */}
      <div className="px-3 py-6">
        <div className="text-center">
          <img src={jibeLogo} alt="Jibe Retail" className="w-24 mx-auto" style={{ transform: 'scale(1.3)' }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-5">
        <div className="space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-2 px-2 py-2.5 rounded transition-colors text-sm ${
              location.pathname === "/" 
                ? "text-white" 
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link
            to="/reports"
            className={`flex items-center gap-2 px-2 py-2.5 rounded transition-colors text-sm ${
              location.pathname === "/reports" 
                ? "text-white" 
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <FileText size={18} />
            <span>Reports</span>
          </Link>
          <Link
            to="/settings"
            className={`flex items-center gap-2 px-2 py-2.5 rounded transition-colors text-sm ${
              location.pathname === "/settings"
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <Settings size={18} />
            <span>Inventory</span>
          </Link>
          <Link
            to="/v3"
            className={`flex items-center gap-2 px-2 py-2.5 rounded transition-colors text-sm ${
              location.pathname === "/v3"
                ? "text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <ClipboardList size={18} />
            <span>Store Survey</span>
          </Link>
        </div>
      </nav>

      {/* Footer with Rockies Dugout Store Logo */}
      <div className="px-3 py-4">
        <div className="text-center">
          <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="w-28 mx-auto" />
        </div>
      </div>
    </div>
  );
}
