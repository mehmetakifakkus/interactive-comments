import React from "react";
import Modal from "./Modal";

type Props = {
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteComment({
  isModalOpened,
  setIsModalOpened,
}: Props) {
  return (
    <Modal isOpened={isModalOpened} setOpened={setIsModalOpened}>
      <h1 className="text-xl text-gray-600 font-semibold mb-4">
        Delete Comment
      </h1>
      <p className="text-gray-500">
        Are you sure you want to delete this comment? This will remove the
        comment and can&apos;t be undone.
      </p>
      <div className="flex flex-row-reverse gap-2 mt-6 reverse">
        <button className="text-sm bg-red-600 text-white px-6 py-2 rounded">
          YES, DELETE
        </button>
        <button
          onClick={() => {
            setIsModalOpened(false);
          }}
          className="text-sm bg-gray-400 text-white px-6 rounded"
        >
          NO, CANCEL
        </button>
      </div>
    </Modal>
  );
}
