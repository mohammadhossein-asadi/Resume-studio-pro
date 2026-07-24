import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function ClassicTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  return (
    <div
      dir={dir}
      className="p-8 h-full"
      style={{
        padding: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Header */}
      <div className="text-center mb-4" style={{ borderBottom: settings.showDividers ? `2px solid ${settings.primaryColor}` : "none", paddingBottom: settings.showDividers ? "12px" : "0" }}>
        <h1 className="font-bold text-2xl mb-1" style={{ color: settings.primaryColor }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-sm text-gray-600 mb-2">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-2"
            style={{ color: settings.primaryColor }}
          >
            {resume.language === "fa" ? "خلاصه حرفه‌ای" : "Professional Summary"}
          </h2>
          {settings.showDividers && (
            <div className="h-px bg-gray-300 mb-2" />
          )}
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Sections */}
      {sections
        .filter((s) => s.visible)
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div key={section.id} className="mb-4">
            <h2
              className="text-sm font-bold uppercase tracking-wider mb-2"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {settings.showDividers && (
              <div className="h-px bg-gray-300 mb-2" />
            )}

            {section.type === "skills" ? (
              <div className="flex flex-wrap gap-1.5">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-xs rounded"
                    style={{
                      backgroundColor: `${settings.primaryColor}15`,
                      color: settings.primaryColor,
                    }}
                  >
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
                        {item.subtitle && (
                          <p className="text-xs text-gray-600">
                            {item.subtitle}
                            {item.location && ` | ${item.location}`}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                      </span>
                    </div>
                    {item.bullets.length > 0 && item.bullets.some((b) => b) && (
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
