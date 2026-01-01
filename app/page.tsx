'use client';

import dynamic from 'next/dynamic';
import LogDocument from '@/components/LogDocument';
import { StaticInfo, DailyLog } from '@/types/types';

// Dynamic import for the PDF Download link to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <p>Loading PDF Generator...</p> }
);

export default function InternshipLogPage() {
  // 1. Static Configuration
  const staticData: StaticInfo = {
    studentName: "John Doe",
    lcNumber: "LC-2024-889",
    hostOrganization: "Tech Corp Nepal",
    department: "Software Development",
    onSiteSupervisor: "Mr. Ram Sharma"
  };

  // 2. Dynamic Logs Array (This will create 2 pages in the PDF)
  const logEntries: DailyLog[] = [
    {
      date: "2025-01-01",
      tasks: "Setup Next.js environment and installed dependencies.",
      meetings: "Daily Standup with QA team regarding unit tests.",
      accomplishments: "Completed the initial repository setup.",
      learnings: "Learned about Docker containerization for Next.js.",
      planForTomorrow: "Begin coding the authentication module."
    },
    {
      date: "2025-01-02",
      tasks: "Implemented Login and Register API routes.",
      meetings: "Client meeting to discuss UI theme colors.",
      accomplishments: "Fixed JWT token issue in backend.",
      learnings: "Deep dive into NextAuth.js callbacks.",
      planForTomorrow: "Connect database to the dashboard."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-8">Internship Log Generator</h1>

      <PDFDownloadLink
        document={<LogDocument staticInfo={staticData} logs={logEntries} />}
        fileName={`Internship_Logs_${staticData.studentName.replace(' ', '_')}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <button className="px-6 py-3 bg-gray-500 text-white rounded cursor-not-allowed">
              Generating Document...
            </button>
          ) : (
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded shadow-lg transition">
              Download PDF ({logEntries.length} Pages)
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}