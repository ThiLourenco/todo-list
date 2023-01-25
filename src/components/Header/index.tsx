import styles from './style.module.css';
import logo from '../../assets/todo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo Ignite Todo" />
    </header>
  );
};
