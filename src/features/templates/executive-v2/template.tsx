import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function ExecutiveTemplateV2({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  return (
    <div dir={dir} className="h-full p-8" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Minimal header */}
      <div className="mb-6">
        <h1 className="text-3xl font-light tracking-tight mb-1">
          {personalInfo.firstName} <span className="font-bold">{personalInfo.lastName}</span>
        </h1>
        {personalInfo.title && (
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-xs text-gray-700 leading-relaxed border-l-2 pl-3" style={{ borderColor: settings.primaryColor }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Sections */}
      {sections
        .filter((s) => s.visible)
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div key={section.id} className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] mb-3 pb-1 border-b" style={{ color: settings.primaryColor, borderColor: settings.primaryColor + "40" }}>
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
