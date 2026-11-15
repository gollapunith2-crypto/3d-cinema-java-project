package com.movieapp.service;
import com.movieapp.entity.Movie;
import com.movieapp.repo.MovieRepository;
import org.springframework.stereotype.Service;
import java.util.*;
/** Keyword/synonym scoring. Swap for an LLM or embedding call later without changing the controller. */
@Service
public class VibeService {
    private static final Map<String, List<String>> SYNONYMS = Map.of(
        "mass", List.of("mass", "massy", "action", "fight"),
        "high-energy", List.of("energy", "energetic", "high-energy", "intense", "thrilling"),
        "epic", List.of("epic", "grand", "big", "huge"),
        "adventure", List.of("adventure", "journey", "travel"),
        "dark", List.of("dark", "serious", "gritty"),
        "stylish", List.of("stylish", "slick", "cool"));
    private final MovieRepository repo;
    public VibeService(MovieRepository repo) { this.repo = repo; }

    public List<Movie> match(String query) {
        String q = query.toLowerCase();
        Map<Movie, Integer> score = new LinkedHashMap<>();
        for (Movie m : repo.findAll()) {
            int s = 0;
            for (String tag : m.getTags().split(","))
                for (String w : SYNONYMS.getOrDefault(tag.trim(), List.of(tag.trim())))
                    if (q.contains(w)) { s++; break; }
            if (q.contains(m.getTitle().toLowerCase())) s += 5;
            if (s > 0) score.put(m, s);
        }
        return score.entrySet().stream().sorted((a, b) -> b.getValue() - a.getValue()).map(Map.Entry::getKey).toList();
    }
}
