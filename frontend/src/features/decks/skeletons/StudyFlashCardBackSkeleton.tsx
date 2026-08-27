const StudyFlashCardBackSkeleton = () => {
  return (
    <div className="size-full flex flex-col items-center justify-center gap-4 p-8">
      <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />

      <div className="flex flex-col items-center gap-2">
        <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  )
}

export default StudyFlashCardBackSkeleton
