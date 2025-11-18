import { PDFRecord, FolderNode, OCRData, DashboardStats } from '../types';

export const dashboardStats: DashboardStats = {
  totalPDFs: 2847,
  totalOCREntries: 2653,
  pendingVerifications: 194,
  totalYears: 43,
  latestUpload: '2025-11-15',
  processingQueue: 12,
};

export const pdfRecords: PDFRecord[] = [
  {
    id: 'pdf-001',
    slrCode: 'SLR-001',
    course: 'Arts',
    semester: 'Sem 1',
    year: 1981,
    examSession: 'Oct-1981',
    pdfName: 'SLR-001.pdf',
    uploadedDate: '2025-11-10',
    folderPath: 'University Records/1981/Arts/Sem 1/Oct-1981',
    ocrStatus: 'completed',
    studentRecords: [
      { seatNumber: 'A81001', studentName: 'Rajesh Kumar', marks: 85, grade: 'A', subject: 'History' },
      { seatNumber: 'A81002', studentName: 'Priya Sharma', marks: 78, grade: 'B+', subject: 'History' },
    ],
  },
  {
    id: 'pdf-002',
    slrCode: 'SLR-002',
    course: 'Arts',
    semester: 'Sem 1',
    year: 1981,
    examSession: 'Oct-1981',
    pdfName: 'SLR-002.pdf',
    uploadedDate: '2025-11-10',
    folderPath: 'University Records/1981/Arts/Sem 1/Oct-1981',
    ocrStatus: 'completed',
  },
  {
    id: 'pdf-003',
    slrCode: 'SLR-003',
    course: 'Science',
    semester: 'Sem 1',
    year: 1981,
    examSession: 'Oct-1981',
    pdfName: 'SLR-003.pdf',
    uploadedDate: '2025-11-11',
    folderPath: 'University Records/1981/Science/Sem 1/Oct-1981',
    ocrStatus: 'pending',
  },
  {
    id: 'pdf-004',
    slrCode: 'SLR-004',
    course: 'Commerce',
    semester: 'Sem 2',
    year: 1981,
    examSession: 'Mar-1982',
    pdfName: 'SLR-004.pdf',
    uploadedDate: '2025-11-12',
    folderPath: 'University Records/1981/Commerce/Sem 2/Mar-1982',
    ocrStatus: 'completed',
  },
  {
    id: 'pdf-005',
    slrCode: 'SLR-005',
    course: 'Arts',
    semester: 'Sem 1',
    year: 1982,
    examSession: 'Oct-1982',
    pdfName: 'SLR-005.pdf',
    uploadedDate: '2025-11-13',
    folderPath: 'University Records/1982/Arts/Sem 1/Oct-1982',
    ocrStatus: 'not_started',
  },
  {
    id: 'pdf-006',
    slrCode: 'SLR-006',
    course: 'Science',
    semester: 'Sem 1',
    year: 1982,
    examSession: 'Oct-1982',
    pdfName: 'SLR-006.pdf',
    uploadedDate: '2025-11-14',
    folderPath: 'University Records/1982/Science/Sem 1/Oct-1982',
    ocrStatus: 'completed',
  },
  {
    id: 'pdf-007',
    slrCode: 'SLR-007',
    course: 'Commerce',
    semester: 'Sem 2',
    year: 1982,
    examSession: 'Mar-1983',
    pdfName: 'SLR-007.pdf',
    uploadedDate: '2025-11-15',
    folderPath: 'University Records/1982/Commerce/Sem 2/Mar-1983',
    ocrStatus: 'completed',
  },
];

