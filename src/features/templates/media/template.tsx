import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function MediaTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const sidebarSections = sections
    .filter((s) => s.visible)
    .filter((s) => s.type === "skills" || s.type === "education" || s.type === "languages");
  const mainSections = sections
    .filter((s) => s.visible)
    .filter((s) => s.type !== "skills" && s.type !== "education" && s.type !== "languages")
    .sort((a, b) => a.order - b.order);

  return (
    <div
      dir={dir}
      className="h-full flex"
      style={{
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Left Dark Sidebar */}
      <div
        className="w-2/5 text-white shrink-0"
        style={{
          backgroundColor: "#1a1a1a",
          padding: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
        }}
      >
        {/* Name */}
        <div className="mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h1 className="text-lg font-bold tracking-wide mb-0.5">
            {personalInfo.firstName}
          </h1>
          <h1 className="text-lg font-bold tracking-wide mb-1">
            {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-[10px] opacity-60 uppercase tracking-[0.2em]">{personalInfo.title}</p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-5">
          <h2 className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2 opacity-50">
            {resume.language === "fa" ? "تماس" : "Contact"}
          </h2>
          <div className="space-y-1.5 text-[10px] opacity-70">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.linkedin && <p className="truncate">{personalInfo.linkedin}</p>}
            {personalInfo.website && <p className="truncate">{personalInfo.website}</p>}
          </div>
        </div>

        {/* Sidebar Sections */}
        {sidebarSections.map((section) => (
          <div key={section.id} className="mb-4">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2 opacity-50">
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {section.type === "skills" ? (
              <div className="flex flex-wrap gap-1">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 text-[9px] rounded-sm opacity-80"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <p className="text-[10px] font-medium opacity-90">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-[9px] opacity-50">{item.subtitle}</p>
                    )}
                    <p className="text-[9px] opacity-40">
                      {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Main Content */}
      <div
        className="w-3/5"
        style={{
          padding: `${settings.margins.top}px ${settings.margins.right}px ${settings.margins.bottom}px ${settings.margins.left}px`,
        }}
      >
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5">
            <h2
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" ? "پروفایل" : "Profile"}
            </h2>
            {settings.showDividers && (
              <div className="h-px mb-2" style={{ backgroundColor: `${settings.primaryColor}30` }} />
            )}
            <p className="text-[10px] text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Main Sections */}
        {mainSections.map((section) => (
          <div key={section.id} className="mb-5">
            <h2
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
            </h2>
            {settings.showDividers && (
              <div className="h-px mb-2" style={{ backgroundColor: `${settings.primaryColor}30` }} />
            )}

            {section.type === "skills" ? (
              <div className="flex flex-wrap gap-1">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 text-[9px] rounded-sm"
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
                          <li key={i}>▸ {bullet}</li>
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
