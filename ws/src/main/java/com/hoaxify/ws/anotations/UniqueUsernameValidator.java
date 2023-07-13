package com.hoaxify.ws.anotations;

import org.springframework.beans.factory.annotation.Autowired;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String>{

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        User userInDB = userRepository.findByUsername(value);
        if(userInDB == null){
            return true;
        }
        return false;
    }

}
