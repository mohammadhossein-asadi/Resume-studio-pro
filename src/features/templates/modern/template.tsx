import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function ModernTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  return (
    <div dir={dir} className="h-full flex">
      {/* Left Sidebar */}
      <div
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: settings.primaryColor }}
      >
        {/* Name */}
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-1">
            {personalInfo.firstName}
          </h1>
          <h1 className="text-xl font-bold">
            {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <p className="text-sm opacity-90 mt-1">{personalInfo.title}</p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
            {resume.language === "fa" ? "تماس" : "Contact"}
          </h2>
          <div className="space-y-1.5 text-xs opacity-90">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
            {personalInfo.github && <p>{personalInfo.github}</p>}
          </div>
        </div>

        {/* Skills */}
        {sections
          .filter((s) => s.type === "skills" && s.visible)
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
              </h2>
              <div className="flex flex-wrap gap-1">
                {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] rounded bg-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

        {/* Languages */}
        {sections
          .filter((s) => s.type === "languages" && s.visible)
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
                {resume.language === "fa" ? "زبان‌ها" : "Languages"}
              </h2>
              <div className="space-y-1 text-xs opacity-90">
                {section.items.map((item) => (
                  <p key={item.id}>{item.title}</p>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6" style={{ fontSize: `${settings.fontSize}pt`, lineHeight: settings.lineHeight }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5">
            <h2
              className="text-sm font-bold uppercase tracking-wider mb-2"
              style={{ color: settings.primaryColor }}
            >
              {resume.language === "fa" ? "پروفایل" : "Profile"}
            </h2>
            {settings.showDividers && (
              <div className="h-0.5 mb-2" style={{ backgroundColor: settings.primaryColor }} />
            )}
            <p className="text-xs text-gray-700">{personalInfo.summary}</p>
          </div>
        )}

        {/* Sections (excluding skills and languages) */}
        {sections
          .filter((s) => s.visible && s.type !== "skills" && s.type !== "languages")
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <div key={section.id} className="mb-5">
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: settings.primaryColor }}
              >
                {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
              </h2>
              {settings.showDividers && (
                <div className="h-0.5 mb-2" style={{ backgroundColor: settings.primaryColor }} />
              )}

              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                        {item.subtitle && (
                          <p className="text-xs text-gray-600">{item.subtitle}</p>
                        )}
                        {item.location && (
                          <p className="text-[10px] text-gray-500">{item.location}</p>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap">
                        {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                      </span>
                    </div>
                    {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                      <ul className={`list-disc text-xs text-gray-700 space-y-0.5 ${isRTL ? "mr-4" : "ml-4"}`}>
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
