import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <img src="/logo-todo.svg" className="logo" alt="To do" />
    </header>
  )
}