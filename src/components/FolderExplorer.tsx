import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from 'lucide-react';
import { FolderNode } from '../types';
import { Badge } from './ui/badge';

interface FolderExplorerProps {
  rootFolder: FolderNode;
  onPdfSelect?: (pdfId: string) => void;
  selectedPdfId?: string;
}

export function FolderExplorer({ rootFolder, onPdfSelect, selectedPdfId }: FolderExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const countPdfs = (node: FolderNode): number => {
    if (node.type === 'pdf') return 1;
    if (!node.children) return 0;
    return node.children.reduce((sum, child) => sum + countPdfs(child), 0);
  };

  const renderNode = (node: FolderNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = node.type === 'pdf' && node.pdfId === selectedPdfId;
    const pdfCount = node.type === 'folder' ? countPdfs(node) : 0;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
            isSelected 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else if (node.pdfId && onPdfSelect) {
              onPdfSelect(node.pdfId);
            }
          }}
        >
          {node.type === 'folder' && (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 flex-shrink-0 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 flex-shrink-0 text-gray-400" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 flex-shrink-0 text-blue-500" />
              ) : (
                <Folder className="w-4 h-4 flex-shrink-0 text-blue-500" />
              )}
            </>
          )}
          {node.type === 'pdf' && (
            <>
              <div className="w-4 h-4 flex-shrink-0" />
              <FileText className="w-4 h-4 flex-shrink-0 text-gray-400" />
            </>
          )}
          <span className="text-sm flex-1 truncate">{node.name}</span>
          {node.type === 'folder' && pdfCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {pdfCount}
            </Badge>
          )}
        </div>

        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-4">
        <h2 className="text-gray-900 mb-1">Folder Explorer</h2>
        <p className="text-sm text-gray-500">Browse university archives</p>
      </div>
      <div className="space-y-1">
        {renderNode(rootFolder)}
      </div>
    </div>
  );
}
