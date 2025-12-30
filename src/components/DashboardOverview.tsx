import { useEffect, useState } from "react";
import { FileText, ScanText, AlertCircle, Calendar, Upload, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { getDashboardSummary } from "../services/api";
import { DashboardSummary } from "../types/student";
import { useKeycloakAuth } from "../contexts/KeycloakContext";

export function DashboardOverview() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const { keycloak } = useKeycloakAuth();

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const token = keycloak?.token;
      const data = await getDashboardSummary(token);
      setSummary(data);
    } catch (error) {
      console.error("Dashboard API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (!summary) return <p className="p-6 text-red-500">Failed to load dashboard.</p>;

  const stats = [
    {
      label: "Total PDFs Scanned",
      value: summary.totalPDFs.toLocaleString(),
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Total ICR/OCR Entries",
      value: summary.totalOCREntries.toLocaleString(),
      icon: ScanText,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Total DigiLocker Entries",
      value: summary.pendingVerifications.toLocaleString(),
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      label: "Total Years Archived",
      value: summary.totalYears.toLocaleString(),
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Latest Uploaded",
      value: summary.latestUpload || "N/A",
      icon: Upload,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      label: "DigiLocker Processing Queue",
      value: summary.processingQueue.toLocaleString(),
      icon: Clock,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to the OCR/ICR Result Ledger Management System</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                  <p className="text-gray-900 font-semibold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity + System Status — static for now 
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Recent Uploads</h3>
          <div className="space-y-3">
            {[
              { name: "SLR-007.pdf", date: "2025-11-15", status: "Completed" },
              { name: "SLR-006.pdf", date: "2025-11-14", status: "Completed" },
              { name: "SLR-005.pdf", date: "2025-11-13", status: "Processing" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">System Status</h3>

         
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">OCR Processing</span>
                <span className="text-sm text-gray-900">93%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: "93%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Verification Progress</span>
                <span className="text-sm text-gray-900">78%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: "78%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Storage Used</span>
                <span className="text-sm text-gray-900">64%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600" style={{ width: "64%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>*/}
    </div>
  );
}
