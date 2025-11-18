import { useState } from 'react';
import { Eye, Download, FileText, Search, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { PDFRecord } from '../types';
import { pdfRecords } from '../data/mockData';

interface PDFLibraryProps {
  onPdfSelect?: (pdfId: string) => void;
}

export function PDFLibrary({ onPdfSelect }: PDFLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logic
  const filteredRecords = pdfRecords.filter((record) => {
    const matchesSearch = 
      searchQuery === '' ||
      record.slrCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.pdfName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.course.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesYear = filterYear === 'all' || record.year.toString() === filterYear;
    const matchesCourse = filterCourse === 'all' || record.course === filterCourse;
    
    return matchesSearch && matchesYear && matchesCourse;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: PDFRecord['ocrStatus']) => {
    const variants = {
      completed: { variant: 'default' as const, label: 'Completed', className: 'bg-green-100 text-green-700' },
      pending: { variant: 'secondary' as const, label: 'Pending', className: 'bg-amber-100 text-amber-700' },
      not_started: { variant: 'secondary' as const, label: 'Not Started', className: 'bg-gray-100 text-gray-700' },
    };
    const config = variants[status];
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">PDF Library</h1>
        <p className="text-gray-500">Browse and manage all scanned documents</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by SLR code, PDF name, course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="1981">1981</SelectItem>
              <SelectItem value="1982">1982</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterCourse} onValueChange={setFilterCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="Arts">Arts</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="Commerce">Commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredRecords.length)} of {filteredRecords.length} results
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SLR Code</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Exam Session</TableHead>
              <TableHead>PDF Name</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No PDFs found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </TableCell>
              </TableRow>
            ) : (
              paginatedRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-gray-50">
                  <TableCell className="text-blue-600">{record.slrCode}</TableCell>
                  <TableCell>{record.course}</TableCell>
                  <TableCell>{record.semester}</TableCell>
                  <TableCell>{record.year}</TableCell>
                  <TableCell>{record.examSession}</TableCell>
                  <TableCell>{record.pdfName}</TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(record.uploadedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(record.ocrStatus)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onPdfSelect?.(record.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        disabled={record.ocrStatus === 'not_started'}
                        onClick={() => onPdfSelect?.(record.id)}
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
