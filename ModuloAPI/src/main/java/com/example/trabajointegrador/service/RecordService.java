package com.example.trabajointegrador.service;


import com.example.trabajointegrador.dto.RecordDto;
import com.example.trabajointegrador.dto.RecordUser;
import com.example.trabajointegrador.entities.Record;
import com.example.trabajointegrador.repository.RecordRepository;
import com.example.trabajointegrador.service.mapper.IRecordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecordService implements IRecordService{
    @Autowired
    RecordRepository recordRepository;

    @Autowired
    IRecordMapper recordMapper;

    public List<RecordDto> findRecordsByUsername(String username) {
        List<Record> records = recordRepository.getRecordByUser_Username(username);
        List<RecordDto> recordDtos = new ArrayList<>();
        for (Record r: records) {
            recordDtos.add(recordMapper.map(r));
        }
        return recordDtos;
    }

    public List<RecordUser> findRecords() {
        System.out.println(recordRepository.findRecordUser());
        return recordRepository.findRecordUser();
    }
}
