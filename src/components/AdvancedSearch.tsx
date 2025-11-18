import { useState } from 'react';
import { Search, Filter, X, FileText, User, Calendar } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { pdfRecords } from '../data/mockData';

interface SearchFilters {
  year: string;
  course: string;
  slrCode: string;
  seatNumber: string;
  studentName: string;
  examSession: string;
}

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    year: '',
    course: '',
    slrCode: '',
    seatNumber: '',
    studentName: '',
    examSession: '',
  });
  
  const [searchResults, setSearchResults] = useState<typeof pdfRecords>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const results = pdfRecords.filter((record) => {
      const matchesYear = !filters.year || record.year.toString() === filters.year;
      const matchesCourse = !filters.course || record.course === filters.course;
      const matchesSlr = !filters.slrCode || record.slrCode.toLowerCase().includes(filters.slrCode.toLowerCase());
      const matchesSession = !filters.examSession || record.examSession.toLowerCase().includes(filters.examSession.toLowerCase());
      
      let matchesStudent = true;
      if (filters.seatNumber || filters.studentName) {
        matchesStudent = record.studentRecords?.some((student) => {
          const matchesSeat = !filters.seatNumber || student.seatNumber.toLowerCase().includes(filters.seatNumber.toLowerCase());
          const matchesName = !filters.studentName || student.studentName.toLowerCase().includes(filters.studentName.toLowerCase());
          return matchesSeat && matchesName;
        }) || false;
      }

      return matchesYear && matchesCourse && matchesSlr && matchesSession && matchesStudent;
    });

    setSearchResults(results);
    setHasSearched(true);
  };

  const clearFilters = () => {
    setFilters({
      year: '',
      course: '',
      slrCode: '',
      seatNumber: '',
      studentName: '',
      examSession: '',
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Advanced Search</h1>
        <p className="text-gray-500">Search across all PDFs and OCR data with powerful filters</p>
      </div>

      {/* Search Filters */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <h3 className="text-gray-900">Search Filters</h3>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Year</label>
            <Select value={filters.year} onValueChange={(value) => setFilters({ ...filters, year: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Years</SelectItem>
                <SelectItem value="1981">1981</SelectItem>
                <SelectItem value="1982">1982</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Course</label>
            <Select value={filters.course} onValueChange={(value) => setFilters({ ...filters, course: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Courses</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Commerce">Commerce</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">SLR Code</label>
            <Input
              type="text"
              placeholder="e.g., SLR-001"
              value={filters.slrCode}
              onChange={(e) => setFilters({ ...filters, slrCode: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Seat Number</label>
            <Input
              type="text"
              placeholder="e.g., A81001"
              value={filters.seatNumber}
              onChange={(e) => setFilters({ ...filters, seatNumber: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Student Name</label>
            <Input
              type="text"
              placeholder="e.g., Rajesh Kumar"
              value={filters.studentName}
              onChange={(e) => setFilters({ ...filters, studentName: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Exam Session</label>
            <Input
              type="text"
              placeholder="e.g., Oct-1981"
              value={filters.examSession}
              onChange={(e) => setFilters({ ...filters, examSession: e.target.value })}
            />
          </div>
        </div>

        <Button onClick={handleSearch} className="w-full">
          <Search className="w-4 h-4 mr-2" />
          Search Records
        </Button>
      </Card>

      {/* Search Results */}
      {hasSearched && (
        <div>
          <div className="mb-4">
            <h3 className="text-gray-900">Search Results</h3>
            <p className="text-sm text-gray-500">{searchResults.length} matching records found</p>
          </div>

          {searchResults.length === 0 ? (
            <Card className="p-12 text-center">
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search filters</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {searchResults.map((result) => (
                <Card key={result.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 mb-1">{result.pdfName}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-blue-600">{result.slrCode}</span>
                          <span>•</span>
                          <span>{result.course}</span>
                          <span>•</span>
                          <span>{result.semester}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {result.year}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{result.examSession}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {result.studentRecords?.length || 0} records
                      </span>
                    </div>
                  </div>

                  {result.studentRecords && result.studentRecords.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-600 mb-2">Matching Student Records:</p>
                      <div className="space-y-2">
                        {result.studentRecords.map((student, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{student.studentName}</span>
                            <Badge variant="secondary" className="text-xs">
                              {student.seatNumber}
                            </Badge>
                            <span className="text-sm text-gray-600 ml-auto">
                              {student.marks} marks • Grade {student.grade}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Uploaded: {new Date(result.uploadedDate).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        View OCR Data
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
