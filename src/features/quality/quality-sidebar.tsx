"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useResumeStore } from "@/store/resume-store";
import { getATSIssues } from "@/features/ats/ats-engine";
import { analyzeWriting } from "@/features/writing/writing-engine";
import { analyzeAchievements, calculateAchievementScore } from "@/features/writing/achievement-engine";
import { analyzeKeywords, getKeywordScore } from "@/features/writing/keyword-optimizer";
import { motion } from "motion/react";
import { AlertTriangle, CheckCircle, Info, AlertCircle, Trophy, Target } from "lucide-react";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setDebounced(value), delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debounced;
}

export function QualitySidebar() {
  const resume = useResumeStore((s) => s.resume);
  const debouncedResume = useDebouncedValue(resume, 300);

  const atsIssues = useMemo(() => getATSIssues(debouncedResume), [debouncedResume]);
  const writingIssues = useMemo(() => analyzeWriting(debouncedResume), [debouncedResume]);
  const achievementSuggestions = useMemo(() => analyzeAchievements(debouncedResume), [debouncedResume]);
  const keywordIssues = useMemo(() => analyzeKeywords(debouncedResume), [debouncedResume]);

  const allIssues = [...atsIssues, ...writingIssues, ...keywordIssues];

  const critical = allIssues.filter((i) => i.severity === "critical");
  const warnings = allIssues.filter((i) => i.severity === "warning");
  const info = allIssues.filter((i) => i.severity === "info");

  const achievementScore = useMemo(() => calculateAchievementScore(debouncedResume), [debouncedResume]);
  const keywordScore = useMemo(() => getKeywordScore(debouncedResume), [debouncedResume]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-3.5 h-3.5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />;
      default:
        return <Info className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800";
      default:
        return "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800";
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-2">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-center"
        >
          <div className="text-lg font-bold text-red-600">{critical.length}</div>
          <div className="text-[10px] text-red-500">Critical</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 text-center"
        >
          <div className="text-lg font-bold text-yellow-600">{warnings.length}</div>
          <div className="text-[10px] text-yellow-500">Warnings</div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-center"
        >
          <div className="text-lg font-bold text-blue-600">{info.length}</div>
          <div className="text-[10px] text-blue-500">Info</div>
        </motion.div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-lg border border-border">
          <div className="flex items-center gap-1.5 mb-1">
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-medium text-muted-foreground">Achievements</span>
          </div>
          <div className="text-lg font-bold" style={{ color: achievementScore >= 70 ? "var(--color-success)" : achievementScore >= 40 ? "var(--color-warning)" : "var(--color-destructive)" }}>
            {achievementScore}%
          </div>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-medium text-muted-foreground">Keywords</span>
          </div>
          <div className="text-lg font-bold" style={{ color: keywordScore >= 70 ? "var(--color-success)" : keywordScore >= 40 ? "var(--color-warning)" : "var(--color-destructive)" }}>
            {keywordScore}%
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="p-3 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium">Overall Quality</span>
          <span
            className={`text-sm font-bold ${
              allIssues.length === 0
                ? "text-green-600"
                : critical.length > 0
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {allIssues.length === 0
              ? "Excellent"
              : critical.length > 0
              ? "Needs Work"
              : "Good"}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: allIssues.length === 0 ? "100%" : critical.length > 0 ? "33%" : "66%",
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-1.5 rounded-full ${
              allIssues.length === 0
                ? "bg-green-500"
                : critical.length > 0
                ? "bg-red-500"
                : "bg-yellow-500"
            }`}
          />
        </div>
      </div>

      {/* Achievement Suggestions */}
      {achievementSuggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            Achievement Suggestions ({achievementSuggestions.length})
          </h4>
          {achievementSuggestions.slice(0, 5).map((suggestion) => (
            <div
              key={suggestion.id}
              className="p-2.5 rounded-lg border border-border bg-card text-xs"
            >
              <div className="text-gray-500 line-through mb-1">{suggestion.originalBullet}</div>
              <div className="text-green-600 dark:text-green-400 font-medium">{suggestion.improvedBullet}</div>
              <div className="text-[10px] text-muted-foreground mt-1">
                Confidence: {Math.round(suggestion.confidence * 100)}%
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Issues List */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Issues ({allIssues.length})
        </h4>

        {allIssues.length === 0 ? (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-green-700 dark:text-green-400">Looking great! No issues found.</span>
          </div>
        ) : (
          allIssues.map((issue) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2.5 rounded-lg border text-xs ${getSeverityBg(issue.severity)}`}
            >
              <div className="flex items-start gap-2">
                {getSeverityIcon(issue.severity)}
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{issue.message}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-0.5">{issue.recommendation}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
