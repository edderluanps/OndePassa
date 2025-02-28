package com.lpdev.ondepassa.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "tbl_transmissao")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Transmissao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean transmissao;

    private String canal;

    private String canalImg;

    private String localidadeTransmissao;

    private String linkTransmissao;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    private Evento evento;
}
