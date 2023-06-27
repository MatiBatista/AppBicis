package com.example.trabajointegrador.service.mapper;

import com.example.trabajointegrador.dto.UserDto;
import com.example.trabajointegrador.entities.User;

public interface IUserMapper {

    UserDto map(User user);

}
