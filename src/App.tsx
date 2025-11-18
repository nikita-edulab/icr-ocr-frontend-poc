import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { DashboardOverview } from './components/DashboardOverview';
import { ExplorerWithLibrary } from './components/ExplorerWithLibrary';
import { OCRRecords } from './components/OCRRecords';
import { VerificationTools } from './components/VerificationTools';
import { AdvancedSearch } from './components/AdvancedSearch';
import { Settings } from './components/Settings';
import { PDFViewer } from './components/PDFViewer';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedPdfId, setSelectedPdfId] = useState<string | null>(null);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'explorer':
      case 'library':
        return <ExplorerWithLibrary onPdfSelect={(id) => setSelectedPdfId(id)} />;
      case 'ocr':
        return <OCRRecords />;
      case 'verification':
        return <VerificationTools />;
      case 'search':
        return <AdvancedSearch />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdfId && (
        <PDFViewer
          pdfId={selectedPdfId}
          onClose={() => setSelectedPdfId(null)}
        />
      )}
    </div>
  );
}
