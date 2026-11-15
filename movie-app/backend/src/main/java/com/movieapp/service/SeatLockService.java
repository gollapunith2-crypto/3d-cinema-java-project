package com.movieapp.service;
import com.movieapp.exception.SeatAlreadyBookedException;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
/**
 * Real-time seat locking: a seat is held for 5 minutes by one session.
 * In-memory = single instance only. For multiple instances swap the map for Redis (SET NX EX).
 */
@Service
public class SeatLockService {
    private record Lock(String sessionId, Instant expires) {}
    private final Map<String, Lock> locks = new ConcurrentHashMap<>();
    private static final long TTL_SECONDS = 300;
    private String key(Long movieId, String seat) { return movieId + ":" + seat; }

    public synchronized void lock(Long movieId, Collection<String> seats, String sessionId) {
        purge();
        for (String s : seats) {                       // check all first => all-or-nothing
            Lock l = locks.get(key(movieId, s));
            if (l != null && !l.sessionId().equals(sessionId)) throw new SeatAlreadyBookedException(s);
        }
        seats.forEach(s -> locks.put(key(movieId, s), new Lock(sessionId, Instant.now().plusSeconds(TTL_SECONDS))));
    }
    public synchronized void release(Long movieId, Collection<String> seats, String sessionId) {
        seats.forEach(s -> locks.computeIfPresent(key(movieId, s), (k, l) -> l.sessionId().equals(sessionId) ? null : l));
    }
    public synchronized boolean ownedBy(Long movieId, String seat, String sessionId) {
        Lock l = locks.get(key(movieId, seat));
        return l != null && l.sessionId().equals(sessionId) && l.expires().isAfter(Instant.now());
    }
    public synchronized Set<String> lockedSeats(Long movieId) {
        purge(); Set<String> out = new HashSet<>(); String p = movieId + ":";
        locks.keySet().forEach(k -> { if (k.startsWith(p)) out.add(k.substring(p.length())); });
        return out;
    }
    private void purge() { Instant now = Instant.now(); locks.values().removeIf(l -> l.expires().isBefore(now)); }
}
