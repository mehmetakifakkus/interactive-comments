"use client";

import { CommentProps, ReplyComment, User } from "@/types";
import moment from "moment";
import { SetStateAction, createContext, useContext, useState } from "react";
import { updateCommentOrReply } from "../components/comment/utils/updateComment";

const CommentContext = createContext({
  comments: [] as CommentProps[],
  setComments: (() => {}) as React.Dispatch<SetStateAction<CommentProps[]>>,
  addComment: (currentUser: User, comment: string) => {},
  addReply: (
    currentUser: User,
    comment: string,
    parentComment: CommentProps | ReplyComment
  ) => {},
  deleteComment: (id: number) => {},
  updateComment: (comment: CommentProps | ReplyComment, content: string) => {},
  updateScore: (score: number, comment: CommentProps | ReplyComment) => {},
});

// create a provider for components to consume and subscribe to changes
// add values that you want to expose to components
export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  if (process.browser) {
    // add comments to the local storage if there are any
    if (comments.length > 0)
      localStorage.setItem("comments", JSON.stringify(comments));
  }
  const numberOfComments = comments
    .map((comment) =>
      comment.replies.length === 0 ? 1 : comment.replies.length + 1
    )
    .reduce((a, b) => a + b, 0);

  const addComment = (currentUser: User, comment: string) => {
    setComments((prev) =>
      prev.concat({
        id: numberOfComments + 1,
        user: currentUser,
        content: comment,
        createdAt: moment(new Date()).format("MM/DD/YYYY HH:mm"),
        score: 0,
        replies: [],
      })
    );
  };

  const addReply = (
    currentUser: User,
    comment: string,
    parentComment: CommentProps | ReplyComment
  ) => {
    const updated = comments.map((c) => {
      if (c.id === parentComment?.id) {
        return {
          ...c,
          replies: c.replies.concat({
            id: numberOfComments + 1,
            user: currentUser,
            content: comment,
            createdAt: moment(new Date()).format("MM/DD/YYYY HH:mm"),
            score: 0,
            replyingTo: parentComment?.user.username,
          }),
        };
      }
      return c;
    });
    setComments(updated);
  };

  const deleteComment = (id: number) => {
    const commentsCopy = [...comments];
    // Remove the comment from the replies of the parent comment
    commentsCopy.forEach((c) => {
      c.replies = c.replies.filter((r) => r.id !== id);
    });
    // Remove the comment from the comments list
    setComments(commentsCopy.filter((c) => c.id !== id));
  };

  const updateComment = (
    comment: CommentProps | ReplyComment,
    content: string
  ) => {
    setComments(
      updateCommentOrReply(
        {
          ...(comment as CommentProps),
          content,
        },
        comments
      )
    );
  };

  const updateScore = (score: number, comment: CommentProps | ReplyComment) => {
    const updated = updateCommentOrReply(
      {
        ...(comment as CommentProps),
        score,
      },
      comments
    );
    setComments(updated.sort((a, b) => b.score - a.score));
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        addComment,
        addReply,
        deleteComment,
        updateComment,
        updateScore,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
export const useCommentContext = () => useContext(CommentContext);
