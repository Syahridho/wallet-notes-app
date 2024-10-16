type PropsTypes = {
  type: string;
  name: string;
};

const Input = (props: PropsTypes) => {
  const { type, name } = props;
  return (
    <input
      type={type}
      name={name}
      className={`border p-1.5 fullname-field`}
      required
    />
  );
};

export default Input;
