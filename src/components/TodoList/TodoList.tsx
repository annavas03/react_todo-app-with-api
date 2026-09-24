import cn from 'classnames';
import { Loader } from '../Loader/Loader';
import { Todo } from '../../types/Todo';
import '../../styles/todoapp.scss';
import '../../styles/todo.scss';

type TodoListProps = {
  todos: Todo[];
  tempTodo: Todo | null;
  deletingTodo: number | null;
  updatingTodos: number[];
  editingTodo: number | null;
  editTitle: string;
  setEditTitle: (title: string) => void;
  handleDelete: (todoId: number) => void;
  handleToggle: (todoId: number, completed: boolean) => void;
  handleEdit: (todo: Todo) => void;
  handleCancelEdit: (event: React.KeyboardEvent) => void;
  handleUpdate: (todo: Todo) => void;
};

export const TodoList = ({
  todos,
  tempTodo,
  deletingTodo,
  updatingTodos,
  editingTodo,
  editTitle,
  setEditTitle,
  handleDelete,
  handleToggle,
  handleEdit,
  handleCancelEdit,
  handleUpdate,
}: TodoListProps) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {todos.map(todo => {
        const isEditing = editingTodo === todo.id;
        const isActiveLoader =
          deletingTodo === todo.id || updatingTodos.includes(todo.id);

        return isEditing ? (
          <div data-cy="Todo" className="todo" key={todo.id}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                readOnly
              />
            </label>
            <form
              onSubmit={event => {
                event.preventDefault();
                handleUpdate(todo);
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editTitle}
                onChange={event => setEditTitle(event.target.value)}
                onBlur={() => handleUpdate(todo)}
                onKeyUp={handleCancelEdit}
                autoFocus
              />
            </form>
            <Loader isActive={isActiveLoader} />
          </div>
        ) : (
          <div
            data-cy="Todo"
            className={cn('todo', { completed: todo.completed })}
            key={todo.id}
          >
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, !todo.completed)}
              />
            </label>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleEdit(todo)}
            >
              {todo.title}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => handleDelete(todo.id)}
            >
              ×
            </button>
            <div
              data-cy="TodoLoader"
              className={cn('modal overlay', {
                'is-active':
                  deletingTodo === todo.id || updatingTodos.includes(todo.id),
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        );
      })}

      {tempTodo && (
        <div data-cy="Todo" className="todo">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={tempTodo.completed}
              readOnly
            />
          </label>
          <span data-cy="TodoTitle" className="todo__title">
            {tempTodo.title}
          </span>

          <Loader isActive={true} />
        </div>
      )}
    </section>
  );
};
