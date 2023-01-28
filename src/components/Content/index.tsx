import { ClipboardText, PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Todo } from '../Todo';

import styles from './styles.module.css';

interface ITodo {
  content: string;
  completed: boolean;
}

export function Content() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault();
  
    setTodos([...todos, { content: newTodo, completed: false}]);

    setNewTodo('');
  }
  
  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>){
    event.target.setCustomValidity('');
    setNewTodo(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>){
    event.target.setCustomValidity('Este campo é obrigatório!');
  }
  
  function deleteToDo(contentTodo: string){
    const commentsWithoutDeleteOne = todos.filter(todo => {
      return todo.content !== contentTodo;
    });
    setTodos(commentsWithoutDeleteOne);
  }

  function completedTodo(contentTodo: string){
    const commentsWithoutDeleteOne = todos.map(todo=>{
      if(todo.content === contentTodo){
          return {...todo, completed: !todo.completed}
      }else{
          return todo;
      }  
    })
    setTodos(commentsWithoutDeleteOne)
  }

  const isNewTaskEmpty = newTodo.length === 0; 

  function toDoCompleted(): number {
    let toDoCompleted = todos.filter((todo) => todo.completed === true)
    return toDoCompleted.length;
  }

  return (
  <div className={styles.wrapper}>
    <form 
      className={styles.form} 
      onSubmit={handleCreateNewTask}
    >
      <input
        className={styles.formInput}
        name='description'
        placeholder='Adicione uma nova tarefa'
        onChange={handleNewTaskChange}
        onInvalid={handleNewTaskInvalid}
        value={newTodo}
        required
      />

      <button 
        type='submit'
        disabled={isNewTaskEmpty}
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
          <span>{toDoCompleted()} de {todos.length}</span>
        </div>
      </div>
      
      <div className={styles.todos}>
        {
          todos.length > 0 && 
            todos.map((todo) => {
              return (
                <Todo
                  key={todo.content} 
                  content={todo.content} 
                  completed={todo.completed} 
                  deleteTodo={deleteToDo}
                  completedTodo={completedTodo}
                />
              )
            })
        }
        {
          todos.length === 0 && 
          <div className={styles.emptyContent}>
            <ClipboardText size={56} weight='thin' className={styles.icon} />

            <p className={styles.firstMessage}>
            Você ainda não tem tarefa cadastradas
            </p>

            <p className={styles.secondMessage}>
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>  
        }
      </div>
    </div>
  </div>
  );
}
