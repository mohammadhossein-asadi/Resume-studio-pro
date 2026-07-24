import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function EducationTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const educationSections = sections.filter((s) => s.visible && s.type === "education");
  const otherSections = sections
    .filter((s) => s.visible && s.type !== "education")
    .sort((a, b) => a.order - b.order);

  return (
    <div
      dir={dir}
      className="h-full font-serif"
      style={{
        padding: `${settings.margins.top + 4}px ${settings.margins.right + 20}px ${settings.margins.bottom + 4}px ${settings.margins.left + 20}px`,
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Header */}
      <div className="text-center mb-5 pb-4" style={{ borderBottom: settings.showDividers ? `2px solid ${settings.primaryColor}` : "none" }}>
        <h1 className="text-2xl font-bold mb-0.5" style={{ color: settings.primaryColor }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-xs text-gray-500 tracking-wide">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2 text-[10px] text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: settings.primaryColor }}>
            {resume.language === "fa" ? "علایق تحقیقاتی و خلاصه" : "Research Interests & Summary"}
          </h2>
          {settings.showDividers && <div className="h-px bg-gray-200 mb-2" />}
          <p className="text-[10px] text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Education First (prominent) */}
      {educationSections.map((section) => (
        <div key={section.id} className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: settings.primaryColor }}>
            {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
          </h2>
          {settings.showDividers && <div className="h-px bg-gray-200 mb-2" />}
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-start mb-0.5">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">{item.title}</h3>
                    {item.subtitle && (
                      <p className="text-[10px] text-gray-600 italic">{item.subtitle}</p>
                    )}
                    {item.location && (
                      <p className="text-[10px] text-gray-500">{item.location}</p>
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 whitespace-nowrap">
                    {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                  </span>
                </div>
                {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                  <ul className={`text-[10px] text-gray-600 space-y-0.5 ${isRTL ? "mr-3" : "ml-3"} mt-1`}>
                    {item.bullets.filter(Boolean).map((bullet, i) => (
                      <li key={i}>• {bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Other Sections */}
      {otherSections.map((section) => (
        <div key={section.id} className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: settings.primaryColor }}>
            {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
          </h2>
          {settings.showDividers && <div className="h-px bg-gray-200 mb-2" />}

          {section.type === "skills" ? (
            <div className="flex flex-wrap gap-1.5">
              {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] rounded"
                  style={{
                    backgroundColor: `${settings.primaryColor}10`,
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
                  <div className="flex justify-between items-start mb-0.5">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-800">{item.title}</h3>
                      {item.subtitle && (
                        <p className="text-[10px] text-gray-500">
                          {item.subtitle}
                          {item.location && <span className="ml-2">| {item.location}</span>}
                        </p>
                      )}
                    </div>
                    <span className="text-[9px] text-gray-400 whitespace-nowrap">
                      {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                    </span>
                  </div>
                  {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                    <ul className={`text-[10px] text-gray-600 space-y-0.5 ${isRTL ? "mr-3" : "ml-3"} mt-1`}>
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
