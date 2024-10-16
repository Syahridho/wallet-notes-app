type PropsTypes = {
  type: "submit" | "button" | "reset" | undefined;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Button = (props: PropsTypes) => {
  const { type, children, className, disabled } = props;
  return (
    <button
      type={type}
      className={`w-full bg-green-800 text-white py-2 rounded shadow ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
