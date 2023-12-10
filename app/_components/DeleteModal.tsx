"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "../_stores/store";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";

export default function DeleteModal() {
  const { user } = useUser();
  const { toast } = useToast();

  const [setIsDeleteModalOpen, isDeleteModalOpen, fileId, setFileId, filename] =
    useAppStore((state) => [
      state.setIsDeleteModalOpen,
      state.isDeleteModalOpen,
      state.fileId,
      state.setFileId,
      state.filename,
    ]);

  const deleteFile = async () => {
    if (!user || !fileId) return;

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      deleteObject(fileRef)
        .then(async () => {
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
            console.log("deleted");
          });
        })
        .finally(() => {
          setIsDeleteModalOpen(false);
          toast({
            variant: "destructive",
            title: `Deleted your file: ${filename}`,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="ghost"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            variant="destructive"
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
