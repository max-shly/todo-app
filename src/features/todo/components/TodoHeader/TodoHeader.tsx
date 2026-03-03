import { Button } from '@/shared/ui/Button/Button';

import styles from './TodoHeader.module.less';

interface TodoHeaderProps {
  hasTodos: boolean;
  onAddTodo: () => void;
  onDeleteAllTodos: () => void;
}

export function TodoHeader({ hasTodos, onAddTodo, onDeleteAllTodos }: TodoHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.btns}>
        <Button onClick={onAddTodo}>Add Todo</Button>
        <Button onClick={onDeleteAllTodos} variant="delete" disabled={!hasTodos}>
          Delete all Todos
        </Button>
      </div>
    </header>
  );
}
