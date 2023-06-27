package com.example.trabajointegrador.service;

import com.example.trabajointegrador.dto.RecordDto;
import com.example.trabajointegrador.dto.RecordDto2;
import com.example.trabajointegrador.dto.RecordUser;

import java.util.List;

public interface IRecordService {
    List<RecordDto> findRecordsByUsername(String username);

    List<RecordUser> findRecords();

    void addRecord(RecordDto2 record);

    void editarRecord(RecordDto2 record);
}
