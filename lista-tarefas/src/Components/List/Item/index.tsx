import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { ITask } from "../../../types/task";
import style from "../style.module.scss";

export default function Item({
  task,
  isSelected,
  selectItem,
}: {
  task: ITask;
  isSelected: boolean;
  selectItem: Function;
}) {
  //Função responsavel por excluir tarefa selecionada
  async function deleteItem(e: React.MouseEvent<HTMLButtonElement>) {
    //Evita que ative o onClick da <li> quando realiza o onClick do <button>
    e.stopPropagation();
    if (isSelected) selectItem(null);
    await deleteDoc(doc(db, "listatarefas", task.id));
  }

  return (
    <li
      //Verifica se é a tarefa selecionada aplica um style diferente para indicar visualmente
      className={`${style.item} ${isSelected ? style.itemSelected : ""}`}
      onClick={() => {
        if (!isSelected) {
          selectItem(task);
        } else {
          selectItem(null);
        }
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "80%" }}>
          <h3>{task.task}</h3>
          <span>{task.time}</span>
        </div>
        <div style={{ alignItems: "center", display: "flex" }}>
          <button
            className={style.button}
            onClick={deleteItem}
            disabled={isSelected}
          >
            <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
