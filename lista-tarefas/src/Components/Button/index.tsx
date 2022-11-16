import React from "react";
import style from "./style.module.scss";

export default function Button({
  name,
  type,
  onClick,
  disabled = false,
}: {
  name: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={style.button}
    >
      {name}
    </button>
  );
}
