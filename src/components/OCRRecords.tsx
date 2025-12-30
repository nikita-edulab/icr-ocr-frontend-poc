import { FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { pdfRecords } from '../data/mockData';

export function OCRRecords() {
  const completedCount = pdfRecords.filter((p) => p.ocrStatus === 'completed').length;
  const pendingCount = pdfRecords.filter((p) => p.ocrStatus === 'pending').length;
  const notStartedCount = pdfRecords.filter((p) => p.ocrStatus === 'not_started').length;
  
  const totalCount = pdfRecords.length;
  const completionRate = (completedCount / totalCount) * 100;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">OCR Records</h1>
        <p className="text-gray-500">Implementation in progress</p>
      </div>

      {/* Statistics 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed</p>
              <p className="text-gray-900">{completedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-600" style={{ width: `${completionRate}%` }}></div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-gray-900">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-600" style={{ width: `${(pendingCount / totalCount) * 100}%` }}></div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Not Started</p>
              <p className="text-gray-900">{notStartedCount}</p>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-400" style={{ width: `${(notStartedCount / totalCount) * 100}%` }}></div>
          </div>
        </Card>
      </div>*/}

      {/* Overall Progress 
      <Card className="p-6 mb-8">
        <h3 className="text-gray-900 mb-4">Overall OCR Progress</h3>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-600">Processing completion</span>
          <span className="text-gray-900">{completionRate.toFixed(1)}%</span>
        </div>
        <Progress value={completionRate} className="h-3" />
        <p className="text-sm text-gray-500 mt-2">
          {completedCount} of {totalCount} documents processed
        </p>
      </Card>*/}

      {/* Records List 
      <div>
        <h3 className="text-gray-900 mb-4">Recent OCR Activity</h3>
        <div className="grid grid-cols-1 gap-4">
          {pdfRecords.map((record) => {
            const statusConfig = {
              completed: { color: 'text-green-600', bg: 'bg-green-50', label: 'Completed' },
              pending: { color: 'text-amber-600', bg: 'bg-amber-50', label: 'Pending' },
              not_started: { color: 'text-gray-600', bg: 'bg-gray-50', label: 'Not Started' },
            };
            const config = statusConfig[record.ocrStatus];

            return (
              <Card key={record.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${config.bg} rounded-lg flex items-center justify-center`}>
                    <FileText className={`w-6 h-6 ${config.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900">{record.pdfName}</span>
                      <Badge variant="secondary" className="text-xs">
                        {record.slrCode}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {record.course} • {record.semester} • {record.year}
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className={`${config.bg} ${config.color} mb-2`}>
                      {config.label}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      {new Date(record.uploadedDate).toLocaleDateString()}
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>*/}
    </div>
  );
}
