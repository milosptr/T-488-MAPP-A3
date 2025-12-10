# Dr. Cinema

A React Native mobile application for browsing movies currently playing in Icelandic cinemas, upcoming releases, and managing favorites.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Platform Support](#platform-support)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the App](#running-the-app)
- [API Information](#api-information)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)

## Description

Dr. Cinema is a mobile application that allows users to browse movies currently showing in Icelandic cinemas. Users can view movie details, check showtimes at various cinemas, browse upcoming releases, and save their favorite movies. The app integrates with the kvikmyndir.is API for cinema and movie data, and TMDB for enhanced movie imagery.

## Features

- Browse movies currently playing in Icelandic cinemas
- View movie details including title, year, duration, and IMDB ratings
- High-quality movie backdrops from TMDB (16:9 aspect ratio)
- Dark and light theme support
- Tab-based navigation (Home, Cinemas, Upcoming, Favourites)
- Automatic authentication with the kvikmyndir.is API
- Haptic feedback on button interactions
- Optimized list rendering with Legend List
- **Search**: Animated search bar with real-time title filtering
- **Advanced Filtering**: Filter movies by:
    - Cinema (multi-select)
    - IMDB Rating (preset thresholds)
    - Showtime (morning, afternoon, evening, night)
    - Actors (multi-select)
    - Directors (multi-select)
    - Age Certificate (PG rating)
- Skeleton loading states for smooth UX
- Bottom sheet modals for filter selection
- **Upcoming Movies**: Browse upcoming releases sorted by release date
    - Watch trailers directly in the app (for movies that have trailers)
    - View release dates and movie posters
- **Favourites**: Save movies to your favorites list with AsyncStorage persistence
    - Add/remove movies from any screen via heart button
    - Drag-to-reorder favorites list
    - Prioritized list persists across app restarts
- **Reviews & Ratings** (Extra Feature - Social):
    - Write text reviews for movies
    - Rate movies on a 1-5 star scale
    - View all reviews on movie detail screen with average rating
    - Reviews stored locally with AsyncStorage
- **Share Movies**: Share movie details with deep linking support
    - Native share dialog on iOS and Android
    - Deep links (drcinema://movies/{id}) open directly in app
    - Share from movie detail screen or context menu

## Screenshots

| Home Screen          | Movie Card           |
| -------------------- | -------------------- |
| _Screenshot pending_ | _Screenshot pending_ |

| Cinemas              | Upcoming             |
| -------------------- | -------------------- |
| _Screenshot pending_ | _Screenshot pending_ |

## Technologies Used

### Core Framework

- **Expo SDK 54** - Development platform
- **React Native 0.81.5** - Mobile framework
- **React 19.1.0** - UI library
- **TypeScript 5.9.2** - Type safety (strict mode)

### Navigation & Routing

- **Expo Router v6** - File-based routing with typed routes
- **React Navigation 7** - Navigation primitives

### State Management & Data Fetching

- **TanStack React Query v5** - Server state management, caching, and synchronization
- **Redux Toolkit** - Client state management (filters, favorites, reviews)
- **React Redux** - React bindings for Redux
- **AsyncStorage** - Local persistence for favorites and reviews

### UI Components

- **Expo Linear Gradient** - Gradient overlays
- **Legend App List** - High-performance list rendering
- **Expo Vector Icons** - Icon library
- **React Native Reanimated** - Animations
- **@gorhom/bottom-sheet** - Modal bottom sheets for filters
- **Moti** - Skeleton loading animations
- **react-native-draggable-flatlist** - Drag-to-reorder lists

### Developer Tools

- **ESLint 9** - Code linting
- **Prettier 3** - Code formatting

## Platform Support

### Primary Development Platform

- **Platform**: iOS
- **Test Device**: iPhone 16 Pro (Simulator)
- **OS Version**: iOS 18.4

### Secondary Platform Testing

- **Platform**: Android
- **Test Device**: Pixel 9 Pro (Emulator)
- **OS Version**: Android 15
- **Testing Status**: Limited
- **Known Platform-Specific Issues**: None identified

## Project Structure

```
app/                          # Expo Router file-based routes
├── _layout.tsx              # Root layout (auth, theme, providers)
├── (tabs)/                  # Tab navigator group
│   ├── _layout.tsx         # Tab bar configuration
│   ├── index.tsx           # Home screen
│   ├── cinemas.tsx         # Cinemas list
│   ├── upcoming.tsx        # Upcoming movies
│   └── favourites.tsx      # Saved favorites
├── not-authenticated.tsx   # Auth error screen
└── +not-found.tsx          # 404 page

src/
├── api/                     # API layer
│   ├── client.ts           # HTTP client & authentication
│   ├── queryKeys.ts        # TanStack Query key factory
│   └── queryClient.ts      # Query client configuration
├── store/                   # Redux store
│   ├── store.ts            # Store configuration
│   ├── hooks.ts            # Typed useSelector/useDispatch
│   └── slices/             # Redux slices
│       ├── filtersSlice.ts  # Filter state management
│       ├── favoritesSlice.ts # Favorites with AsyncStorage
│       └── reviewsSlice.ts  # Reviews with AsyncStorage
├── hooks/                   # Custom React hooks
│   ├── api/                # Data fetching hooks
│   │   ├── useAuth.ts     # Authentication
│   │   ├── useMovies.ts   # Movie queries
│   │   ├── useCinemas.ts  # Cinema queries
│   │   ├── useUpcoming.ts # Upcoming movies
│   │   ├── useImages.ts   # TMDB images
│   │   ├── useGenres.ts   # Genre lookup
│   │   └── useSearch.ts   # Search functionality
│   ├── useTheme.tsx       # Theme hook
│   ├── useFilteredMovies.ts # Movie filtering logic
│   ├── useFavorites.ts    # Favorites hook
│   └── useShare.ts        # Share with deep linking
├── screens/                 # Screen components
├── components/              # Reusable UI components
│   ├── ui/                 # Base UI (Button, Text, Skeleton, StarRating, FilterChip)
│   ├── layout/             # Layout components
│   ├── movie/              # Movie-related components
│   ├── filters/            # Filter modal components
│   ├── bottom-sheet/       # Bottom sheet wrapper
│   └── icons/              # Custom icons
├── constants/               # Theme, colors, design tokens
├── config/                  # Environment configuration
├── types/                   # TypeScript type definitions
└── providers/               # React context providers
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Xcode (for iOS development)
- Android Studio (for Android development)
- Expo Go app on physical device (optional)

### Environment Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd MAPP-3
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create environment file:

    ```bash
    cp .env.example .env
    ```

4. Fill in the environment variables in `.env`:

    ```
    EXPO_PUBLIC_KVIKMYNDIR_API_BASE_URL=https://api.kvikmyndir.is
    EXPO_PUBLIC_KVIKMYNDIR_API_AUTH_USERNAME=<your-username>
    EXPO_PUBLIC_KVIKMYNDIR_API_AUTH_PASSWORD=<your-password>
    EXPO_PUBLIC_TMDB_API_KEY=<your-tmdb-api-key>
    ```

    - Register at [api.kvikmyndir.is](https://api.kvikmyndir.is) for API credentials
    - Get TMDB API key from [themoviedb.org](https://www.themoviedb.org/settings/api)

## Running the App

### Development

```bash
# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web
```

### Code Quality

```bash
# Run all checks (lint + format + typecheck)
npm test

# Individual checks
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix
npm run typecheck     # TypeScript
npm run format        # Format code
npm run format:check  # Check formatting
```

## API Information

### kvikmyndir.is API

- **Base URL**: `https://api.kvikmyndir.is`
- **Authentication**: Basic HTTP Auth -> JWT token (24-hour validity)
- **Endpoints Used**:
    - `POST /authenticate` - Get access token
    - `GET /movies` - Currently showing movies
    - `GET /theaters` - Cinema listings
    - `GET /upcoming` - Upcoming releases
    - `GET /genres` - Genre list
    - `GET /search` - Full-text search

### TMDB API

- **Base URL**: `https://api.themoviedb.org/3`
- **Purpose**: High-quality movie backdrops and posters
- **Authentication**: Bearer token

## Known Issues

- Button component has TypeScript errors related to theme types (pre-existing, does not affect functionality)
- Some movies may not have TMDB images available
- Authentication token is stored in memory only (cleared on app restart)

## Future Improvements

- [ ] Complete cinema detail screen with movie listings
- [x] ~~Implement movie detail screen with full information~~ (Implemented)
- [x] ~~Add trailer playback functionality~~ (Implemented: watch trailers for upcoming movies)
- [x] ~~Implement favorites with AsyncStorage persistence~~ (Implemented: add/remove, reorder, persist)
- [x] ~~Add filtering by genre, rating, and showtime~~ (Implemented: cinema, rating, showtime, actors, directors, certificate)
- [x] ~~Implement search functionality~~ (Implemented: animated search bar with title filtering)
- [x] ~~Add movie reviews and ratings~~ (Implemented: 1-5 star ratings, text reviews, AsyncStorage)
- [x] ~~Add pull-to-refresh on all lists~~ (Implemented: Home and Upcoming screens)
- [ ] Implement offline caching
- [ ] Add localization (Icelandic/English)
- [ ] Persist filter state with AsyncStorage
- [ ] Add unit tests for filter logic
- [x] ~~Implement share functionality for movies~~ (Implemented: deep linking support with drcinema:// scheme)

## Author

- Milos Petrovic
- Nikulás Anthony Swain
- Sunna Einarsdóttir

## License

This project is part of a university assignment and is not licensed for public distribution.
