import React, { useState } from 'react';
import {
  Printer,
  FileSpreadsheet,
  FileText,
  Download,
  Building2,
  Users,
  GraduationCap,
  Utensils,
  ClipboardList,
  AlertCircle,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { exportToExcel, exportToCSV, generateQuickPDF, triggerSystemPrint } from '../../utils/exportUtils';
import { institutionConfig } from '../../config/institutionConfig';

export const ExportCenterView: React.FC = () => {
  const { currentUser } = useAuth();
  const {
    schools,
    students,
    staff,
    facilities,
    attendance,
    mdmRecords,
    governmentWork,
    complaints
  } = useData();

  const [selectedUdise, setSelectedUdise] = useState<string>('ALL');
  const [selectedSession, setSelectedSession] = useState<string>('2026-27');

  const activeSchool = schools.find((s) => s.udise === selectedUdise);

  // 1. Export Schools Directory
  const exportSchoolsDirectory = (format: 'EXCEL' | 'CSV' | 'PRINT') => {
    const headers = [
      'क्र.',
      'यूडाइस कोड',
      'विद्यालय का नाम (School Name)',
      'श्रेणी/प्रकार',
      'ग्राम / मजरा',
      'ग्राम पंचायत',
      'संस्था प्रधान',
      'मोबाइल'
    ];
    const rows = schools.map((s, idx) => [
      idx + 1,
      s.udise,
      s.name || s.hindiName,
      s.schoolType,
      s.village,
      s.gramPanchayat,
      s.principalName,
      s.principalMobile
    ]);

    const payload = {
      title: `${institutionConfig.institutionName} (${institutionConfig.diseCode}) - 37 शासकीय शालाओं की संपूर्ण निर्देशिका`,
      subtitle: `सत्र ${selectedSession} | विकासखंड: ${institutionConfig.block} | जिला: ${institutionConfig.district} (म.प्र.)`,
      headers,
      rows,
      fileName: 'Malguwa_37_Schools_Directory',
    };

    if (format === 'EXCEL') exportToExcel(payload);
    else if (format === 'CSV') exportToCSV(payload);
    else generateQuickPDF(payload);
  };

  // 2. Export Students Roster
  const exportStudentsRoster = (format: 'EXCEL' | 'CSV' | 'PRINT') => {
    const list = selectedUdise === 'ALL' ? students : students.filter((st) => st.schoolUdise === selectedUdise);
    const headers = ['क्र.', 'समग्र आईडी', 'छात्र का नाम', 'पिता का नाम', 'यूडाइस', 'कक्षा', 'लिंग', 'सामाजिक वर्ग', 'CWSN'];
    const rows = list.map((st, idx) => [
      idx + 1,
      st.samagraId,
      st.name,
      st.fatherName,
      st.schoolUdise,
      `कक्षा ${st.class}`,
      st.gender,
      st.category,
      st.isCwsn ? 'हाँ' : 'नहीं'
    ]);

    const payload = {
      title: 'जन शिक्षा केंद्र मलगुवां - विद्यार्थी नामांकन एवं जातिगत रोस्टर',
      subtitle: `शाला: ${selectedUdise === 'ALL' ? 'समस्त 37 विद्यालय' : activeSchool?.hindiName} | सत्र: ${selectedSession} | कुल: ${list.length}`,
      schoolName: activeSchool?.hindiName,
      udise: selectedUdise === 'ALL' ? '230801 (संकुल)' : selectedUdise,
      headers,
      rows,
      fileName: `Students_Roster_${selectedUdise}`,
    };

    if (format === 'EXCEL') exportToExcel(payload);
    else if (format === 'CSV') exportToCSV(payload);
    else generateQuickPDF(payload);
  };

  // 3. Export Staff Roster
  const exportStaffRoster = (format: 'EXCEL' | 'CSV' | 'PRINT') => {
    const list = selectedUdise === 'ALL' ? staff : staff.filter((stf) => stf.assignedSchoolUdise === selectedUdise);
    const headers = ['क्र.', 'कर्मचारी कोड', 'नाम', 'पदनाम', 'मुख्य विषय', 'पदस्थ विद्यालय यूडाइस', 'मोबाइल', 'योग्यता', 'स्थिति'];
    const rows = list.map((stf, idx) => [
      idx + 1,
      stf.employeeId || stf.employeeCode || '-',
      stf.name,
      stf.designation,
      stf.subject,
      stf.assignedSchoolUdise,
      stf.mobile,
      stf.qualification || '-',
      stf.status
    ]);

    const payload = {
      title: 'जन शिक्षा केंद्र मलगुवां - शिक्षक एवं स्टाफ पदस्थापना विवरण',
      subtitle: `सत्र: ${selectedSession} | कुल पदस्थ संख्या: ${list.length}`,
      headers,
      rows,
      fileName: `Staff_Roster_${selectedUdise}`,
    };

    if (format === 'EXCEL') exportToExcel(payload);
    else if (format === 'CSV') exportToCSV(payload);
    else generateQuickPDF(payload);
  };

  // 4. Export Infrastructure Checklist & Deficit
  const exportFacilitiesReport = (format: 'EXCEL' | 'CSV' | 'PRINT') => {
    const list = selectedUdise === 'ALL' ? facilities : facilities.filter((f) => f.schoolUdise === selectedUdise);
    const headers = ['क्र.', 'यूडाइस कोड', 'सुविधा का नाम', 'उपलब्धता स्थिति (YES/NO/Data Not Entered)', 'टिप्पणी'];
    const rows = list.map((f, idx) => [
      idx + 1,
      f.schoolUdise,
      f.facilityName,
      f.available === 'YES' ? 'उपलब्ध (YES)' : f.available === 'NO' ? 'अनुपलब्ध (NO)' : 'Data Not Entered (अपूर्ण)',
      f.remarks || '-'
    ]);

    const payload = {
      title: 'जन शिक्षा केंद्र मलगुवां - 16-सूत्रीय भौतिक अधोसंरचना एवं डेफिसिट रिपोर्ट',
      subtitle: `सत्र ${selectedSession} | विद्यालय: ${selectedUdise === 'ALL' ? 'समस्त संकुल' : (activeSchool?.name || activeSchool?.hindiName)}`,
      headers,
      rows,
      fileName: `Facilities_Report_${selectedUdise}`,
    };

    if (format === 'EXCEL') exportToExcel(payload);
    else if (format === 'CSV') exportToCSV(payload);
    else generateQuickPDF(payload);
  };

  // 5. Export MDM & Attendance
  const exportMDMReport = (format: 'EXCEL' | 'CSV' | 'PRINT') => {
    const list = selectedUdise === 'ALL' ? mdmRecords : mdmRecords.filter((m) => m.schoolUdise === selectedUdise);
    const headers = ['क्र.', 'दिनांक', 'यूडाइस', 'दैनिक मीनू', 'पात्र संख्या', 'लाभान्वित छात्र', 'गुणवत्ता', 'निरीक्षक'];
    const rows = list.map((m, idx) => [
      idx + 1,
      m.date,
      m.schoolUdise,
      m.menuItem,
      m.eligibleStudents,
      m.mealsServed,
      m.foodQuality,
      m.inspectedBy
    ]);

    const payload = {
      title: 'जन शिक्षा केंद्र मलगुवां - मध्याह्न भोजन (MDM) वितरण रजिस्टर',
      subtitle: `सत्र: ${selectedSession} | कुल प्रविष्टियां: ${list.length}`,
      headers,
      rows,
      fileName: `MDM_Report_${selectedUdise}`,
    };

    if (format === 'EXCEL') exportToExcel(payload);
    else if (format === 'CSV') exportToCSV(payload);
    else generateQuickPDF(payload);
  };

  const reportCards = [
    {
      id: 'schools',
      title: '1. संपूर्ण संकुल 37 विद्यालय विवरणिका',
      desc: 'सभी 37 प्राथमिक व माध्यमिक शालाओं के यूडाइस, संस्था प्रधान, मोबाइल, श्रेणी का आधिकारिक रोस्टर',
      icon: Building2,
      action: exportSchoolsDirectory,
    },
    {
      id: 'students',
      title: '2. विद्यार्थी नामांकन व सामाजिक वर्ग रोस्टर',
      desc: '9-अंकीय समग्र आईडी, लिंग, जाति वर्ग (SC/ST/OBC/GEN), CWSN व कक्षावार पूर्ण सूची',
      icon: GraduationCap,
      action: exportStudentsRoster,
    },
    {
      id: 'staff',
      title: '3. शिक्षक एवं स्टाफ पदस्थापना विवरण',
      desc: 'कर्मचारी कोड, पदनाम, विषय, मोबाइल, योग्यता व पदस्थ शाला की अधिकृत सूची',
      icon: Users,
      action: exportStaffRoster,
    },
    {
      id: 'facilities',
      title: '4. 16-सूत्रीय भौतिक अधोसंरचना व डेफिसिट रिपोर्ट',
      desc: 'पेयजल, शौचालय, विद्युत, बाउंड्रीवाल, खेल मैदान, रैम्प, स्मार्ट क्लास आदि का सत्यापन प्रपत्र',
      icon: ShieldCheck,
      action: exportFacilitiesReport,
    },
    {
      id: 'mdm',
      title: '5. मध्याह्न भोजन (MDM) व उपस्थिति रजिस्टर',
      desc: 'दैनिक भोजन मीनू, पात्र छात्र, लाभान्वित संख्या एवं भोजन गुणवत्ता निरीक्षण अभिलेख',
      icon: Utensils,
      action: exportMDMReport,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#17211C] p-6 rounded-2xl border border-[#DDE7E2] dark:border-[#2B3933] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-[#0B6B4B] dark:text-emerald-300 rounded-xl">
            <Printer className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              सार्वभौमिक प्रिंट एवं डेटा निर्यात केंद्र (Universal Print & Export Center)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              राज्य शिक्षा केंद्र / समग्र शिक्षा अभियान के मानकों अनुसार ए-4 प्रिंटेबल एवं एक्सेल/सीएसवी प्रारूप में डेटा निर्यात
            </p>
          </div>
        </div>
      </div>

      {/* Global Configuration Bar */}
      <div className="bg-white dark:bg-[#17211C] p-4 rounded-xl border border-[#DDE7E2] dark:border-[#2B3933] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              विद्यालय का चयन (Filter by School):
            </label>
            <select
              value={selectedUdise}
              onChange={(e) => setSelectedUdise(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-[#0F1713] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-bold min-w-72"
            >
              <option value="ALL">★ संपूर्ण संकुल (सभी 37 विद्यालय संकलित)</option>
              {schools.map((s) => (
                <option key={s.udise} value={s.udise}>
                  {s.name || s.hindiName} ({s.udise})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              शैक्षणिक सत्र (Academic Session):
            </label>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-[#0F1713] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-bold"
            >
              <option value="2026-27">सत्र 2026-27 (वर्तमान)</option>
              <option value="2025-26">सत्र 2025-26</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerSystemPrint()}
            className="px-4 py-2 bg-[#0B6B4B] hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>स्क्रीन प्रिंट (Direct Print)</span>
          </button>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportCards.map((rc) => {
          const Icon = rc.icon;
          return (
            <div
              key={rc.id}
              className="bg-white dark:bg-[#17211C] p-5 rounded-2xl border border-[#DDE7E2] dark:border-[#2B3933] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-[#0B6B4B] dark:text-emerald-400 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {rc.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {rc.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <button
                  onClick={() => rc.action('EXCEL')}
                  className="flex-1 py-2 bg-emerald-50 dark:bg-emerald-950 text-[#0B6B4B] dark:text-emerald-300 rounded-lg text-xs font-bold border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 flex items-center justify-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>एक्सेल (Excel)</span>
                </button>
                <button
                  onClick={() => rc.action('CSV')}
                  className="flex-1 py-2 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-700 hover:bg-gray-100 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => rc.action('PRINT')}
                  className="flex-1 py-2 bg-[#0B6B4B] hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>A4 प्रिंट</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
