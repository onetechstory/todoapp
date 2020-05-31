import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';

@Injectable()
export class TodoService {
    public todos: Todo[] = [];
    constructor() {}

    getAllTodos(): Todo[] {
        if (localStorage.getItem('ToDoData') !== null) {
            this.todos = JSON.parse(localStorage.getItem('ToDoData'));
        } else {
            const todoArrayData = [];
            localStorage.setItem('ToDoData', JSON.stringify(todoArrayData));
            this.todos = JSON.parse(localStorage.getItem('ToDoData'));
        }
        const sortIndex = this.todos.findIndex((item) => item.pinned === true);
        this.todos.push(...this.todos.splice(0, sortIndex));
        return this.todos;
    }

    getTodoById(id: number): Todo {
        const todoArray = JSON.parse(localStorage.getItem('ToDoData'));
        return todoArray.filter((todo) => todo.id === id).pop();
    }

    updateTodoById(todo): Todo {
        if (todo.id === '0') {
            const todoArray = JSON.parse(localStorage.getItem('ToDoData'));
            todo.id = '_' + Math.random().toString(36).substr(2, 9);
            todoArray.push(todo);
            localStorage.setItem('ToDoData', JSON.stringify(todoArray));
        } else {
            const todoSaveArray = JSON.parse(localStorage.getItem('ToDoData'));
            for (const i in todoSaveArray) {
                if (todoSaveArray[i].id === todo.id) {
                    todoSaveArray[i] = todo;
                    localStorage.setItem(
                        'ToDoData',
                        JSON.stringify(todoSaveArray)
                    );
                }
            }
        }
        return todo;
    }

    deleteTodoDetail(id) {
        const todoArray = JSON.parse(localStorage.getItem('ToDoData'));
        for (const i in todoArray) {
            if (todoArray[i].id === id) {
                todoArray.splice(i, 1);
                localStorage.setItem('ToDoData', JSON.stringify(todoArray));
            }
        }
    }

    markTodoAsDone(id) {
        const todoArray = JSON.parse(localStorage.getItem('ToDoData'));
        for (const i in todoArray) {
            if (todoArray[i].id === id) {
                if (todoArray[i].isDone) {
                    todoArray[i].isDone = false;
                } else {
                    todoArray[i].isDone = true;
                }
                localStorage.setItem('ToDoData', JSON.stringify(todoArray));
            }
        }
    }

    markTodoAsPinned(id) {
        const todoArray = JSON.parse(localStorage.getItem('ToDoData'));
        todoArray.forEach((element) => {
            if (element.id === id) {
                if (element.pinned) {
                    element.pinned = false;
                } else {
                    element.pinned = true;
                }
            } else {
                element.pinned = false;
            }
        });
        localStorage.setItem('ToDoData', JSON.stringify(todoArray));
    }
}
