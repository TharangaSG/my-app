
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoItem {
  title: string;
  id: number;
  description: string;
  completedOn: string;
}

interface TodoState {
  allTodos: TodoItem[];
  completedTodos: TodoItem[];
}

const initialState: TodoState = {
  allTodos: [],
  completedTodos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<TodoItem[]>) => {
      state.allTodos = action.payload;
    },
    setCompletedTodos: (state, action: PayloadAction<TodoItem[]>) => {
      state.completedTodos = action.payload;
    },
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.allTodos.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.allTodos = state.allTodos.filter((todo) => todo.id !== action.payload);
    },
    deleteCompletedTodo: (state, action: PayloadAction<number>) => {
      state.completedTodos = state.completedTodos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<{ id: number; completedOn: string }>) => {
      const { id, completedOn } = action.payload;
      const todoIndex = state.allTodos.findIndex((todo) => todo.id === id);
      state.allTodos.splice(todoIndex, 1);

      const completedTodo = { ...state.allTodos[todoIndex], completedOn };
      state.completedTodos.push(completedTodo);
    },
  },
});

export const { setTodos, setCompletedTodos, addTodo, deleteTodo, deleteCompletedTodo, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;
