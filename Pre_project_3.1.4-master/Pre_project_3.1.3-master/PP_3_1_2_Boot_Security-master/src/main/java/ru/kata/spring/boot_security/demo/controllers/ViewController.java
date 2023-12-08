package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;

@Controller
public class ViewController {

    private final UserService userService;

    public ViewController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String printUsers(ModelMap model, Principal principal) {
        model.addAttribute("userAdmin", userService.findByName(principal.getName()));
        return "adminPanel";
    }

    @GetMapping("/user")
    public String userPage(Model model, Principal principal) {
        model.addAttribute("userUser", userService.findByName(principal.getName()));
        return "user";
    }
}
