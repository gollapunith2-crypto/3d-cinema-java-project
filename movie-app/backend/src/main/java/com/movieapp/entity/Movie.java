package com.movieapp.entity;
import jakarta.persistence.*;
@Entity
public class Movie {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String title, language, genre, tags, posterUrl, videoUrl;
    @Column(length = 1000) private String synopsis;
    public Long getId(){return id;} public String getTitle(){return title;} public String getLanguage(){return language;}
    public String getGenre(){return genre;} public String getTags(){return tags;} public String getPosterUrl(){return posterUrl;}
    public String getVideoUrl(){return videoUrl;} public String getSynopsis(){return synopsis;}
    public void setId(Long v){id=v;} public void setTitle(String v){title=v;} public void setLanguage(String v){language=v;}
    public void setGenre(String v){genre=v;} public void setTags(String v){tags=v;} public void setPosterUrl(String v){posterUrl=v;}
    public void setVideoUrl(String v){videoUrl=v;} public void setSynopsis(String v){synopsis=v;}
}
