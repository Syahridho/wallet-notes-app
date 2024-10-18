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

type InputDialogProps = {
  title: string;
  subTitle: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void | any;
  children: React.ReactNode;
};

const InputDialog = (props: InputDialogProps) => {
  const { title, subTitle, onSubmit, children } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: any = event.target as HTMLFormElement;

    const data: any = {
      name: form.name.value,
      total: form.total.value,
      date: new Date(),
    };
    console.log(data);

    onSubmit(event);
  };

  return (
    <Dialog>
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
              <Input id="total" className="col-span-3" />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="submit">Kirim</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InputDialog;
