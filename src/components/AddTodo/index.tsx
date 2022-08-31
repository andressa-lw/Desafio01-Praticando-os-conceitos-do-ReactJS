import { v4 as uuidv4 } from 'uuid';

import { EmptyList } from '../TodoContent/EmptyList';
import { TodoList } from '../TodoContent/TodoList';

import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import styles from './AddTodo.module.css';

interface TodoProps {
  id: string;
  task: string;
  isDone: boolean;
}

export function AddTodo() {
  const [getTodo, setGetTodo] = useState<TodoProps>()
  const [newTodo, setNewTodo] = useState<TodoProps[]>([])
  const [valueTodo, setValueTodo] = useState('')
  const [doneTodo, setDoneTodo] = useState<TodoProps[]>([])

  function handleNewTodoInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')

    setValueTodo(event.target.value)
    setGetTodo({
      id: uuidv4(),
      task: event.target.value,
      isDone: false
    })
  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault();

    //@ts-ignore
    setNewTodo([...newTodo, getTodo])
    setValueTodo('')
  }

  function handleDeleteTodo(todoToDelete: TodoProps) {
    const todoWithoutDeletedOne = newTodo.filter(todo => todo.id !== todoToDelete.id)

    setNewTodo([...todoWithoutDeletedOne])
  }

  function handleSetTodoCompleted(event: ChangeEvent<HTMLInputElement>) {
    const doneTodo = newTodo.map(todo => {
      if (todo.id === event.target.value) todo.isDone = event.target.checked
      return todo
    })

    const selectedTodo = doneTodo.filter(todo => todo.isDone === true)

    setDoneTodo([...selectedTodo])

  }

  const isNewTodoEmpty = valueTodo.length === 0;
  const emptyTodo = newTodo.length === 0;

  return (
    <>
      <section className={styles.containerForm}>
        <form onSubmit={handleCreateNewTodo} className={styles.addTodoForm}>
          <input 
            type="text" 
            placeholder="Adicione uma nova tarefa"
            name="title"
            value={valueTodo}
            onInvalid={handleNewTodoInvalid}
            onChange={handleNewTodoChange}
            required
          />
          <button type="submit" disabled={isNewTodoEmpty}>Criar <PlusCircle size={20} /></button>
        </form>
      </section>
      
      <section className={styles.containerList}>
        <header className={styles.headerTodo}>
          <div className={styles.countAllTodo}>
            Tarefas criadas <span>{newTodo.length}</span>
          </div>

          <div className={styles.countDoneTodo}>
            Concluídas <span>{doneTodo.length}</span>
          </div>
        </header>

        <main>
          {emptyTodo ? <EmptyList /> :
            <div className={styles.contentToDo}>
              <ul>
                {newTodo.map(task => {
                  return (
                    <TodoList
                      key={task.id}
                      todo={task}
                      onDeleteTodo={handleDeleteTodo}
                      todoComplete={handleSetTodoCompleted}
                    />
                  )
                })}
              </ul>
            </div>
          }
        </main>
      </section>
    </>
  )
}