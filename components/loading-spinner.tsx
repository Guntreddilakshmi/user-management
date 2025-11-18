'use client'

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="space-y-4 text-center">
        {/* Skeleton Loader Animation */}
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 w-3 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-sm">Loading users...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
export { LoadingSpinner }
