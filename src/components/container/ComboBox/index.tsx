import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import InputUpdate from "../InputUpdate";

const ComboBox = (props: any) => {
  const { idUser, id, handleDelete, handleUpdate, data } = props;
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleCloseUpdate = () => {
    setUpdate(false);
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setUpdate(true)}>
              Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDelete(id, idUser)}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <InputUpdate
        update={update}
        onSubmit={handleUpdate}
        onClose={handleCloseUpdate}
        data={data}
      />
    </>
  );
};

export default ComboBox;
