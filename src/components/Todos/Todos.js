import React from 'react';
import Todo from './Todo';
import uniqid from 'uniqid';

const Todos = (props) => {
	const listFiltered = props.todos.filter(
		(todo) => props.display === 'all' ||
		(props.display === 'active' && todo.done === false) ||
		(props.display === 'completed' && todo.done === true)
	);
	const todosJsx = listFiltered.map((todo) => (
		<Todo
			display={props.display}
			onToggleTodoDone={props.onToggleTodoDone}
			onRemoveTodo={props.onRemoveTodo}
			todo={todo}
			key={uniqid()}
			editId={props.editId}
			onEditId={props.onEditId}
			onChangeTodoTitle={props.onChangeTodoTitle}
		/>
	));

	return <ul className="todo-list">{todosJsx}</ul>;
};

export default Todos;
