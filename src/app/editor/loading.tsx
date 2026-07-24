export default function EditorLoading() {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar skeleton */}
      <div className="h-14 border-b border-border bg-card shrink-0 flex items-center px-4 gap-4">
        <div className="w-8 h-8 bg-muted rounded-lg animate-pulse" />
        <div className="w-32 h-4 bg-muted rounded animate-pulse" />
        <div className="flex-1" />
        <div className="w-20 h-8 bg-muted rounded-lg animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel skeleton */}
        <div className="w-[45%] border-r border-border bg-card p-4 space-y-4">
          <div className="flex gap-2 mb-4">
            <div className="flex-1 h-8 bg-muted rounded animate-pulse" />
            <div className="flex-1 h-8 bg-muted rounded animate-pulse" />
            <div className="flex-1 h-8 bg-muted rounded animate-pulse" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="w-24 h-4 bg-muted rounded animate-pulse" />
              <div className="h-9 bg-muted rounded animate-pulse" />
              <div className="h-9 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Right panel skeleton */}
        <div className="flex-1 bg-muted/30 flex items-start justify-center p-6">
          <div className="w-[794px] h-[1123px] bg-white shadow-xl rounded-sm animate-pulse" />
        </div>
      </div>
    </div>
  );
}
