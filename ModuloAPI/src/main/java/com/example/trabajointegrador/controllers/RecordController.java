package com.example.trabajointegrador.controllers;

import com.example.trabajointegrador.dto.RecordDto;
import com.example.trabajointegrador.dto.RecordDto2;
import com.example.trabajointegrador.dto.RecordUser;
import com.example.trabajointegrador.dto.UserDto;
import com.example.trabajointegrador.entities.Record;
import com.example.trabajointegrador.entities.User;
import com.example.trabajointegrador.service.IRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RecordController {
    @Autowired
    IRecordService recordService;

    @GetMapping("/user/record/{username}")
    public List<RecordDto> getRecordByUserName(@PathVariable String username){
        return recordService.findRecordsByUsername(username);
    }

    @GetMapping("/admin/record")
    public List<RecordUser> getRecords(){
        return recordService.findRecords();
    }

    @PostMapping("/user/record")
    public void addRecord(@RequestBody RecordDto2 record){
        recordService.addRecord(record);
    }

    @PutMapping("/user/record")
    public void editRecord(@RequestBody RecordDto2 record){
        recordService.editarRecord(record);
    }
}
