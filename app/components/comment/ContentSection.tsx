import { useCommentContext } from "@/app/context/CommentContext";
import { CommentProps, ReplyComment } from "@/types";
import React, { useState } from "react";
import { updateComment } from "./utils/updateComment";

type Props = {
  isEditMode: boolean;
  comment: CommentProps | ReplyComment;
  isReply?: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ContentSection({
  isEditMode,
  comment,
  isReply,
  setIsEditMode,
}: Props) {
  const [commentContent, setComment] = useState(comment.content);
  const { comments, setComments } = useCommentContext();

  return isEditMode ? (
    <>
      <textarea
        className="w-full h-[80px] rounded-md border border-gray-300 p-2 text-gray-500 bg-white resize-none"
        placeholder={"Add a comment"}
        value={commentContent}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />
      <div className="w-full flex place-content-end gap-2">
        <button
          onClick={() => {
            setComments(
              updateComment(
                {
                  ...(comment as CommentProps),
                  content: commentContent,
                },
                comments
              )
            );
            setIsEditMode(false);
          }}
          className="w-28 mt-3 bg-blue-800 px-6 py-1 rounded-lg text-white font-semibold h-9"
        >
          UPDATE
        </button>
        <button
          onClick={() => {
            setIsEditMode(false);
            setComment(comment.content);
          }}
          className="w-20 mt-3 bg-gray-400 px-3 py-1 rounded-lg text-white font-semibold h-9"
        >
          CANCEL
        </button>
      </div>
    </>
  ) : (
    <span className="text-bold">
      {isReply && (
        <span className="text-blue-800 font-semibold">{`@${
          (comment as ReplyComment).replyingTo
        } `}</span>
      )}
      {comment.content}
    </span>
  );
}
