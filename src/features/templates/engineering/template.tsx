import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function EngineeringTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const visibleSections = sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const sidebarSections = visibleSections.filter((s) => s.type === "skills" || s.type === "languages");
  const mainSections = visibleSections.filter((s) => s.type !== "skills" && s.type !== "languages");

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
      <div
        className={`w-2/5 ${isRTL ? "pl-4" : "pr-4"}`}
        style={{ backgroundColor: `${settings.primaryColor}0D` }}
      >
        <div className="mb-4">
          <h1
            className="font-bold text-lg leading-tight mb-1"
            style={{ color: settings.primaryColor }}
          >
            {personalInfo.firstName}
            <br />
            {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-[10px] text-gray-600 uppercase tracking-wider">{personalInfo.title}</p>
          )}
        </div>

        <div className="mb-4 space-y-1.5">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-700">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: settings.primaryColor }} />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-700">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: settings.primaryColor }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-700">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: settings.primaryColor }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-700">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: settings.primaryColor }} />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-700">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: settings.primaryColor }} />
              <span className="break-all">{personalInfo.github}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-700">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: settings.primaryColor }} />
              <span className="break-all">{personalInfo.website}</span>
            </div>
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
            {section.type === "skills" ? (
              <div className="flex flex-wrap gap-1">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 text-[9px] font-mono rounded"
                    style={{
                      backgroundColor: `${settings.primaryColor}20`,
                      color: settings.primaryColor,
                    }}
                  >
                    {tag}
                  </span>
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
      <div className={`flex-1 ${isRTL ? "pr-4" : "pl-4"}`}>
        {personalInfo.summary && (
          <div className="mb-3">
            <h2
              className="text-[10px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" ? "خلاصه حرفه‌ای" : "Summary"}
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

            {section.type === "skills" ? (
              <div className="flex flex-wrap gap-1">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 text-[9px] font-mono rounded"
                    style={{
                      backgroundColor: `${settings.primaryColor}20`,
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
    </div>
  );
}
