export const sectionIntros = {
  mittBofellesskap: {
    title: 'Mitt Bofellesskap',
    description: ''
  },
  bofellesskapet: {
    title: 'Bofellesskapet',
    description: ''
  },
  naboen: {
    title: 'Naboen',
    description: ''
  },
  minCondo: {
    title: 'Min Bolig',
    description: ''
  },
  praktiskInfo: {
    title: 'Praktisk Informasjon',
    description: ''
  },
  reservasjoner: {
    title: 'Reserver Fasiliteter',
    description: ''
  },
  flytting: {
    title: 'Flytting',
    description: ''
  },
  hjelpesenter: {
    title: 'Hjelpesenter',
    description: ''
  },
  produktutvikling: {
    title: 'Produktutvikling',
    description: ''
  },
  kontakt: {
    title: 'Meldinger',
    description: ''
  },
  husordensregler: {
    title: 'Husordensregler',
    description: ''
  },
  reportProblem: {
    title: 'Rapporter et problem',
    description: ''
  }
} as const;

export type SectionIntro = typeof sectionIntros[keyof typeof sectionIntros];