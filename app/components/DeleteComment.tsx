import React from "react";
import Modal from "./Modal";
import { useCommentContext } from "../context/CommentContext";
import { CommentProps, ReplyComment } from "@/types";

type Props = {
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  comment: CommentProps | ReplyComment;
};

export default function DeleteComment({
  isModalOpened,
  setIsModalOpened,
  comment,
}: Props) {
  const { deleteComment } = useCommentContext();

  return (
    <Modal isOpened={isModalOpened} setOpened={setIsModalOpened}>
      <h1 className="text-xl text-gray-600 font-semibold mb-4">
        Delete Comment
      </h1>
      <p className="text-gray-500">
        Are you sure you want to delete this comment? This will remove the
        comment and can&apos;t be undone.
      </p>
      <div className="flex flex-row-reverse justify-between mt-6">
        <button
          onClick={() => {
            deleteComment(comment.id);
            setIsModalOpened(false);
          }}
          className="bg-red-600 text-white px-5 py-2 rounded"
        >
          YES, DELETE
        </button>
        <button
          onClick={() => {
            setIsModalOpened(false);
          }}
          className="bg-gray-400 text-white px-5 rounded"
        >
          NO, CANCEL
        </button>
      </div>
    </Modal>
  );
}
