package com.teamflow.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

import com.teamflow.domain.Project;
import com.teamflow.dto.ProjectResponse;
import com.teamflow.repository.ProjectRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @Test
    void getRenvoieLeProjet() {
        Project project = new Project();
        project.setId(1L);
        project.setName("Portail client");
        project.setDescription("Espace en ligne pour les clients");
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        ProjectResponse response = projectService.get(1L);

        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.name()).isEqualTo("Portail client");
    }

    @Test
    void getLeveNotFoundExceptionSiAbsent() {
        when(projectRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> projectService.get(99L))
                .isInstanceOf(NotFoundException.class)
                .hasMessageContaining("99");
    }
}