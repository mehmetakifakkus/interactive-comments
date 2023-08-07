import { CommentProps, ReplyComment, User } from "@/types";
import Image from "next/image";
import React from "react";
import { useCommentContext } from "../context/CommentContext";
import moment from "moment";

type Props = {
  currentUser: User;
  isReply?: boolean;
  isReplyMode?: boolean;
  setIsReplyMode?: React.Dispatch<React.SetStateAction<boolean>>;
  parentComment?: CommentProps | ReplyComment;
};

export default function AddComment({
  currentUser,
  isReply,
  isReplyMode,
  setIsReplyMode,
  parentComment,
}: Props) {
  const { comments, setComments } = useCommentContext();
  const [comment, setComment] = React.useState("");

  const numberOfComments = comments
    .map((comment) =>
      comment.replies.length === 0 ? 1 : comment.replies.length + 1
    )
    .reduce((a, b) => a + b, 0);

  return (
    <div
      className={`w-[360px] ${
        isReply ? "sm:w-[628px]" : "sm:w-[696px]"
      } text-gray-500 bg-white p-5 rounded-lg mt-4`}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="row-start-2 sm:row-start-1 col-span-2 sm:col-span-1">
          {currentUser && (
            <Image
              src={currentUser?.image.png}
              width={26}
              height={26}
              alt={currentUser?.username}
              className="h-9 w-9"
            />
          )}
        </div>
        <div className="col-span-12 sm:col-span-9">
          <textarea
            className="w-full h-[80px] rounded-md border border-gray-300 p-2 text-gray-500 bg-white overflow-hidden resize-none"
            placeholder={"Add a comment..."}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </div>
        <div className="col-span-4 sm:col-span-2 col-start-9">
          <button
            onClick={() => {
              if (comment === "") return; // Don't add empty comments
              if (!isReplyMode) {
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
              } else {
                const updated = comments.map((c) => {
                  if (c.id === parentComment?.id) {
                    return {
                      ...c,
                      replies: c.replies.concat({
                        id: numberOfComments + 1,
                        user: currentUser,
                        content: comment,
                        createdAt: moment(new Date()).format(
                          "MM/DD/YYYY HH:mm"
                        ),
                        score: 0,
                        replyingTo: parentComment?.user.username,
                      }),
                    };
                  }
                  return c;
                });
                setComments(updated);
              }
              setComment("");
              isReplyMode && setIsReplyMode && setIsReplyMode(false);
            }}
            className="w-full bg-moderateblue px-4 py-2 rounded-lg text-white font-semibold h-11"
          >
            {isReplyMode ? "REPLY" : "SEND"}
          </button>
        </div>
      </div>
    </div>
  );
}
