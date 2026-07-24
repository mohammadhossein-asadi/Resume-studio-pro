import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function FinanceTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  return (
    <div dir={dir} className="h-full p-8" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Professional header */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b-2" style={{ borderColor: settings.primaryColor }}>
        <div>
          <h1 className="text-2xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h1>
          {personalInfo.title && <p className="text-sm text-gray-600 mt-1">{personalInfo.title}</p>}
        </div>
        <div className="text-right text-xs text-gray-500 space-y-0.5">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: settings.primaryColor }}>
            {resume.language === "fa" ? "پروفایل" : "Profile"}
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
