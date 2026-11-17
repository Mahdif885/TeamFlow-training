package com.teamflow.web;

import com.teamflow.service.ApplicationInfoService;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/info")
public class InfoController {

    private final ApplicationInfoService applicationInfoService;

    public InfoController(ApplicationInfoService applicationInfoService) {
        this.applicationInfoService = applicationInfoService;
    }

    @GetMapping
    public Map<String, String> info() {
        return Map.of("description", applicationInfoService.describe());
    }
}