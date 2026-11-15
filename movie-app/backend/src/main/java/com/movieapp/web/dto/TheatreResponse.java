package com.movieapp.web.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TheatreResponse(
    String id,
    String name,
    @JsonProperty("short") String shortName,
    String area,
    String city
) {}