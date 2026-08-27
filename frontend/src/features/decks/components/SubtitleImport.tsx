const SubtitleImport = () => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const content = reader.result

      if (typeof content !== "string") return

      console.log(content)
    }

    reader.readAsText(file)
  }

  return (
    <div>
      <label
        htmlFor="subtitle-upload"
        className="block w-full cursor-pointer rounded-2xl bg-primary p-2 text-center"
      >
        Import from subtitles (.srt)
      </label>

      <input
        id="subtitle-upload"
        type="file"
        accept=".srt"
        className="hidden"
        title="Choose a .srt file to import subtitles"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default SubtitleImport
