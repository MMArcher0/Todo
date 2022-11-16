import Button from "../Button";
import Watch from "./Watch";
import style from "./style.module.scss";
import { useEffect, useState, useRef } from "react";
import { secondsToTime, timeToSeconds } from "../common/utils/date";
import { ITask } from "../../types/task";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Stopwatch({
  itemSelected,
  setItemSelected,
  oldTask,
}: {
  itemSelected: ITask | null;
  setItemSelected: Function;
  oldTask: null | ITask;
}) {
  const [stopWatchTime, setStopWatchTime] = useState<number>();
  const [isStarted, setIsStarted] = useState(false);
  //Necessario para que o countDown identifique se a tarefa esta com cronometro ativo
  const isStartedRef = useRef(isStarted);
  isStartedRef.current = isStarted;

  //Atulizar o cronometro com a tarefa selecionada
  useEffect(() => {
    const saveProgress = async (timeSeconds: number | undefined) => {
      await updateDoc(
        doc(db, "listatarefas", oldTask === null ? "" : oldTask.id),
        {
          time: secondsToTime(timeSeconds === undefined ? 64 : timeSeconds),
        }
      );
    };
    if (isStarted) {
      setIsStarted(false);
      saveProgress(stopWatchTime);
    }

    setStopWatchTime(
      timeToSeconds(
        itemSelected?.time !== undefined ? itemSelected.time : "00:00:00"
      )
    );
    // eslint-disable-next-line
  }, [itemSelected]);

  //Avisa que vai perder contagem do cronometro caso atualize a pagina
  //Se cancelar o refresh pausa a execução do cronometro e salva progresso na DB
  window.onbeforeunload = (event) => {
    if (isStarted) {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      pauseItem();
      return "";
    }
  };

  //Contagem regressiva do cronometro
  //Utiliza um setTimeout para a contagem regressiva
  function countDown(count: number = 0) {
    setTimeout(() => {
      if (count > 0 && isStartedRef.current) {
        setStopWatchTime(count - 1);
        return countDown(count - 1);
      } else if (count <= 0) {
        //Ao zerar a contagem chama função para deletar a tarefa
        //Limpa dados da tarefa do estado itemSelected
        deleteItem();
        setIsStarted(false);
        setItemSelected(null);
      }
    }, 1000);
  }

  //Responsavel por deletar o item da DB com base no id da tarefa
  async function deleteItem() {
    await deleteDoc(
      doc(db, "listatarefas", itemSelected === null ? "" : itemSelected.id)
    );
  }

  //Pausa cronometro e atulizar tempo na DB
  async function pauseItem() {
    setIsStarted(false);
    await updateDoc(
      doc(db, "listatarefas", itemSelected === null ? "" : itemSelected.id),
      { time: secondsToTime(stopWatchTime === undefined ? 64 : stopWatchTime) }
    );
  }
  return (
    <div className={style.stopwatch}>
      <p className={style.title}>Escolha um card e inicie uma tarefa</p>
      <div className={style.relogioWrapper}>
        <Watch time={stopWatchTime} />
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", width: 450 }}
      >
        <Button
          name={"Iniciar"}
          type={"button"}
          onClick={() => {
            setIsStarted(true);
            countDown(stopWatchTime);
          }}
          disabled={isStarted || itemSelected === null}
        />
        <Button
          name={"Pausar"}
          type={"button"}
          onClick={() => pauseItem()}
          disabled={!isStarted || itemSelected === null}
        />
      </div>
    </div>
  );
}
