"use client";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAppStore } from "../_stores/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useToast } from "@/components/ui/use-toast";

export default function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename, imgUrl] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.filename,
      state.imgUrl,
    ]);

  const renameFile = async () => {
    if (!user || !fileId) return;
    toast({
      title: "Renaming File:",
      description: `Renaming from ${filename} to ${input}.`,
    });
    await updateDoc(doc(db, "users", user.id, "files", fileId), {
      filename: input,
    });
    toast({
      title: "Renaming Completed:",
    });
    setInput("");
    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center space-y-4">
          <img src={imgUrl} width="150px" />
        </div>
        <Input
          id="link"
          type="text"
          defaultValue={filename}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              renameFile();
            }
          }}
        />
        <DialogFooter>
          <div className="flex justify-end space-x-2 py-3">
            <Button
              size="sm"
              className="px-3"
              variant="ghost"
              onClick={() => setIsRenameModalOpen(false)}
            >
              <span className="sr-only">Cancel</span>
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => renameFile()}
            >
              <span>Rename</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
