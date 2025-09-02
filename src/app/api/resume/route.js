import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import * as mammoth from "mammoth";
import Tesseract from "tesseract.js";

export const runtime = "nodejs"; // ensure Node APIs

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });

    const buf = Buffer.from(await file.arrayBuffer());
    let text = "";

    // Basic MIME checks
    const type = file.type || "";
    if (type === "application/pdf") {
      const res = await pdfParse(buf);      // PDF → text
      text = res.text;
    } else if (
      type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const { value } = await mammoth.extractRawText({ buffer: buf }); // DOCX → text
      text = value;
    } else if (type.startsWith("image/")) {
      const { data } = await Tesseract.recognize(buf, "eng"); // OCR
      text = data.text;
    } else {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
    }

    return NextResponse.json({ ok: true, text });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "parse failed" }, { status: 500 });
  }
}
