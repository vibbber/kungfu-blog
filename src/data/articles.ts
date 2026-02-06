export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  topic: string;
  book: string;
  bookSlug: string;
  datePublished: string;
  dateModified: string;
}

export const articles: Article[] = [
  {
    slug: 'goodness-of-fit',
    title: '"Difficult" Isn\'t a Trait',
    subtitle: 'Why the same child thrives in one setting and struggles in another',
    description: 'Roy was a "good baby." By 8, his mother called him "impossible." What changed wasn\'t Roy. Learn the goodness-of-fit framework with 4 diagnostic questions and actionable steps.',
    image: '/images/cards/goodness-of-fit.webp',
    imageAlt: 'Same plant wilting in wrong environment, thriving in right one - same child, different fit',
    topic: 'Temperament',
    book: 'Becoming Who We Are',
    bookSlug: 'rothbart-becoming-who-we-are',
    datePublished: '2026-02-04',
    dateModified: '2026-02-06',
  },
  {
    slug: 'matching-childs-motivation-style',
    title: 'Speaking the Wrong Dialect',
    subtitle: 'Why your requests fall flat — and how to translate',
    description: 'The same pep talk inspires one child and bounces off another. It\'s not about effort — it\'s about direction. Learn to identify your child\'s motivation style and speak their language.',
    image: '/images/cards/matching-childs-motivation-style.webp',
    imageAlt: 'Two mismatched speech bubbles representing communication mismatch between parent and child',
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
    topic: 'Math',
    book: 'Kingdom of Childhood',
    bookSlug: 'steiner-kingdom-of-childhood',
    datePublished: '2026-02-06',
    dateModified: '2026-02-06',
  },
];

export const topics = [...new Set(articles.map(a => a.topic))].sort();
