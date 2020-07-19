import React, { useState } from 'react';
import './App.css';
import uniqid from 'uniqid';
import Todos from './components/Todos/Todos';
import Infos from './components/Infos/Infos';


if (!(JSON.parse(localStorage.getItem('storedTodos')))){
	let myTodos = [];
let storedTodos = JSON.stringify(myTodos);

localStorage.setItem('storedTodos', storedTodos);

}


const App = () => {
	


	const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('storedTodos')));

	const [display, setDisplay] = useState('all');

	const [editId, setEditId] = useState('');



	const onClearComplete = () => {
		let completedsTodos = todos.filter((todo) => todo.done === false);
		setTodos(completedsTodos);
		let todosToStore = JSON.stringify(completedsTodos);
		localStorage.setItem('storedTodos', todosToStore);
	};

	const onAddInput = (event) => {
		if (event.keyCode === 13 && event.target.value !== '' && event.target.value !== ' ') {
			let todosWithNewTodo = [{ id: uniqid(), title: event.target.value, done: false }, ...todos];
			setTodos(todosWithNewTodo);
			event.target.value = '';

			let todosToStore = JSON.stringify(todosWithNewTodo);
			localStorage.setItem('storedTodos', todosToStore);
		}

	};

	const onToggleTodoDone = (id) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) todo.done = !todo.done;
				return todo;
			})
		);
		let todosToStore = JSON.stringify(todos);
		localStorage.setItem('storedTodos', todosToStore);
	};

	const onRemoveTodo = (id) => {
		let todosAfterRemoveTodo = todos.filter((todo) => todo.id !== id);
		setTodos(todosAfterRemoveTodo);

		let todosToStore = JSON.stringify(todosAfterRemoveTodo);
		localStorage.setItem('storedTodos', todosToStore);
	};

	const onChangeTodoTitle = (event) => {
		if (event.keyCode === 13 && event.target.value !== '') {
			const title = event.target.value;
			setTodos(
				todos.map((todo) => {
					if (todo.id === editId) todo.title = title;
					return todo;
				})
			);
			setEditId('');
		}
		let todosToStore = JSON.stringify(todos);
		localStorage.setItem('storedTodos', todosToStore);
	};

	const onToggleAll = (e) => {
		if(e.target.checked){ 
			setTodos(
				todos.map((todo) => {
				  todo.done = true;
				  return todo;
				})
			)
		}
		else if(e.target.checked === false){ 
			setTodos(
				todos.map((todo) => {
				  todo.done = false;
				  return todo;
				})
			)
		}
		let todosToStore = JSON.stringify(todos);
		localStorage.setItem('storedTodos', todosToStore);
	};


	return (
		<div>
			<section className="todoapp">
			
				<header className="header">

					<h1>My todos</h1>

					<input
						className="new-todo"
						onKeyDown={onAddInput}
						placeholder="What needs to be done?"
						autoFocus />

				</header>

				<section className="main">

					<input
						id="toggle-all"
						className="toggle-all"
						type="checkbox"
						onClick={(e) => onToggleAll(e)} />

					<label htmlFor="toggle-all">Mark all as complete</label>

					<Todos
						todos={todos}
						display={display}
						onToggleTodoDone={onToggleTodoDone}
						onRemoveTodo={onRemoveTodo}
						onEditId={setEditId}
						editId={editId}
						onChangeTodoTitle={onChangeTodoTitle}
					/>

				</section>

					<Infos
						todos={todos}
						display={display}
						onChangeDisplay={setDisplay}
						onClearComplete={onClearComplete} />

			</section>


		</div>
	);
};

export default App;
