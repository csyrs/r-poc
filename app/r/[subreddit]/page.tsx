"use client";
import Link from "next/link";
import data from "../../../data/reddit";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { subreddit: sub } = useParams();
  const [postIds, setPostIds] = useState(undefined);
  const [postsById, setPostsById] = useState({});
  useEffect(() => {
    data.sync(
      ["subreddit_posts", sub, "all", "hot", 25].join(":"),
      (postIds) => {
        setPostIds({ ...postIds });
        postIds.data?.forEach((postId) => {
          data.sync(["post", postId].join(":"), (post) => {
            setPostsById((postsById) => ({ ...postsById, [postId]: post }));
          });
          data.preload(["post", postId, "confidence", 250].join(":"));
        });
      },
    );
  }, [sub]);
  return postIds?.data ? (
    <ol className="max-w-90 pl-12">
      {postIds.data.map((postId) => (
        <li key={postId} className="font-mono flex flex-col items-start mb-4">
          <button className="opacity-50 ">
            {postsById[postId].data?.link_flair_text}
          </button>
          <div className="relative text-3xl">
            <Link
              href={"/" + postId}
              className="opacity-50 bg-red-100 hover:bg-red-400 hover:text-white active:opacity-100 transition duration-200"
            >
              {postsById[postId].data?.title}
            </Link>
            <button className="absolute right-[100%] top-0 pe-2 opacity-50">
              {postsById[postId].data?.num_comments}
            </button>
          </div>
        </li>
      ))}
    </ol>
  ) : (
    <></>
  );
}
