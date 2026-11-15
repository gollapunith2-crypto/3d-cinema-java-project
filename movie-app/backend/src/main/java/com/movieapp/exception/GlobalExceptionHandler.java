package com.movieapp.exception;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(SeatAlreadyBookedException.class)
    ResponseEntity<Map<String,String>> seat(SeatAlreadyBookedException e) { return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage())); }
    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<Map<String,String>> bad(IllegalArgumentException e) { return ResponseEntity.badRequest().body(Map.of("error", e.getMessage())); }
}
