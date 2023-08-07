import { CommentProps } from "@/types";

export const updateCommentOrReply = (updatedComment: CommentProps, comments: CommentProps[]) => {
  const updatedComments = comments.map((comment) => {
    if (comment.id === updatedComment.id) {
      return updatedComment;
    }
    comment.replies = comment.replies.map((reply) => {
      if (reply.id === updatedComment.id) {
        return updatedComment;
      }
      return reply;
    });
    return comment;
  });
  return updatedComments;
}