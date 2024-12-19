"user client";

import { Button } from "@/components/ui/shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { deleteUsers } from "@/modules/dashboard/users/users.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type User = {
  id: string;
  email: string;
  name: string;
};

export const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const userId = row.original.id;

      const queryClient = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: () => deleteUsers(userId),
        onSuccess: () => {
          toast.success("User deleted successfully!");

          queryClient.setQueryData(["users"], (oldData: any) => {
            if (!oldData || !oldData.data) {
              console.error("No data found in the cache.");
              return oldData;
            }

            const updatedData = oldData.data.filter((user: User) => user.id !== userId);

            return {
              ...oldData,
              data: updatedData,
            };
          });

          queryClient.invalidateQueries({
            queryKey: ["users"],
          });
        },
        onError: (error) => {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user.");
        },
      });

      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleDelete = () => {
        setIsDialogOpen(true);
      };

      const handleConfirmDelete = () => {
        mutate();
        setIsDialogOpen(false);
      };

      const handleCancelDelete = () => {
        setIsDialogOpen(false);
      };

      const navigate = useNavigate();

      const handleEdit = () => {
        navigate({ to: `/users/edit/${userId}` });
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete this user and remove their data from our
                  servers.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={handleCancelDelete}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleConfirmDelete}>
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
