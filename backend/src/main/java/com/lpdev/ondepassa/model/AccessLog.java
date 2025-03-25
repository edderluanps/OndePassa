package com.lpdev.ondepassa.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "tbl_access_logs")
@Getter
@Setter
public class AccessLog implements Serializable {

    private static final long serialVersionUID = 1l;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String route;
    private Date accessTime;

    public AccessLog() {}

    public AccessLog(String username, String route, Date accessTime) {
        this.username = username;
        this.route = route;
        this.accessTime = accessTime;
    }

}