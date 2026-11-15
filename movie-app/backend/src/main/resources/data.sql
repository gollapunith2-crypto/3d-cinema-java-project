-- Mock data. poster_url points at files you place in frontend/public/posters/
-- (use only images you have rights to; the UI falls back to a gradient if a file is missing).
INSERT INTO movie (title, language, genre, tags, synopsis, poster_url, video_url) VALUES
('Varanasi','Telugu','Action/Adventure','mass,epic,adventure,high-energy','Mock synopsis: a sweeping adventure set across timelines.','/posters/varanasi.jpg',''),
('Spirit','Telugu','Action/Crime','mass,intense,cop,high-energy,dark','Mock synopsis: a hard-edged cop drama.','/posters/spirit.jpg',''),
('Dragon','Telugu','Action','mass,high-energy,stylish,fight','Mock synopsis: a high-octane action entertainer.','/posters/dragon.jpg',''),
('SSMB29','Telugu','Adventure','epic,adventure,global,grand','Mock synopsis: a globe-trotting epic (working title).','/posters/ssmb29.jpg',''); 
INSERT INTO movie (title, language, genre, tags, synopsis, poster_url, video_url) VALUES 
('Kalki 2898 AD', 'Telugu', 'Sci-Fi/Action', 'mass,epic,visionary', 'A futuristic sci-fi epic.', '', ''),
('Pushpa 2: The Rule', 'Telugu', 'Action/Thriller', 'mass,action,smuggler', 'The rule of Pushpa begins.', '', ''),
('Devara: Part 1', 'Telugu', 'Action/Drama', 'mass,action,sea', 'An epic action saga at sea.', '', '');