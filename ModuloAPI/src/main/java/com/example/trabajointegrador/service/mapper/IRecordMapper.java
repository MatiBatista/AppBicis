package com.example.trabajointegrador.service.mapper;

import com.example.trabajointegrador.dto.RecordDto;
import com.example.trabajointegrador.entities.Record;

public interface IRecordMapper {

    RecordDto map(Record record);
}
