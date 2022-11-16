import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import Button from "../Button";
import style from "./style.module.scss";

export default function Form() {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("00:00:00");
  const [isAdding, setIsAdding] = useState(false);

  //Realiza a inclusão de uma nova tarefa na DB
  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Desabilita botão para evitar multiplos clicks
    setIsAdding(true);
    await addDoc(collection(db, "listatarefas"), {
      task: task,
      time: time,
      timestamp: serverTimestamp(),
    });
    //Apos adicionar tarefa retorna os campos para o default e habilita o botão
    setTask("");
    setTime("00:00:00");
    setIsAdding(false);
  };
  return (
    <form className={style.newTask} onSubmit={addTask}>
      <div className={style.inputContainer}>
        <label htmlFor="task">Adicione uma nova tarefa</label>
        <input
          type="text"
          name="task"
          value={task}
          onChange={(evento) => {
            setTask(evento.target.value);
          }}
          id="task"
          placeholder="Digite uma tarefa"
          required
        />
      </div>
      <div className={style.inputContainer}>
        <label htmlFor="time">Tempo</label>
        <input
          type="time"
          step="1"
          name="time"
          value={time}
          onChange={(evento) => {
            setTime(evento.target.value);
          }}
          id="time"
          min="00:00:01"
          max="01:30:00"
        />
      </div>
      <Button name={"Adicionar"} type={"submit"} disabled={isAdding} />
    </form>
  );
}
