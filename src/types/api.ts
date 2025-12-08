// ============ Authentication ============
export type AuthResponse = {
    success: boolean;
    message: string;
    token: string;
};

// ============ Core Types ============
export type Genre = {
    ID: number;
    Name: string; // Icelandic
    NameEN: string; // English
};

export type Rating = {
    imdb: number;
    rotten_audience?: number;
    rotten_critics?: number;
};

export type Certificate = {
    is: string;
    color: string;
    number: number;
};

export type Ids = {
    imdb?: string;
    rotten?: string;
    tmdb?: number;
};

export type PersonAbridged = {
    name: string;
    id?: string;
};

export type TrailerResult = {
    id: string;
    key: string; // YouTube video key
    name: string;
    site: string; // e.g., "YouTube"
    type: string; // e.g., "Trailer"
};

export type Trailer = {
    id: string;
    results: TrailerResult[];
};

export type ShowtimeSchedule = {
    time: string;
    purchase_url?: string;
};

export type Showtime = {
    cinema: {
        id: number;
        name: string;
    };
    schedule: ShowtimeSchedule[];
};

export type OmdbData = {
    Writer?: string;
    Country?: string;
    Awards?: string;
    Metascore?: string;
    imdbVotes?: string;
    BoxOffice?: string;
    Production?: string;
};

// ============ Movie Types ============
export type Movie = {
    _id: string;
    id: number;
    ids: Ids;
    title: string;
    alternativeTitles?: string[];
    year: number;
    durationMinutes: number;
    genres: Genre[];
    poster: string;
    plot?: string;
    actors_abridged: PersonAbridged[];
    directors_abridged: PersonAbridged[];
    ratings: Rating;
    certificate: Certificate;
    trailers?: Trailer[];
    showtimes: Showtime[];
    omdb?: OmdbData;
};

export type UpcomingMovie = Omit<Movie, 'showtimes' | 'certificate'> & {
    'release-dateIS': string;
};

// ============ Cinema Types ============
export type Cinema = {
    id: number;
    name: string;
    address: string;
    city: string;
    phone: string;
    website: string;
    description: string;
    google_map?: string;
};

// ============ Image Types ============
export type ImageInfo = {
    aspect_ratio: number;
    file_path: string;
    height: number;
    width: number;
    vote_average: number;
    vote_count: number;
    iso_639_1: string | null;
};

export type TmdbImagesResponse = {
    id: number;
    backdrops: ImageInfo[];
    posters: ImageInfo[];
    logos: ImageInfo[];
};

// ============ Search Types ============
export type SearchResult = Movie & {
    _collection: 'movies' | 'upcoming';
};

export type SearchResponse = {
    success: boolean;
    query: string;
    count: number;
    returned: number;
    results: SearchResult[];
};

// ============ Query Parameters ============
export type MoviesQueryParams = {
    title?: string;
    imdbid?: string;
    imdbrating?: number;
    showtime?: string;
    certificate?: string;
    actor?: string;
    director?: string;
    mongoid?: string;
};

export type UpcomingQueryParams = {
    title?: string;
    imdbid?: string;
    actor?: string;
    director?: string;
    mongoid?: string;
};
