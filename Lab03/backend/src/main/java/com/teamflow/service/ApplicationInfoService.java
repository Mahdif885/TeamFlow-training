package com.teamflow.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ApplicationInfoService {

    private final String applicationName;

    public ApplicationInfoService(@Value("${spring.application.name:teamflow-api}") String applicationName) {
        this.applicationName = applicationName;
    }

    public String describe() {
        return applicationName + " - API REST Spring Boot";
    }
}