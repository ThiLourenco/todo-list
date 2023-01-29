import { Trash } from 'phosphor-react';
import styles from './styles.module.css';

interface ITodo {
  id: string;
  content: string;
  completed: boolean;
}

interface ITodoProps {
  todo: ITodo;
  onDeleteTodo: (todo: string) => void;
  onCompletedTodo: (todo: string) => void;
}

export function Todo({ todo, onDeleteTodo, onCompletedTodo }: ITodoProps) {
  
  function handleCheckTodo() {
    onCompletedTodo(todo.id);
  }

  function handleDeleteTodo() {
    onDeleteTodo(todo.id);
  }

  return (
    <div className={styles.todo}>
      <label className={styles.container}>

          <input 
            id='complete'
            type='checkbox'
            name='complete'  
            onChange={handleCheckTodo}      
          />

        <span className={styles.checkbox}></span>
      </label>

      <p className={todo.completed ? styles.textTodoFalse : styles.textTodo}>
        {todo.content}
      </p>
    
        <Trash size={24} className={styles.trash} onClick={handleDeleteTodo} />

    </div>
  )
}