export const folderStructure: FolderNode = {
  id: 'root',
  name: 'University Records',
  type: 'folder',
  path: 'University Records',
  children: [
    {
      id: 'year-1981',
      name: '1981',
      type: 'folder',
      path: 'University Records/1981',
      children: [
        {
          id: 'arts-1981',
          name: 'Arts',
          type: 'folder',
          path: 'University Records/1981/Arts',
          children: [
            {
              id: 'arts-sem1-1981',
              name: 'Sem 1',
              type: 'folder',
              path: 'University Records/1981/Arts/Sem 1',
              children: [
                {
                  id: 'arts-sem1-oct1981',
                  name: 'Oct-1981',
                  type: 'folder',
                  path: 'University Records/1981/Arts/Sem 1/Oct-1981',
                  children: [
                    {
                      id: 'pdf-001',
                      name: 'SLR-001.pdf',
                      type: 'pdf',
                      path: 'University Records/1981/Arts/Sem 1/Oct-1981/SLR-001.pdf',
                      pdfId: 'pdf-001',
                    },
                    {
                      id: 'pdf-002',
                      name: 'SLR-002.pdf',
                      type: 'pdf',
                      path: 'University Records/1981/Arts/Sem 1/Oct-1981/SLR-002.pdf',
                      pdfId: 'pdf-002',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'science-1981',
          name: 'Science',
          type: 'folder',
          path: 'University Records/1981/Science',
          children: [
            {
              id: 'science-sem1-1981',
              name: 'Sem 1',
              type: 'folder',
              path: 'University Records/1981/Science/Sem 1',
              children: [
                {
                  id: 'science-sem1-oct1981',
                  name: 'Oct-1981',
                  type: 'folder',
                  path: 'University Records/1981/Science/Sem 1/Oct-1981',
                  children: [
                    {
                      id: 'pdf-003',
                      name: 'SLR-003.pdf',
                      type: 'pdf',
                      path: 'University Records/1981/Science/Sem 1/Oct-1981/SLR-003.pdf',
                      pdfId: 'pdf-003',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'commerce-1981',
          name: 'Commerce',
          type: 'folder',
          path: 'University Records/1981/Commerce',
          children: [
            {
              id: 'commerce-sem2-1981',
              name: 'Sem 2',
              type: 'folder',
              path: 'University Records/1981/Commerce/Sem 2',
              children: [
                {
                  id: 'commerce-sem2-mar1982',
                  name: 'Mar-1982',
                  type: 'folder',
                  path: 'University Records/1981/Commerce/Sem 2/Mar-1982',
                  children: [
                    {
                      id: 'pdf-004',
                      name: 'SLR-004.pdf',
                      type: 'pdf',
                      path: 'University Records/1981/Commerce/Sem 2/Mar-1982/SLR-004.pdf',
                      pdfId: 'pdf-004',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'year-1982',
      name: '1982',
      type: 'folder',
      path: 'University Records/1982',
      children: [
        {
          id: 'arts-1982',
          name: 'Arts',
          type: 'folder',
          path: 'University Records/1982/Arts',
          children: [
            {
              id: 'arts-sem1-1982',
              name: 'Sem 1',
              type: 'folder',
              path: 'University Records/1982/Arts/Sem 1',
              children: [
                {
                  id: 'arts-sem1-oct1982',
                  name: 'Oct-1982',
                  type: 'folder',
                  path: 'University Records/1982/Arts/Sem 1/Oct-1982',
                  children: [
                    {
                      id: 'pdf-005',
                      name: 'SLR-005.pdf',
                      type: 'pdf',
                      path: 'University Records/1982/Arts/Sem 1/Oct-1982/SLR-005.pdf',
                      pdfId: 'pdf-005',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'science-1982',
          name: 'Science',
          type: 'folder',
          path: 'University Records/1982/Science',
          children: [
            {
              id: 'science-sem1-1982',
              name: 'Sem 1',
              type: 'folder',
              path: 'University Records/1982/Science/Sem 1',
              children: [
                {
                  id: 'science-sem1-oct1982',
                  name: 'Oct-1982',
                  type: 'folder',
                  path: 'University Records/1982/Science/Sem 1/Oct-1982',
                  children: [
                    {
                      id: 'pdf-006',
                      name: 'SLR-006.pdf',
                      type: 'pdf',
                      path: 'University Records/1982/Science/Sem 1/Oct-1982/SLR-006.pdf',
                      pdfId: 'pdf-006',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'commerce-1982',
          name: 'Commerce',
          type: 'folder',
          path: 'University Records/1982/Commerce',
          children: [
            {
              id: 'commerce-sem2-1982',
              name: 'Sem 2',
              type: 'folder',
              path: 'University Records/1982/Commerce/Sem 2',
              children: [
                {
                  id: 'commerce-sem2-mar1983',
                  name: 'Mar-1983',
                  type: 'folder',
                  path: 'University Records/1982/Commerce/Sem 2/Mar-1983',
                  children: [
                    {
                      id: 'pdf-007',
                      name: 'SLR-007.pdf',
                      type: 'pdf',
                      path: 'University Records/1982/Commerce/Sem 2/Mar-1983/SLR-007.pdf',
                      pdfId: 'pdf-007',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const ocrDataMap: Record<string, OCRData> = {
  'pdf-001': {
    pdfId: 'pdf-001',
    rawText: `UNIVERSITY EXAMINATION RESULTS
    Academic Year: 1981
    Course: Bachelor of Arts (B.A.)
    Semester: I
    Exam Session: October 1981
    
    SEAT NO.   NAME                    HISTORY   ENGLISH   GEOGRAPHY   TOTAL
    A81001     Rajesh Kumar            85        78        82          245
    A81002     Priya Sharma            78        85        80          243
    A81003     Amit Patel              92        88        90          270
    A81004     Sunita Desai            76        82        79          237`,
    structuredData: {
      academicYear: 1981,
      course: 'Bachelor of Arts (B.A.)',
      semester: 'I',
      examSession: 'October 1981',
      students: [
        { seatNumber: 'A81001', name: 'Rajesh Kumar', history: 85, english: 78, geography: 82, total: 245 },
        { seatNumber: 'A81002', name: 'Priya Sharma', history: 78, english: 85, geography: 80, total: 243 },
        { seatNumber: 'A81003', name: 'Amit Patel', history: 92, english: 88, geography: 90, total: 270 },
        { seatNumber: 'A81004', name: 'Sunita Desai', history: 76, english: 82, geography: 79, total: 237 },
      ],
    },
    verificationFlags: ['All records verified', 'Quality score: 98%'],
    extractedAt: '2025-11-10T14:30:00Z',
  },
};
