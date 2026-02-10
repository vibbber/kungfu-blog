export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageAspect: number;
  topic: string;
  book: string;
  bookSlug: string;
  datePublished: string;
  dateModified: string;
}

export const articles: Article[] = [
  {
    slug: 'goodness-of-fit',
    title: 'Stop Fixing Your Child',
    subtitle: 'The one shift that turns "difficult" into "thriving"',
    description: 'Exhausted from correcting and managing? The problem isn\'t your child — it\'s the match between their temperament and the environment. Four diagnostic questions and a reframe table to find the fit.',
    image: '/images/cards/goodness-of-fit.webp',
    imageAlt: 'Wilting seedling transforming into thriving plant - watercolor illustration showing change of environment',
    imageWidth: 1024,
    imageHeight: 1024,
    imageAspect: 1,
    topic: 'Temperament',
    book: 'Becoming Who We Are',
    bookSlug: 'rothbart-becoming-who-we-are',
    datePublished: '2026-02-04',
    dateModified: '2026-02-08',
  },
  {
    slug: 'matching-childs-motivation-style',
    title: 'Speaking the Wrong Dialect',
    subtitle: 'Why your requests fall flat — and how to translate',
    description: 'The same pep talk inspires one child and bounces off another. It\'s not about effort — it\'s about direction. Learn to identify your child\'s motivation style and speak their language.',
    image: '/images/cards/matching-childs-motivation-style.webp',
    imageAlt: 'Two mismatched speech bubbles representing communication mismatch between parent and child',
    imageWidth: 1024,
    imageHeight: 1024,
    imageAspect: 1,
    topic: 'Communication',
    book: 'Wired for Success',
    bookSlug: 'wired-for-success',
    datePublished: '2026-02-04',
    dateModified: '2026-02-06',
  },
  {
    slug: 'waldorf-arithmetic-whole-parts',
    title: 'Division Before Addition',
    subtitle: 'The counterintuitive order that makes math click for ages 7\u20139',
    description: 'Standard math asks children to build something from nothing. Waldorf flips it: start with 12, ask what parts make it. All four operations reversed \u2014 and it matches how children actually think.',
    image: '/images/cards/waldorf-arithmetic-whole-parts.webp',
    imageAlt: 'Colorful pie chart circle dividing into separate segments with arrows',
    imageWidth: 1024,
    imageHeight: 1024,
    imageAspect: 1,
    topic: 'Math',
    book: 'Kingdom of Childhood',
    bookSlug: 'steiner-kingdom-of-childhood',
    datePublished: '2026-02-06',
    dateModified: '2026-02-06',
  },
  {
    slug: 'waldorf-form-body-exercises',
    title: 'The 30-Year Exercise',
    subtitle: 'How 5 minutes of movement at age 8 shapes thinking for life',
    description: 'Steiner claimed exercises done at age 7-8 create visible wisdom at 35. Three types of body-based exercises \u2014 form completion, cross-body coordination, and color harmony \u2014 that build thinking through movement.',
    image: '/images/cards/waldorf-form-body-exercises.webp',
    imageAlt: 'Timeline showing a child doing exercises connected by a dotted path to an adult with a glowing mind',
    imageWidth: 1024,
    imageHeight: 681,
    imageAspect: 1.504,
    topic: 'Thinking',
    book: 'Kingdom of Childhood',
    bookSlug: 'steiner-kingdom-of-childhood',
    datePublished: '2026-02-06',
    dateModified: '2026-02-06',
  },
  {
    slug: 'waldorf-writing-from-pictures',
    title: 'Writing Before Reading',
    subtitle: 'Why Waldorf kids pick up a crayon before a book \u2014 ages 7\u20139',
    description: 'We teach reading first, then writing. Steiner said that\'s backwards. Writing engages the whole body; reading only the head. A 5-step method where letters emerge from pictures \u2014 M from a mouth, S from a snake.',
    image: '/images/cards/waldorf-writing-from-pictures.webp',
    imageAlt: 'Split illustration showing a child drawing a letter emerging from a picture versus an open book',
    imageWidth: 1024,
    imageHeight: 510,
    imageAspect: 2.008,
    topic: 'Literacy',
    book: 'Kingdom of Childhood',
    bookSlug: 'steiner-kingdom-of-childhood',
    datePublished: '2026-02-06',
    dateModified: '2026-02-06',
  },
  {
    slug: 'three-period-lesson',
    title: 'Fewer Words, Faster Learning',
    subtitle: 'Montessori\'s 3-step technique for teaching any concept — ages 2-6',
    description: 'You explain, repeat, re-explain — and it\'s not sticking. Montessori\'s Three-Period Lesson uses almost no words to teach colors, shapes, letters, and more. Three steps, a no-correction protocol, and 8 ready-to-use applications.',
    image: '/images/cards/three-period-lesson.webp',
    imageAlt: 'Three wooden blocks numbered 1, 2, 3 in sage green, soft blue, and coral — representing the three periods of Montessori\'s teaching method',
    imageWidth: 1024,
    imageHeight: 681,
    imageAspect: 1.504,
    topic: 'Teaching',
    book: 'The Montessori Method',
    bookSlug: 'montessori-method-1912',
    datePublished: '2026-02-08',
    dateModified: '2026-02-08',
  },
  {
    slug: 'both-and-boundary',
    title: 'The HOLD Method',
    subtitle: 'Set limits and stay connected — in the same sentence',
    description: 'Stop choosing between firm and warm. The HOLD method gives you 4 steps to set a boundary and validate your child\'s feelings — in the same sentence. Scripts included.',
    image: '/images/cards/both-and-boundary.webp',
    imageAlt: 'H-O-L-D letter grid with anchor, eye, chain, and hand icons representing the four steps',
    imageWidth: 1024,
    imageHeight: 1024,
    imageAspect: 1,
    topic: 'Communication',
    book: 'Good Inside',
    bookSlug: 'good-inside-kennedy',
    datePublished: '2026-02-09',
    dateModified: '2026-02-09',
  },
  {
    slug: 'inner-weather-report',
    title: 'Stop Fixing, Start Hearing',
    subtitle: 'Your kid shares something hard \u2014 the response that keeps them coming back',
    description: 'The four hardest words in parenting aren\'t "I love you." They\'re "Thanks for telling me." How one family therapist\'s weather metaphor changes everything about how your family talks about feelings.',
    image: '/images/cards/inner-weather-report.webp',
    imageAlt: 'Parent and child sitting on a couch, rain cloud above the child with warm golden glow between them',
    imageWidth: 1408,
    imageHeight: 768,
    imageAspect: 1.833,
    topic: 'Communication',
    book: 'The New Peoplemaking',
    bookSlug: 'new-peoplemaking-satir',
    datePublished: '2026-02-10',
    dateModified: '2026-02-10',
  },
];

export const topics = [...new Set(articles.map(a => a.topic))].sort();
