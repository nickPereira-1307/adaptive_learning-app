package com.example.demo.studentportal.repository;

import com.example.demo.studentportal.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findBySubject(String subject);
}