import { ClipboardText } from 'phosphor-react';
import styles from './styles.module.css';

export function TodoEmpty() {
  return (
      <div className={styles.emptyContent}>
        <ClipboardText size={56} weight='thin' className={styles.icon} />

        <p className={styles.firstMessage}>
        Você ainda não tem tarefas cadastradas
        </p>

        <p className={styles.secondMessage}>
          Crie tarefas e organize seus itens a fazer
        </p>
      </div>  
  )
}