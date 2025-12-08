# Dr. Cinema

In this assignment we are going to create an application which displays movies that are currently playing in cinemas. We will be using an external API to get information related to cinemas and their movies. Good luck!

---

## External API

We will be using an API provided by kvikmyndir.is which is documented here:
[http://api.kvikmyndir.is/](http://api.kvikmyndir.is/).

In order to use the API you must register by pressing the "Register" button shown on the site.

When you have successfully filled out the form and submitted it, you can start by getting your authentication header. The authentication flow works as follows:

1. Send a HTTP POST request to `http://api.kvikmyndir.is/authenticate` and include an `Authorization` header using the Basic authentication scheme.

    The Basic authentication scheme sets the `Authorization` header to the following format:
    `Basic base64encoded(username:password)`
    which is the username and password provided when registering on the website.

    Read more about Basic HTTP authentication here:
    [https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).

2. If this was successful you will get a response which includes your access token, which is valid for 24 hours.

3. All future requests must include this token either:
    - As a query parameter, for example:
      `http://api.kvikmyndir.is/movies?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUz`
    - Or by populating a HTTP header called `x-access-token` with the value of the token.

4. When the token expires (after 24 hours) these steps need to be reiterated.

I would recommend using either `fetch`
([https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API))
or `axios`
([https://github.com/axios/axios](https://github.com/axios/axios))
to make the actual requests in React Native.

> Note: In the documentation it uses `http://api.biomynd.is` for some demonstrations but the actual URL is `http://api.kvikmyndir.is`.

---

## Structure

If the code does not follow the principles laid down here below, each group can receive up to -2 in deduction for their assignment. Here are the rules of structure:

- TypeScript is required.
- Code should be broken up into components which follow the Single Responsibility Principle.
- Common logic should reside in a separate module and be imported into components which make use of this logic.
- The folder structure should be in accordance with the course lectures.
- Consistency in code, meaning all group members should follow the same set of rules, for example:
    - 4 spaces as indent
    - Egyptian style curly braces
    - etc.
      Hint: `eslint` can help.

---

## Assignment description

Here below is an enlisting of all the functionality this application should implement:

### (20%) Home screen

A user should see all movies which are being shown, where each movie is grouped by the cinema associated with the movie. Note that a movie can be linked to multiple cinemas and should be displayed as part of all associated cinemas.

- (10%) A filter should be presented where a user can filter on the following criterias:
    - Title
    - Rating both for Rotten Tomatoes and IMDB
    - Range of showtime, for example from 20:00 to 22:00
    - Starring actors
    - Directors
    - PG rating

- (7.5%) A movie should display a thumbnail, name, release year and genres.
- (2.5%) Each movie in the list should be clickable and when clicked the app should navigate to a detailed screen for the selected movie.

---

### (10%) Cinemas screen

- (5%) A user should see a list of all cinemas.
    - (2.5%) Alphabetically ordered (ascending order).
    - (2.5%) Displaying name and website.

- (5%) Each cinema in the list should be clickable and on click should navigate to a detailed screen of the selected cinema.

---

### (10%) Cinema detail screen

- (5%) A user should see detailed information on the selected cinema:
    - (1%) Name
    - (1%) Description
    - (1%) Complete address (including street name and city)
    - (1%) Phone
    - (1%) Website

- (5%) A user should see all movies associated with the cinema along with their showtime:
    - (2.5%) A movie should display a thumbnail, name, release year and genres.
    - (2.5%) Each movie in the list should be clickable and when clicked the app should navigate to a detailed screen for the selected movie.

---

### (20%) Movie screen

- (7.5%) A user should see detailed information about the selected movie:
    - (0.625%) Name
    - (0.625%) Image (poster)
    - (0.625%) Plot
    - (0.625%) Duration (in minutes)
    - (0.625%) Year of release
    - (0.625%) Rating (PG, etc)
    - (0.625%) Director
    - (0.625%) Writers
    - (0.625%) Actors
    - (0.625%) Country of origin
    - (0.625%) Ratings:
        - IMDB
        - Rotten Tomatoes

    - (0.625%) Genres

- (7.5%) A user should be able to see the showtimes of the movie (only in the cinema which was selected when this particular movie was selected) and a way to purchase a ticket via a link.
- (5%) A trailer which is associated with the movie can be watched within the application
  Note that some movies might not have a trailer, and therefore an empty state should be displayed.

---

### (10%) Upcoming movies screen

- (5%) A user should see a list of all upcoming movies:
    - (2.5%) Ordered by release date (ascending order).
    - (2.5%) An upcoming movie should display a thumbnail, name and release date.

- (5%) A trailer which is associated with the upcoming movie can be watched within the application
  Note that not all upcoming movies have a trailer, so only those who have.

---

### (10%) Favourites

- (5%) A user should see a list of all movies that have been added to favourites.
  The list should be stored using AsyncStorage:
  [https://reactnative.directory/package/@react-native-async-storage/async-storage](https://reactnative.directory/package/@react-native-async-storage/async-storage)
    - (2.5%) A movie should display a thumbnail, name, release year and genres.
    - (2.5%) Each movie in the list should be clickable and when clicked the app should navigate to a detailed screen for the selected movie.

- (2.5%) Each movie can be removed from the list.
- (2.5%) Each movie can be reordered within the list, creating a prioritised list of favourite movies.

---

### (10%) Redux

- (5%) All network requests go through asynchronous action creators which update the Redux store state according to the resulted data.
- (2.5%) Components make use of Redux hooks to retrieve the state changes from the Redux store.
- (2.5%) State is portioned with multiple reducers.

---

### (10%) Extra

Students are allowed to choose from the list of options below, which each contribute to the full score of 10 percent if implemented correctly. Only one option is required to be chosen, as each is worth a total of 10 percent.

#### Option 1: Social features

- Movie reviews and ratings:
    - Users can write text reviews for movies.
    - Users can rate a movie on the scale of 1 to 5 stars.
    - Movie reviews are displayed within the movie detail screen.
    - Reviews are stored using AsyncStorage.

- Share functionality:
    - Share movie details via social media or messaging.
    - Share favourite movies list.
    - Generate shareable links, which open the movie when another user within the app clicks the link.
      [https://reactnavigation.org/docs/deep-linking/](https://reactnavigation.org/docs/deep-linking/)

#### Option 2: User authentication

- Authentication system:
    - Login and register screens with form validation.
    - Authentication tokens securely stored.
    - Logout functionality.

- User profile screen:
    - Displays user information:
        - Email address
        - Full name
        - Profile image

    - Edit profile information (excluding the email address).
    - View user statistics:
        - Number of favourites
        - Bookings

- Protected routes:
    - Restrict favourites to authenticated users.
    - Restrict ratings and reviews to authenticated users.
    - Redirect to login when trying to access a protected route.

#### Option 3: Personalized dashboard

- A user is able to customize "widgets" on the home screen to his own liking:
    - Rearrange widgets.
    - Remove widgets.
    - Add widgets.

- Adds a "Continue Watching" section for trailers which have been watched previously.
- Quick access to recent searches and viewed movies and cinemas.

---

## Grand prize

Every group is eligible for the grand prize. kvikmyndir.is will be giving out 10 cinema tickets to the best assignment.

What dictates the best assignments are the following factors:

- Functionality within the application:
    - Can I do all the things required in the assignment description and possibly more?

- UX, looks and feel:
    - General flow as a user within the application.
    - Choice of color combinations.
    - Overall feel.

- Code:
    - Well written code.
    - Divided into components which follow SRP.
    - Consistency.

---

## Penalty

There will be a penalty of -2 in deduction if the `node_modules/` folder is included in the submission. Please do not forget this, as this is a painful yet crucial deduction.

---

## Submission

A single compressed file (`*.zip`, `*.rar`) should be submitted. Do not forget to delete `node_modules/` from the folder before compressing it and eventually submitting.
