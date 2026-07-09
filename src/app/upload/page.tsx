import type { Metadata } from "next";
import { UploadClient } from "./upload-client";

export const metadata: Metadata = {
  title: "Upload",
  description: "Upload and process source documents in DocMind.",
};

export default function UploadPage() {
  return <UploadClient />;
}
