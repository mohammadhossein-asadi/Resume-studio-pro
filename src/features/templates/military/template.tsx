import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function MilitaryTemplate({ resume }: TemplateProps) {
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
      {/* Centered Header - Formal */}
      <div className="text-center mb-5 pb-4" style={{ borderBottom: settings.showDividers ? `2px double ${settings.primaryColor}` : "none" }}>
        <h1 className="text-xl font-bold uppercase tracking-widest mb-0.5" style={{ color: settings.primaryColor }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Summary - Leadership-Focused */}
      {personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-center mb-2" style={{ color: settings.primaryColor }}>
            {resume.language === "fa" ? "خلاصه مدیریتی" : "Executive Summary"}
          </h2>
          {settings.showDividers && <div className="h-px bg-gray-300 mb-2" />}
          <p className="text-[10px] text-gray-700 text-center leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Awards First (prominent) */}
      {sections
        .filter((s) => s.visible && s.type === "awards")
        .map((section) => (
          <div key={section.id} className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: settings.primaryColor }}>
              ★ {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {settings.showDividers && <div className="h-px bg-gray-300 mb-2" />}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {section.items.map((item) => (
                <div key={item.id} className="flex items-start gap-1.5">
                  <span className="text-[10px] mt-0.5" style={{ color: settings.primaryColor }}>★</span>
                  <div>
                    <p className="text-[10px] font-medium text-gray-800">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-[9px] text-gray-500">{item.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* Other Sections */}
      {sections
        .filter((s) => s.visible && s.type !== "awards")
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div key={section.id} className="mb-5">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: settings.primaryColor }}>
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {settings.showDividers && <div className="h-px bg-gray-300 mb-2" />}

            {section.type === "skills" ? (
              <div className="flex flex-wrap gap-1.5">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] border rounded-sm"
                    style={{
                      borderColor: settings.primaryColor,
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
                        <h3 className="text-[11px] font-semibold text-gray-800">{item.title}</h3>
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
                      <ul className={`text-[10px] text-gray-600 space-y-0.5 ${isRTL ? "mr-4" : "ml-4"} mt-1`}>
                        {item.bullets.filter(Boolean).map((bullet, i) => (
                          <li key={i}>▪ {bullet}</li>
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
