import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISummary extends Document {
  userId: string;
  fileName: string;
  pdfText: string;
  summary: string;
  importantPoints: string[];
  answers: string[];
  createdAt: Date;
  updatedAt: Date;
}

const SummarySchema: Schema<ISummary> = new Schema(
  {
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    pdfText: { type: String, required: true },
    summary: { type: String, required: true },
    importantPoints: { type: [String], default: [] },
    answers: { type: [String], default: [] },
  },
  { timestamps: true } // ✅ createdAt & updatedAt included automatically
);

const Summary: Model<ISummary> =
  mongoose.models.Summary || mongoose.model<ISummary>("Summary", SummarySchema);

export default Summary;