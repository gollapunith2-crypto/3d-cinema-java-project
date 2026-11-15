package com.movieapp.exception;
public class SeatAlreadyBookedException extends RuntimeException {
    public SeatAlreadyBookedException(String seat) { super("Seat " + seat + " is already booked or locked by someone else"); }
}
