import { useState, useEffect } from 'react';
import { Eye, Download, FileText, Search } from 'lucide-react';
import axios from "axios";
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

import { getStudents } from '../services/api';
import { PDFRecord } from '../types';

import { PdfSelectData } from "./ExplorerWithLibrary"; // import the type

interface PDFLibraryProps {
  onPdfSelect?: (data: PdfSelectData) => void;
}

export function PDFLibrary({ onPdfSelect }: PDFLibraryProps) {
  const [records, setRecords] = useState<PDFRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Fetch data
  useEffect(() => {
    const load = async () => {
      try {
        const result = await getStudents();
        setRecords(result);
        console.log("API RESULT:", result);
      } catch (err) {
        console.error("Failed to load student records:", err);
      }
    };
    load();
  }, []);

  // ---------------- FILTERS ----------------
const filteredRecords = records.filter((record) => {
  const search = searchQuery.toLowerCase();

const searchTerms = searchQuery
  .toLowerCase()
  .trim()
  .split(/[\s,]+/)
  .filter(Boolean);

const matchesSearch =
  searchQuery === '' ||
  searchTerms.some((term) =>
    String(record.name_of_student || '').toLowerCase().includes(term) ||
    String(record.course_name || '').toLowerCase().includes(term) ||
    String(record.pdf_link || '').toLowerCase().includes(term) ||
    String(record.prn_no || '').toLowerCase().includes(term) ||
    String(record.seat_no || '').toLowerCase().includes(term)
  );

  const matchesYear = filterYear === 'all' || record.event_year === filterYear;
  const matchesCourse = filterCourse === 'all' || record.course_name === filterCourse;

  return matchesSearch && matchesYear && matchesCourse;
});

  // Dynamic filters
  const years = Array.from(new Set(records.map(r => r.event_year))).filter(Boolean);
  const courses = Array.from(new Set(records.map(r => r.course_name))).filter(Boolean);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="green">Completed</Badge>;
      case "pending":
        return <Badge variant="yellow">Pending</Badge>;
      default:
        return <Badge variant="gray">N/A</Badge>;
    }
  };



const forceDownload = async (url: string, filename: string) => {
  try {
    const response = await axios.get(url, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.error("PDF download failed:", err);
  }
};

  return (
    <div className="p-6">

      <h1 className="text-xl font-semibold mb-1">PDF Library</h1>
      <p className="text-gray-500 mb-6">Browse and manage all scanned documents</p>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-lg border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, PRN, seat number, course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Year */}
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((yr) => (
                <SelectItem key={yr} value={yr}>{yr}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Course */}
          <Select value={filterCourse} onValueChange={setFilterCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>
      </div>

      {/* RESULTS COUNT */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredRecords.length)}  
        of {filteredRecords.length} results
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>College</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>PRN</TableHead>
              <TableHead>Seat No</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              paginatedRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.college_name ?? "N/A"}</TableCell>
                  <TableCell>{record.name_of_student}</TableCell>
                  <TableCell>{record.course_name}</TableCell>
                  <TableCell>{record.prn_no}</TableCell>
                  <TableCell>{record.seat_no}</TableCell>
                  <TableCell>{record.term_name}</TableCell>
                  <TableCell>{record.event_year}</TableCell>
                  <TableCell>
                    {getStatusBadge(record.pdf_link ? "completed" : "pending")}
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* View PDF */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          if (!record.pdf_link) return;

                          window.open(record.pdf_link, "_blank", "noopener,noreferrer");
                        }}
                      >
                        <Eye className="w-4 h-4 pointer-events-none" />
                      </Button>


                      {/* Download PDF */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          console.log("DOWNLOAD CLICKED:", record.pdf_link);

                          if (!record.pdf_link) return;

                          // SIMPLE TEST: open PDF in new tab
                          window.open(record.pdf_link, "_blank", "noopener,noreferrer");
                        }}
                      >
                        <Download className="w-4 h-4 pointer-events-none" />
                      </Button>
                     
                    </div>
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between mt-6">

            {/* Previous */}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {/* Page Number Window */}
            <div className="flex gap-2">
              {(() => {
                const maxPagesToShow = 5;

                let startPage = Math.max(
                  1,
                  currentPage - Math.floor(maxPagesToShow / 2)
                );

                let endPage = startPage + maxPagesToShow - 1;

                if (endPage > totalPages) {
                  endPage = totalPages;
                  startPage = Math.max(1, endPage - maxPagesToShow + 1);
                }

                return Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => {
                    const page = startPage + i;
                    return (
                      <Button
                        key={page}
                        size="sm"
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  }
                );
              })()}
            </div>

            {/* Next */}
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

    </div>
  );
}
