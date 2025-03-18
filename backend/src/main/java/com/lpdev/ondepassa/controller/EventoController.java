package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Evento;
import com.lpdev.ondepassa.service.EventoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evento")
@Tag(name="Events", description = "Endpoints for managing Events")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @Operation(summary = "Find Event by ID",
            description = "Find Event by ID",
            tags = {"Event"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = Evento.class))

                    ),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Requestt", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @GetMapping("/{id}")
    public ResponseEntity<Evento> get(@PathVariable Long id){
        var response = eventoService.get(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Find All Events",
            description = "Find All Events",
            tags = {"Events"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200", content = {
                            @Content(
                                    array = @ArraySchema(schema = @Schema(implementation = Evento.class))
                            )
                    }),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Requestt", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @GetMapping
    public ResponseEntity<List<Evento>> get(){
        var response = eventoService.get();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Find Event by Local",
            description = "Find Event by Local",
            tags = {"Event"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = Evento.class))

                    ),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Requestt", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @GetMapping("/bylocal")
    public ResponseEntity<List<Evento>> get(@RequestParam String local){
        var response = eventoService.get(local);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Paginate Events",
            description = "Paginate Events",
            tags = {"Events"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200", content = {
                            @Content(
                                    array = @ArraySchema(schema = @Schema(implementation = Evento.class))
                            )
                    }),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Requestt", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @GetMapping("/paginated")
    public ResponseEntity<Page<Evento>> getPaginated(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        var response = eventoService.getPaginated(page, size);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Create a Event",
            description = "Create a Event",
            tags = {"Event"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = Evento.class))

                    ),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Requestt", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Evento> post(@Validated @RequestBody Evento evento){
        var response = eventoService.post(evento);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update a Event",
            description = "Update a Event",
            tags = {"Event"},
            responses = {
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Requestt", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> put(@PathVariable Long id, @RequestBody Evento evento){
        eventoService.put(evento, id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Delete a Event",
            description = "Delete a Event",
            tags = {"Event"},
            responses = {
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Requestt", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        eventoService.delete(id);
        return ResponseEntity.noContent().build();
    }

}