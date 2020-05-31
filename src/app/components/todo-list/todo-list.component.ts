import { Component, OnInit } from '@angular/core';
import { Todo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'todo-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    public todos: Todo[] = [];
    task = new FormControl('');
    edittask = new FormControl();
    edittaskData: any;
    date: any;
    editForm: boolean;
    noData: boolean;

    constructor(private todoService: TodoService) {}

    ngOnInit() {
        this.prepareDate();
        this.loadAllTodoList();
    }

    prepareDate() {
        const d = new Date();
        this.date = {
            date: d.getDate(),
            month: d.toLocaleString('default', { month: 'long' }),
            year: d.getFullYear()
        };
    }

    loadAllTodoList() {
        this.todos = this.todoService.getAllTodos();
        if (this.todos.length > 0) {
            this.noData = false;
        } else {
            this.noData = true;
        }
    }

    onClickTodoDelete(id) {
        this.todoService.deleteTodoDetail(id);
        this.loadAllTodoList();
    }

    onClickToDoEdit(id) {
        this.edittaskData = this.todoService.getTodoById(id);
        this.editForm = true;
    }

    markAsDone(id) {
        this.todoService.markTodoAsDone(id);
        this.loadAllTodoList();
    }

    markAsPinned(id) {
        this.todoService.markTodoAsPinned(id);
        this.loadAllTodoList();
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
        const sortIndex = this.todos.findIndex((item) => item.pinned === true);
        this.todos.push(...this.todos.splice(0, sortIndex));
    }

    onTodoSubmitForm() {
        if (this.task.value !== '') {
            const todos = {
                id: '0',
                task: this.task.value,
                pinned: false,
                isDone: false
            };
            this.todoService.updateTodoById(todos);
            this.task.setValue('');
            this.loadAllTodoList();
        }
    }

    onTodoEditForm(editedData: any) {
        const todos = {
            id: editedData.id,
            task: this.edittask.value,
            pinned: editedData.pinned,
            isDone: editedData.isDone
        };
        this.todoService.updateTodoById(todos);
        this.edittask.setValue('');
        this.edittaskData = null;
        this.loadAllTodoList();
        this.editForm = false;
    }
}
