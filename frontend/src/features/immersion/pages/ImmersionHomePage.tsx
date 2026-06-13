import EditDialog from "../components/EditDialog"
import Topics from "../components/Topics"
import VideoLink from "../components/VideoLink"

const ImmersionHomePage = () => {
  return (
    <div className="h-full flex flex-col gap-6 p-10">
      <VideoLink />
      <Topics />

      <EditDialog />
    </div>
  )
}
export default ImmersionHomePage
