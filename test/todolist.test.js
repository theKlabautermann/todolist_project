const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('size() returns length of list', () => {
    expect(list.size()).toBe(3);
  });

  test("toArray() returns list as Array", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test("first() returns the first todo", () => {
    expect(list.first()).toBe(todo1);
  });

  test("last() returns the last todo", () => {
    expect(list.last()).toBe(todo3);
  });

  test("shift() removes the first element from list & returns it", () => {
    expect(list.shift()).toBe(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test("pop() removes the last element from list & returns it", () => {
    expect(list.pop()).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test("isDone() checks if all todos are done & returns boolean", () => {
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test("add() adds (only) todo objects to the list", () => {
    let todo4 = new Todo("Meditate");
    list.add(todo4);
    expect(list.toArray()).toEqual([todo1, todo2, todo3, todo4]);
    expect(() => list.add()).toThrow(TypeError);
    expect(() => list.add(1)).toThrow(TypeError);
    expect(() => list.add("Test")).toThrow(TypeError);
    expect(() => list.add({title: "Journal", done: false})).toThrow(TypeError);
  });

  test("itemAt() returns the appropriate todo for valid indexes", () => {
    expect(list.itemAt(0)).toBe(todo1);
    expect(list.itemAt(1)).toBe(todo2);
    expect(() => list.itemAt()).toThrow(ReferenceError);
    expect(() => list.itemAt("one")).toThrow(ReferenceError);
    expect(() => list.itemAt(100)).toThrow(ReferenceError);
  });

  test("markDoneAt() marks only todos with valid indexes as done", () => {
    list.markDoneAt(1);
    expect(todo1.done).toBe(false);
    expect(todo2.done).toBe(true);
    expect(todo3.done).toBe(false);
    expect(() => list.markDoneAt()).toThrow(ReferenceError);
    expect(() => list.markDoneAt("one")).toThrow(ReferenceError);
    expect(() => list.markDoneAt(1000)).toThrow(ReferenceError);
  });

  test("markDoneAt() marks only todos with valid indexes as done", () => {
    list.markAllDone();
    list.markUndoneAt(1);
    expect(todo1.done).toBe(true);
    expect(todo2.done).toBe(false);
    expect(todo3.done).toBe(true);
    expect(() => list.markUndoneAt()).toThrow(ReferenceError);
    expect(() => list.markUndoneAt("one")).toThrow(ReferenceError);
    expect(() => list.markUndoneAt(1000)).toThrow(ReferenceError);
  });

  test("markAllDone() marks all tasks as done", () => {
    list.markAllDone();
    expect(todo1.done).toBe(true);
    expect(todo2.done).toBe(true);
    expect(todo3.done).toBe(true);
  });

  test("removeAt() removes tasks with invalid indexes and returns them", () => {
    expect(list.removeAt(1)).toBe(todo2);
    expect(list.toArray()).toEqual([todo1, todo3]);
    expect(() => list.removeAt()).toThrow(ReferenceError);
    expect(() => list.removeAt("one")).toThrow(ReferenceError);
    expect(() => list.removeAt(1000)).toThrow(ReferenceError);
  });

  test("toString() lists all todos in the desired form", () => {
    list.markAllDone();
    let title = `---- ${list.title} ----`;
    let str1 = todo1.toString();
    let str2 = todo2.toString();
    let str3 = todo3.toString();
    expect(list.toString()).toBe(`${title}\n${str1}\n${str2}\n${str3}`);
  });

  test("forEach operates over all todos", () => {
    let titles = [];
    list.forEach(task => titles.push(task.title));
    expect(titles).toEqual([todo1.title, todo2.title, todo3.title]);
  });

  test("filter returns a new list based on callback", () => {
    expect(list.filter(task => task)).toEqual(list);
    list.markDoneAt(1);
    expect(list.filter(task => task.done).toArray()).toEqual([todo2]);
    list.markAllDone();
    expect(list.filter(task => task.done)).toEqual(list);
  });
});