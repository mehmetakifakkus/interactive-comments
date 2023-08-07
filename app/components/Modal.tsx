import React from "react";

type Props = {
  isOpened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
};

export default function Modal({ isOpened, setOpened, children }: Props) {
  return (
    <>
      {isOpened && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-[340px]">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
