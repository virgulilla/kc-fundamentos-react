interface ButtonProps {
  text: string;
  classes: string;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  text,
  classes,
  type,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
