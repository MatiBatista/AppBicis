package com.example.trabajointegrador.service;


import com.example.trabajointegrador.dto.RecordDto;
import com.example.trabajointegrador.dto.RecordDto2;
import com.example.trabajointegrador.dto.RecordUser;
import com.example.trabajointegrador.entities.Record;
import com.example.trabajointegrador.entities.SoportBiclycle;
import com.example.trabajointegrador.entities.User;
import com.example.trabajointegrador.repository.RecordRepository;
import com.example.trabajointegrador.repository.SoportBiclycleRepository;
import com.example.trabajointegrador.repository.UserRepository;
import com.example.trabajointegrador.service.mapper.IRecordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecordService implements IRecordService{
    @Autowired
    RecordRepository recordRepository;

    @Autowired
    IRecordMapper recordMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SoportBiclycleRepository soportBiclycleRepository;


    public List<RecordDto> findRecordsByUsername(String username) {
        List<Record> records = recordRepository.getRecordByUser_Username(username);
        List<RecordDto> recordDtos = new ArrayList<>();
        for (Record r: records) {
            recordDtos.add(recordMapper.map(r));
        }
        return recordDtos;
    }

    public List<RecordUser> findRecords() {
        return recordRepository.findRecordUser();
    }

    public void addRecord(RecordDto2 record) {
        User user = userRepository.findUserByUsername(record.getNombreUsuario());
        SoportBiclycle soportBiclycle = soportBiclycleRepository.findSoportBiclycleByName(record.getNombreSoporte());

        Record record1 = new Record();

        record1.setUser(user);
        record1.setSoport(soportBiclycle);
        record1.setStartDateTime(LocalDateTime.now());

        recordRepository.save(record1);
    }

    public void editarRecord(RecordDto2 record) {
        Record record1 = recordRepository.findRecordByUser_UsernameAndSoport_Name(record.getNombreUsuario(), record.getNombreUsuario());
        record1.setEndDateTime(LocalDateTime.now());

        recordRepository.save(record1);
    }
}
