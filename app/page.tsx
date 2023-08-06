"use client";

import data from "../data/data.json";
import CommentContainer from "./components/CommentContainer";
import AddComment from "./components/AddComment";
import { useUserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import { useCommentContext } from "./context/CommentContext";

export default function Home() {
  const { user, setUser } = useUserContext();
  const { comments, setComments } = useCommentContext();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 5000);

    setUser(data.currentUser);
    setComments(data.comments);

    return () => clearInterval(timer);
  }, [setUser, setComments]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-12 mx-auto">
        <div className="flex flex-col space-y-4 flex-wrap-reverse">
          {comments.map((comment) => (
            <CommentContainer key={comment.id} comment={comment} />
          ))}
        </div>
        <AddComment currentUser={user} />
      </main>
    </>
  );
}
