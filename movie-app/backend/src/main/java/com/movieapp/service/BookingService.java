package com.movieapp.service;

import com.movieapp.entity.Booking;
import com.movieapp.repo.BookingRepository;
import com.movieapp.web.dto.BookingRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class BookingService {

    private final BookingRepository repo;

    public BookingService(BookingRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public Booking createBooking(BookingRequest request) {
        Booking booking = new Booking(
            request.movieId(),
            request.theatreId(),
            request.showDate(),
            request.showTime(),
            request.seatId(),
            request.totalAmount(),
            LocalDateTime.now()
        );
        return repo.save(booking);
    }
}