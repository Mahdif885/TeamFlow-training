package com.teamflow.dto;

import com.teamflow.domain.TaskPriority;
import com.teamflow.domain.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record TaskRequest(
        @NotBlank String title,
        @NotNull TaskStatus status,
        @NotNull TaskPriority priority,
        LocalDate dueDate,
        String assignee,
        @NotNull Long projectId) {
}