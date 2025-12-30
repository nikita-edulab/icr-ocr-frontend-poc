import { CheckCircle, AlertTriangle, Info, FileCheck } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function VerificationTools() {
  const verificationTasks = [
    {
      id: 1,
      pdfName: 'SLR-001.pdf',
      slrCode: 'SLR-001',
      status: 'verified',
      issues: 0,
      lastChecked: '2025-11-15',
      quality: 98,
    },
    {
      id: 2,
      pdfName: 'SLR-002.pdf',
      slrCode: 'SLR-002',
      status: 'needs-review',
      issues: 2,
      lastChecked: '2025-11-14',
      quality: 85,
    },
    {
      id: 3,
      pdfName: 'SLR-003.pdf',
      slrCode: 'SLR-003',
      status: 'pending',
      issues: 0,
      lastChecked: null,
      quality: null,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Digi Locker</h1>
        <p className="text-gray-500">Implementation in progress</p>
      </div>

      {/* Quick Stats 
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Verified</p>
              <p className="text-gray-900">2,453</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Needs Review</p>
              <p className="text-gray-900">194</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pending</p>
              <p className="text-gray-900">200</p>
            </div>
            <Info className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Avg Quality</p>
              <p className="text-gray-900">94.2%</p>
            </div>
            <FileCheck className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>*/}

      {/* Verification Queue 
      <div>
        <h3 className="text-gray-900 mb-4">Verification Queue</h3>
        <div className="space-y-4">
          {verificationTasks.map((task) => (
            <Card key={task.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-gray-900">{task.pdfName}</h4>
                    <Badge variant="secondary">{task.slrCode}</Badge>
                  </div>
                  
                  {task.status === 'verified' && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified - No issues found</span>
                    </div>
                  )}
                  
                  {task.status === 'needs-review' && (
                    <div className="flex items-center gap-2 text-sm text-amber-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{task.issues} issues require attention</span>
                    </div>
                  )}
                  
                  {task.status === 'pending' && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Info className="w-4 h-4" />
                      <span>Verification pending</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  {task.quality !== null && (
                    <div className="text-sm">
                      <span className="text-gray-500">Quality: </span>
                      <span className="text-gray-900">{task.quality}%</span>
                    </div>
                  )}
                  {task.lastChecked && (
                    <div className="text-xs text-gray-500">
                      Last checked: {new Date(task.lastChecked).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {task.quality !== null && (
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        task.quality >= 90 ? 'bg-green-600' : 
                        task.quality >= 70 ? 'bg-amber-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${task.quality}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {task.status === 'needs-review' && (
                <div className="p-4 bg-amber-50 rounded-lg mb-4">
                  <p className="text-sm text-amber-900 mb-2">Issues Found:</p>
                  <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
                    <li>Potential OCR misread in row 15</li>
                    <li>Missing student name in row 23</li>
                  </ul>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {task.status === 'needs-review' && (
                  <>
                    <Button size="sm" variant="default">
                      Review Issues
                    </Button>
                    <Button size="sm" variant="outline">
                      Mark as Verified
                    </Button>
                  </>
                )}
                {task.status === 'pending' && (
                  <Button size="sm">
                    Start Verification
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>*/}
    </div>
  );
}
