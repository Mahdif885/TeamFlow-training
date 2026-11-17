export interface TaskLike {
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate: string | null;
}

export function isOverdue(task: TaskLike, today: Date = new Date()): boolean {
  if (task.status === 'DONE' || !task.dueDate) {
    return false;
  }
  const todayIso = today.toISOString().slice(0, 10);
  return task.dueDate < todayIso;
}