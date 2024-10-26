import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type InputDialogProps = {
  title: string;
  subTitle: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | any;
  children: React.ReactNode;
  // update?: boolean;
};

const InputDialog = (props: InputDialogProps) => {
  const { title, subTitle, onSubmit, children } = props;

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;

    const data: any = {
      description: form.name.value,
      amount: Number(form.total.value),
    };

    await onSubmit(data);
    setOpen(false);
    form.reset();
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" className="text-xs md:text-base">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nama</Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="total">Jumlah</Label>
              <Input id="total" type="number" className="col-span-3" />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="submit">{isLoading ? "Loading..." : "Kirim"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InputDialog;
