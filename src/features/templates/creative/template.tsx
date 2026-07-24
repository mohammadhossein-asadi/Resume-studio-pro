import type { Resume } from "@/types/resume";
import { formatDateRange } from "@/lib/utils";

interface TemplateProps {
  resume: Resume;
}

export function CreativeTemplate({ resume }: TemplateProps) {
  const { personalInfo, sections, settings } = resume;
  const dir = resume.language === "fa" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="h-full"
      style={{
        fontSize: `${settings.fontSize}pt`,
        lineHeight: settings.lineHeight,
      }}
    >
      {/* Colorful Header */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.primaryColor}88, transparent)`,
          }}
        />
        <div className="relative p-8">
          <div className="flex items-end gap-4">
            {/* Avatar Circle */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shrink-0"
              style={{ backgroundColor: settings.primaryColor }}
            >
              {personalInfo.firstName[0]}{personalInfo.lastName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              {personalInfo.title && (
                <p className="text-sm font-medium" style={{ color: settings.primaryColor }}>
                  {personalInfo.title}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs text-gray-500">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-4">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-5 p-3 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-700">{personalInfo.summary}</p>
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
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${settings.primaryColor}15` }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: settings.primaryColor }}
                  />
                </div>
                <h2
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: settings.primaryColor }}
                >
                  {resume.language === "fa" && section.titleFa ? section.titleFa : section.title}
                </h2>
              </div>

              {section.type === "skills" ? (
                <div className="flex flex-wrap gap-1.5 ml-8">
                  {section.items.flatMap((item) => item.tags || []).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[10px] rounded-full font-medium"
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
                <div className="space-y-3 ml-8">
                  {section.items.map((item) => (
                    <div key={item.id} className="relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-sm text-gray-900">{item.title}</h3>
                          {item.subtitle && (
                            <p className="text-xs text-gray-500">{item.subtitle}</p>
                          )}
                        </div>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${settings.primaryColor}10`,
                            color: settings.primaryColor,
                          }}
                        >
                          {formatDateRange(item.startDate, item.endDate, item.current, resume.language === "fa" ? "fa" : "en")}
                        </span>
                      </div>
                      {item.bullets.length > 0 && item.bullets.some((b) => b) && (
                        <ul className="text-xs text-gray-600 space-y-0.5 mt-1">
                          {item.bullets.filter(Boolean).map((bullet, i) => (
                            <li key={i} className="flex gap-2">
                              <span style={{ color: settings.primaryColor }}>•</span>
                              <span>{bullet}</span>
                            </li>
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
