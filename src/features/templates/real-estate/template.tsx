import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function RealEstateTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const visibleSections = sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const sidebarSections = visibleSections.filter(
    (s) => s.type === "certifications" || s.type === "skills" || s.type === "education" || s.type === "languages"
  );
  const mainSections = visibleSections.filter(
    (s) => s.type !== "certifications" && s.type !== "skills" && s.type !== "education" && s.type !== "languages"
  );

  return (
    <div
      dir={dir}
      className="flex h-full text-[10px]"
      style={{
        padding: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Left Sidebar */}
      <div className={`w-2/5 ${isRTL ? "pl-4" : "pr-4"}`}>
        <div className="mb-4">
          <h1
            className="font-bold text-lg leading-tight mb-0.5"
            style={{ color: settings.primaryColor }}
          >
            {personalInfo.firstName}
            <br />
            {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-2">{personalInfo.title}</p>
          )}
        </div>

        <div className="mb-4 space-y-1.5">
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
          {personalInfo.website && (
            <div className="text-[9px] text-gray-700 break-all">{personalInfo.website}</div>
          )}
        </div>

        {sidebarSections.map((section) => (
          <div key={section.id} className="mb-3">
            <h2
              className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {settings.showDividers && <div className="h-px bg-gray-300 mb-1.5" />}

            {section.type === "certifications" ? (
              <div className="space-y-1.5">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-1.5 rounded text-[10px]"
                    style={{
                      backgroundColor: `${settings.primaryColor}10`,
                      borderLeft: `3px solid ${settings.primaryColor}`,
                    }}
                  >
                    <div className="font-semibold text-gray-800">{item.title}</div>
                    {item.subtitle && (
                      <div className="text-[9px] text-gray-600">{item.subtitle}</div>
                    )}
                    {item.startDate && (
                      <div className="text-[9px] text-gray-500">
                        {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : section.type === "skills" ? (
              <div className="flex flex-wrap gap-1">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 text-[9px] rounded"
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
                    {item.location && (
                      <div className="text-[9px] text-gray-500">{item.location}</div>
                    )}
                    {item.startDate && (
                      <div className="text-[9px] text-gray-500">
                        {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Content */}
      <div className={`flex-1 ${isRTL ? "pr-4" : "pl-4"}`}>
        {personalInfo.summary && (
          <div className="mb-3">
            <h2
              className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" ? "خلاصه حرفه‌ای" : "Professional Summary"}
            </h2>
            {settings.showDividers && <div className="h-px bg-gray-300 mb-1.5" />}
            <p className="text-[10px] text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {mainSections.map((section) => (
          <div key={section.id} className="mb-3">
            <h2
              className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {settings.showDividers && <div className="h-px bg-gray-300 mb-1.5" />}

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
          </div>
        ))}
      </div>
    </div>
  );
}
