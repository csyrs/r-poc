"use client";
import Link from "next/link";
import RendererEmbed from "./renderer-embed";
import RendererImage from "./renderer-image";
import RendererMarkdown from "./renderer-markdown";
import RendererVideo from "./renderer-video";
import data from "../../data/reddit";
import { getEmbedSrcForUrl } from "../../data/embeds";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const MEDIA_DISPLAY_SIZE_PX = 640 * 360;
  const { post: postId } = useParams();
  const [post, setPost] = useState(undefined);
  useEffect(() => {
    data.sync(["post", postId, "confidence", 250].join(":"), (post) => {
      if (post.data?.url) {
        if (getEmbedSrcForUrl(post.data.url, location)) {
          post.data.has_embed = true;
          post.data.media = [
            { embed_url: getEmbedSrcForUrl(post.data.url, location) },
          ];
        } else {
          post.data.has_embed = false;
        }
      }
      setPost({ ...post });
    });
  }, [postId]);
  return post?.data ? (
    <article className="relative mb-8 w-[640px]">
      <header className="relative mb-2">
        <div className="absolute bottom-[100%] opacity-50 font-mono text-sm flex justify-between gap-1 mb-1">
          <button>
            <data>{post.data.link_flair_text}</data>
          </button>
          <cite className="opacity-50 not-italic flex gap-1">
            in
            <Link href={"/r/" + post.data.subreddit}>
              <data>{post.data.subreddit}</data>
            </Link>
          </cite>
        </div>
        <h1 className="text-2xl font-mono">{post.data.title}</h1>
      </header>
      <section className="mb-3">
        <ol className="flex flex-col gap-3 @container">
          {post.data.media.map((media) => {
            return (
              <div
                className="relative flex justify-center"
                style={{
                  height:
                    Math.sqrt(MEDIA_DISPLAY_SIZE_PX) /
                    Math.sqrt(media.aspect_ratio ?? 16 / 9),
                }}
                key={media.image_url ?? media.video_url ?? media.embed_url}
              >
                <div
                  className="absolute h-[100%] outline-solid outline-4 outline-black"
                  style={{
                    width:
                      Math.sqrt(MEDIA_DISPLAY_SIZE_PX) *
                      Math.sqrt(media.aspect_ratio ?? 16 / 9),
                  }}
                >
                  {post.data.format === "self" ||
                  post.data.format === "image" ||
                  (post.data.format === "link" && !media.embed_url) ? (
                    <RendererImage src={media.image_url} />
                  ) : post.data.format === "video" ? (
                    <RendererVideo
                      src_url_audio={media.video_audio_url}
                      src_url_video={media.video_url}
                    />
                  ) : post.data.format === "link" ? (
                    <RendererEmbed src={media.embed_url} />
                  ) : null}
                </div>
              </div>
            );
          })}
        </ol>
        {post.data.format === "self" && (
          <div className="pt-2">
            <RendererMarkdown md={post.data.selftext} />
          </div>
        )}
        {post.data.format === "link" && post.data.has_embed === false && (
          <div className="pt-2">
            <Link
              href={post.data.url}
              className="font-mono text-2xl opacity-50 bg-red-100 hover:bg-red-400 hover:text-white active:opacity-100 transition duration-200"
            >
              {post.data.url.toString()}
            </Link>
          </div>
        )}
      </section>
      <footer className="flex justify-between">
        <data className="opacity-50 text-2xl font-mono">
          <button
            onClick={() =>
              data.update("post_vote:" + post.data.id, {
                numerical_vote: post.data.likes ? 0 : 1,
              })
            }
            className="hover:text-red-600"
          >
            {post.data.hide_score ? "?" : post.data.score}
          </button>
          <span className="text-sm ms-1">points</span>
          {post.data.hide_score && (
            <span className="text-sm ms-1">(score hidden)</span>
          )}
          {post.data.upvote_ratio < 0.68 && (
            <span className="text-sm ms-1">
              ({Math.floor((1 - post.data.upvote_ratio) * 100)}% downvoted)
            </span>
          )}
        </data>
        <time>
          {datetime.month(post.data.created * 1000)}{" "}
          {datetime.day(post.data.created * 1000)}
          {", "}
          {datetime.year(post.data.created * 1000)}
        </time>
      </footer>
    </article>
  ) : (
    <></>
  );
}

const datetime = {
  day: (timestamp: number) => new Date(timestamp).getDate(),
  month: (timestamp: number) =>
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][new Date(timestamp).getMonth()],
  year: (timestamp: number) => new Date(timestamp).getFullYear(),
};
