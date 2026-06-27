"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "@heroui/react";

import { deleteTask } from "@/lib/actions/tasks";

const DeleteTaskModal = ({ taskId }) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTask(taskId);

      router.refresh();
    });
  };

  return (
    <Modal>
      <Button
        isIconOnly
        variant="light"
        className="bg-red-50 hover:bg-red-100 rounded-lg"
      >
        <Trash2 size={18} className="text-red-500" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-[420px] rounded-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading className="text-xl font-bold">
                Delete Task
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-slate-500">
                Are you sure you want to delete this task? This action cannot be
                undone.
              </p>
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-3">
              <Button
                slot="close"
                className="bg-purple-50 text-purple-700 hover:bg-purple-100"
              >
                Cancel
              </Button>

              <Button
                isLoading={isPending}
                onPress={() => handleDelete(() => {})}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteTaskModal;
