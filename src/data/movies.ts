export type Movie = {
  id: string;
  title: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  categories: string[];
  synopsis: string;
  tint: string;
  cast: string[];
  director: string;
  progress?: number;
};

/** Placeholder catalogue — swap for a real API later. */
export const movies: Movie[] = [
  {
    id: "petals-of-midnight",
    title: "Petals of Midnight",
    year: 2024,
    rating: 8.6,
    duration: "1h 52m",
    genres: ["Romance", "Fantasy"],
    categories: ["Trending Now", "Dreamy Romances"],
    synopsis:
      "A florist discovers that every bloom she sells rewrites one night in a stranger's life.",
    tint: "340",
    cast: ["Ava Lin", "Noor Hadid", "Theo Marchetti"],
    director: "Camille Verne",
    progress: 42,
  },
  {
    id: "letters-to-the-moon",
    title: "Letters to the Moon",
    year: 2023,
    rating: 8.1,
    duration: "2h 04m",
    genres: ["Drama", "Romance"],
    categories: ["Trending Now", "Soft Focus Dramas"],
    synopsis: "Two pen pals separated by decades exchange letters through a lunar observatory.",
    tint: "300",
    cast: ["Iris Kwan", "Daniel Ortega"],
    director: "Rhea Solberg",
  },
  {
    id: "sugarglass-city",
    title: "Sugarglass City",
    year: 2025,
    rating: 7.9,
    duration: "1h 44m",
    genres: ["Fantasy", "Adventure"],
    categories: ["New Arrivals", "Dream Worlds"],
    synopsis: "A cartographer maps a city built entirely of spun glass before the first thaw.",
    tint: "320",
    cast: ["Mina Aoki", "Felix Brandt"],
    director: "Jun Park",
    progress: 71,
  },
  {
    id: "the-quiet-bloom",
    title: "The Quiet Bloom",
    year: 2022,
    rating: 8.4,
    duration: "1h 38m",
    genres: ["Drama"],
    categories: ["Soft Focus Dramas", "Critics' Picks"],
    synopsis: "A composer returns to her grandmother's greenhouse to finish an unwritten score.",
    tint: "355",
    cast: ["Sofia Reyes", "Emma Lindqvist"],
    director: "Nadia Fournier",
  },
  {
    id: "velvet-comet",
    title: "Velvet Comet",
    year: 2024,
    rating: 7.6,
    duration: "2h 11m",
    genres: ["Sci-Fi", "Romance"],
    categories: ["Trending Now", "Dream Worlds"],
    synopsis: "A comet-chasing crew falls in love with the silence between transmissions.",
    tint: "280",
    cast: ["Kofi Mensah", "Lena Vogt"],
    director: "Alexei Rom",
  },
  {
    id: "paper-lanterns",
    title: "Paper Lanterns",
    year: 2021,
    rating: 8.8,
    duration: "1h 57m",
    genres: ["Drama", "Family"],
    categories: ["Critics' Picks", "Soft Focus Dramas"],
    synopsis: "Three siblings release a lantern each year for a promise none of them kept.",
    tint: "35",
    cast: ["Hana Suzuki", "Ren Takada"],
    director: "Yui Nakamura",
    progress: 15,
  },
  {
    id: "cotton-candy-skies",
    title: "Cotton Candy Skies",
    year: 2025,
    rating: 7.4,
    duration: "1h 29m",
    genres: ["Animation", "Family"],
    categories: ["New Arrivals", "Dream Worlds"],
    synopsis: "A cloud shepherd must herd the last pink cloud home before sunrise.",
    tint: "330",
    cast: ["Poppy Hale", "Marcus Dune"],
    director: "Elin Sagen",
  },
  {
    id: "the-porcelain-hour",
    title: "The Porcelain Hour",
    year: 2023,
    rating: 8.2,
    duration: "2h 02m",
    genres: ["Mystery", "Drama"],
    categories: ["Critics' Picks", "Midnight Mysteries"],
    synopsis: "Every teacup in a seaside inn holds a minute someone tried to forget.",
    tint: "250",
    cast: ["Clara Boyd", "Idris Whitmore"],
    director: "Margot Hale",
  },
  {
    id: "starlit-ballroom",
    title: "Starlit Ballroom",
    year: 2020,
    rating: 7.8,
    duration: "1h 46m",
    genres: ["Musical", "Romance"],
    categories: ["Dreamy Romances", "Encore Classics"],
    synopsis: "A retired dancer teaches a ghost orchestra one final waltz.",
    tint: "310",
    cast: ["Odette Rain", "Sam Oyelaran"],
    director: "Bruno Castel",
  },
  {
    id: "honeyed-static",
    title: "Honeyed Static",
    year: 2024,
    rating: 7.2,
    duration: "1h 35m",
    genres: ["Thriller"],
    categories: ["Midnight Mysteries", "New Arrivals"],
    synopsis: "A radio host hears tomorrow's confessions between stations.",
    tint: "20",
    cast: ["Wren Ashby", "Nikolai Frost"],
    director: "Tomas Reiner",
  },
  {
    id: "the-softest-storm",
    title: "The Softest Storm",
    year: 2022,
    rating: 8.0,
    duration: "1h 51m",
    genres: ["Drama", "Romance"],
    categories: ["Dreamy Romances", "Encore Classics"],
    synopsis: "Two strangers share an umbrella for a rainfall that lasts a whole season.",
    tint: "290",
    cast: ["Amara Diallo", "Jonas Weir"],
    director: "Priya Menon",
    progress: 88,
  },
  {
    id: "blush-horizon",
    title: "Blush Horizon",
    year: 2025,
    rating: 8.5,
    duration: "2h 18m",
    genres: ["Adventure", "Fantasy"],
    categories: ["New Arrivals", "Trending Now", "Dream Worlds"],
    synopsis: "A sailor crosses an ocean that turns rose-gold whenever someone tells the truth.",
    tint: "345",
    cast: ["Elias Cardoso", "Tamsin Vale"],
    director: "Greta Oduya",
  },
];

export const categories = [
  "Trending Now",
  "New Arrivals",
  "Dreamy Romances",
  "Dream Worlds",
  "Soft Focus Dramas",
  "Midnight Mysteries",
  "Critics' Picks",
  "Encore Classics",
] as const;

export const collections = [
  {
    id: "moonlit",
    name: "Moonlit Romances",
    blurb: "Slow-burn love stories bathed in soft light.",
    count: 24,
  },
  {
    id: "pastel-fantasy",
    name: "Pastel Fantasies",
    blurb: "Worlds spun from sugar, glass and cloud.",
    count: 18,
  },
  {
    id: "quiet-hours",
    name: "Quiet Hours",
    blurb: "Gentle dramas for the end of the day.",
    count: 31,
  },
  {
    id: "after-midnight",
    name: "After Midnight",
    blurb: "Elegant mysteries with a velvet edge.",
    count: 12,
  },
];

export const getMovie = (id: string) => movies.find((m) => m.id === id);

export const moviesByCategory = (category: string) =>
  movies.filter((m) => m.categories.includes(category));

export const searchMovies = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return movies.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.genres.some((g) => g.toLowerCase().includes(q)) ||
      m.director.toLowerCase().includes(q),
  );
};
