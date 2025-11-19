import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { FolderNode } from "../types";
import { getFolderTree } from "../services/api";

interface FolderExplorerProps {
  onPdfSelect?: (pdfId: string) => void;
  selectedPdfId?: string;
}

export function FolderExplorer({
  onPdfSelect,
  selectedPdfId,
}: FolderExplorerProps) {
  const [rootFolder, setRootFolder] = useState<FolderNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["root"])
  );

  // Load tree from backend
  useEffect(() => {
    const fetchTree = async () => {
      try {
        const tree = await getFolderTree();
        console.log("TREE DATA:", tree);

        // Safety check – React will crash if children is missing or null
        if (!tree || typeof tree !== "object") {
          console.error("Invalid tree structure:", tree);
          return;
        }

        setRootFolder(tree);
      } catch (err) {
        console.error("Error fetching folder tree:", err);
      }
    };

    fetchTree();
  }, []);

  // Show loading spinner while waiting
  if (!rootFolder) {
    return (
      <div className="p-4 text-gray-500 text-sm">
        Loading folder structure…
      </div>
    );
  }

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const updated = new Set(prev);
      updated.has(folderId) ? updated.delete(folderId) : updated.add(folderId);
      return updated;
    });
  };

  const countPdfs = (node: FolderNode): number => {
    if (node.type === "pdf") return 1;
    if (!Array.isArray(node.children)) return 0;

    return node.children.reduce((sum, child) => sum + countPdfs(child), 0);
  };

  const renderNode = (node: FolderNode, depth = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = node.type === "pdf" && node.pdfId === selectedPdfId;

    return (
      <div key={node.id}>
        <div
          onClick={() => {
            if (node.type === "folder") toggleFolder(node.id);
            else if (node.type === "pdf") onPdfSelect?.(node.pdfId!);
          }}
          className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors
            ${
              isSelected
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          style={{ paddingLeft: depth * 16 + 12 }}
        >
          {node.type === "folder" ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}

              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-blue-500" />
              ) : (
                <Folder className="w-4 h-4 text-blue-500" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" />
              <FileText className="w-4 h-4 text-gray-400" />
            </>
          )}

          <span className="text-sm flex-1 truncate">{node.name}</span>

          {node.type === "folder" && countPdfs(node) > 0 && (
            <Badge variant="secondary" className="text-xs">
              {countPdfs(node)}
            </Badge>
          )}
        </div>

        {/* CHILDREN */}
        {node.type === "folder" &&
          isExpanded &&
          Array.isArray(node.children) &&
          node.children.length > 0 && (
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

      {renderNode(rootFolder)}
    </div>
  );
}
