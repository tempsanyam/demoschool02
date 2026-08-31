import React from 'react';
import { RefreshCw, ShieldCheck, Phone, MapPin, School, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { institutionConfig } from '../../config/institutionConfig';

interface FooterProps {
  onNavigate?: (viewId: string) => void;
  onOpenHelp?: () => void;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenHelp }) => {
  const { currentUser } = useAuth();
  const { settings, schools } = useData();

  const activeSession = settings?.academicSession || institutionConfig.academicSession;

  const handleLinkClick = (viewId: string) => {
    if (onNavigate) {
      onNavigate(viewId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#FFFFFF] dark:bg-[#101815] text-[#17211C] dark:text-[#FFFFFF] border-t border-[#DDE7E2] dark:border-[#1E2D27] text-xs no-print transition-colors mt-auto shadow-inner overflow-hidden">
      {/* Mobile-first Responsive Grid Section: 1 col on mobile, 2 cols on tablet (sm/md), 4 cols on desktop (lg/xl) */}
      <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 py-6 sm:py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        
        {/* Section 1: Institution Info */}
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B6B4B] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              🏛️
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-[#0B6B4B] dark:text-emerald-400 text-sm leading-tight break-words">
                {institutionConfig.institutionName}
              </h3>
              <p className="text-[10px] text-gray-500 dark:text-[#B8C8C1] truncate">
                {institutionConfig.subtitle}
              </p>
            </div>
          </div>

          <div className="text-[11px] text-gray-600 dark:text-[#B8C8C1] space-y-1.5 break-words">
            <p className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0B6B4B] shrink-0 mt-0.5" />
              <span>
                विकास खंड — <strong>{institutionConfig.block}</strong><br />
                जिला — <strong>{institutionConfig.district}</strong>, {institutionConfig.state} ({institutionConfig.pinCode})
              </span>
            </p>
            <div className="pt-1.5 space-y-1 border-t border-gray-100 dark:border-gray-800">
              <p className="flex flex-wrap items-center gap-1">
                <span>सी.ए.सी. :</span>
                <strong className="text-gray-900 dark:text-white font-bold">{institutionConfig.cac1.name}</strong>
                <span className="text-gray-500 dark:text-gray-400 text-[10px]">({institutionConfig.cac1.mobile} • WA: {institutionConfig.cac1.whatsapp})</span>
              </p>
              <p className="flex flex-wrap items-center gap-1">
                <span>सी.ए.सी. :</span>
                <strong className="text-gray-900 dark:text-white font-bold">{institutionConfig.cac2.name}</strong>
                <span className="text-gray-500 dark:text-gray-400 text-[10px]">({institutionConfig.cac2.mobile} • WA: {institutionConfig.cac2.whatsapp})</span>
              </p>
            </div>
            <p>
              डाइज कोड: <strong className="font-mono text-gray-900 dark:text-white">{institutionConfig.diseCode}</strong>
            </p>
            <p>
              कुल संकुल विद्यालय: <strong className="text-[#0B6B4B] dark:text-emerald-400">{schools.length || institutionConfig.totalSchoolsCount} शालाएं</strong>
            </p>
          </div>
        </div>

        {/* Section 2: Important Links */}
        <div className="min-w-0">
          <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2.5 sm:mb-3 border-b border-gray-100 dark:border-gray-800 pb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0B6B4B]"></span>
            महत्वपूर्ण लिंक
          </h4>
          <ul className="space-y-1.5 text-[11px] text-gray-600 dark:text-[#B8C8C1]">
            <li>
              <button onClick={() => handleLinkClick('dashboard')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 01. मुख्य डैशबोर्ड (Dashboard)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('schools')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 03. शाला मास्टर डेटा (School Data)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('students')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 04. विद्यार्थी पंजी (Students)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('teachers')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 05. शिक्षक व स्टाफ (Teachers & Staff)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('attendance')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 06. दैनिक उपस्थिति (Attendance)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('facilities')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 07. भौतिक सुविधाएं (Physical Facilities)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('mdm')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 08. मध्याह्न भोजन (MDM)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('reports')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 17. रिपोर्ट्स केंद्र (Reports)
              </button>
            </li>
          </ul>
        </div>

        {/* Section 3: Help & System Management */}
        <div className="min-w-0">
          <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2.5 sm:mb-3 border-b border-gray-100 dark:border-gray-800 pb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]"></span>
            सहायता / सिस्टम
          </h4>
          <ul className="space-y-1.5 text-[11px] text-gray-600 dark:text-[#B8C8C1]">
            <li>
              <button onClick={() => handleLinkClick('notifications')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 11. सूचनाएं व शासकीय आदेश
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('complaints')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 12. शिकायत निवारण प्रणाली
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('documents')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 13. दस्तावेज व प्रपत्र भंडार
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('export')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 14. प्रिंट एवं निर्यात केंद्र
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('history')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 16. इतिहास व ऑडिट लॉग्स
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('profile')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 18. उपयोगकर्ता प्रोफ़ाइल
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('settings')} className="hover:text-[#0B6B4B] dark:hover:text-emerald-400 transition-colors text-left truncate max-w-full block">
                • 19. सिस्टम सेटिंग्स
              </button>
            </li>
          </ul>
        </div>

        {/* Section 4: Current User & System Status */}
        <div className="space-y-3 min-w-0">
          <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[11px] mb-2.5 sm:mb-3 border-b border-gray-100 dark:border-gray-800 pb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            सक्रिय उपयोगकर्ता
          </h4>

          <div className="bg-[#F8FAF8] dark:bg-[#16221D] p-3 rounded-xl border border-[#DDE7E2] dark:border-[#213028] space-y-1.5">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
              लॉगिन उपयोगकर्ता (Logged In)
            </div>
            <div className="font-extrabold text-sm text-gray-900 dark:text-white truncate">
              {currentUser?.name || institutionConfig.cac1.name}
            </div>
            <div className="text-[11px] text-[#0B6B4B] dark:text-emerald-300 font-semibold truncate">
              {currentUser?.designation || institutionConfig.cac1.role}
            </div>
            <div className="text-[10px] text-gray-500 dark:text-[#B8C8C1] truncate">
              आईडी: {currentUser?.employeeId || 'EMP-CAC-201'}
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 bg-[#EAF6F0] dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800/60">
            <RefreshCw className="w-3 h-3 animate-spin text-[#0B6B4B] dark:text-emerald-400 shrink-0" />
            <span className="truncate">लाइव डेटा सिंक: सक्रिय</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Session Bar */}
      <div className="w-full bg-gray-50 dark:bg-[#0A100E] border-t border-[#DDE7E2] dark:border-[#1E2D27] py-3 px-3.5 sm:px-6">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] text-gray-500 dark:text-[#B8C8C1] text-center sm:text-left">
          <div className="break-words">
            © {institutionConfig.copyrightYear} <strong>{institutionConfig.institutionName}</strong> | विकास खंड {institutionConfig.block}, जिला {institutionConfig.district}, {institutionConfig.state}
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 font-medium shrink-0">
            <span className="text-[#0B6B4B] dark:text-emerald-400 whitespace-nowrap">
              Academic Session: <strong>{activeSession}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="whitespace-nowrap">
              System Version: <strong>{institutionConfig.systemVersion}</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
