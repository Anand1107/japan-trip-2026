'use client';

import { useState, useEffect, useRef } from 'react';
import { upload } from '@vercel/blob/client';

type BlobFile = {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
};

export default function DocumentsSection() {
  const [files, setFiles] = useState<BlobFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasBlobToken = process.env.NEXT_PUBLIC_HAS_BLOB === 'true';

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const res = await fetch('/api/documents');
      if (res.ok) {
        const data = await res.json();
        setFiles(data.blobs ?? []);
      }
    } catch {
      // silently fail — blob may not be configured
    }
  }

  async function handleUpload(fileList: FileList | null) {
    if (!fileList?.length) return;
    setUploading(true);
    setError(null);

    try {
      for (const file of Array.from(fileList)) {
        const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/heic'];
        if (!allowed.includes(file.type) && !file.name.endsWith('.heic')) {
          setError(`${file.name}: only PDF, JPG, PNG, HEIC files allowed`);
          continue;
        }
        if (file.size > 10 * 1024 * 1024) {
          setError(`${file.name}: file too large (max 10 MB)`);
          continue;
        }
        await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });
      }
      await fetchFiles();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function getFileIcon(pathname: string) {
    if (pathname.endsWith('.pdf')) return '📄';
    if (pathname.match(/\.(jpg|jpeg|heic|png)$/i)) return '🖼️';
    return '📎';
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-serif font-semibold text-stone-800 mb-1">Travel Documents</h2>
        <p className="text-sm text-stone-500">Upload booking confirmations, insurance, passports scans & itineraries</p>
      </div>

      {!hasBlobToken && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <p className="font-semibold mb-1">⚠️ Blob storage not configured</p>
          <p>Add <code className="bg-amber-100 px-1 rounded">BLOB_READ_WRITE_TOKEN</code> in your Vercel project settings under Storage → Blob, then redeploy.</p>
        </div>
      )}

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleUpload(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragging ? 'border-osaka bg-red-50' : 'border-stone-300 hover:border-stone-400 bg-stone-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.heic"
          onChange={(e) => handleUpload(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-osaka border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-stone-500">Uploading…</span>
          </div>
        ) : (
          <>
            <div className="text-3xl mb-2">📤</div>
            <p className="text-sm font-medium text-stone-700">Drop files here or click to select</p>
            <p className="text-xs text-stone-400 mt-1">PDF, JPG, PNG, HEIC — max 10 MB</p>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wide">Uploaded Files</h3>
          {files.map((file) => (
            <div key={file.url} className="card flex items-center gap-3">
              <span className="text-2xl flex-shrink-0">{getFileIcon(file.pathname)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-800 truncate">{file.pathname.replace('japan-trip/', '')}</p>
                <p className="text-xs text-stone-400">{formatSize(file.size)} · {formatDate(file.uploadedAt)}</p>
              </div>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors flex-shrink-0"
              >
                Open
              </a>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && !uploading && (
        <div className="text-center py-8 text-stone-400">
          <p className="text-3xl mb-2">🗂️</p>
          <p className="text-sm">No documents yet. Upload your booking confirmations!</p>
        </div>
      )}
    </div>
  );
}
