package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Evento;
import com.lpdev.ondepassa.model.dto.AccessLogsDTO;
import com.lpdev.ondepassa.service.AccessLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/logs")
public class AccessLogController {

    private final AccessLogService accessLogService;

    public AccessLogController(AccessLogService accessLogService) {
        this.accessLogService = accessLogService;
    }

    @PostMapping
    public ResponseEntity<String> logAccess(@RequestParam String route) {
        accessLogService.logAccess(route);
        return ResponseEntity.ok("Access logged successfully.");
    }

    @Operation(summary = "Count Events for today",
            description = "Count Events for today",
            tags = {"Events"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200", content = {
                            @Content(
                                    array = @ArraySchema(schema = @Schema(implementation = Evento.class))
                            )
                    }),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @GetMapping("/hoje/contagem")
    public AccessLogsDTO countEventosForToday() {
        return new AccessLogsDTO(accessLogService.countEventosForToday());
    }

    @Operation(summary = "Count All Events",
            description = "Count All Events",
            tags = {"Events"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200", content = {
                            @Content(
                                    array = @ArraySchema(schema = @Schema(implementation = Evento.class))
                            )
                    }),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @GetMapping("/contagem")
    public AccessLogsDTO countAllEventos() {
        return new AccessLogsDTO(accessLogService.countAllEventos());
    }
}
