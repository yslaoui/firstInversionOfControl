package com.learnBoot.demo;


import org.springframework.stereotype.Component;

@Component
public class CricketCoach implements Coach{
    @Override
    public String getDailyWorkout() {
        return "Run 100 times across the Cricket Field";
    }
}
