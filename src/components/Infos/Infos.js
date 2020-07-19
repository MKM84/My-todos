import React from 'react';

const Infos = (props) => {
	
	const nbTodos = props.todos.length;
	const nbDone = props.todos.reduce((count, todo) => {
		if (todo.done) {
			return count + 1;
		}
		return count;
	}, 0);

	const itemLeft = nbTodos - nbDone;

	return (
		<footer className="footer">

			<span className="todo-count">

				<strong>({itemLeft}) </strong>
				item{itemLeft > 1 ? 's' : ''} left

			</span>

			<ul className="filters">

				<li>
					<a
						className={props.display === 'all' ? 'selected' : ''}
						href="#/"
						onClick={() => props.onChangeDisplay('all')}>
						All
					</a>
				</li>

				<li>
					<a
						href="#/active"
						className={props.display === 'active' ? 'selected' : ''}
						onClick={() => props.onChangeDisplay('active')}>
						Active
					</a>
				</li>

				<li>
					<a
						href="#/completed"
						className={props.display === 'completed' ? 'selected' : ''}
						onClick={() => props.onChangeDisplay('completed')}>
						Completed
					</a>
				</li>

			</ul>

			<button
				className="clear-completed"
				onClick={props.onClearComplete}>
				Clear completed ({nbDone})
			</button>

		</footer>
	);
};

export default Infos;
