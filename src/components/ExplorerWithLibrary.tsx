import { PDFLibrary } from './PDFLibrary';

export interface PdfSelectData {
  url: string;
  prn: string;
}

interface ExplorerWithLibraryProps {
  onPdfSelect?: (data: PdfSelectData) => void;
}

export function ExplorerWithLibrary({ onPdfSelect }: ExplorerWithLibraryProps) {
  return (
    <div className="h-full w-full bg-gray-50 overflow-auto">
      <PDFLibrary onPdfSelect={onPdfSelect} />
    </div>
  );
}
