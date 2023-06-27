package com.example.trabajointegrador.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecordUser {

    private String name;

    private String lastName;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;


}
