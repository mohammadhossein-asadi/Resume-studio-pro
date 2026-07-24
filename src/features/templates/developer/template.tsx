import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function DeveloperTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="h-full font-mono"
      style={{
        padding: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Header */}
      <div className="mb-5 pb-3 border-b-2 border-gray-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-400">$</span>
          <h1 className="text-lg font-bold text-gray-900">
            {personalInfo.firstName}_{personalInfo.lastName}
          </h1>
        </div>
        {personalInfo.title && (
          <p className="text-xs text-gray-500 ml-5">// {personalInfo.title}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 ml-5 text-[10px] text-gray-400">
          {personalInfo.email && <span>email: {personalInfo.email}</span>}
          {personalInfo.phone && <span>tel: {personalInfo.phone}</span>}
          {personalInfo.location && <span>loc: {personalInfo.location}</span>}
          {personalInfo.github && <span>gh: {personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5">
          <p className="text-xs text-gray-600">
            <span className="text-gray-400">/**</span>
            <br />
            <span className="text-gray-400"> * </span>
            {personalInfo.summary}
            <br />
            <span className="text-gray-400"> */</span>
          </p>
        </div>
      )}

      {/* Skills - Prominent */}
      {sections
        .filter((s) => s.type === "skills" && s.visible)
        .map((section) => (
          <div key={section.id} className="mb-5">
            <h2 className="text-xs font-bold text-gray-400 mb-2">
              // {resume.language === "fa" ? "فناوری‌ها" : "TECH_STACK"}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] rounded bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

      {/* Other Sections */}
      {sections
        .filter((s) => s.visible && s.type !== "skills")
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <div key={section.id} className="mb-5">
            <h2 className="text-xs font-bold text-gray-400 mb-2">
              // {(resume.language === "fa" && section.titleFa ? section.titleFa : section.title).toUpperCase().replace(/\s+/g, "_")}
            </h2>

            <div className="space-y-3">
              {section.items.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xs text-gray-900">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-[10px] text-gray-500">@ {item.subtitle}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                    </span>
                  </div>
                  {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                    <ul className="text-[11px] text-gray-600 space-y-0.5 ml-3 mt-1">
                      {item.bullets.filter(Boolean).map((bullet, i) => (
                        <li key={i} className="flex gap-1.5">
                          <span className="text-gray-300">{'>'}</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
