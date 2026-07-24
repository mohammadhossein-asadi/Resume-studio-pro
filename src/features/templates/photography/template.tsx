import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function PhotographyTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  return (
    <div
      dir={dir}
      className="h-full"
      style={{
        padding: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Header - Visual Portfolio Style */}
      <div className="text-center mb-6 pb-5" style={{ borderBottom: settings.showDividers ? `1px solid ${settings.primaryColor}30` : "none" }}>
        <h1 className="text-3xl font-light tracking-wide mb-1" style={{ color: settings.primaryColor }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary - Artistic Quote Style */}
      {personalInfo.summary && (
        <div className="mb-6 text-center px-8">
          <p className="text-[11px] text-gray-500 italic leading-relaxed">
            &ldquo;{personalInfo.summary}&rdquo;
          </p>
        </div>
      )}

      {/* Sections */}
      {sections
        .filter((s) => s.visible)
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div key={section.id} className="mb-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1" style={{ backgroundColor: `${settings.primaryColor}20` }} />
              <h2
                className="text-[10px] font-medium uppercase tracking-[0.25em] shrink-0"
                style={{ color: settings.primaryColor }}
              >
                {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
              </h2>
              <div className="h-px flex-1" style={{ backgroundColor: `${settings.primaryColor}20` }} />
            </div>

            {section.type === "skills" ? (
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] tracking-wide"
                    style={{ color: settings.primaryColor }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                        {item.subtitle && (
                          <p className="text-[10px] text-gray-500">
                            {item.subtitle}
                            {item.location && <span className="ml-2">| {item.location}</span>}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">
                        {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                      </span>
                    </div>
                    {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                      <ul className={`text-[10px] text-gray-600 space-y-0.5 ${isRTL ? "mr-4" : "ml-4"}`}>
                        {item.bullets.filter(Boolean).map((bullet, i) => (
                          <li key={i}>• {bullet}</li>
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
