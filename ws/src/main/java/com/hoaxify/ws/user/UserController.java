package com.hoaxify.ws.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoaxify.ws.genericResponse.GenericResponse;

@RestController
@RequestMapping("/api/v1.0/users")
public class UserController {

    @Autowired
    UserService userService;
    
    @PostMapping()
    GenericResponse createUser(@RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User Saved");
    }
}
