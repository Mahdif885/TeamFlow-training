package com.teamflow.service;

import com.teamflow.domain.Project;
import com.teamflow.dto.ProjectRequest;
import com.teamflow.dto.ProjectResponse;
import com.teamflow.repository.ProjectRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> list() {
        return projectRepository.findAll().stream().map(ProjectResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse get(Long id) {
        return ProjectResponse.from(find(id));
    }

    public ProjectResponse create(ProjectRequest request) {
        Project project = new Project();
        project.setName(request.name());
        project.setDescription(request.description());
        return ProjectResponse.from(projectRepository.save(project));
    }

    public ProjectResponse update(Long id, ProjectRequest request) {
        Project project = find(id);
        project.setName(request.name());
        project.setDescription(request.description());
        return ProjectResponse.from(project);
    }

    public void delete(Long id) {
        projectRepository.delete(find(id));
        projectRepository.flush(); 
    }

    private Project find(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Projet introuvable : " + id));
    }
}