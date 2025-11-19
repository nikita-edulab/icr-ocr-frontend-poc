export interface PDFRecord {
  id: number;

  event_year: string | null;
  course_name: string | null;
  pattern_name?: string | null;
  exam_type?: string | null;

  term_name: string | null;
  seat_no: string | null;
  prn_no: string | null;

  college_code?: string | null;
  college_name?: string | null;   // ADD THIS SAFELY

  name_of_student: string | null;

  pdf_link?: string | null;       // ADD THIS SAFELY

  total_credit?: string | null;
  total_egp?: string | null;
  sgpa?: string | null;
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
