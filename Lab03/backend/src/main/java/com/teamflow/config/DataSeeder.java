package com.teamflow.config;

import com.teamflow.domain.Project;
import com.teamflow.domain.Task;
import com.teamflow.domain.TaskPriority;
import com.teamflow.domain.TaskStatus;
import com.teamflow.repository.ProjectRepository;
import com.teamflow.repository.TaskRepository;
import java.time.LocalDate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedData(ProjectRepository projectRepository, TaskRepository taskRepository) {
        return args -> {
            if (projectRepository.count() > 0) {
                return;
            }

            Project project = new Project();
            project.setName("Portail client");
            project.setDescription("Espace en ligne pour les clients");
            projectRepository.save(project);

            Task task1 = new Task();
            task1.setTitle("Maquetter la page d'accueil");
            task1.setStatus(TaskStatus.TODO);
            task1.setPriority(TaskPriority.HIGH);
            task1.setDueDate(LocalDate.now().plusDays(7));
            task1.setAssignee("Alice");
            task1.setProject(project);

            Task task2 = new Task();
            task2.setTitle("Configurer l'authentification");
            task2.setStatus(TaskStatus.IN_PROGRESS);
            task2.setPriority(TaskPriority.MEDIUM);
            task2.setDueDate(LocalDate.now().plusDays(14));
            task2.setAssignee("Karim");
            task2.setProject(project);

            taskRepository.save(task1);
            taskRepository.save(task2);
        };
    }
}