import React from "react";
import style from "./style.module.scss";

export default function Watch({ time = 0 }: { time: Number | undefined }) {
  //Armazena cada casa decimal dos minutos e segundos para mostrar nos <span>
  const [minutoDezena = "0", minutoUnidade = "0"] = String(
    Math.floor(Number(time) / 60)
  ).padStart(2, "0");
  const [segundoDezena = "0", segundoUnidade = "0"] = String(
    Number(time) % 60
  ).padStart(2, "0");
  return (
    <React.Fragment>
      <span className={style.watchNumber}>{minutoDezena}</span>
      <span className={style.watchNumber}>{minutoUnidade}</span>
      <span className={style.watchDivision}>:</span>
      <span className={style.watchNumber}>{segundoDezena}</span>
      <span className={style.watchNumber}>{segundoUnidade}</span>
    </React.Fragment>
  );
}
