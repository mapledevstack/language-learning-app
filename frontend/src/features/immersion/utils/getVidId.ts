const getVidId = (link: string): string | null => {
  try {
    const url = new URL(link)

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1) // removing '/'
    }

    if (url.hostname.includes("youtube.com")) {
      return url.searchParams.get("v")
    }

    return null
  } catch {
    return null
  }
}

export default getVidId
