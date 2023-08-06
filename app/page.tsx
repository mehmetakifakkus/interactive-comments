"use client";

import data from "../data/data.json";
import { CommentProps, User } from "@/types";
import CommentContainer from "./components/CommentContainer";
import AddComment from "./components/AddComment";
import { useUserContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";

export default function Home() {
  const currentUser: User = data.currentUser;
  const comments: CommentProps[] = data.comments;
  const { setUser } = useUserContext();
  const [date, setDate] = useState(new Date());
  setUser(currentUser);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-12 mx-auto">
        <div className="flex flex-col space-y-4 flex-wrap-reverse">
          {comments.map((comment) => (
            <CommentContainer key={comment.id} comment={comment} />
          ))}
        </div>
        <AddComment currentUser={currentUser} />
      </main>
    </>
  );
}
