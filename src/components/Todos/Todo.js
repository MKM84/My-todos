import React from 'react';

const Todo = (props) => {
	const li_class = [];
	if (props.todo.done) {
		li_class.push('completed');
	}
	if (props.editId === props.todo.id) {
		li_class.push('editing');
	}

	return (
		<li className={li_class.join(' ')}>

			<div className="view">

				<input
				className="toggle"
				type="checkbox"
				onClick={() => props.onToggleTodoDone(props.todo.id)}
				checked={props.todo.done}
				readOnly />

				<label
				onDoubleClick={() => props.onEditId(props.todo.id)}>
				{props.todo.title}
				</label>

				<button
				className="destroy"
				onClick={() => props.onRemoveTodo(props.todo.id)}>					
				</button>

			</div>

				<input className="edit"
				defaultValue={props.todo.title}
				onKeyDown={props.onChangeTodoTitle} />

		</li>
	);
};

export default Todo;
