package com.example.studentportal.controller;

import com.example.studentportal.model.Course;
import com.example.studentportal.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping("/{subject}")
    public List<Course> getCourses(@PathVariable String subject) {
        return courseService.getCoursesBySubject(subject);
    }
}
