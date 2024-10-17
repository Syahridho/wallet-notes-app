import FormAuth from "@/components/layout/FormAuth";
import InputForm from "@/components/container/InputForm";
import { Button } from "@/components/ui/button";

const ForgetPages = () => {
  return (
    <FormAuth
      onSubmit={() => console.log("ganti")}
      title="Reset Password"
      subTitle="Put in email for reset"
      error={""}
    >
      <InputForm type="email" name="email" title="Email" />
      <Button type="submit">Reset Password</Button>
    </FormAuth>
  );
};

export default ForgetPages;
