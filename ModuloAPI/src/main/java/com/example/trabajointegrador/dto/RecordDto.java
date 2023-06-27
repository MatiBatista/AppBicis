package com.example.trabajointegrador.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@AllArgsConstructor
public class RecordDto {

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private String soportName;
}
