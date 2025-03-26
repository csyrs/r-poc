import { useRef } from "react";

export default function RendererVideo({
  src_url_audio,
  src_url_video,
}: {
  src_url_audio: URL;
  src_url_video: URL;
}) {
  const [audio, video] = [useRef(null), useRef(null)];
  return (
    <>
      <audio src={src_url_audio.toString()} ref={audio} className="hidden" />
      <video
        controls
        src={src_url_video.toString()}
        onPause={() => audio.current?.pause()}
        onPlaying={() => audio.current?.play()}
        onSeeked={() => {
          if (audio.current) {
            audio.current.currentTime = video.current?.currentTime;
          }
        }}
        onVolumeChange={() => {
          if (audio.current) {
            audio.current.volume = video.current?.volume;
          }
        }}
        onWaiting={() => audio.current?.pause()}
        ref={video}
        className="max-w-none w-[100%] h-[100%] rounded-inherit"
      />
    </>
  );
}
