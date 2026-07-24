import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function InternationalTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  return (
    <div dir={dir} className="h-full p-8" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* International CV style - photo placeholder area */}
      <div className="flex gap-6 mb-6 pb-4 border-b border-gray-200">
        <div className="w-20 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs shrink-0">
          {resume.language === "fa" ? "عکس" : "Photo"}
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">{personalInfo.firstName} {personalInfo.lastName}</h1>
          {personalInfo.title && <p className="text-sm text-gray-600 mb-2">{personalInfo.title}</p>}
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-500">
            {personalInfo.email && <span>{resume.language === "fa" ? "ایمیل: " : "Email: "}{personalInfo.email}</span>}
            {personalInfo.phone && <span>{resume.language === "fa" ? "تلفن: " : "Phone: "}{personalInfo.phone}</span>}
            {personalInfo.location && <span>{resume.language === "fa" ? "آدرس: " : "Address: "}{personalInfo.location}</span>}
            {personalInfo.nationality && <span>{resume.language === "fa" ? "ملیت: " : "Nationality: "}{personalInfo.nationality}</span>}
            {personalInfo.dateOfBirth && <span>{resume.language === "fa" ? "تاریخ تولد: " : "Date of Birth: "}{personalInfo.dateOfBirth}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: settings.primaryColor }}>
            {resume.language === "fa" ? "بیانیه شخصی" : "Personal Statement"}
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Sections */}
      {sections
        .filter((s) => s.visible)
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div key={section.id} className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: settings.primaryColor }}>
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {section.type === "skills" ? (
              <div className="flex flex-wrap gap-1">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 text-xs rounded" style={{ backgroundColor: `${settings.primaryColor}15`, color: settings.primaryColor }}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      {item.subtitle && <p className="text-xs text-gray-600">{item.subtitle}</p>}
                    </div>
                    <span className="text-[10px] text-gray-500">
                      {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                    </span>
                  </div>
                  {item.bullets.filter(Boolean).length > 0 && (
                    <ul className={`list-disc text-xs text-gray-700 space-y-0.5 ${isRTL ? "mr-4" : "ml-4"}`}>
                      {item.bullets.filter(Boolean).map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            )}
          </div>
        ))}
    </div>
  );
}
