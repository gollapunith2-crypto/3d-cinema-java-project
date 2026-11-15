package com.movieapp.web;
import jakarta.validation.constraints.*;
import java.util.List;
public class Dtos {
    public record LockRequest(@NotEmpty List<String> seats, @NotBlank String sessionId) {}
    public record BookingRequest(@NotEmpty List<String> seats, @NotBlank String sessionId, String food, String phone) {}
}
