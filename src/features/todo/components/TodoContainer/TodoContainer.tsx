import { Button } from '@/shared/ui';

import { TodoHeader, TodoList, TodoModal } from '..';
import { useTodoModal } from '../../hooks/useTodoModal';
import { useTodos } from '../../hooks/useTodos';

import styles from './TodoContainer.module.less';

export function TodoContainer() {
  const {
    state: todosState,

    addTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
    deleteAllTodos,
    deleteCompletedTodos,
  } = useTodos();
  const { isOpen: isOpenModal, editingTodo, open: openModal, close: closeModal } = useTodoModal();

  const handleSave = (data: { title: string; date: string }) => {
    if (editingTodo) {
      updateTodo({ ...editingTodo, ...data });
    } else {
      addTodo({ ...data, status: 'incomplete' });
    }

    closeModal();
  };

  if (todosState.isLoading) {
    return (
      <section className={styles.container}>
        <p>Loading....</p>
      </section>
    );
  }

  return (
    <>
      <section className={styles.container}>
        <TodoHeader
          onAddTodo={openModal}
          onDeleteAllTodos={deleteAllTodos}
          hasTodos={todosState.todos.length > 0}
        />
        <div className={styles.body}>
          <div className={styles.header}>
            <Button
              variant="delete"
              onClick={deleteCompletedTodos}
              disabled={!todosState.todos.some((todo) => todo.status === 'complete')}
            >
              Delete completed Todos
            </Button>
          </div>
          <TodoList
            todos={todosState.todos}
            onEditTodo={openModal}
            onChangeTodoStatus={toggleTodoStatus}
            onDeleteTodo={deleteTodo}
          />
        </div>
      </section>
      {isOpenModal && (
        <TodoModal initialTodo={editingTodo} onSave={handleSave} onClose={closeModal} />
      )}
    </>
  );
}
