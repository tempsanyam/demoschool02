import React from 'react';
import { institutionConfig } from '../../config/institutionConfig';

interface SchoolBannerProps {
  schoolName: string;
  hindiName?: string;
  udise: string;
  village: string;
  gramPanchayat?: string;
  block?: string;
  district?: string;
  schoolType?: string;
  principalName?: string;
  principalMobile?: string;
  academicSession?: string;
}

export const SchoolBanner: React.FC<SchoolBannerProps> = ({
  schoolName,
  hindiName,
  udise,
  village,
  gramPanchayat,
  block = institutionConfig.block,
  district = institutionConfig.district,
  schoolType,
  principalName,
  principalMobile,
  academicSession = institutionConfig.academicSession
}) => {
  return (
    <div className="bg-emerald-900 text-white rounded-xl p-4 sm:p-5 shadow-sm border border-emerald-800 mb-6 relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-800/40 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="bg-[#FF7A00] text-white text-xs font-bold px-2.5 py-0.5 rounded shadow-xs">
              यूडाइस: {udise}
            </span>
            {schoolType && (
              <span className="bg-emerald-800 text-emerald-100 text-xs px-2.5 py-0.5 rounded font-medium">
                {schoolType}
              </span>
            )}
            <span className="bg-emerald-950/80 text-emerald-200 text-xs px-2 py-0.5 rounded">
              सत्र {academicSession}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {hindiName || schoolName}
          </h2>
          <p className="text-emerald-200/90 text-sm mt-0.5">
            {schoolName} | संकुल: {institutionConfig.sankulName} | जन शिक्षा केंद्र: {institutionConfig.jskName}
          </p>
        </div>

        <div className="bg-emerald-950/60 backdrop-blur-xs border border-emerald-700/50 rounded-lg p-3 text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-emerald-100">
          <div>
            <span className="text-emerald-400 block text-[11px]">ग्राम / मजरा:</span>
            <span className="font-semibold text-white">{village}</span>
          </div>
          <div>
            <span className="text-emerald-400 block text-[11px]">ग्राम पंचायत:</span>
            <span className="font-semibold text-white">{gramPanchayat || village}</span>
          </div>
          <div>
            <span className="text-emerald-400 block text-[11px]">विकासखंड / जिला:</span>
            <span className="font-semibold text-white">{block}, {district}</span>
          </div>
          {principalName && (
            <div className="col-span-2 sm:col-span-3 pt-1 border-t border-emerald-800/80 mt-1 flex items-center justify-between">
              <div>
                <span className="text-emerald-400 text-[11px]">संस्था प्रधान: </span>
                <span className="font-bold text-white">{principalName}</span>
              </div>
              {principalMobile && (
                <div className="text-emerald-300 text-xs font-mono">
                  📞 {principalMobile}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
