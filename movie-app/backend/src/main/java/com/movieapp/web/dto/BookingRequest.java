package com.movieapp.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record BookingRequest(
    @NotBlank String movieId,
    @NotBlank String theatreId,
    @NotBlank String showDate,
    @NotBlank String showTime,
    @NotBlank String seatId,
    @NotNull @Positive Double totalAmount
) {}