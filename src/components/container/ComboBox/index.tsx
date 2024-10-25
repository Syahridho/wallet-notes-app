import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import transactionServices from "@/services/transaction";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const ComboBox = (props: any) => {
  const { userId, id } = props;

  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string, userId: any) => {
    // console.log(id, userId);
    const result = await transactionServices.deleteTransaction(id, userId);

    if (result.status === 200) {
      console.log("berhasil bro");
    } else {
      console.log("gagal bro");
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <DotsHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>Update</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleDelete(id, userId)}
            className="text-red-600"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ComboBox;
