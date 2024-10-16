import Input from "@/components/UI/Input";
import Label from "@/components/UI/Label";

type PropsTypes = {
  type: string;
  name: string;
  title: string;
};

const InputForm = (props: PropsTypes) => {
  const { type, name, title } = props;
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={name} title={title} />
      <Input type={type} name={name} />
    </div>
  );
};

export default InputForm;
