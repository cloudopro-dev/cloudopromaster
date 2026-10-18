import React, { useState } from 'react';
import {
  FolderTree,
  File,
  Folder,
  FileCode,
  FileText,
  Plus,
  Upload,
  Download,
  Trash2,
  Edit3,
  Save,
  Check,
  Search,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { FileItem } from '../types/cloud';

interface FileManagerViewProps {
  files: FileItem[];
  onUpdateFileContent: (id: string, content: string) => void;
  onAddFile: (file: FileItem) => void;
  onDeleteFile: (id: string) => void;
}

export const FileManagerView: React.FC<FileManagerViewProps> = ({
  files,
  onUpdateFileContent,
  onAddFile,
  onDeleteFile,
}) => {
  const [currentPath, setCurrentPath] = useState('/var/www/cloudo.biz.id/public_html');
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState<'file' | 'folder'>('file');

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenFile = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath(`${currentPath}/${file.name}`);
      return;
    }
    setActiveFile(file);
    setFileContent(file.content || '');
    setIsSaved(false);
  };

  const handleSaveFile = () => {
    if (!activeFile) return;
    onUpdateFileContent(activeFile.id, fileContent);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName) return;

    const ext = newFileName.includes('.') ? newFileName.split('.').pop() : undefined;
    const newItem: FileItem = {
      id: `file-${Date.now()}`,
      name: newFileName,
      path: `${currentPath}/${newFileName}`,
      type: newFileType,
      sizeBytes: newFileType === 'folder' ? 0 : 256,
      modified: 'Just now',
      permissions: newFileType === 'folder' ? 'drwxr-xr-x (0755)' : '-rw-r--r-- (0644)',
      extension: ext,
      content: newFileType === 'file' ? `# File created in Cloudo Pro Master\n` : undefined,
    };

    onAddFile(newItem);
    setShowNewFileModal(false);
    setNewFileName('');
    if (newFileType === 'file') {
      handleOpenFile(newItem);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <FolderTree className="h-6 w-6 text-cyan-400" />
            File Manager & Web Code Editor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Jelajahi dan edit file konfigurasi, template HTML, Nginx vhost, dan skrip langsung di browser
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewFileModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-4 py-2 text-xs shadow-md shadow-cyan-600/20 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>File / Folder Baru</span>
          </button>
        </div>
      </div>

      {/* Breadcrumbs & Controls */}
      <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300 overflow-x-auto">
          <span className="text-cyan-400 font-bold">Path:</span>
          <span className="p-1 px-2 rounded bg-slate-950 text-cyan-300 border border-slate-800">
            {currentPath}
          </span>
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari file..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Main File Manager Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Browser Table */}
        <div className="lg:col-span-1 glass-card rounded-2xl border border-slate-800 p-4 space-y-2 max-h-[640px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold uppercase text-slate-400">
            <span>Daftar Berkas</span>
            <span>{filteredFiles.length} item</span>
          </div>

          <div className="space-y-1">
            {filteredFiles.map((file) => {
              const isSelected = activeFile?.id === file.id;
              const isFolder = file.type === 'folder';

              return (
                <div
                  key={file.id}
                  onClick={() => handleOpenFile(file)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition text-xs font-mono group ${
                    isSelected
                      ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300'
                      : 'hover:bg-slate-900/80 text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {isFolder ? (
                      <Folder className="h-4 w-4 text-amber-400 shrink-0" />
                    ) : (
                      <FileCode className="h-4 w-4 text-cyan-400 shrink-0" />
                    )}
                    <span className="truncate">{file.name}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-400">
                      {isFolder ? 'dir' : `${file.sizeBytes} B`}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFile(file.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition"
                      title="Hapus file"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col h-[640px]">
          {activeFile ? (
            <>
              {/* Editor Header */}
              <div className="flex items-center justify-between p-3.5 bg-slate-900/90 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <FileCode className="h-4 w-4 text-cyan-400" />
                  <span className="font-bold text-white">{activeFile.name}</span>
                  <span className="text-[10px] text-slate-400">({activeFile.permissions})</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveFile}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs transition shadow-md shadow-cyan-600/20"
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-300" />
                        <span>Tersimpan!</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        <span>Simpan File</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Editor Body */}
              <div className="flex-1 bg-slate-950 p-4 font-mono text-xs overflow-auto">
                <textarea
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  className="w-full h-full bg-transparent text-slate-200 focus:outline-none resize-none font-mono leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Editor Footer */}
              <div className="p-2 bg-slate-900/80 border-t border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between px-4">
                <span>Lines: {fileContent.split('\n').length} | Chars: {fileContent.length}</span>
                <span>UTF-8 • UNIX (LF) • Live Sync cloudo.biz.id</span>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center text-slate-500 space-y-3">
              <FileText className="h-12 w-12 text-slate-700" />
              <p className="text-sm font-semibold text-slate-400">
                Pilih file dari panel sebelah kiri untuk mulai membaca & mengedit kode
              </p>
              <p className="text-xs text-slate-400 max-w-sm">
                Mendukung sintaks HTML, Nginx conf, .env, JSON, JavaScript, PHP, dan Bash script
              </p>
            </div>
          )}
        </div>
      </div>

      {/* New File Modal */}
      {showNewFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Buat File atau Folder Baru</h3>
              <button
                onClick={() => setShowNewFileModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateFile} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Tipe Item:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="radio"
                      name="filetype"
                      checked={newFileType === 'file'}
                      onChange={() => setNewFileType('file')}
                      className="accent-cyan-500"
                    />
                    <span>File Berkas (teks/kode)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="radio"
                      name="filetype"
                      checked={newFileType === 'folder'}
                      onChange={() => setNewFileType('folder')}
                      className="accent-cyan-500"
                    />
                    <span>Direktori Folder</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Nama File / Folder:</label>
                <input
                  type="text"
                  required
                  placeholder={newFileType === 'file' ? 'app.config.js atau style.css' : 'public'}
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewFileModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold transition shadow-md shadow-cyan-600/30"
                >
                  Buat Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
