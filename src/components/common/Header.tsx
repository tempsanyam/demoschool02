import React, { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  School as SchoolIcon,
  LogOut,
  User as UserIcon,
  Menu,
  ChevronDown,
  PlusCircle,
  Calendar,
  Printer,
  Phone,
  MessageSquare,
  GraduationCap,
  Users,
  Utensils,
  AlertTriangle,
  Settings,
  X,
  Key,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { institutionConfig } from '../../config/institutionConfig';

interface HeaderProps {
  onOpenGlobalSearch: () => void;
  onOpenMobileSidebar: () => void;
  onNavigate: (viewId: string) => void;
  onOpenLogoutDialog: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGlobalSearch,
  onOpenMobileSidebar,
  onNavigate,
  onOpenLogoutDialog,
}) => {
  const { currentUser } = useAuth();
  const { schools, selectedSchoolUdise, setSelectedSchoolUdise, selectedSchool, notifications, settings } = useData();
  const { theme, toggleTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNewEntryMenu, setShowNewEntryMenu] = useState(false);

  const activeSession = settings?.academicSession || institutionConfig.academicSession;

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onOpenGlobalSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenGlobalSearch]);

  const unreadNotifs = notifications.filter(
    (n) => currentUser && !n.readBy.includes(currentUser.id)
  );

  const canSwitchSchools =
    currentUser?.role === 'CAC' ||
    currentUser?.role === 'ADMIN' ||
    currentUser?.role === 'OPERATOR';

  return (
    <header className="flex flex-col no-print z-40">
      {/* 1. TOP OFFICIAL INSTITUTIONAL HEADER */}
      <div className="bg-[#FFFFFF] dark:bg-[#101815] border-b border-[#DDE7E2] dark:border-[#1E2D27] px-3 sm:px-6 py-2.5 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Left: Emblem & Official Institutional Identity */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-3">
              {/* Sankul Logo / SSA Emblem */}
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-b from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/40 border-2 border-emerald-300 dark:border-emerald-700 flex flex-col items-center justify-center p-1 shadow-sm shrink-0 text-center">
                <span className="text-xl leading-none">🏛️</span>
                <span className="text-[7.5px] font-black text-[#0B6B4B] dark:text-emerald-300 uppercase tracking-tighter mt-0.5">
                  संकुल
                </span>
              </div>

              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#0B6B4B] dark:text-emerald-400 tracking-tight leading-tight">
                  {institutionConfig.institutionName}
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                  विकास खंड {institutionConfig.block} • जिला {institutionConfig.district} • {institutionConfig.state}
                </p>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5">
                  <span>डाइज कोड : <strong className="font-mono text-gray-800 dark:text-gray-200">{institutionConfig.diseCode}</strong></span>
                  <span>•</span>
                  <span>सत्र : <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{activeSession}</strong></span>
                </div>
              </div>
            </div>

            {/* Mobile Actions (Menu Toggle & Session) */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button
                onClick={onOpenMobileSidebar}
                className="p-2 rounded-xl bg-[#0B6B4B] text-white"
                title="मेन्यू"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center/Right: CAC Details & Helpline */}
          <div className="hidden lg:flex items-center gap-2.5 flex-wrap justify-end">
            {/* CAC 1: संजय कुमार जैन */}
            <div className="bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 rounded-xl px-2.5 py-1.5 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2 shadow-2xs">
              <div className="flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>सी.ए.सी.: {institutionConfig.cac1.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <a
                  href={`tel:${institutionConfig.cac1.mobile}`}
                  className="flex items-center gap-0.5 text-blue-700 dark:text-blue-400 hover:underline font-semibold"
                  title="कॉल करें"
                >
                  <Phone className="w-3 h-3" /> {institutionConfig.cac1.mobile}
                </a>
                <span className="text-amber-300 dark:text-amber-700">|</span>
                <a
                  href={`https://wa.me/91${institutionConfig.cac1.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                  title="व्हाट्सएप संदेश भेजें"
                >
                  <MessageSquare className="w-3 h-3" /> व्हाट्सएप: {institutionConfig.cac1.whatsapp}
                </a>
              </div>
            </div>

            {/* CAC 2: सन्मति कुमार जैन */}
            <div className="bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl px-2.5 py-1.5 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2 shadow-2xs">
              <div className="flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>सी.ए.सी.: {institutionConfig.cac2.name}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <a
                  href={`tel:${institutionConfig.cac2.mobile}`}
                  className="flex items-center gap-0.5 text-blue-700 dark:text-blue-400 hover:underline font-semibold"
                  title="कॉल करें"
                >
                  <Phone className="w-3 h-3" /> {institutionConfig.cac2.mobile}
                </a>
                <span className="text-emerald-300 dark:text-emerald-700">|</span>
                <a
                  href={`https://wa.me/91${institutionConfig.cac2.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-0.5 text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                  title="व्हाट्सएप संदेश भेजें"
                >
                  <MessageSquare className="w-3 h-3" /> व्हाट्सएप: {institutionConfig.cac2.whatsapp}
                </a>
              </div>
            </div>

            {/* Sub Padhein Sub Badhein Emblem */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border border-amber-300 dark:border-amber-600 flex flex-col items-center justify-center p-1 shadow-2xs text-center shrink-0">
              <span className="text-sm">✏️</span>
              <span className="text-[6.5px] font-black text-amber-700 dark:text-amber-300 leading-tight">
                सब पढ़ें
              </span>
            </div>
          </div>
        </div>

        {/* 5. HEADER SCHOOL IDENTITY (Detailed Context when individual school is chosen) */}
        {selectedSchool ? (
          <div className="max-w-7xl mx-auto mt-2.5 bg-[#EAF6F0] dark:bg-[#15261F] border border-emerald-400/40 dark:border-emerald-700/60 rounded-xl p-2.5 sm:px-4 sm:py-2 text-xs transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#0B6B4B] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-2xs flex items-center gap-1">
                  <SchoolIcon className="w-3 h-3" />
                  विद्यालय:
                </span>
                <span className="font-extrabold text-gray-900 dark:text-white text-sm">
                  {selectedSchool.hindiName || selectedSchool.name}
                </span>
                <span className="font-mono text-[11px] font-bold bg-white dark:bg-[#101815] text-[#0B6B4B] dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
                  UDISE: {selectedSchool.udise}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedSchoolUdise('')}
                  className="bg-white dark:bg-[#101815] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 border border-red-200 dark:border-red-800 px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <X className="w-3.5 h-3.5" /> समस्त संकुल विद्यालय देखें
                </button>
              </div>
            </div>

            <div className="mt-1.5 pt-1.5 border-t border-emerald-200/60 dark:border-emerald-800/60 grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-gray-700 dark:text-gray-300">
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-[10px] block">ग्राम:</span>
                <strong className="text-gray-900 dark:text-white">{selectedSchool.village}</strong>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-[10px] block">ग्राम पंचायत:</span>
                <strong className="text-gray-900 dark:text-white">{selectedSchool.gramPanchayat || selectedSchool.village}</strong>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-[10px] block">विकास खंड:</span>
                <strong className="text-gray-900 dark:text-white">{institutionConfig.block}</strong>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-[10px] block">जिला:</span>
                <strong className="text-gray-900 dark:text-white">{institutionConfig.district}</strong>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 text-[10px] block">Principal / HM:</span>
                <strong className="text-emerald-700 dark:text-emerald-400 truncate block">
                  {selectedSchool.principalName || 'निर्धारित नहीं'}
                </strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto mt-2 bg-gray-50 dark:bg-[#141E1A] border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>सक्रिय दृश्य: <strong>समस्त मलगुवां संकुल विद्यालय ({schools.length} शालाएं)</strong></span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:inline">
              विकास खंड {institutionConfig.block} • जिला {institutionConfig.district}
            </span>
          </div>
        )}
      </div>

      {/* 2. MAIN GREEN ACTION & NAVIGATION BAR */}
      <div className="sticky top-0 z-40 bg-[#0B6B4B] text-white shadow-md px-3 sm:px-6 py-2 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
          
          {/* Left: Sidebar Toggle & School Selector Context */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="मेन्यू खोलें"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* CAC Panel Quick Button */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#08553B] hover:bg-[#074731] border border-emerald-400/30 text-white text-xs font-bold shadow-xs transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse"></span>
              <span>CAC Panel</span>
            </button>

            {/* School Selector Dropdown */}
            {canSwitchSchools ? (
              <div className="relative">
                <select
                  value={selectedSchoolUdise}
                  onChange={(e) => setSelectedSchoolUdise(e.target.value)}
                  className="bg-[#074731] hover:bg-[#063B29] text-emerald-100 font-semibold text-xs border border-emerald-400/40 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer max-w-[150px] sm:max-w-[220px] md:max-w-[280px] truncate"
                >
                  <option value="">🏫 समस्त {schools.length} संकुल शालाएं</option>
                  {schools.map((s) => (
                    <option key={s.udise} value={s.udise} className="bg-white text-gray-900">
                      {s.hindiName || s.name} ({s.village})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 bg-[#074731] text-emerald-100 text-xs px-2.5 py-1.5 rounded-lg border border-emerald-400/40 font-medium">
                <SchoolIcon className="w-3.5 h-3.5 text-emerald-300" />
                <span className="truncate max-w-[140px]">
                  {selectedSchool?.hindiName || 'मेरा विद्यालय'}
                </span>
              </div>
            )}
          </div>

          {/* Center: Global Search Bar */}
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div
              onClick={onOpenGlobalSearch}
              className="w-full flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg px-3 py-1.5 text-emerald-100 text-xs hover:border-emerald-300 transition-colors cursor-pointer group"
            >
              <Search className="w-3.5 h-3.5 text-emerald-200 group-hover:text-white" />
              <span className="truncate text-emerald-100/90 text-xs">
                खोजें: UDISE, शाला, छात्र, शिक्षक, शिकायत...
              </span>
              <kbd className="ml-auto bg-black/20 border border-white/20 rounded px-1.5 py-0.2 text-[9px] text-emerald-200 font-mono">
                Ctrl + K
              </kbd>
            </div>
          </div>

          {/* Right: Actions, Academic Session, Theme, Notifications & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Mobile Search Button */}
            <button
              onClick={onOpenGlobalSearch}
              className="md:hidden p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              title="खोजें"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Academic Session Pill */}
            <span className="hidden sm:inline-flex items-center gap-1 bg-[#08553B] text-emerald-100 border border-emerald-400/30 text-xs font-bold px-2.5 py-1 rounded-lg">
              <Calendar className="w-3 h-3 text-[#FF7A00]" />
              <span>सत्र: {activeSession}</span>
            </span>

            {/* + New Entry Shortcut Menu */}
            <div className="relative">
              <button
                onClick={() => setShowNewEntryMenu(!showNewEntryMenu)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FF7A00] hover:bg-[#e06c00] text-white text-xs font-bold shadow-xs transition-all"
                title="त्वरित नई प्रविष्टि"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+ नई प्रविष्टि</span>
              </button>

              {showNewEntryMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#16221D] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-1.5 z-50 text-xs text-gray-800 dark:text-gray-200 divide-y divide-gray-100 dark:divide-gray-800">
                  <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    त्वरित प्रविष्टि मेन्यू
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowNewEntryMenu(false);
                        onNavigate('students');
                      }}
                      className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#EAF6F0] dark:hover:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-[#0B6B4B]" />
                      नया विद्यार्थी दर्ज करें
                    </button>
                    <button
                      onClick={() => {
                        setShowNewEntryMenu(false);
                        onNavigate('teachers');
                      }}
                      className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#EAF6F0] dark:hover:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                    >
                      <Users className="w-3.5 h-3.5 text-[#0B6B4B]" />
                      नया शिक्षक / स्टाफ जोड़ें
                    </button>
                    <button
                      onClick={() => {
                        setShowNewEntryMenu(false);
                        onNavigate('attendance');
                      }}
                      className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#EAF6F0] dark:hover:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#0B6B4B]" />
                      दैनिक उपस्थिति भरें
                    </button>
                    <button
                      onClick={() => {
                        setShowNewEntryMenu(false);
                        onNavigate('mdm');
                      }}
                      className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#EAF6F0] dark:hover:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                    >
                      <Utensils className="w-3.5 h-3.5 text-[#FF7A00]" />
                      आज का MDM वितरण
                    </button>
                    <button
                      onClick={() => {
                        setShowNewEntryMenu(false);
                        onNavigate('complaints');
                      }}
                      className="w-full px-3 py-1.5 text-left flex items-center gap-2 hover:bg-[#EAF6F0] dark:hover:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      शिकायत दर्ज करें
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 sm:px-2 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white relative transition-colors"
                title="शासकीय सूचनाएं व आदेश"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF7A00] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-[#0B6B4B]">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#16221D] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 text-xs text-gray-800 dark:text-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                      शासकीय सूचनाएं व आदेश
                    </span>
                    <span className="bg-[#EAF6F0] text-[#0B6B4B] text-[10px] font-bold px-2 py-0.5 rounded">
                      {unreadNotifs.length} नई सूचनाएं
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                    {notifications.slice(0, 5).map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          setShowNotifications(false);
                          onNavigate('notifications');
                        }}
                        className="p-3 hover:bg-[#F8FAF8] dark:hover:bg-[#0F1713] cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                            {notif.title}
                          </span>
                          <span className="text-[10px] text-gray-400 whitespace-nowrap">
                            {notif.date}
                          </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                          {notif.message}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0F1713]/50">
                    <button
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate('notifications');
                      }}
                      className="text-[#0B6B4B] dark:text-emerald-400 font-semibold hover:underline"
                    >
                      सभी सूचनाएं व आदेश देखें →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Theme Toggle (☀️ / 🌙) */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs font-semibold"
              title={theme === 'light' ? 'डार्क थीम चालू करें' : 'लाइट थीम चालू करें'}
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 text-emerald-200" />
                  <span className="hidden sm:inline">🌙 डार्क</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-300" />
                  <span className="hidden sm:inline">☀️ लाइट</span>
                </>
              )}
            </button>

            {/* User Profile Pill & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-lg bg-[#074731] hover:bg-[#063B29] border border-emerald-400/30 text-white transition-colors"
                title="उपयोगकर्ता प्रोफ़ाइल एवं मेन्यू"
              >
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover border border-emerald-300 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#FF7A00] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {currentUser?.name?.charAt(0) || 'स'}
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold leading-tight truncate max-w-[90px]">
                    {currentUser?.name || institutionConfig.cac1.shortName}
                  </div>
                  <div className="text-[9px] text-emerald-200 font-medium leading-none">
                    {currentUser?.role === 'CAC'
                      ? 'CAC'
                      : currentUser?.role === 'PRINCIPAL'
                      ? 'प्रधानाध्यापक'
                      : currentUser?.role === 'TEACHER'
                      ? 'शिक्षक'
                      : 'ऑपरेटर'}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-emerald-300" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-[#16221D] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50 text-xs text-gray-800 dark:text-gray-200 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                    {currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#0B6B4B]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#0B6B4B] text-white flex items-center justify-center font-bold text-sm">
                        {currentUser?.name?.charAt(0) || 'स'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 dark:text-white truncate">
                        {currentUser?.name || institutionConfig.cac1.name}
                      </p>
                      <p className="text-gray-400 text-[11px] truncate">{currentUser?.email || currentUser?.mobile}</p>
                      <span className="mt-1 inline-block bg-[#EAF6F0] dark:bg-emerald-950 text-[#0B6B4B] dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        {currentUser?.designation || institutionConfig.cac1.role}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('profile');
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-[#F8FAF8] dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium"
                    >
                      <UserIcon className="w-4 h-4 text-[#0B6B4B]" />
                      मेरी प्रोफ़ाइल (My Profile)
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('profile');
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-[#F8FAF8] dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      <Key className="w-4 h-4 text-purple-600" />
                      पासवर्ड बदलें (Change Password)
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('profile');
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-[#F8FAF8] dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      <FileText className="w-4 h-4 text-blue-600" />
                      गतिविधियां व लॉग्स (Activity)
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('settings');
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-[#F8FAF8] dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      <Settings className="w-4 h-4 text-[#FF7A00]" />
                      सिस्टम सेटिंग्स (Settings)
                    </button>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-800 pt-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onOpenLogoutDialog();
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      लॉगआउट (Logout)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Logout Button */}
            <button
              onClick={onOpenLogoutDialog}
              className="p-1.5 sm:px-2 sm:py-1.5 rounded-lg bg-red-700/80 hover:bg-red-700 text-white transition-colors text-xs font-bold flex items-center gap-1"
              title="लॉगआउट करें"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">लॉगआउट</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

