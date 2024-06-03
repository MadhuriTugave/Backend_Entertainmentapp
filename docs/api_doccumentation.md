##  Entertainment App API Documentation

### Introduction

Welcome to the Entertainment App API documentation. This API allows you to access various features related to movies, TV shows, and user-related functionalities. Below is a comprehensive guide on how to use the API.

#### Authentication
To access protected endpoints, you need to include your API key in the request headers.

#### Set API Key
Include the API key in the Authorization header of your requests.

Authorization:
-  `Bearer YOUR_API_KEY`
Replace YOUR_API_KEY with your actual API key.

### Users

#### Register User

Endpoint :
-  `POST /user/SignUp`
-  Description : Register a new user.

Request:
Body:
email (string): User's email address.
password (string): User's password.

Response:
-  `Status: 201 Created
Body:
{
"success": true,
"message": "Successfully SignUp !!!",
"user": {
"\_id": "id",
"email": "emailid"
},
"access_token": "access token",
"token_type": "Bearer",
"expiresIn": "3600"
`

#### Login User

Endpoint:
-  `POST /user/Login`
-  Description: Log in an existing user.

Request:
Body:
email (string): User's email address.
password (string): User's password.

Response:
-  `Status: 200 OK
Body:
{
"success": true,
"message": "Login successfull.",
"user": {
"\_id": "id",
"email": "emailid"
},
"access_token": "access token",
"token_type": "Bearer",
"expiresIn": "3600"
}`

#### Get user's details by id

Endpoint:
-  `GET /user/me`
-  Description: Validate user credentials and retrieve user information.

Request:
Headers:
Authorization: Bearer YOUR_API_KEY

Response:
-  `Status: 200 OK`

### Bookmarks

#### Get all watchlist

Endpoint:
-  `GET /watchlist`

-  Description: Get a list of bookmarks for the authenticated user.

Request:
-  `Headers:Authorization: Bearer YOUR_API_KEY`

Response:
-  `Status: 200 OK
Body:
[
{
"_id": "id",
"type": "Movie"
}
]`

#### Get all watchlist with details

Endpoint:
-  `GET /watchlist/:id`
-  Description: Get details of single watchlist by its id.

Request:
Headers:
Authorization: Bearer YOUR_API_KEY

Response:
-  `Status: 200 OK
Body:
{
"watchlist": [
{
"_id": "id",
"title": "movie title",
"releaseDate": "2012-05-17T00:00:00.000Z",
"bannerUrl": "https://image.tmdb.org/t/p/w1280/uITT27njUdgKU3t4Crm28PHpdm1.jpg",
"type": "Movie"
}
]
}`

#### Add Bookmark

Endpoint :
-  `POST /watchlist/:id`
-  Description: Add a new bookmark for the authenticated user.

Request:
Headers:
Authorization: Bearer YOUR_API_KEY

Response:
-  `Status: 200 OK
Body:
{
"message": "Added to the watchlist",
"data": []
}`

#### Delete Bookmark

Endpoint:
-  `DELETE /watchlist/:id`
-  Description: Delete a bookmark for the authenticated user.

Request:
Headers:
Authorization: Bearer YOUR_API_KEY

Response:
-  `Status: 200 OK
Body:
{
"message": "Deleted from watchlist"
}`

### Movies

#### Get all movies

Endpoint:
-  `GET /movies`
-  Description: Get list of all the movies

Search for movies

Endpoint: 
-  `GET /movies/search?query=query name`
-  Description: Search for movies based on query

Get URLs for specific movie

Endpoint:
-  `GET /movies/:id/urls`
-  Description: Get movie urls

### TVshows

#### Get all tvshows

Endpoint:
-  `GET /tvshows`
-  Description: Get list of all the tvshows

Search for a tvshow

Endpoint:
-  `GET /tvshows/search?query=query name`
-  Description: Search for tvshow based on query

Get URLs for specific tvshow

Endpoint:
-  `GET /tvshows/:id/urls`
-  Description: Get tvshow urls

### Trending
Get all trendings
Endpoint:
-  `/trending`
-  Description: Get all trending movies and tvshows
