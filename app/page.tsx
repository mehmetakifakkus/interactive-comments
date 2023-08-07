"use client";

import data from "../data/data.json";
import CommentContainer from "./components/CommentContainer";
import AddComment from "./components/AddComment";
import { useUserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import { useCommentContext } from "./context/CommentContext";
import { CommentProps } from "@/types";

export default function Home() {
  const { user, setUser } = useUserContext();
  const { comments, setComments } = useCommentContext();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const localCommentsString = window.localStorage.getItem(
        "comments"
      ) as string;
      const localComments: CommentProps[] = JSON.parse(localCommentsString);

      if (localComments?.length > 0) {
        // if there are local comments, use them
        setComments(localComments);
      } else {
        setComments(data.comments.sort((a, b) => b.score - a.score));
      }
    }
  }, [setComments]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 5000);

    setUser(data.currentUser);

    return () => clearInterval(timer);
  }, [setUser]);

  return (
    <>
      <main className="flex min-h-screen bg-lightgray flex-col items-center p-16 mx-auto">
        <div className="flex flex-col space-y-4 flex-wrap-reverse">
          {comments.map((comment) => (
            <CommentContainer key={comment.id} comment={comment} />
          ))}
        </div>
        <AddComment currentUser={user} isReplyMode={false} />
      </main>
    </>
  );
}
