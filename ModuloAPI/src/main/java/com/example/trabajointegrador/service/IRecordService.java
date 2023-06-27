package com.example.trabajointegrador.service;

import com.example.trabajointegrador.dto.RecordDto;
import com.example.trabajointegrador.dto.RecordUser;
import com.example.trabajointegrador.entities.Record;

import java.util.List;

public interface IRecordService {
    List<RecordDto> findRecordsByUsername(String username);

    List<RecordUser> findRecords();
}
