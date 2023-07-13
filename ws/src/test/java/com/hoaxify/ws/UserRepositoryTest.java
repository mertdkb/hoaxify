package com.hoaxify.ws;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {
    
    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    UserRepository userRepository;

    @Test
    public void findByUsername_whenUserExists_returnsUser(){
        User user = new User();

        user.setUsername("test-user");
        user.setDisplayName("test-display");
        user.setPassword("P4sswordd");

        testEntityManager.persist(user);

        User userInDB = userRepository.findByUsername("test-user");
        assertNotNull(userInDB);
    }

        @Test
    public void findByUsername_whenUserDoesNotExists_returnsNull(){
        User userInDB = userRepository.findByUsername("test-user");
        assertNull(userInDB);
    }
}
