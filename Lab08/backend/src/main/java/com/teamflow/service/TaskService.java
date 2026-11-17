package com.teamflow.service;

import com.teamflow.domain.Project;
import com.teamflow.domain.Task;
import com.teamflow.domain.TaskStatus;
import com.teamflow.dto.TaskRequest;
import com.teamflow.dto.TaskResponse;
import com.teamflow.repository.ProjectRepository;
import com.teamflow.repository.TaskRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<TaskResponse> list(Long projectId, TaskStatus status) {
        return taskRepository.findAll().stream()
                .filter(t -> projectId == null || t.getProject().getId().equals(projectId))
                .filter(t -> status == null || t.getStatus() == status)
                .map(TaskResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TaskResponse get(Long id) {
        return TaskResponse.from(find(id));
    }

    public TaskResponse create(TaskRequest request) {
        Task task = new Task();
        apply(task, request);
        return TaskResponse.from(taskRepository.save(task));
    }

    public TaskResponse update(Long id, TaskRequest request) {
        Task task = find(id);
        apply(task, request);
        return TaskResponse.from(task);
    }

    public void delete(Long id) {
        taskRepository.delete(find(id));
    }

    private void apply(Task task, TaskRequest request) {
        Project project = projectRepository.findById(request.projectId())
                .orElseThrow(() -> new NotFoundException("Projet introuvable : " + request.projectId()));
        task.setTitle(request.title());
        task.setStatus(request.status());
        task.setPriority(request.priority());
        task.setDueDate(request.dueDate());
        task.setAssignee(request.assignee());
        task.setProject(project);
    }

    private Task find(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Tâche introuvable : " + id));
    }
}