package com.movieapp.web;

import com.movieapp.entity.Booking;
import com.movieapp.service.BookingService;
import com.movieapp.web.dto.BookingRequest;
import com.movieapp.web.dto.MovieResponse;
import com.movieapp.web.dto.TheatreResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CinemaController {

    private final BookingService bookingService;

    public CinemaController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/movies")
    public List<MovieResponse> getMovies() {
        return List.of(
            new MovieResponse(
                "horizon",
                "Beyond Horizon",
                List.of("IMAX 2D"),
                "English",
                "2h 28m",
                "U/A",
                2025,
                "Sci-Fi",
                "8.6"
            )
        );
    }

    @GetMapping("/theatres")
    public List<TheatreResponse> getTheatres() {
        return List.of(
            new TheatreResponse(
                "mumbai",
                "CineGalaxy IMAX, Mumbai",
                "CineGalaxy IMAX",
                "Lower Parel",
                "Mumbai"
            )
        );
    }

    @PostMapping("/bookings")
    public ResponseEntity<Map<String, String>> createBooking(@RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(request);
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Ticket confirmed for seat " + request.seatId()
        ));
    }
}