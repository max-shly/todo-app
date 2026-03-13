import { TodoItem } from '..';

import styles from './TodoList.module.less';

import type { Todo } from '../../types';

interface TodoListProps {
  todos: Todo[];
  onEditTodo: (todo: Todo) => void;
  onChangeTodoStatus: (todo: Todo) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList({ todos, onEditTodo, onChangeTodoStatus, onDeleteTodo }: TodoListProps) {
  if (todos.length === 0) return <p className={styles.empty}>No Todos</p>;

  return (
    <div className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEditTodo={onEditTodo}
          onChangeTodoStatus={onChangeTodoStatus}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}
