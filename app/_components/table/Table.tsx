"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileType } from "@/typeings";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useAppStore } from "@/app/_stores/store";
import DeleteModal from "../DeleteModal";
import RenameModal from "../RenameModal";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [
    fileId,
    setFileId,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    filename,
    setFilename,
    isRenameModalOpen,
    setIsRenameModalOpen,
    setImgUrl,
  ] = useAppStore((state) => [
    state.fileId,
    state.setFileId,
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.filename,
    state.setFilename,
    state.isRenameModalOpen,
    state.setIsRenameModalOpen,
    state.setImgUrl,
  ]);

  const openDeleteModal = (fileId: string) => {
    setFileId(fileId);
    setIsDeleteModalOpen(true);
  };

  const openRenameModal = (
    fileId: string,
    filename: string,
    downloadURL: string
  ) => {
    setFileId(fileId);
    setFilename(filename);
    setImgUrl(downloadURL);
    setIsRenameModalOpen(true);
  };

  const TabelCellOut = ({ row, cell }: { row: any; cell: any }) => {
    if (cell?.column?.id === "timestamp") {
      return (
        <div className="flex flex-col">
          <div className="text-sm">
            {(cell.getValue() as Date).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500">
            {(cell.getValue() as Date).toLocaleTimeString()}
          </div>
        </div>
      );
    }
    if (cell?.column?.id === "filename") {
      return (
        <p
          className="flex gap-2 items-center cursor-pointer underline text-blue-500 hover:text-blue-600"
          onClick={() =>
            openRenameModal(
              (row.original as FileType).id,
              (row.original as FileType).filename,
              (row.original as FileType).downloadURL
            )
          }
        >
          {cell.getValue() as string} <PencilIcon size={15} className="ml-2" />
        </p>
      );
    }
    return flexRender(cell?.column?.columnDef.cell, cell?.getContext());
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <th></th>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <TabelCellOut row={row} cell={cell} />
                  </TableCell>
                ))}
                <TableCell key={(row.original as FileType).id}>
                  <Button
                    variant="outline"
                    onClick={() =>
                      openDeleteModal((row.original as FileType).id)
                    }
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have No Files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DeleteModal />
      <RenameModal />
    </div>
  );
}
