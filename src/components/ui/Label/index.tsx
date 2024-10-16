type PropsTypes = {
  htmlFor: string;
  title: string;
};

const Label = (props: PropsTypes) => {
  const { htmlFor, title } = props;
  return (
    <label htmlFor={htmlFor} className={`font-semibold`}>
      {title}
    </label>
  );
};

export default Label;
