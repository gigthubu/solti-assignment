'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LogDocument from '@/components/LogDocument';
import ExcelUpload from '@/components/ExcelUpload';
import { StaticInfo, DailyLog } from '@/types/types';
import { ParsedExcelData } from '@/utils/excelParser';
import { downloadExcelTemplate } from '@/utils/excelTemplate';

// Dynamic import for the PDF Download link to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <p>Loading PDF Generator...</p> }
);

export default function InternshipLogPage() {
  const [staticData, setStaticData] = useState<StaticInfo | null>(null);
  const [logEntries, setLogEntries] = useState<DailyLog[]>([]);
  const [showPdfGenerator, setShowPdfGenerator] = useState(false);

  const handleDataParsed = (data: ParsedExcelData) => {
    setStaticData(data.staticInfo);
    setLogEntries(data.logs);
    setShowPdfGenerator(true);
  };

  const handleReset = () => {
    setStaticData(null);
    setLogEntries([]);
    setShowPdfGenerator(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            MBA Internship Log Generator
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
            Balmiki Lincoln College - Daily Activity Log System
          </p>
          
          {/* Download Template Button */}
          {!showPdfGenerator && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={downloadExcelTemplate}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md flex items-center justify-center gap-2 font-medium"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Excel Template
              </button>
              <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                Download the template, fill it with your data, then upload below
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        {!showPdfGenerator ? (
          <ExcelUpload onDataParsed={handleDataParsed} />
        ) : (
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
            {/* Success Message */}
            <div className="mb-6 sm:mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg
                  className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-green-800 mb-1">
                    Data Successfully Loaded!
                  </h3>
                  <p className="text-sm text-green-700 mb-2">
                    Student: <span className="font-medium">{staticData?.studentName}</span>
                  </p>
                  <p className="text-sm text-green-700">
                    Found <span className="font-medium">{logEntries.length}</span> daily log{logEntries.length !== 1 ? 's' : ''} - Ready to generate PDF
                  </p>
                </div>
              </div>
            </div>

            {/* Data Preview */}
            <div className="mb-6 sm:mb-8 space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Data Preview</h2>
              
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600">Student Name</p>
                    <p className="text-sm sm:text-base text-gray-900">{staticData?.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600">LC Number</p>
                    <p className="text-sm sm:text-base text-gray-900">{staticData?.lcNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600">Host Organization</p>
                    <p className="text-sm sm:text-base text-gray-900">{staticData?.hostOrganization}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600">Department</p>
                    <p className="text-sm sm:text-base text-gray-900">{staticData?.department}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">Log Dates</p>
                <div className="flex flex-wrap gap-2">
                  {logEntries.map((log, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full"
                    >
                      {log.date}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {staticData && (
                <PDFDownloadLink
                  document={<LogDocument staticInfo={staticData} logs={logEntries} />}
                  fileName={`Internship_Logs_${staticData.studentName.replace(/\s+/g, '_')}.pdf`}
                  className="flex-1"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      <button className="w-full px-6 py-3 sm:py-4 bg-gray-500 text-white rounded-lg cursor-not-allowed font-semibold">
                        Generating Document...
                      </button>
                    ) : (
                      <button className="w-full px-6 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition flex items-center justify-center gap-2">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Download PDF ({logEntries.length} Page{logEntries.length !== 1 ? 's' : ''})
                      </button>
                    )
                  }
                </PDFDownloadLink>
              )}
              
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
              >
                Upload Different File
              </button>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-sm">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              How to Use
            </h3>
            <ol className="text-xs sm:text-sm text-gray-600 space-y-2 text-left max-w-2xl mx-auto">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Download the Excel template using the button above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Fill in your student information and daily logs in the template</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Upload the completed Excel file using the form</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Review the data and download your PDF documents</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}