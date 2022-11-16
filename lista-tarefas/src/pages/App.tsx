import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Form from "../Components/Form";
import List from "../Components/List";
import Stopwatch from "../Components/Stopwatch";
import { db } from "../firebase";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { ITask } from "../types/task";

function App() {
  const [tasks, setTasks] = useState([] as ITask[]);
  const [itemSelected, setItemSelected] = useState(null as ITask | null);
  const [oldTask, setOldTask] = useState(null as ITask | null);

  function selectItem(item: ITask) {
    setOldTask(itemSelected);
    setItemSelected(item);
  }

  //Busca as tarefas registradas no banco, ordenando pelo tempo de registro de forma descendente
  useEffect(() => {
    //Realiza a consulta no bando
    const q = query(
      collection(db, "listatarefas"),
      orderBy("timestamp", "desc")
    );

    //Na atualização do banco, recarrega informações do banco adiciona numa ITask
    const listener = onSnapshot(q, (snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          } as ITask;
        })
      );
    });
    return () => {
      listener();
    };
  }, []);

  return (
    <div className={style.AppStyle}>
      <Form />
      <List selectItem={selectItem} itemSelected={itemSelected} tasks={tasks} />
      <Stopwatch
        itemSelected={itemSelected}
        setItemSelected={setItemSelected}
        oldTask={oldTask}
      />
    </div>
  );
}

export default App;
