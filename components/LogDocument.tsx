import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { StaticInfo, DailyLog } from '@/types/types';

// Styles to match the screenshot
const styles = StyleSheet.create({
    page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica' },
    headerContainer: { textAlign: 'center', marginBottom: 15 },
    headerTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
    headerSub: { fontSize: 11, fontWeight: 'bold' },
    headerItalic: { fontSize: 10, fontStyle: 'italic', marginBottom: 10 },

    sectionTitle: { fontSize: 11, fontWeight: 'bold', marginTop: 10, marginBottom: 5, textTransform: 'uppercase' },

    // Table Styles for Section 1
    table: { display: "flex", flexDirection: "column", borderTop: "1px solid #000", borderLeft: "1px solid #000", marginBottom: 10 },
    tableRow: { flexDirection: "row", borderBottom: "1px solid #000" },
    tableLabel: { width: "30%", padding: 4, fontWeight: 'bold', borderRight: "1px solid #000", backgroundColor: '#f0f0f0' }, // Added light gray for contrast
    tableValue: { width: "70%", padding: 4, borderRight: "1px solid #000" },

    // Daily Report Section
    reportLabel: { fontSize: 10, fontWeight: 'bold', marginTop: 8, marginBottom: 2 },
    reportInstruction: { fontSize: 9, fontStyle: 'italic', color: '#444' },

    // The Green Input Box simulation
    inputBox: {
        border: "1px solid #72bf6a", // Matches the green in screenshot
        height: 40, // Fixed height for standard log, increase if text is long
        padding: 5,
        marginBottom: 2
    },

    // Footer
    footerContainer: { flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' },
    signatureBlock: { width: '30%' },
    stampBlock: { width: '30%', alignItems: 'center' },
    stampBox: { width: 80, height: 80, border: '1px solid #000', marginTop: 5, borderRadius: 8 },
    label: { marginBottom: 30, fontWeight: 'bold' }, // Space for signature
    line: { borderBottom: '1px solid #000', marginTop: 20, marginBottom: 5 }
});

interface LogDocumentProps {
    staticInfo: StaticInfo;
    logs: DailyLog[];
}

const LogDocument: React.FC<LogDocumentProps> = ({ staticInfo, logs }) => (
    <Document>
        {logs.map((log, index) => (
            <Page key={index} size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>MBA Internship: Daily Activity Log</Text>
                    <Text style={styles.headerSub}>Balmiki Lincoln College</Text>
                    <Text style={styles.headerSub}>Birtamode, Jhapa</Text>
                    <Text style={styles.headerItalic}>(Affiliated to Lincoln University, Malaysia)</Text>
                </View>

                <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    <Text style={{ fontWeight: 'bold' }}>Instructions: </Text>
                    Complete this log at the end of each workday and submit as required by your faculty advisor.
                </Text>

                {/* Section 1: Static Data Table */}
                <Text style={styles.sectionTitle}>SECTION 1: STUDENT & PLACEMENT</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>Student Name:</Text>
                        <Text style={styles.tableValue}>{staticInfo.studentName}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>LC Number:</Text>
                        <Text style={styles.tableValue}>{staticInfo.lcNumber}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>Host Organization:</Text>
                        <Text style={styles.tableValue}>{staticInfo.hostOrganization}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>Department:</Text>
                        <Text style={styles.tableValue}>{staticInfo.department}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>On-Site Supervisor:</Text>
                        <Text style={styles.tableValue}>{staticInfo.onSiteSupervisor}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableLabel}>Date (YYYY-MM-DD):</Text>
                        <Text style={styles.tableValue}>{log.date}</Text>
                    </View>
                </View>

                {/* Section 2: Daily Report - Dynamic Content */}
                <Text style={styles.sectionTitle}>DAILY REPORT</Text>
                <Text style={{ fontSize: 9, marginBottom: 5 }}>(Please provide details for each category for today's date.)</Text>

                <Text style={styles.reportLabel}>1. Primary Tasks & Activities Completed <Text style={styles.reportInstruction}>(List the main tasks you worked on.)</Text></Text>
                <View style={styles.inputBox}><Text>{log.tasks}</Text></View>

                <Text style={styles.reportLabel}>2. Key Meetings & Interactions <Text style={styles.reportInstruction}>(Who did you meet with?)</Text></Text>
                <View style={styles.inputBox}><Text>{log.meetings}</Text></View>

                <Text style={styles.reportLabel}>3. Accomplishments / Deliverables <Text style={styles.reportInstruction}>(What tangible outcomes did you produce?)</Text></Text>
                <View style={styles.inputBox}><Text>{log.accomplishments}</Text></View>

                <Text style={styles.reportLabel}>4. Key Learning, Skills Used & Challenges <Text style={styles.reportInstruction}>(New skills, insights?)</Text></Text>
                <View style={styles.inputBox}><Text>{log.learnings}</Text></View>

                <Text style={styles.reportLabel}>5. Plan for Tomorrow <Text style={styles.reportInstruction}>(List top 1-3 priorities.)</Text></Text>
                <View style={styles.inputBox}><Text>{log.planForTomorrow}</Text></View>

                {/* Footer: Signatures */}
                <View style={styles.footerContainer}>
                    <View style={styles.signatureBlock}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>On-Site Supervisor/ Manager</Text>
                        <Text>Signature: ________________</Text>
                        <Text style={{ marginTop: 10 }}>Name: ____________________</Text>
                        <Text style={{ marginTop: 10 }}>Date: _____________________</Text>
                    </View>

                    <View style={styles.stampBlock}>
                        <Text style={{ border: '1px solid #72bf6a', padding: 2, fontSize: 9 }}>Official Stamp</Text>
                        <View style={styles.stampBox}></View>
                    </View>

                    <View style={styles.signatureBlock}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>Faculty Advisor</Text>
                        <Text>Signature: ________________</Text>
                        <Text style={{ marginTop: 10 }}>Name: ____________________</Text>
                        <Text style={{ marginTop: 10 }}>Date: _____________________</Text>
                    </View>
                </View>

            </Page>
        ))}
    </Document>
);

export default LogDocument;