export interface DashboardSummary {
  totalPDFs: number;
  totalOCREntries: number;
  pendingVerifications: number;
  totalYears: number;
  latestUpload: string | null;
  processingQueue: number;
}

export interface FolderNode {
  id: string;
  name: string;
  type: "folder" | "pdf";
  pdfId?: number;               // only for pdf nodes
  children?: FolderNode[];      // only for folder nodes
}