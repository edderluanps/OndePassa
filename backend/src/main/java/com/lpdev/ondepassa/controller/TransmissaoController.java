package com.lpdev.ondepassa.controller;

import com.lpdev.ondepassa.model.Transmissao;
import com.lpdev.ondepassa.service.TransmissaoService;
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
@RequestMapping("/api/transmissao")
@Tag(name="Broadcast", description = "Endpoints for managing Broadcasts")
public class TransmissaoController {

    @Autowired
    private TransmissaoService transmissaoService;

    @Operation(summary = "Find Broadcast by ID",
            description = "Find Broadcast by ID",
            tags = {"Broadcast"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = Transmissao.class))
                    ),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @GetMapping("/{id}")
    public ResponseEntity<Transmissao> get(@PathVariable Long id){
        var response = transmissaoService.get(id);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Find All Broadcasts",
            description = "Find All Broadcasts",
            tags = {"Broadcast"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200", content = {
                            @Content(
                                    array = @ArraySchema(schema = @Schema(implementation = Transmissao.class))
                            )
                    }),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @GetMapping
    public ResponseEntity<List<Transmissao>> get(){
        var response = transmissaoService.getAll();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Paginate Broadcasts",
            description = "Paginate Broadcasts",
            tags = {"Broadcast"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200", content = {
                            @Content(
                                    array = @ArraySchema(schema = @Schema(implementation = Transmissao.class))
                            )
                    }),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @GetMapping("/paginated")
    public ResponseEntity<Page<Transmissao>> getPaginated(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        var response = transmissaoService.getPaginated(page, size);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Create Broadcast",
            description = "Create Broadcast",
            tags = {"Broadcast"},
            responses = {
                    @ApiResponse(description = "Success", responseCode = "200",
                            content = @Content(schema = @Schema(implementation = Transmissao.class))
                    ),
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Transmissao> post(@Validated @RequestBody Transmissao transmissao) {
        var response = transmissaoService.post(transmissao);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Update Broadcast",
            description = "Update Broadcast",
            tags = {"Broadcast"},
            responses = {
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> put(@PathVariable Long id, @RequestBody Transmissao transmissao){
        transmissaoService.put(transmissao, id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Delete Broadcast",
            description = "Delete Broadcast",
            tags = {"Broadcast"},
            responses = {
                    @ApiResponse(description = "No Content", responseCode = "204", content = @Content),
                    @ApiResponse(description = "Bad Request", responseCode = "400", content = @Content),
                    @ApiResponse(description = "Unauthorized", responseCode = "401", content = @Content),
                    @ApiResponse(description = "Not Found", responseCode = "404", content = @Content),
                    @ApiResponse(description = "Internal Server Error", responseCode = "500", content = @Content),
            })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        transmissaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
