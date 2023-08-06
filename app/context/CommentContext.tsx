"use client";

import { CommentProps } from "@/types";
import { SetStateAction, createContext, useContext, useState } from "react";

const CommentContext = createContext({
  comments: [] as CommentProps[],
  setComments: (() => {}) as React.Dispatch<SetStateAction<CommentProps[]>>,
});

// create a provider for components to consume and subscribe to changes
// add values that you want to expose to components
export const CommentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  return (
    <CommentContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
export const useCommentContext = () => useContext(CommentContext);
