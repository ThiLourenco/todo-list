import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { v4 as uuidV4 } from "uuid";
import { Todo } from '../Todo';
import { TodoEmpty } from '../TodoEmpty';

import styles from './styles.module.css';

interface ITodo {
  id: string;
  content: string;
  completed: boolean;
}

export function Content() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState(0);

  let countTaskDone;

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault();
  
    setTodos([...todos, { id: uuidV4(), content: newTodo, completed: false}]);

    setNewTodo('');
  }
  
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('');
    setNewTodo(event.target.value);
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('Este campo é obrigatório!');
  }

  function completedTask(taskToCompleted: string) {
    const isCompleted = todos.findIndex((todo) => {
      return todo.id === taskToCompleted;
    });

    todos[isCompleted].completed = !todos[isCompleted].completed;

    countTaskDone = todos.filter((todo) => todo.completed === true).length;
    setTasksCompleted(countTaskDone);
  }
  
  function deleteTask(taskToDelete: string) {
    const taskWithoutDeletedOne = todos.filter((todo) => {
      return todo.id != taskToDelete;
    });
    setTodos(taskWithoutDeletedOne);

    countTaskDone = taskWithoutDeletedOne.filter((todo) => todo.completed === true).length;
    setTasksCompleted(countTaskDone);
  }

  const isNewTaskEmpty = newTodo.length === 0; 

  return (
  <div className={styles.wrapper}>
    <form 
      className={styles.form} 
      onSubmit={handleCreateNewTask}
    >
      <input
        type='text'
        className={styles.formInput}
        placeholder='Adicione uma nova tarefa'
        onChange={handleNewTaskChange}
        onInvalid={handleNewTaskInvalid}
        value={newTodo}
        required
      />

      <button 
        type='submit'
        // disabled={isNewTaskEmpty}
      >
        Criar 
      <PlusCircle size={16} />
      </button>
    </form>

    <div className={styles.containerToDo}>
      <div className={styles.context}>
        <div className={styles.todoCreated}>
          <span>Tarefas criadas</span>
          <span>{todos.length}</span>
        </div>

        <div className={styles.todoDone}>
          <span>Concluídas</span>
          <span>{tasksCompleted} de {todos.length}</span>
        </div>
      </div>
      
      <div className={styles.todos}>
        {todos.length != 0 ? (
            <>
            {todos.map((todo) => {
              return (
                <Todo
                  key={todo.id} 
                  todo={todo} 
                  onDeleteTodo={deleteTask}
                  onCompletedTodo={completedTask}
                />
              );
            })}
          </>
        ) : (
          <TodoEmpty />
        )}
      </div>
    </div>
  </div>
  );
}
