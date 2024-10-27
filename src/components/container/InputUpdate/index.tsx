import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type InputUpdateProps = {
  onSubmit: (data: any) => void | Promise<void>;
  update: boolean;
  onClose: () => void;
  data: any;
};

const InputUpdate = (props: InputUpdateProps) => {
  const { onSubmit, update, onClose, data } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;

    const dataNew: any = {
      id: data.id,
      createdAt: data.createAt,
      referenceId: data.referenceId,
      type: data.type,
      description: form.name.value,
      amount: Number(form.total.value),
    };

    try {
      await onSubmit(dataNew);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={update} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perbaharui Data</DialogTitle>
          <DialogDescription>Update</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                className="col-span-3"
                defaultValue={data.description}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="total">Jumlah</Label>
              <Input
                id="total"
                type="number"
                className="col-span-3"
                defaultValue={data.amount}
              />
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

export default InputUpdate;
