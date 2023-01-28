import { ChangeEvent } from 'react';
import { Trash } from 'phosphor-react';
import styles from './styles.module.css';

interface ITodoProps {
  content: string;
  completed: boolean;
  deleteTodo: (contentTodo: string) => void;
  completedTodo: (contentTodo: string) => void;
}

export function Todo({ content, completed, deleteTodo, completedTodo }: ITodoProps) {
  
  function handleCheckTodo(event: ChangeEvent<HTMLInputElement>) {
    completedTodo(content);
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

      <p className={completed ? styles.textTodoFalse : styles.textTodo}>
        {content}
      </p>

      <Trash size={24} className={styles.trash} onClick={() => deleteTodo(content)} />
    </div>
  )
}
