# Database Design Documentation

## Welcome to the Database design documentation for the [ Entertainment ] app

### User Schema

| Fields        | Type      | Description                   |
| ------------- | --------- | ----------------------------- |
| user_id       | ObjectId  | User identifier               |
| email         | String    | User's email address          |
| password_hash | String    | Hashed password               |
| created_at    | TIMESTAMP | Timestamp of account creation |
| updated_at    | TIMESTAMP | Timestamp of last update      |


### Bookmark or watchlist Schema

| Fields        | Type    | Description                         |
| ------------- | ------- | ----------------------------------- |
| bookmark_id   | ObjectId     | Bookmark identifier                 |
| user_id       | ObjectId     | User identifier (foreign key)       |
| movie_id/ show_id | ObjectId     | Movie identifier/ TV show identifier (foreign key)      |
| bookmark_type | String | Type of bookmark (movie or TV show) |

### Movie  Schema

| Fields       | Type    | Description               |
| ------------ | ------- | ------------------------- |
| movie_id     | ObjectId| Movie identifier          |
| title        | String  | Title of the movie        |
| poster url   | String  | Poster of the Movie       |
| summary      | String  | Description of the movie  |
| release_date | DATE    | Release date of the movie |
| genre        | String  | Genre of the movie        |
| rating       | String  | Movie rating              |

### TV Shows Schema

| Fields       | Type    | Description                 |
| ------------ | ------- | --------------------------- |
| show_id      | ObjectId| TV show identifier          |
| title        | String  | Title of the TV show        |
| imdbid       | String  |                             |
| rating       | Number  | rating of the show          |
| language     | String  | language of the show        |
| poster url   | String  | Poster of the Show          |
| summary      | String  | Description of the Show     |
| release_date | DATE    | Release date of the TV show |
| genre        | String  | Genre of the TV show        |
| cast         | String  | Cast of the show            |


