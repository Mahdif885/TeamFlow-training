package com.teamflow.dto;

import com.teamflow.domain.Project;

public record ProjectResponse(Long id, String name, String description) {

    public static ProjectResponse from(Project project) {
        return new ProjectResponse(project.getId(), project.getName(), project.getDescription());
    }
}