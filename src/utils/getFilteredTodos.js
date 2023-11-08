export function getFilteredTodos(todos, filterParam) {
	switch (filterParam) {
		case('all'):
			return todos;
		case ('active'):
			return todos.filter(({ completed }) => !completed);
		case('completed'):
			return todos.filter(({ completed }) => completed);
	}
}