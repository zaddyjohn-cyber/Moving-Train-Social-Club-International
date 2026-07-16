"use client";

import { useState, useRef } from "react";
import { Upload, X, CheckCircle, Clock, AlertCircle, Image as ImageIcon } from "lucide-react";

type UploadStatus = "idle" | "pending" | "uploading" | "success" | "error";

type PhotoEntry = {
  id: string;
  file: File;
  preview: string;
  caption: string;
  category: string;
  visibility: "public" | "members";
  status: UploadStatus;
  consentChecked: boolean;
};

const CATEGORIES = [
  "International Convention", "Meetings", "Cultural Celebration",
  "Family Event", "Member Milestone", "Birthday", "Wedding",
  "Community Service", "Brotherhood", "Leadership", "Historical Archive", "General",
];

export default function UploadPhotosPage() {
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (files: File[]) => {
    const valid = files.filter((f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type) && f.size <= 10 * 1024 * 1024);
    const entries: PhotoEntry[] = valid.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: URL.createObjectURL(file),
      caption: "",
      category: "General",
      visibility: "members",
      status: "idle",
      consentChecked: false,
    }));
    setPhotos((p) => [...p, ...entries]);
  };

  const update = (id: string, field: keyof PhotoEntry, value: unknown) =>
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  const remove = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (photo) URL.revokeObjectURL(photo.preview);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const submitPhoto = (id: string) => {
    const photo = photos.find((p) => p.id === id);
    if (!photo?.consentChecked) return;
    update(id, "status", "uploading");
    // Demo: simulate upload
    setTimeout(() => update(id, "status", "pending"), 1500);
  };

  const fieldStyle = {
    width: "100%", padding: "0.625rem 0.875rem",
    background: "rgba(5,10,24,0.6)", border: "1px solid rgba(213,165,59,0.15)",
    borderRadius: "6px", color: "var(--ivory)",
    fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "0.875rem",
    outline: "none",
  };

  return (
    <div style={{ paddingTop: "72px", background: "var(--navy)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.875rem" }}>Member Dashboard</p>
        <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", color: "var(--ivory)", marginBottom: "0.5rem" }}>
          Upload Photographs
        </h1>
        <p style={{ color: "var(--steel)", fontSize: "0.9375rem", marginBottom: "3rem" }}>
          Share your photographs with the brotherhood. All uploads require approval before
          they appear publicly or in members-only areas.
        </p>

        {/* Policy notice */}
        <div style={{ background: "rgba(213,165,59,0.04)", border: "1px solid rgba(213,165,59,0.15)", borderRadius: "10px", padding: "1rem 1.5rem", marginBottom: "2.5rem" }}>
          <p style={{ color: "rgba(174,184,198,0.7)", fontSize: "0.8375rem", lineHeight: 1.65, margin: 0, maxWidth: "100%" }}>
            <strong style={{ color: "var(--gold-light)", fontWeight: 600 }}>Photo Policy:</strong> Accepted formats: JPEG, PNG, WebP. Maximum file size: 10MB.
            All uploads enter a pending approval state. Only photographs that respect the privacy and dignity
            of all individuals pictured should be uploaded. Consent of those pictured is your responsibility.
          </p>
        </div>

        {/* Drop zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload photographs — click or drag files here"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(Array.from(e.dataTransfer.files));
          }}
          style={{
            border: `2px dashed ${dragOver ? "rgba(213,165,59,0.6)" : "rgba(213,165,59,0.2)"}`,
            borderRadius: "16px",
            padding: "4rem 2rem",
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "rgba(213,165,59,0.04)" : "rgba(11,26,48,0.4)",
            transition: "all 0.2s ease",
            marginBottom: "3rem",
          }}
        >
          <Upload size={36} style={{ color: dragOver ? "var(--gold)" : "rgba(213,165,59,0.3)", marginBottom: "1rem" }} />
          <p style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1rem", color: "var(--ivory)", marginBottom: "0.5rem" }}>
            Drag photos here, or click to select
          </p>
          <p style={{ color: "rgba(174,184,198,0.4)", fontSize: "0.8rem", margin: 0 }}>
            JPEG, PNG, WebP · Max 10MB each · Multiple files accepted
          </p>
          <input
            ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
            multiple aria-hidden="true"
            style={{ display: "none" }}
            onChange={(e) => addFiles(Array.from(e.target.files ?? []))}
          />
        </div>

        {/* Upload queue */}
        {photos.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "1.125rem", color: "var(--ivory)" }}>
              Upload Queue ({photos.length})
            </h2>
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  background: "rgba(11,26,48,0.8)",
                  border: "1px solid rgba(213,165,59,0.12)",
                  borderRadius: "14px",
                  padding: "1.5rem",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1.5rem", alignItems: "start" }}>
                  {/* Preview */}
                  <div style={{ position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.preview} alt="Preview"
                      style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "10px", border: "1px solid rgba(213,165,59,0.15)" }}
                    />
                    <button
                      type="button" onClick={() => remove(photo.id)}
                      aria-label="Remove photo"
                      style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(0,0,0,0.7)", border: "none", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}
                    >
                      <X size={12} />
                    </button>
                  </div>

                  {/* Fields */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", color: "var(--steel)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {photo.file.name}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "rgba(174,184,198,0.4)", flexShrink: 0 }}>
                        ({(photo.file.size / 1024 / 1024).toFixed(1)}MB)
                      </span>
                    </div>

                    <input type="text" placeholder="Caption (optional)" value={photo.caption}
                      onChange={(e) => update(photo.id, "caption", e.target.value)}
                      style={fieldStyle} />

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <select value={photo.category} onChange={(e) => update(photo.id, "category", e.target.value)} style={fieldStyle}>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <select value={photo.visibility} onChange={(e) => update(photo.id, "visibility", e.target.value as "public" | "members")} style={fieldStyle}>
                        <option value="members">Members Only</option>
                        <option value="public">Public</option>
                      </select>
                    </div>

                    <label style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", cursor: "pointer" }}>
                      <input
                        type="checkbox" checked={photo.consentChecked}
                        onChange={(e) => update(photo.id, "consentChecked", e.target.checked)}
                        style={{ marginTop: "3px", accentColor: "var(--gold)", width: 14, height: 14, flexShrink: 0 }}
                      />
                      <span style={{ fontFamily: "'Manrope', system-ui, sans-serif", fontSize: "0.8rem", color: "var(--steel)", lineHeight: 1.55 }}>
                        I confirm that I have the right to share this photograph and that all individuals
                        depicted have consented to its publication.
                      </span>
                    </label>

                    {/* Status & submit */}
                    {photo.status === "idle" && (
                      <button
                        type="button"
                        disabled={!photo.consentChecked}
                        onClick={() => submitPhoto(photo.id)}
                        className="btn-gold"
                        style={{ opacity: photo.consentChecked ? 1 : 0.4, alignSelf: "flex-start", padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
                      >
                        Submit for Approval
                      </button>
                    )}
                    {photo.status === "uploading" && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--cyan)" }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid var(--cyan)", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem" }}>Uploading…</span>
                      </div>
                    )}
                    {photo.status === "pending" && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--gold)" }}>
                        <Clock size={16} /><span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>Awaiting Approval</span>
                      </div>
                    )}
                    {photo.status === "success" && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4ade80" }}>
                        <CheckCircle size={16} /><span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>Approved & Published</span>
                      </div>
                    )}
                    {photo.status === "error" && (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171" }}>
                        <AlertCircle size={16} /><span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>Upload Failed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @media (max-width: 600px) {
            div[style*="grid-template-columns: 120px"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
}
