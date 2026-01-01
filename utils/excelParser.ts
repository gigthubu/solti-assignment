import * as XLSX from 'xlsx';
import { StaticInfo, DailyLog } from '@/types/types';

export interface ParsedExcelData {
  staticInfo: StaticInfo;
  logs: DailyLog[];
}

/**
 * Parses an uploaded Excel file and extracts the data
 * @param file - The Excel file to parse
 * @returns Promise with parsed data in the correct format
 */
export async function parseExcelFile(file: File): Promise<ParsedExcelData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });

        // Parse Sheet 1: Static Information
        const staticSheetName = workbook.SheetNames[0];
        const staticSheet = workbook.Sheets[staticSheetName];
        const staticData = XLSX.utils.sheet_to_json(staticSheet, { header: 1 }) as any[][];

        // Extract static info (starting from row 3, which is index 2)
        const staticInfo: StaticInfo = {
          studentName: staticData[3]?.[1] || '',
          lcNumber: staticData[4]?.[1] || '',
          hostOrganization: staticData[5]?.[1] || '',
          department: staticData[6]?.[1] || '',
          onSiteSupervisor: staticData[7]?.[1] || '',
        };

        // Parse Sheet 2: Daily Logs
        const logsSheetName = workbook.SheetNames[1];
        const logsSheet = workbook.Sheets[logsSheetName];
        const logsData = XLSX.utils.sheet_to_json(logsSheet, { header: 1 }) as any[][];

        // Extract logs (starting from row 5, which is index 4, skip header row 4)
        const logs: DailyLog[] = [];
        for (let i = 4; i < logsData.length; i++) {
          const row = logsData[i];
          
          // Skip empty rows or rows without a date
          if (!row[0] || row[0].toString().trim() === '' || row[0].toString().includes('Add your own')) {
            continue;
          }

          logs.push({
            date: formatDate(row[0]),
            tasks: row[1]?.toString() || '',
            meetings: row[2]?.toString() || '',
            accomplishments: row[3]?.toString() || '',
            learnings: row[4]?.toString() || '',
            planForTomorrow: row[5]?.toString() || '',
          });
        }

        resolve({ staticInfo, logs });
      } catch (error) {
        reject(new Error('Failed to parse Excel file. Please ensure it matches the template format.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Formats date to YYYY-MM-DD string
 */
function formatDate(value: any): string {
  if (!value) return '';
  
  // If it's already a string in correct format
  if (typeof value === 'string') {
    // Check if it's already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }
  }
  
  // If it's an Excel serial number
  if (typeof value === 'number') {
    const date = XLSX.SSF.parse_date_code(value);
    return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
  }
  
  // Try to parse as Date
  try {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch (e) {
    // Fall through
  }
  
  return value.toString();
}

/**
 * Validates the parsed data
 */
export function validateExcelData(data: ParsedExcelData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate static info
  if (!data.staticInfo.studentName) errors.push('Student Name is required');
  if (!data.staticInfo.lcNumber) errors.push('LC Number is required');
  if (!data.staticInfo.hostOrganization) errors.push('Host Organization is required');
  if (!data.staticInfo.department) errors.push('Department is required');
  if (!data.staticInfo.onSiteSupervisor) errors.push('On-Site Supervisor is required');

  // Validate logs
  if (data.logs.length === 0) {
    errors.push('At least one daily log entry is required');
  }

  data.logs.forEach((log, index) => {
    if (!log.date) errors.push(`Log ${index + 1}: Date is required`);
    if (!log.tasks) errors.push(`Log ${index + 1}: Tasks are required`);
  });

  return {
    valid: errors.length === 0,
    errors
  };
}
