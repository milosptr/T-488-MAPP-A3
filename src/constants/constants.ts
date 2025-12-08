export const RATING_OPTIONS = [
    { value: 'ANY', label: 'Any Rating', imdb: 0, rt: 0 },
    { value: 'WATCHABLE', label: 'Watchable', imdb: 5.0, rt: 40 },
    { value: 'GOOD', label: 'Good', imdb: 6.5, rt: 60 },
    { value: 'HIGHLY_RATED', label: 'Highly Rated', imdb: 7.5, rt: 80 },
    { value: 'MASTERPIECE', label: 'Masterpiece', imdb: 8.5, rt: 90 },
];

export const SHOWTIME_PRESETS = [
    { value: 'ANY', label: 'Any Time', start: '00:00', end: '23:59' },
    { value: 'MORNING', label: 'Morning', start: '10:00', end: '14:00' },
    { value: 'AFTERNOON', label: 'Afternoon', start: '14:00', end: '18:00' },
    { value: 'EVENING', label: 'Evening', start: '18:00', end: '22:00' },
    { value: 'NIGHT', label: 'Night', start: '22:00', end: '23:59' },
];
