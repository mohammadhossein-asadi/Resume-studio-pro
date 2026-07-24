import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function ResearchTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const visibleSections = sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const sidebarSections = visibleSections.filter(
    (s) => s.type === "education" || s.type === "skills" || s.type === "languages"
  );
  const mainSections = visibleSections.filter(
    (s) => s.type !== "education" && s.type !== "skills" && s.type !== "languages"
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
      <div className={`w-1/3 ${isRTL ? "pl-3" : "pr-3"}`}>
        <div className="mb-4">
          <h1
            className="font-serif font-bold text-base leading-tight mb-1"
            style={{ color: settings.primaryColor }}
          >
            {personalInfo.firstName}
            <br />
            {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-[9px] italic text-gray-600 mb-2">{personalInfo.title}</p>
          )}

          <div className="space-y-1 mt-2">
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

        {sidebarSections.map((section) => (
          <div key={section.id} className="mb-3">
            <h2
              className="font-serif text-[10px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {settings.showDividers && <div className="h-px bg-gray-300 mb-1.5" />}

            {section.type === "skills" ? (
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
            ) : section.type === "education" ? (
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id} className="text-[10px]">
                    <div className="font-semibold">{item.title}</div>
                    {item.subtitle && (
                      <div className="text-gray-600 italic">{item.subtitle}</div>
                    )}
                    {item.location && (
                      <div className="text-gray-500">{item.location}</div>
                    )}
                    <div className="text-[9px] text-gray-500">
                      {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {section.items.map((item) => (
                  <div key={item.id} className="text-[10px] text-gray-700">
                    <span className="font-medium">{item.title}</span>
                    {item.subtitle && <span className="text-gray-500"> - {item.subtitle}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Content */}
      <div className={`flex-1 ${isRTL ? "pr-3" : "pl-3"}`}>
        {personalInfo.summary && (
          <div className="mb-3">
            <h2
              className="font-serif text-[10px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" ? "خلاصه" : "Summary"}
            </h2>
            {settings.showDividers && <div className="h-px bg-gray-300 mb-1.5" />}
            <p className="text-[10px] text-gray-700 italic leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {mainSections.map((section) => (
          <div key={section.id} className="mb-3">
            <h2
              className="font-serif text-[10px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {settings.showDividers && <div className="h-px bg-gray-300 mb-1.5" />}

            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.id}>
                  {section.type === "publications" || section.type === "research" ? (
                    <div className="text-[10px] text-gray-700 pl-3" style={{ textIndent: "-3px" }}>
                      <span className="font-medium">{item.title}</span>
                      {item.subtitle && <span className="italic"> {item.subtitle}</span>}
                      {item.location && <span className="text-gray-500">. {item.location}</span>}
                      <span className="text-gray-500">
                        {" "}({formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")})
                      </span>
                    </div>
                  ) : (
                    <>
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
                    </>
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
