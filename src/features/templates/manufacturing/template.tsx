import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function ManufacturingTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  return (
    <div
      dir={dir}
      className="h-full"
      style={{
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Top Accent Bar */}
      <div className="h-1.5" style={{ backgroundColor: settings.primaryColor }} />

      <div
        style={{
          padding: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
        }}
      >
        {/* Header */}
        <div className="mb-4 pb-3" style={{ borderBottom: settings.showDividers ? `1px solid ${settings.primaryColor}40` : "none" }}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold" style={{ color: settings.primaryColor }}>
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              {personalInfo.title && (
                <p className="text-[10px] text-gray-500 mt-0.5">{personalInfo.title}</p>
              )}
            </div>
            <div className="text-right text-[9px] text-gray-400 space-y-0.5">
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
            </div>
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: settings.primaryColor }}>
              {resume.language === "fa" ? "پروفایل حرفه‌ای" : "Professional Profile"}
            </h2>
            <p className="text-[10px] text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Certifications First (safety credentials prominent) */}
        {sections
          .filter((s) => s.visible && s.type === "certifications")
          .map((section) => (
            <div key={section.id} className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: settings.primaryColor }}>
                {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
              </h2>
              {settings.showDividers && <div className="h-px bg-gray-200 mb-1.5" />}
              <div className="flex flex-wrap gap-1">
                {section.items.map((item) => (
                  <span
                    key={item.id}
                    className="px-2 py-0.5 text-[9px] font-medium rounded-sm"
                    style={{
                      backgroundColor: `${settings.primaryColor}12`,
                      color: settings.primaryColor,
                    }}
                  >
                    {item.title}
                    {item.subtitle && ` — ${item.subtitle}`}
                  </span>
                ))}
              </div>
            </div>
          ))}

        {/* Other Sections */}
        {sections
          .filter((s) => s.visible && s.type !== "certifications")
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div key={section.id} className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color: settings.primaryColor }}>
                {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
              </h2>
              {settings.showDividers && <div className="h-px bg-gray-200 mb-1.5" />}

              {section.type === "skills" ? (
                <div className="flex flex-wrap gap-1">
                  {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 text-[9px] rounded-sm border"
                      style={{
                        borderColor: `${settings.primaryColor}30`,
                        color: settings.primaryColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-start mb-0.5">
                        <div>
                          <h3 className="text-[11px] font-semibold text-gray-800">{item.title}</h3>
                          {item.subtitle && (
                            <p className="text-[10px] text-gray-500">
                              {item.subtitle}
                              {item.location && <span className="ml-1.5">| {item.location}</span>}
                            </p>
                          )}
                        </div>
                        <span className="text-[9px] text-gray-400 whitespace-nowrap">
                          {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                        </span>
                      </div>
                      {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                        <ul className={`text-[10px] text-gray-600 space-y-0.5 ${isRTL ? "mr-3" : "ml-3"} mt-0.5`}>
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
    </div>
  );
}
