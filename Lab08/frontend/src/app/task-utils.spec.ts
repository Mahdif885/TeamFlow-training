import { describe, expect, it } from 'vitest';
import { isOverdue } from './task-utils';

describe('isOverdue', () => {
  const today = new Date('2026-11-17T12:00:00Z');

  it('signale une tâche non terminée dont l’échéance est passée', () => {
    expect(isOverdue({ status: 'TODO', dueDate: '2026-11-10' }, today)).toBe(true);
  });

  it('ne signale pas une tâche terminée, même en retard', () => {
    expect(isOverdue({ status: 'DONE', dueDate: '2026-11-10' }, today)).toBe(false);
  });
});


