import EditDialog from "../components/EditDialog"
import TopicsSection from "../components/TopicsSection"
import VideoLink from "../components/VideoLink"

const ImmersionHomePage = () => {
  return (
    <div className="h-full flex flex-col gap-6 p-10">
      <VideoLink />
      <TopicsSection />

      <EditDialog />
    </div>
  )
}
export default ImmersionHomePage
