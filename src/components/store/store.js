import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
	plugins: [createPersistedState()],
	state() {
		return {
			todos: [],
		}
	},
	getters: {
		getTodos(state) {
			return state.todos;
		}
	},
	mutations: {
		addTodo(state, todo) {
			state.todos.push(todo);
		},
		editTodo(state, { todo, title = todo.title, completed = todo.completed }) {
			const index = state.todos.indexOf(todo);

			state.todos.splice(index, 1, {
				...todo,
				title,
				completed,
			})
		},
		removeTodo(state, todo) {
			state.todos.splice(state.todos.indexOf(todo), 1)
		}
	},
	actions: {
		addTodo(context, todo) {
			context.commit('addTodo', todo);
		},
		removeTodo(context, todo) {
			context.commit('removeTodo', todo);
		},
		toggleTodo(context, todo) {
			context.commit('editTodo', { todo, completed: !todo.completed });
		},
		editTodo(context, { todo, title }) {
			context.commit('editTodo', { todo, title });
		},
		toggleAll(context, completed) {
			context.state.todos.forEach((todo) => {
				context.commit('editTodo', { todo, completed })
			});
		},
		clearCompleted(context) {
			context.state.todos.filter(todo => todo.completed)
				.forEach(todo => {
					context.commit('removeTodo', todo);
				});
		},
	}
});