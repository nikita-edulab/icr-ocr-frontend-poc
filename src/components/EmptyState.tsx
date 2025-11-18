import { FileText, FolderOpen, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  type: 'no-pdfs' | 'ocr-not-run' | 'folder-empty';
}

export function EmptyState({ type }: EmptyStateProps) {
  const configs = {
    'no-pdfs': {
      icon: FileText,
      title: 'No PDFs Found',
      description: 'No PDF documents match your current filters',
      action: 'Clear Filters',
    },
    'ocr-not-run': {
      icon: AlertCircle,
      title: 'OCR Not Run',
      description: 'OCR processing has not been executed on this document yet',
      action: 'Run OCR',
    },
    'folder-empty': {
      icon: FolderOpen,
      title: 'Folder Empty',
      description: 'This folder does not contain any documents',
      action: null,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-gray-900 mb-2">{config.title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{config.description}</p>
      {config.action && (
        <Button variant="outline">{config.action}</Button>
      )}
    </div>
  );
}
