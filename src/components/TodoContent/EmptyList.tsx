import styles from './Empty.module.css';

export function EmptyList() {
  return (
    <div className={styles.contentToDoEmpty}>
      <img src="/clipboard.png" alt="Empty" />
      <p><strong>Você ainda não tem tarefas cadastradas</strong>
      Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}