import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function MinimalTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="p-10 h-full"
      style={{
        padding: `${settings.margins.top + 20}px ${settings.margins.right + 20}px ${settings.margins.bottom + 20}px ${settings.margins.left + 20}px`,
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight + 0.2,
      }}
    >
      {/* Header - Minimal */}
      <div className="mb-8">
        <h1 className="text-3xl font-light tracking-tight text-gray-900">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-sm text-gray-500 mt-1 tracking-wide">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Sections */}
      {sections
        .filter((s) => s.visible)
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div key={section.id} className="mb-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>

            {section.type === "skills" ? (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium text-sm text-gray-900">{item.title}</h3>
                      <span className="text-[10px] text-gray-400">
                        {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                      </span>
                    </div>
                    {item.subtitle && (
                      <p className="text-xs text-gray-500">{item.subtitle}</p>
                    )}
                    {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                      <ul className="mt-1 space-y-0.5">
                        {item.bullets.filter(Boolean).map((bullet, i) => (
                          <li key={i} className="text-xs text-gray-600 flex gap-2">
                            <span className="text-gray-300">-</span>
                            <span>{bullet}</span>
                          </li>
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
