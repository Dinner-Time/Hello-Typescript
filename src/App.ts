import { qs } from './util';
import { v4 as uuidV4 } from 'uuid';
import type { Task } from './types';

const LOCALSTORAGE_NAME: string = 'TASK';
const tasks: Task[] = loadTasks(LOCALSTORAGE_NAME);
const DOM = {
  list: qs('#list') as HTMLUListElement,
  form: qs('#task-form') as HTMLFormElement,
  input: qs('#task-input') as HTMLInputElement,
  addBtn: qs('#task-add') as HTMLButtonElement,
  submitBtn: qs('#task-submit') as HTMLButtonElement,
};

function App() {
  const { list, input, addBtn, submitBtn } = DOM;

  for (const t of tasks) addListItem(t, list);

  addBtn.addEventListener('click', () => addBtnClickHandler(tasks, input, list));
  submitBtn.addEventListener('click', () => saveTasks(LOCALSTORAGE_NAME, tasks));
}

function addBtnClickHandler(tasks: Task[], input: HTMLInputElement, list: HTMLUListElement) {
  if (input.value === '' || input.value === null) return;

  const task: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(task);

  addListItem(task, list);
  input.value = '';
}

function addListItem(task: Task, list: HTMLUListElement) {
  const { id, title, completed, createdAt } = task;

  const item = document.createElement('li') as HTMLLIElement;
  item.dataset.key = id;

  const label = document.createElement('label') as HTMLLabelElement;

  const checkbox = document.createElement('input') as HTMLInputElement;
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => (task.completed = checkbox.checked));

  const deleteBtn = document.createElement('button') as HTMLButtonElement;
  deleteBtn.type = 'button';
  deleteBtn.addEventListener('click', () => {
    const idx: number = tasks.findIndex((item) => item.id == id);
    tasks.splice(idx, 1);
    qs(`[data-key="${id}"]`).remove();
  });
  deleteBtn.textContent = 'delete';

  label.append(checkbox, title, deleteBtn);
  item.append(label);
  list.append(item);
}

function saveTasks(name: string, item: Task[]) {
  localStorage.setItem(name, JSON.stringify(item));
}

function loadTasks(name: string): Task[] {
  const item = localStorage.getItem(name);

  if (item == null) return [];
  return JSON.parse(item);
}

export { App };
