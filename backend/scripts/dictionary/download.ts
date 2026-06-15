import fs from "node:fs"

export const downloadDictionary = async (
  JMDict_Extended_API_URL: string,
  PATH: string,
) => {
  const releaseResponse = await fetch(JMDict_Extended_API_URL)
  const release = await releaseResponse.json()

  const metadata = JSON.parse(
    fs.readFileSync(`${PATH}/raw/metadata.json`, "utf8"),
  )

  const oldTag = metadata.tagName
  const newTag = release.tag_name
  if (oldTag === newTag) {
    console.log(`Words already up to date - ${oldTag}`)
    return
  }

  console.log(`Downloading latest words...`)

  const res = await fetch(release.assets[0].browser_download_url)
  const data = await res.json()
  fs.writeFileSync(`${PATH}/raw/words.json`, JSON.stringify(data))

  metadata.tagName = newTag
  fs.writeFileSync(
    `${PATH}/raw/metadata.json`,
    JSON.stringify(metadata, null, 2),
  )

  console.log(`Words successfully downloaded! - ${newTag}`)
}
