"use client";
import { TitleWrapper } from "./VideoPageStyled";
import { Headline } from "#/components/Typography/Typography";
import BackButtonBar from "../BackButtonBar";
import VideoPlayer from "../VideoPlayer";

export const VideoPage = ({ video }) => {
  const { src, thumbnail, title } = video || {};

  return (
    <>
      <BackButtonBar target={"/archive"} />
      <TitleWrapper>
        <Headline as="h1" variant="4">
          {title}
        </Headline>
      </TitleWrapper>
      <VideoPlayer thumbnail={thumbnail} src={src} />
    </>
  );
};
