import { ITask } from "../../types/task";
import Item from "./Item";
import style from "./style.module.scss";

export default function List({
  tasks,
  itemSelected,
  selectItem,
}: {
  tasks: ITask[];
  itemSelected: ITask | null;
  selectItem: Function;
}) {
  return (
    <aside className={style.taskList}>
      <h2>Tarefas do dia</h2>
      <ul>
        {tasks.map((item) => (
          <Item
            selectItem={selectItem}
            isSelected={
              itemSelected !== null ? item.id === itemSelected.id : false
            }
            task={item}
            key={item.id}
          />
        ))}
      </ul>
    </aside>
  );
}
