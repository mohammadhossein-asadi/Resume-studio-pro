import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function NonprofitTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const visibleSections = sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const leftSections = visibleSections.filter(
    (s) => s.type === "experience" || s.type === "education" || s.type === "projects" || s.type === "publications" || s.type === "research" || s.type === "awards" || s.type === "custom"
  );
  const rightSections = visibleSections.filter(
    (s) => s.type === "skills" || s.type === "languages" || s.type === "volunteer" || s.type === "certifications" || s.type === "references" || s.type === "patents"
  );

  return (
    <div
      dir={dir}
      className="h-full text-[10px]"
      style={{
        padding: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Header */}
      <div
        className="text-center mb-3 pb-3 rounded-lg"
        style={{
          backgroundColor: `${settings.primaryColor}08`,
          borderBottom: settings.showDividers ? `2px solid ${settings.primaryColor}` : "none",
        }}
      >
        <h1
          className="font-bold text-xl mb-0.5"
          style={{ color: settings.primaryColor }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && (
          <p className="text-[10px] text-gray-600 mb-1.5">{personalInfo.title}</p>
        )}
        {personalInfo.summary && (
          <p className="text-[10px] text-gray-600 italic max-w-md mx-auto leading-relaxed">
            {personalInfo.summary}
          </p>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-4 mt-3">
        {/* Left - Main Content */}
        <div className="flex-[2]">
          {leftSections.map((section) => (
            <div key={section.id} className="mb-3">
              <h2
                className="text-[10px] font-bold uppercase tracking-wider mb-1.5 pb-1"
                style={{
                  color: settings.primaryColor,
                  borderBottom: `2px solid ${settings.primaryColor}30`,
                }}
              >
                {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
              </h2>

              {section.type === "skills" ? (
                <div className="flex flex-wrap gap-1">
                  {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 text-[9px] rounded-full"
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
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-start mb-0.5">
                        <h3 className="font-semibold text-[10px]">{item.title}</h3>
                        <span className="text-[9px] text-gray-500 whitespace-nowrap">
                          {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                        </span>
                      </div>
                      {item.subtitle && (
                        <p className="text-[10px] text-gray-600">
                          {item.subtitle}
                          {item.location && ` | ${item.location}`}
                        </p>
                      )}
                      {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                        <ul className={`list-disc text-[10px] text-gray-700 space-y-0.5 ${isRTL ? "mr-4" : "ml-4"}`}>
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

        {/* Right - Sidebar */}
        <div className="flex-1">
          {/* Contact Info */}
          <div className="mb-3 p-2 rounded-lg" style={{ backgroundColor: `${settings.primaryColor}08` }}>
            <h2
              className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" ? "تماس" : "Contact"}
            </h2>
            <div className="space-y-1">
              {personalInfo.email && (
                <div className="text-[9px] text-gray-700 break-all">{personalInfo.email}</div>
              )}
              {personalInfo.phone && (
                <div className="text-[9px] text-gray-700">{personalInfo.phone}</div>
              )}
              {personalInfo.location && (
                <div className="text-[9px] text-gray-700">{personalInfo.location}</div>
              )}
              {personalInfo.linkedin && (
                <div className="text-[9px] text-gray-700 break-all">{personalInfo.linkedin}</div>
              )}
              {personalInfo.github && (
                <div className="text-[9px] text-gray-700 break-all">{personalInfo.github}</div>
              )}
              {personalInfo.website && (
                <div className="text-[9px] text-gray-700 break-all">{personalInfo.website}</div>
              )}
            </div>
          </div>

          {rightSections.map((section) => (
            <div key={section.id} className="mb-3">
              <h2
                className="text-[10px] font-bold uppercase tracking-wider mb-1.5 pb-1"
                style={{
                  color: settings.primaryColor,
                  borderBottom: `2px solid ${settings.primaryColor}30`,
                }}
              >
                {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
              </h2>

              {section.type === "skills" ? (
                <div className="flex flex-wrap gap-1">
                  {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 text-[9px] rounded-full"
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
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <div key={item.id} className="text-[10px]">
                      <div className="font-medium text-gray-800">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-[9px] text-gray-600">{item.subtitle}</div>
                      )}
                      {item.startDate && (
                        <div className="text-[9px] text-gray-500">
                          {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                        </div>
                      )}
                      {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                        <ul className={`list-disc text-[9px] text-gray-700 space-y-0.5 ${isRTL ? "mr-3" : "ml-3"}`}>
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
    </div>
  );
}
