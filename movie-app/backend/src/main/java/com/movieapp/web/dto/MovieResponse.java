package com.movieapp.web.dto;

import java.util.List;

public record MovieResponse(
    String id,
    String title,
    List<String> badges,
    String lang,
    String runtime,
    String cert,
    int year,
    String genre,
    String rating
) {}