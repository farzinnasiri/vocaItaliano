const italianWords = [
    {
        italian: "il/lo/la",
        english: "the",
        type: "article",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "di",
        english: "of/from",
        type: "preposition",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "e",
        english: "and",
        type: "conjunction",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "essere",
        english: "to be",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "a",
        english: "to/at",
        type: "preposition",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "un/uno/una",
        english: "a/an",
        type: "article",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "avere",
        english: "to have",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "che",
        english: "that/what/which",
        type: "pronoun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "in",
        english: "in/at",
        type: "preposition",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "non",
        english: "not",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "per",
        english: "for/to",
        type: "preposition",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "io",
        english: "I",
        type: "pronoun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "tu",
        english: "you (singular informal)",
        type: "pronoun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "lui",
        english: "he",
        type: "pronoun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "lei",
        english: "she",
        type: "pronoun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "noi",
        english: "we",
        type: "pronoun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "voi",
        english: "you (plural)",
        type: "pronoun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "loro",
        english: "they",
        type: "pronoun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "fare",
        english: "to do/make",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "dire",
        english: "to say/tell",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "potere",
        english: "to be able to/can",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "volere",
        english: "to want",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "andare",
        english: "to go",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "venire",
        english: "to come",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "vedere",
        english: "to see",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "sapere",
        english: "to know",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "stare",
        english: "to stay/be",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "trovare",
        english: "to find",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "sentire",
        english: "to hear/feel",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "lasciare",
        english: "to leave",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "credere",
        english: "to believe",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "prendere",
        english: "to take",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "parlare",
        english: "to speak",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "mettere",
        english: "to put",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "guardare",
        english: "to look/watch",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "arrivare",
        english: "to arrive",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "dare",
        english: "to give",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "conoscere",
        english: "to know/be acquainted with",
        type: "verb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "casa",
        english: "house/home",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "cosa",
        english: "thing/what",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "tempo",
        english: "time/weather",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "anno",
        english: "year",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "giorno",
        english: "day",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "uomo",
        english: "man",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "donna",
        english: "woman",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "vita",
        english: "life",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "mano",
        english: "hand",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "occhio",
        english: "eye",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "testa",
        english: "head",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "bambino",
        english: "child/baby",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "mondo",
        english: "world",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "momento",
        english: "moment",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "acqua",
        english: "water",
        type: "noun",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "buono",
        english: "good",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "cattivo",
        english: "bad",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "grande",
        english: "big/great",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "piccolo",
        english: "small",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "nuovo",
        english: "new",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "vecchio",
        english: "old",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "facile",
        english: "easy",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "difficile",
        english: "difficult",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "bello",
        english: "beautiful",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "brutto",
        english: "ugly",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "caldo",
        english: "hot/warm",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "freddo",
        english: "cold",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "alto",
        english: "tall/high",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "basso",
        english: "short/low",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "lungo",
        english: "long",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "corto",
        english: "short (length)",
        type: "adjective",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "sempre",
        english: "always",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "mai",
        english: "never",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "spesso",
        english: "often",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "raramente",
        english: "rarely",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "molto",
        english: "very/much",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "poco",
        english: "little/few",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "bene",
        english: "well",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "male",
        english: "badly",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "velocemente",
        english: "quickly",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "lentamente",
        english: "slowly",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "oggi",
        english: "today",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "ieri",
        english: "yesterday",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "domani",
        english: "tomorrow",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "qui",
        english: "here",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "lì",
        english: "there",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "sopra",
        english: "above/on top",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "sotto",
        english: "under/below",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "dentro",
        english: "inside",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "fuori",
        english: "outside",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "davanti",
        english: "in front",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "dietro",
        english: "behind",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "sì",
        english: "yes",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "no",
        english: "no",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "forse",
        english: "maybe",
        type: "adverb",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "grazie",
        english: "thank you",
        type: "interjection",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "prego",
        english: "you're welcome",
        type: "interjection",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "ciao",
        english: "hello/goodbye",
        type: "interjection",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "arrivederci",
        english: "goodbye",
        type: "interjection",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "buongiorno",
        english: "good morning",
        type: "interjection",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "buonasera",
        english: "good evening",
        type: "interjection",
        correct: 0,
        incorrect: 0
    },
    {
        italian: "buonanotte",
        english: "good night",
        type: "interjection",
        correct: 0,
        incorrect: 0
    }
];
