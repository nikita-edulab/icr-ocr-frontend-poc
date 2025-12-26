import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { X } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

interface PDFViewerProps {
  pdfId: string;    // this contains your PDF URL
  onClose: () => void;
  highlightPRN?: string;
}

export function PDFViewer({ pdfId, onClose, highlightPRN }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  function onLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      
      <div className="bg-white shadow-2xl rounded-xl w-[90%] h-[90%] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-auto h-full p-4">
          <Document file={pdfId} onLoadSuccess={onLoadSuccess}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                key={index + 1}
                pageNumber={index + 1}
                renderTextLayer={true}
                customTextRenderer={({ str }: { str: string }) => {
                const text = String(str || "");   // <-- This prevents all errors

                if (!highlightPRN) return text;

                const regex = new RegExp(`(${highlightPRN})`, "gi");
                const parts = text.split(regex);

                return parts.map((part, i) =>
                  regex.test(part) ? (
                    <mark key={i} style={{ background: "yellow", padding: 0 }}>
                      {part}
                    </mark>
                  ) : (
                    part
                  )
                );
              }}
              />
            ))}
          </Document>
        </div>

      </div>
    </div>
  );
}
