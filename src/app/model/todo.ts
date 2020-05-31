export class Todo {
    constructor(
        public id: string,
        public task: string,
        public pinned: boolean,
        public isDone: boolean
    ) {}
}
