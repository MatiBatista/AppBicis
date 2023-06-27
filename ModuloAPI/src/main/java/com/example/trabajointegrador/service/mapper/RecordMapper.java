package com.example.trabajointegrador.service.mapper;

import com.example.trabajointegrador.dto.RecordDto;
import com.example.trabajointegrador.entities.Record;
import com.example.trabajointegrador.repository.RecordRepository;
import org.springframework.stereotype.Service;

@Service
public class RecordMapper implements IRecordMapper{
    private final RecordRepository recordRepository;

    public RecordMapper(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    public RecordDto map(Record record) {
        return new RecordDto(record.getStartDateTime(),record.getEndDateTime(),record.getSoport().getName());
    }
}
