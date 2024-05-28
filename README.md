# Entertainment_Backend App

## Introduction

Entertainment-backend is a comprehensive backend service designed to support a front-end application for browsing, managing, and tracking movies and TV shows. It includes functionalities for user authentication, managing watchlists, and accessing detailed information about various entertainment media.

## Technologies Used

- **Node.js:** JavaScript runtime for server-side development.
- **Express.js:** Web application framework for building the backend server.
- **MongoDB:** NoSQL database for storing user data and preferences.
- **TMDB API:** Integration for fetching movie, tvshow details and trailers.
- **jsonwebtoken:** Implement user authentication for personalized experiences.
- **bcrypt:** Use to hash and store passwords.

## Visit the website:
   https://entertainmentapp-backend-j3kc.onrender.com

# Api Endpoints

### User Endpoints:
- `POST /user/Signup`: Signup a new user.

  - **Body(Request)**: `{ "email": "user@example.com", "password": "password123" }`
  - **Response**: Object with UserData and JWT token.

- `POST /user/Login`: Authenticate and login a user.

  - **Body(Request)**: `{ "email": "user@example.com", "password": "password123" }`
  - **Response**: Object with UserData and JWT token.

- `GET /user/me`: Retrieve details of the currently logged-in user.
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: User object without sensitive information like password.

### Movie Endpoints

- `GET /movies`: Fetch a list of movies with details.

  - **Query Parameters**: `?page=<number>`
  - **Response**: Array of movie objects.

- `GET /movies/search`: Search for movies by title.

  - **Query Parameters**: `?query=<searchTerm>`
  - **Response**: Array of movies matching the search criteria.

- `GET /movies/:id`: Get detailed information about a specific movie.
  - **Path Parameters**: `id` (Movie ID)
  - **Response**: Movie object with detailed information.

### TVShow Endpoints

- `GET /tvshows`: Fetch a list of TVshows with details.

  - **Query Parameters**: `?page=<number>`
  - **Response**: Array of TVshow objects.

- `GET /tvshows/search`: Search for TVshows by title.

  - **Query Parameters**: `?query=<searchTerm>`
  - **Response**: Array of TVshows matching the search criteria.

- `GET /tvshows/:id`: Get detailed information about a specific TVshow.
  - **Path Parameters**: `id` (TVShow ID)
  - **Response**: TVshow object with detailed information.

### Watchlist Endpoints

- `GET /watchlist`: Retrieve the current user's watchlist.

  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: Array of items in the user's watchlist.

- `POST /watchlist/:id`: Add a movie or TVShow to the watchlist.

  - **Headers**: `Authorization: Bearer <token>`
  - **Path Parameters**: `id` (Movie or TVShow ID)
  - **Response**: Success message or error.

- `DELETE /watchlist/:id`: Remove an item from the watchlist.
  - **Headers**: `Authorization: Bearer <token>`
  - **Path Parameters**: `id` (ID of the item to remove from the watchlist)
  - **Response**: Success message or error.

### Trending Endpoint

- `GET /trending`: Fetch trending movies and TVshows.
  - **Response**: Array of trending movies and TV shows.

## Contributors
- Madhuri
- Riya

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MadhuriTugave/Entertainmentapp_Backend
   cd Entertainmentapp_Backend

2. **Environment Configuration:**
   Create a .env file and add
 - **PORT** : port where you want to run a application (3000).
 - **MONGO_URL** : MongoDB connection string.
 - **JWT_SECRET_KEY** : Your created secreat key.
 - **API_KEY** : TMDB api key.

3. **Install dependencies:**
   ```bash
   npm install

4. **Run the application:**
   ```bash
   npm start

