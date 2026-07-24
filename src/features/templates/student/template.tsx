import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function StudentTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const visibleSections = sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const educationSection = visibleSections.find((s) => s.type === "education");
  const projectsSection = visibleSections.find((s) => s.type === "projects");
  const skillsSection = visibleSections.find((s) => s.type === "skills");
  const otherSections = visibleSections.filter(
    (s) => s.type !== "education" && s.type !== "projects" && s.type !== "skills"
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
        className="text-center mb-3 pb-3"
        style={{
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
          <p className="text-[10px] text-gray-600 mb-2">{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[9px] text-gray-500">
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
        <div className="mb-3">
          <p className="text-[10px] text-gray-700 leading-relaxed text-center italic">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Education - Prominent */}
      {educationSection && (
        <div className="mb-3">
          <h2
            className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
            style={{ color: settings.primaryColor }}
          >
            {resume.language === "fa" && educationSection.titleFa ? educationSection.titleFa : educationSection.title}
          </h2>
          {settings.showDividers && <div className="h-px bg-gray-300 mb-1.5" />}
          <div className="space-y-2">
            {educationSection.items.map((item) => (
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
      )}

      {/* Projects with tags */}
      {projectsSection && (
        <div className="mb-3">
          <h2
            className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
            style={{ color: settings.primaryColor }}
          >
            {resume.language === "fa" && projectsSection.titleFa ? projectsSection.titleFa : projectsSection.title}
          </h2>
          {settings.showDividers && <div className="h-px bg-gray-300 mb-1.5" />}
          <div className="space-y-2">
            {projectsSection.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="font-semibold text-[10px]">{item.title}</h3>
                  <span className="text-[9px] text-gray-500 whitespace-nowrap">
                    {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                  </span>
                </div>
                {item.subtitle && (
                  <p className="text-[10px] text-gray-600">{item.subtitle}</p>
                )}
                {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                  <ul className={`list-disc text-[10px] text-gray-700 space-y-0.5 ${isRTL ? "mr-4" : "ml-4"}`}>
                    {item.bullets.filter(Boolean).map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 text-[8px] rounded"
                        style={{
                          backgroundColor: `${settings.primaryColor}15`,
                          color: settings.primaryColor,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills - Tag Cloud */}
      {skillsSection && (
        <div className="mb-3">
          <h2
            className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
            style={{ color: settings.primaryColor }}
          >
            {resume.language === "fa" && skillsSection.titleFa ? skillsSection.titleFa : skillsSection.title}
          </h2>
          {settings.showDividers && <div className="h-px bg-gray-300 mb-1.5" />}
          <div className="flex flex-wrap gap-1.5">
            {skillsSection.items.flatMap((item) => item.tags || []).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[9px] rounded-full"
                style={{
                  backgroundColor: `${settings.primaryColor}20`,
                  color: settings.primaryColor,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Other Sections - Compact */}
      {otherSections.map((section) => (
        <div key={section.id} className="mb-3">
          <h2
            className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
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
  );
}
