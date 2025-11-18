import { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { PDFRecord } from '../types';
import { pdfRecords, ocrDataMap } from '../data/mockData';

interface PDFViewerProps {
  pdfId: string;
  onClose: () => void;
}

export function PDFViewer({ pdfId, onClose }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const pdfRecord = pdfRecords.find((p) => p.id === pdfId);
  const ocrData = ocrDataMap[pdfId];

  if (!pdfRecord) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">{pdfRecord.pdfName}</h2>
            <p className="text-sm text-gray-500">
              {pdfRecord.slrCode} • {pdfRecord.course} • {pdfRecord.examSession}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* PDF Preview - Left Side */}
          <div className="flex-1 flex flex-col border-r border-gray-200">
            {/* PDF Controls */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setZoom((z) => Math.max(50, z - 10))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600 w-16 text-center">{zoom}%</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setZoom((z) => Math.min(200, z + 10))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* PDF Display Area */}
            <div className="flex-1 overflow-auto bg-gray-100 p-8 flex items-center justify-center">
              <div 
                className="bg-white shadow-lg"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
              >
                <div className="w-[595px] h-[842px] p-12 border border-gray-300">
                  <div className="text-center mb-8">
                    <h3 className="text-gray-900 mb-2">UNIVERSITY EXAMINATION RESULTS</h3>
                    <p className="text-sm text-gray-600">Academic Year: {pdfRecord.year}</p>
                    <p className="text-sm text-gray-600">Course: {pdfRecord.course}</p>
                    <p className="text-sm text-gray-600">Exam Session: {pdfRecord.examSession}</p>
                  </div>
                  
                  <div className="border border-gray-300">
                    <div className="grid grid-cols-5 border-b border-gray-300 bg-gray-50">
                      <div className="p-2 text-sm">Seat No.</div>
                      <div className="p-2 text-sm col-span-2">Name</div>
                      <div className="p-2 text-sm">Marks</div>
                      <div className="p-2 text-sm">Grade</div>
                    </div>
                    {pdfRecord.studentRecords?.map((student, idx) => (
                      <div key={idx} className="grid grid-cols-5 border-b border-gray-300">
                        <div className="p-2 text-sm">{student.seatNumber}</div>
                        <div className="p-2 text-sm col-span-2">{student.studentName}</div>
                        <div className="p-2 text-sm">{student.marks}</div>
                        <div className="p-2 text-sm">{student.grade}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Page Thumbnails */}
            <div className="border-t border-gray-200 p-3 bg-gray-50">
              <div className="flex gap-2 overflow-x-auto">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex-shrink-0 w-16 h-20 border-2 rounded ${
                      currentPage === page
                        ? 'border-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    } bg-white flex items-center justify-center text-sm text-gray-600`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* OCR Data - Right Side */}
          <div className="w-[500px] flex flex-col">
            <Tabs defaultValue="raw" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-4 rounded-none border-b border-gray-200">
                <TabsTrigger value="raw">Raw OCR</TabsTrigger>
                <TabsTrigger value="structured">Structured</TabsTrigger>
                <TabsTrigger value="records">Records</TabsTrigger>
                <TabsTrigger value="verification">Flags</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-auto">
                <TabsContent value="raw" className="mt-0 p-4">
                  {ocrData ? (
                    <pre className="text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap font-mono">
                      {ocrData.rawText}
                    </pre>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>OCR data not available</p>
                      <p className="text-sm">Status: {pdfRecord.ocrStatus}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="structured" className="mt-0 p-4">
                  {ocrData?.structuredData ? (
                    <pre className="text-sm bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap font-mono">
                      {JSON.stringify(ocrData.structuredData, null, 2)}
                    </pre>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No structured data available</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="records" className="mt-0 p-4">
                  {pdfRecord.studentRecords ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Seat No.</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Marks</TableHead>
                          <TableHead>Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pdfRecord.studentRecords.map((student, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{student.seatNumber}</TableCell>
                            <TableCell>{student.studentName}</TableCell>
                            <TableCell>{student.marks}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{student.grade}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No student records extracted</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="verification" className="mt-0 p-4">
                  {ocrData?.verificationFlags ? (
                    <div className="space-y-3">
                      {ocrData.verificationFlags.map((flag, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                          <span className="text-sm text-gray-700">{flag}</span>
                        </div>
                      ))}
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Extracted At:</p>
                        <p className="text-sm text-gray-900">
                          {new Date(ocrData.extractedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No verification data available</p>
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
