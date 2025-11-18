export interface PDFRecord {
  id: string;
  slrCode: string;
  course: string;
  semester: string;
  year: number;
  examSession: string;
  pdfName: string;
  uploadedDate: string;
  folderPath: string;
  ocrStatus: 'completed' | 'pending' | 'not_started';
  studentRecords?: StudentRecord[];
}

export interface StudentRecord {
  seatNumber: string;
  studentName: string;
  marks: number;
  grade: string;
  subject: string;
}

export interface FolderNode {
  id: string;
  name: string;
  type: 'folder' | 'pdf';
  children?: FolderNode[];
  pdfId?: string;
  path: string;
}

export interface OCRData {
  pdfId: string;
  rawText: string;
  structuredData: any;
  verificationFlags: string[];
  extractedAt: string;
}

export interface DashboardStats {
  totalPDFs: number;
  totalOCREntries: number;
  pendingVerifications: number;
  totalYears: number;
  latestUpload: string;
  processingQueue: number;
}
