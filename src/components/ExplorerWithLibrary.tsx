import { useState } from 'react';
import { FolderExplorer } from './FolderExplorer';
import { PDFLibrary } from './PDFLibrary';
import { folderStructure } from '../data/mockData';

interface ExplorerWithLibraryProps {
  onPdfSelect?: (pdfId: string) => void;
}

export function ExplorerWithLibrary({ onPdfSelect }: ExplorerWithLibraryProps) {
  const [selectedPdfId, setSelectedPdfId] = useState<string | undefined>();

  const handlePdfSelect = (pdfId: string) => {
    setSelectedPdfId(pdfId);
    onPdfSelect?.(pdfId);
  };

  return (
    <div className="flex h-full">
      {/* Left: Folder Explorer */}
      <div className="w-80 border-r border-gray-200 bg-white overflow-hidden">
        <FolderExplorer 
          rootFolder={folderStructure} 
          onPdfSelect={handlePdfSelect}
          selectedPdfId={selectedPdfId}
        />
      </div>

      {/* Right: PDF Library */}
      <div className="flex-1 bg-gray-50 overflow-auto">
        <PDFLibrary onPdfSelect={handlePdfSelect} />
      </div>
    </div>
  );
}
