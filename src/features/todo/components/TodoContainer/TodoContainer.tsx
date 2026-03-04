import { Button } from '@/shared/ui/Button/Button';

import { useTodoModal } from '../../hooks/useTodoModal';
import { useTodos } from '../../hooks/useTodos';
import { TodoHeader } from '../TodoHeader/TodoHeader';
import { TodoList } from '../TodoList/TodoList';
import { TodoModal } from '../TodoModal/TodoModal';

import styles from './TodoContainer.module.less';

export function TodoContainer() {
  const { state: todosState, addTodo, updateTodo, toggleTodoStatus } = useTodos();
  const { isOpen: isOpenModal, editingTodo, open: openModal, close: closeModal } = useTodoModal();

  const handleSave = (data: { title: string; date: string }) => {
    if (editingTodo) {
      updateTodo({ ...editingTodo, ...data });
    } else {
      addTodo({ ...data, status: 'incomplete' });
    }

    closeModal();
  };

  return (
    <>
      <section className={styles.container}>
        <TodoHeader
          onAddTodo={openModal}
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
            onEditTodo={openModal}
            onChangeTodoStatus={toggleTodoStatus}
            onDeleteTodo={() => {}}
          />
        </div>
      </section>
      {isOpenModal && (
        <TodoModal initialTodo={editingTodo} onSave={handleSave} onClose={closeModal} />
      )}
    </>
  );
}
