# Database Design Documentation

## Welcome to the Database design documentation for the [ Entertainment ] app

### User Tables

| Column        | Type      | Description                   |
| ------------- | --------- | ----------------------------- |
| user_id       | INT       | User identifier               |
| email         | VARCHAR   | User's email address          |
| password_hash | VARCHAR   | Hashed password               |
| created_at    | TIMESTAMP | Timestamp of account creation |
| updated_at    | TIMESTAMP | Timestamp of last update      |


### Bookmark or watchlist Tables

| Column        | Type    | Description                         |
| ------------- | ------- | ----------------------------------- |
| bookmark_id   | INT     | Bookmark identifier                 |
| user_id       | INT     | User identifier (foreign key)       |
| movie_id/ show_id       | INT     | Movie identifier/ TV show identifier (foreign key)      |
| bookmark_type | VARCHAR | Type of bookmark (movie or TV show) |

### Movie Table

| Column       | Type    | Description               |
| ------------ | ------- | ------------------------- |
| movie_id     | INT     | Movie identifier          |
| title        | VARCHAR | Title of the movie        |
| poster url   | VARCHAR | Poster of the Movie       |
| summary      | VARCHAR | Description of the movie  |
| release_date | DATE    | Release date of the movie |
| genre        | VARCHAR | Genre of the movie        |
| rating       | VARCHAR | Movie rating              |

### TV Shows Table

| Column       | Type    | Description                 |
| ------------ | ------- | --------------------------- |
| show_id      | INT     | TV show identifier          |
| title        | VARCHAR | Title of the TV show        |
| imdbid       | VARCHAR |                             |
| rating       | INT     | rating of the show          |
| language     | VARCHAR | language of the show        |
| poster url   | VARCHAR | Poster of the Show          |
| summary      | VARCHAR | Description of the Show     |
| release_date | DATE    | Release date of the TV show |
| genre        | VARCHAR | Genre of the TV show        |
| cast         | VARCHAR | Cast of the show            |


