package com.teamflow.dto;

import com.teamflow.domain.Task;
import com.teamflow.domain.TaskPriority;
import com.teamflow.domain.TaskStatus;
import java.time.LocalDate;

public record TaskResponse(
        Long id,
        String title,
        TaskStatus status,
        TaskPriority priority,
        LocalDate dueDate,
        String assignee,
        Long projectId) {

    public static TaskResponse from(Task task) {
        return new TaskResponse(task.getId(), task.getTitle(), task.getStatus(), task.getPriority(),
                task.getDueDate(), task.getAssignee(), task.getProject().getId());
    }
}