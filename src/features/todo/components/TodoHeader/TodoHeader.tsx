import { Button } from '@/shared/ui/Button/Button';

import styles from './TodoHeader.module.less';

import type { Todo } from '../../types';

interface TodoHeaderProps {
  hasTodos: boolean;
  onAddTodo: (todo: Todo | null) => void;
  onDeleteAllTodos: () => void;
}

export function TodoHeader({ hasTodos, onAddTodo, onDeleteAllTodos }: TodoHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.btns}>
        <Button onClick={() => onAddTodo(null)}>Add Todo</Button>
        <Button onClick={onDeleteAllTodos} variant="delete" disabled={!hasTodos}>
          Delete all Todos
        </Button>
      </div>
    </header>
  );
}
