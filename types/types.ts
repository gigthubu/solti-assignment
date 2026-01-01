export interface StaticInfo {
  studentName: string;
  lcNumber: string;
  hostOrganization: string;
  department: string;
  onSiteSupervisor: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  tasks: string; // 1. Primary Tasks
  meetings: string; // 2. Key Meetings
  accomplishments: string; // 3. Accomplishments
  learnings: string; // 4. Key Learning
  planForTomorrow: string; // 5. Plan for Tomorrow
}