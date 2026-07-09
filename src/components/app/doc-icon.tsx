import { FileText, FileType2, FileCode } from "lucide-react";

export function DocIcon({ type, className = "h-4 w-4" }: { type: string; className?: string }) {
  if (type === "DOCX") return <FileType2 className={className} />;
  if (type === "TXT") return <FileCode className={className} />;
  return <FileText className={className} />;
}
