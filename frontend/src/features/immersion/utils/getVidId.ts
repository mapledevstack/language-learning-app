const getVidId = (link: string): string | null => {
  try {
    const url = new URL(link)
    const host = url.hostname

    if (host.includes("youtu.be")) {
      return url.pathname.slice(1)
    }

    if (host.includes("youtube.com")) {
      const v = url.searchParams.get("v")
      if (v) return v

      const [, type, id] = url.pathname.split("/")

      if (["embed", "shorts", "live"].includes(type)) {
        return id ?? null
      }
    }

    return null
  } catch {
    return null
  }
}

export default getVidId
