import fs from "node:fs"

const downloadDictionary = async (
  JMDict_Extended_API_URL: string,
  PATH: string,
) => {
  const releaseResponse = await fetch(JMDict_Extended_API_URL)
  const release = await releaseResponse.json()

  const latestAsset = release.assets[0]

  const prevAssetName = fs.readdirSync(`${PATH}/raw`)[0]
  if (prevAssetName === latestAsset.name) {
    console.log("Already up-to-date:", prevAssetName)
    process.exit(0)
  }

  const res = await fetch(latestAsset.browser_download_url)
  const data = await res.text()

  fs.writeFileSync(`${PATH}/raw/${latestAsset.name}`, data)
  fs.unlinkSync(`${PATH}/raw/${prevAssetName}`)

  console.log(`Updated from ${prevAssetName} to ${latestAsset.name}`)
}

export default downloadDictionary
