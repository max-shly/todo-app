import { Button } from '@/shared/ui/Button/Button';

import { useTodos } from '../../hooks/useTodos';
import { TodoHeader } from '../TodoHeader/TodoHeader';
import { TodoList } from '../TodoList/TodoList';

import styles from './TodoContainer.module.less';

export function TodoContainer() {
  const { state: todosState } = useTodos();

  return (
    <div className={styles.container}>
      <TodoHeader
        onAddTodo={() => {}}
        onDeleteAllTodos={() => {}}
        hasTodos={todosState.todos.length > 0}
      />
      <div className={styles.body}>
        <div className={styles.header}>
          <Button variant="delete" onClick={() => {}} disabled={todosState.todos.length > 0}>
            Delete comleted Todos
          </Button>
        </div>
        <TodoList
          todos={todosState.todos}
          onEditTodo={() => {}}
          onChangeTodoStatus={() => {}}
          onDeleteTodo={() => {}}
        />
      </div>
    </div>
  );
}
