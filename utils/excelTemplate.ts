import * as XLSX from 'xlsx';

export interface ExcelData {
  staticInfo: {
    studentName: string;
    lcNumber: string;
    hostOrganization: string;
    department: string;
    onSiteSupervisor: string;
  };
  logs: {
    date: string;
    tasks: string;
    meetings: string;
    accomplishments: string;
    learnings: string;
    planForTomorrow: string;
  }[];
}

/**
 * Generates a sample Excel template with the correct format
 * Returns a downloadable blob
 */
export function generateExcelTemplate(): Blob {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Sheet 1: Static Information
  const staticData = [
    ['MBA Internship Log - Student Information', ''],
    ['', ''],
    ['Field', 'Value'],
    ['Student Name', 'John Doe'],
    ['LC Number', 'LC-2024-889'],
    ['Host Organization', 'Tech Corp Nepal'],
    ['Department', 'Software Development'],
    ['On-Site Supervisor', 'Mr. Ram Sharma'],
  ];

  const staticSheet = XLSX.utils.aoa_to_sheet(staticData);
  
  // Set column widths
  staticSheet['!cols'] = [
    { wch: 25 },
    { wch: 40 }
  ];

  // Sheet 2: Daily Logs
  const logsData = [
    ['MBA Internship - Daily Activity Logs', '', '', '', '', ''],
    ['Enter one row per day. You can add as many days as needed.', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['Date (YYYY-MM-DD)', 'Primary Tasks & Activities', 'Key Meetings & Interactions', 'Accomplishments / Deliverables', 'Key Learning, Skills & Challenges', 'Plan for Tomorrow'],
    ['2025-01-01', 'Setup Next.js environment and installed dependencies.', 'Daily Standup with QA team regarding unit tests.', 'Completed the initial repository setup.', 'Learned about Docker containerization for Next.js.', 'Begin coding the authentication module.'],
    ['2025-01-02', 'Implemented Login and Register API routes.', 'Client meeting to discuss UI theme colors.', 'Fixed JWT token issue in backend.', 'Deep dive into NextAuth.js callbacks.', 'Connect database to the dashboard.'],
    ['2025-01-03', 'Add your own entries here...', '', '', '', ''],
  ];

  const logsSheet = XLSX.utils.aoa_to_sheet(logsData);
  
  // Set column widths for logs
  logsSheet['!cols'] = [
    { wch: 15 },  // Date
    { wch: 30 },  // Tasks
    { wch: 30 },  // Meetings
    { wch: 30 },  // Accomplishments
    { wch: 30 },  // Learnings
    { wch: 30 }   // Plan for Tomorrow
  ];

  // Add sheets to workbook
  XLSX.utils.book_append_sheet(wb, staticSheet, 'Student Info');
  XLSX.utils.book_append_sheet(wb, logsSheet, 'Daily Logs');

  // Generate buffer
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
  return new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

/**
 * Downloads the Excel template
 */
export function downloadExcelTemplate() {
  const blob = generateExcelTemplate();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Internship_Log_Template.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
