package com.example.trabajointegrador.service.mapper;

import com.example.trabajointegrador.dto.UserDto;
import com.example.trabajointegrador.entities.User;
import org.springframework.stereotype.Service;

@Service
public class UserMapper implements IUserMapper{

    public UserDto map(User user) {
        return new UserDto(user.getIdUser(),user.getUsername(),user.getName(),user.getLastName(),user.getDni(),user.getEmail(),user.getNumPhone(),user.getRole().getName());
    }
}
