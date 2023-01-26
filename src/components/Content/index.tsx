import { PlusCircle } from 'phosphor-react';
import styles from './styles.module.css';

export function Content() {
  return (
  <div className={styles.wrapper}>
    <form className={styles.form}>
      <input
        className={styles.formInput}
        name='description'
        placeholder='Adicione uma nova tarefa'
        required
      />

      <button 
        type='submit'
      >
        Criar 
      <PlusCircle size={16} />
      </button>
    </form>

    <div className={styles.containerTODO}>
      <div className={styles.context}>
        <div className={styles.created}>
          <span>Tarefaz criadas</span>
          
        </div>

        <div className={styles.done}>
          <span>Concluídas</span>
          <span>

          </span>
        </div>
      </div>
    </div>
  </div>
  );
}