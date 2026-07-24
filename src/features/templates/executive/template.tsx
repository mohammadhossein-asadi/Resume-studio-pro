import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function ExecutiveTemplate({ resume }: TemplateProps) {
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
      {/* Executive Header */}
      <div
        className="px-8 py-6 text-white"
        style={{ backgroundColor: settings.primaryColor }}
      >
        <h1 className="text-2xl font-bold tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-sm opacity-90 mt-1 font-light">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs opacity-80">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5">
            <p className="text-sm text-gray-700 italic leading-relaxed">
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
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: settings.primaryColor }}
                />
                <h2
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: settings.primaryColor }}
                >
                  {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
                </h2>
              </div>

              {section.type === "skills" ? (
                <div className="flex flex-wrap gap-1.5 ml-3.5">
                  {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 text-[10px] rounded-full border"
                      style={{
                        borderColor: `${settings.primaryColor}40`,
                        color: settings.primaryColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 ml-3.5">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-sm">{item.title}</h3>
                          {item.subtitle && (
                            <p className="text-xs text-gray-600">{item.subtitle}</p>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-500">
                          {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                        </span>
                      </div>
                      {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                        <ul className={`list-disc text-xs text-gray-700 space-y-0.5 ${isRTL ? "mr-4" : "ml-4"} mt-1`}>
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
    </div>
  );
}
