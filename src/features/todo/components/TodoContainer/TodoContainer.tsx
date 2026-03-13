import toast from 'react-hot-toast';

import { Button } from '@/shared/ui';

import { TodoHeader, TodoList, TodoModal } from '..';
import { useTodoModal, useTodos } from '../../hooks';

import styles from './TodoContainer.module.less';

import type { Todo } from '../../types';

export function TodoContainer() {
  const {
    todos,
    isLoading,
    addTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
    deleteAllTodos,
    deleteCompletedTodos,
  } = useTodos();
  const { isOpen: isOpenModal, editingTodo, open: openModal, close: closeModal } = useTodoModal();

  const handleSave = async (data: { title: string; date: string }) => {
    try {
      if (editingTodo) {
        await updateTodo({ ...editingTodo, ...data });
        toast.success('Todo updated!');
      } else {
        await addTodo({ ...data, status: 'incomplete' });
        toast.success('Todo added!');
      }
      closeModal();
    } catch {
      // Ошибка уже показана глобально, модалка остаётся открытой
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await toggleTodoStatus(todo);
      toast.success('Todo status toggled!');
    } catch {
      // ошибка уже обработана
    }
  };

  const handleDeleteSingle = async (id: string) => {
    try {
      await deleteTodo(id);
      toast.success('Todo deleted!');
    } catch {
      // ошибка уже обработана
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllTodos();
      toast.success('All todos deleted!');
    } catch {
      // ошибка уже обработана
    }
  };

  const handleDeleteCompleted = async () => {
    try {
      await deleteCompletedTodos();
      toast.success('Completed todos deleted!');
    } catch {
      // ошибка уже обработана
    }
  };

  if (isLoading) {
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
          onDeleteAllTodos={handleDeleteAll}
          hasTodos={todos.length > 0}
        />
        <div className={styles.body}>
          <div className={styles.header}>
            <Button
              variant="delete"
              onClick={handleDeleteCompleted}
              disabled={!todos.some((todo) => todo.status === 'complete')}
            >
              Delete completed Todos
            </Button>
          </div>
          <TodoList
            todos={todos}
            onEditTodo={openModal}
            onChangeTodoStatus={handleToggle}
            onDeleteTodo={handleDeleteSingle}
          />
        </div>
      </section>
      {isOpenModal && (
        <TodoModal initialTodo={editingTodo} onSave={handleSave} onClose={closeModal} />
      )}
    </>
  );
}
