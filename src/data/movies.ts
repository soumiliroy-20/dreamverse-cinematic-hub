export type UniverseKey = "dreamverse" | "heroverse";

export type Movie = {
  /** Defaults to dreamverse when omitted. */
  universe?: UniverseKey;
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

/* ------------------------------------------------------------------ *
 * HeroVerse catalogue (placeholder data — swap for a real API later)  *
 * ------------------------------------------------------------------ */

export const heroMovies: Movie[] = [
  {
    universe: "heroverse",
    id: "titan-protocol",
    title: "Titan Protocol",
    year: 2025,
    rating: 9.1,
    duration: "2h 34m",
    genres: ["Action", "Sci-Fi"],
    categories: ["Trending Now", "Team-Ups", "Future Tech"],
    synopsis:
      "When a dormant defence AI wakes with a will of its own, six rivals must fight as one legion.",
    tint: "210",
    cast: ["Kade Ryland", "Mira Sol", "August Vane"],
    director: "Dominic Reyes",
    progress: 62,
  },
  {
    universe: "heroverse",
    id: "neon-vigil",
    title: "Neon Vigil",
    year: 2024,
    rating: 8.7,
    duration: "2h 07m",
    genres: ["Action", "Thriller"],
    categories: ["Trending Now", "Street Level"],
    synopsis: "A masked courier polices the rain-slick underlevels of a city that never powers down.",
    tint: "200",
    cast: ["Iyla Kwon", "Bram Osei"],
    director: "Sana Ibrahim",
  },
  {
    universe: "heroverse",
    id: "cosmic-requiem",
    title: "Cosmic Requiem",
    year: 2025,
    rating: 9.3,
    duration: "2h 51m",
    genres: ["Sci-Fi", "Adventure"],
    categories: ["Trending Now", "Cosmic Sagas", "New Releases"],
    synopsis: "At the edge of a dying galaxy, a fallen guardian bargains with the architects of time.",
    tint: "230",
    cast: ["Nyra Voss", "Halden Pike", "Rook"],
    director: "Elena Marchetti",
  },
  {
    universe: "heroverse",
    id: "iron-covenant",
    title: "Iron Covenant",
    year: 2023,
    rating: 8.4,
    duration: "2h 19m",
    genres: ["Action", "Drama"],
    categories: ["Team-Ups", "Legend Origins"],
    synopsis: "Two armoured dynasties sign a truce that only one of them intends to keep.",
    tint: "15",
    cast: ["Cassian Ward", "Leora Finch"],
    director: "Marcus Aledo",
    progress: 28,
  },
  {
    universe: "heroverse",
    id: "quantum-fracture",
    title: "Quantum Fracture",
    year: 2026,
    rating: 8.9,
    duration: "2h 12m",
    genres: ["Sci-Fi", "Action"],
    categories: ["New Releases", "Future Tech", "Cosmic Sagas"],
    synopsis: "A physicist splinters across nine realities and every version of her wants the same key.",
    tint: "195",
    cast: ["Dr. Yuki Sato", "Ravi Deol"],
    director: "Priyanka Rao",
  },
  {
    universe: "heroverse",
    id: "shadow-of-the-sentinel",
    title: "Shadow of the Sentinel",
    year: 2022,
    rating: 8.2,
    duration: "2h 26m",
    genres: ["Action", "Mystery"],
    categories: ["Street Level", "Villain Origins"],
    synopsis: "The city's greatest protector is unmasked as the architect of its longest nightmare.",
    tint: "250",
    cast: ["Nolan Frey", "Adaeze Okoro"],
    director: "Jonah Kettler",
  },
  {
    universe: "heroverse",
    id: "starforged",
    title: "Starforged",
    year: 2024,
    rating: 8.8,
    duration: "2h 40m",
    genres: ["Adventure", "Fantasy"],
    categories: ["Cosmic Sagas", "Legend Origins"],
    synopsis: "A blacksmith of dead suns hammers the last shard of creation into a weapon.",
    tint: "45",
    cast: ["Thora Bright", "Kell Amadi"],
    director: "Ingrid Halvorsen",
    progress: 84,
  },
  {
    universe: "heroverse",
    id: "gridrunner",
    title: "Gridrunner",
    year: 2025,
    rating: 8.1,
    duration: "1h 58m",
    genres: ["Sci-Fi", "Thriller"],
    categories: ["Future Tech", "New Releases"],
    synopsis: "A courier races light itself through a city rendered entirely in code.",
    tint: "190",
    cast: ["Six", "Ana Petrova"],
    director: "Kenji Aoyama",
  },
  {
    universe: "heroverse",
    id: "the-crimson-oath",
    title: "The Crimson Oath",
    year: 2023,
    rating: 8.6,
    duration: "2h 22m",
    genres: ["Action", "War"],
    categories: ["Team-Ups", "Trending Now"],
    synopsis: "Seven soldiers swear an oath in blood on the night the sky splits open.",
    tint: "10",
    cast: ["Vera Lang", "Idris Kane"],
    director: "Samuel Obi",
  },
  {
    universe: "heroverse",
    id: "mutant-tide",
    title: "Mutant Tide",
    year: 2024,
    rating: 8.3,
    duration: "2h 09m",
    genres: ["Action", "Drama"],
    categories: ["Legend Origins", "Street Level"],
    synopsis: "A generation born with impossible gifts decides it is done asking permission.",
    tint: "170",
    cast: ["Sable Nyx", "Julien Roche"],
    director: "Amara Boateng",
  },
  {
    universe: "heroverse",
    id: "eclipse-directive",
    title: "Eclipse Directive",
    year: 2026,
    rating: 9.0,
    duration: "2h 47m",
    genres: ["Sci-Fi", "Action"],
    categories: ["New Releases", "Trending Now", "Cosmic Sagas"],
    synopsis: "The sun is switched off for eleven minutes and something walks out of the dark.",
    tint: "265",
    cast: ["Rhea Oduya", "Callum Vance"],
    director: "Dominic Reyes",
  },
  {
    universe: "heroverse",
    id: "warden-zero",
    title: "Warden Zero",
    year: 2022,
    rating: 7.9,
    duration: "2h 01m",
    genres: ["Thriller", "Sci-Fi"],
    categories: ["Villain Origins", "Future Tech"],
    synopsis: "The prison built for gods hires a warden who used to be one.",
    tint: "225",
    cast: ["Otto Grimm", "Lin Zhao"],
    director: "Sana Ibrahim",
  },
];

export const heroCategories = [
  "Trending Now",
  "New Releases",
  "Cosmic Sagas",
  "Team-Ups",
  "Street Level",
  "Future Tech",
  "Legend Origins",
  "Villain Origins",
] as const;

export const heroCollections = [
  {
    id: "avengers",
    name: "Avengers Collection",
    blurb: "Earth's mightiest, assembled across every era.",
    count: 26,
  },
  {
    id: "spider-verse",
    name: "Spider-Verse Collection",
    blurb: "Every web, every world, every wall-crawler.",
    count: 14,
  },
  {
    id: "guardians",
    name: "Guardians Collection",
    blurb: "Outlaws, misfits and one very loud spaceship.",
    count: 11,
  },
  {
    id: "mutants",
    name: "Mutants Collection",
    blurb: "Born different. Built unstoppable.",
    count: 19,
  },
  {
    id: "cosmic-legends",
    name: "Cosmic Legends",
    blurb: "Sagas that span galaxies and centuries.",
    count: 22,
  },
  {
    id: "future-heroes",
    name: "Future Heroes",
    blurb: "Neon skylines, quantum tech, tomorrow's legends.",
    count: 17,
  },
];

export type Hero = {
  id: string;
  name: string;
  alias: string;
  description: string;
};

export const heroes: Hero[] = [
  {
    id: "vanta",
    name: "Vanta",
    alias: "The Nightfall Sentinel",
    description: "Bends light itself into armour and silence.",
  },
  {
    id: "solara",
    name: "Solara",
    alias: "Keeper of the Star Forge",
    description: "Carries the heat of a dying sun in both hands.",
  },
  {
    id: "ironhold",
    name: "Ironhold",
    alias: "The Unbroken Line",
    description: "Twelve tons of adaptive alloy and stubborn loyalty.",
  },
  {
    id: "cipher",
    name: "Cipher",
    alias: "Ghost in the Grid",
    description: "Walks through firewalls the way others walk through doors.",
  },
  {
    id: "revenant",
    name: "Revenant",
    alias: "The Crimson Oathkeeper",
    description: "Died once. Came back with terms.",
  },
  {
    id: "nova-lin",
    name: "Nova Lin",
    alias: "Voice of the Cosmos",
    description: "Speaks to gravity and is usually obeyed.",
  },
];

/* ------------------------------------------------------------------ *
 * Universe-aware helpers                                             *
 * ------------------------------------------------------------------ */

export const allMovies: Movie[] = [...movies, ...heroMovies];

export const catalogFor = (universe: UniverseKey = "dreamverse") =>
  universe === "heroverse" ? heroMovies : movies;

export const categoriesFor = (universe: UniverseKey = "dreamverse"): readonly string[] =>
  universe === "heroverse" ? heroCategories : categories;

export const collectionsFor = (universe: UniverseKey = "dreamverse") =>
  universe === "heroverse" ? heroCollections : collections;

export const getMovie = (id: string) => allMovies.find((m) => m.id === id);

export const movieUniverse = (movie: Movie): UniverseKey => movie.universe ?? "dreamverse";

export const moviesByCategory = (category: string, universe: UniverseKey = "dreamverse") =>
  catalogFor(universe).filter((m) => m.categories.includes(category));

export const searchMovies = (query: string, universe: UniverseKey = "dreamverse") => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return catalogFor(universe).filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.genres.some((g) => g.toLowerCase().includes(q)) ||
      m.director.toLowerCase().includes(q),
  );
};
