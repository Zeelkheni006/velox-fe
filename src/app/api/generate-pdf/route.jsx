// app/api/generate-pdf/route.js
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // Important for enabling fs and node libs

export async function POST(req) {
  try {
    const { leads } = await req.json();

    if (!leads || !Array.isArray(leads)) {
      return NextResponse.json({ error: "Invalid leads data" }, { status: 400 });
    }

    // ✅ Font loading
    const fontPath = path.resolve("public/fonts/Roboto-Regular.ttf");

    if (!fs.existsSync(fontPath)) {
      return NextResponse.json({ error: "Font not found" }, { status: 500 });
    }

    const fontData = fs.readFileSync(fontPath);

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("error", (err) => {
      console.error("PDF Error:", err);
    });

    const pdfBuffer = await new Promise((resolve, reject) => {
      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });
      doc.on("error", reject);

      doc.registerFont("Roboto", fontData);
      doc.font("Roboto");
        doc.fontSize(18).text("Leads Report", { align: "center" }).moveDown();


      leads.forEach((lead, index) => {
        doc
          .font("Roboto")
          .fontSize(12)
          .text(
            `${index + 1}. ${lead.name} | ${lead.email} | ${lead.mobile} | ${lead.skill} | ${lead.city}, ${lead.state}, ${lead.country} | Status: ${lead.status}`
          )
          .moveDown(0.5);
      });

      doc.end();
    });

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="leads.pdf"',
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
