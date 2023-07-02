package com.example.trabajointegrador.repository;

import com.example.trabajointegrador.dto.RecordUser;
import com.example.trabajointegrador.entities.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface RecordRepository extends JpaRepository<Record, Integer> {

    List<Record> getRecordByUser_Username(String username);

    @Query(value = "select new com.example.trabajointegrador.dto.RecordUser(u.name,u.lastName,r.startDateTime,r.endDateTime) from User u " +
            "inner join Record r on u.idUser=r.user.idUser")
    List<RecordUser> findRecordUser();

    List<Record> findRecordsByUser_UsernameAndSoport_NameOrderByIdRecordDesc(String nombreUsuario,String nombreSoporte);
}