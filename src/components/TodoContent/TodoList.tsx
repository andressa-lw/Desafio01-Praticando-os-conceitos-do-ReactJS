import { Check, Trash } from 'phosphor-react'
import { ChangeEvent } from 'react';

import styles from './TodoList.module.css';

interface TodoType {
  id: string;
  task: string;
  isDone: boolean;
}

interface TodoProps {
  todo: TodoType;
  onDeleteTodo: (todo: TodoType) => void;
  todoComplete(event: ChangeEvent<HTMLInputElement>): void;
}

export function TodoList({ todo, onDeleteTodo, todoComplete }: TodoProps) {
  return (
    <li className={styles.todoLi}>
      <input type="checkbox" value={todo.id} onChange={(e) => todoComplete(e)} />
      <span>{todo.task}</span>
      <button onClick={() => onDeleteTodo(todo)} title="Deletar todo"><Trash size={20} /></button>
    </li>
  )
}