import { VideoPage } from "#/components/VideoPage/VideoPage";
import videos from "../../../../data/videoData";

export async function generateStaticParams() {
  // const videos = await fetch('https://.../videos').then((res) => res.json())
  return videos;
}

const Watch = async ({ params }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const video = videos.find((item) => item.slug === slug);

  return <VideoPage video={video} />;
};

export default Watch;
