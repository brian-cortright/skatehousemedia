import React from 'react';
import { VideoPage } from "@/components/VideoPage/VideoPage";
import videos from "../../../../data/videoData";

export async function generateStaticParams() {
  return videos;
}

const Watch = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const video = videos.find((item: { slug: string }) => item.slug === slug);

  return <VideoPage video={video} />;
};

export default Watch;
