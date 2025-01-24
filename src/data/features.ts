import type { Feature } from '../types/features';

export const features: Feature[] = [
  {
    id: '1',
    title: 'BankID og Vipps',
    description: 'Integrer BankID og Vipps for enklere innlogging og betaling av felleskostnader.',
    status: 'KOMMER',
    votes: 24,
    hasVoted: false,
    comments: 3,
    createdAt: '2024-09-12T15:30:00Z',
    author: {
      name: 'Condo',
      role: 'Condo'
    }
  },
  {
    id: '2',
    title: 'Boligmappa integrasjon',
    description: 'Automatisk synkronisering av dokumentasjon med Boligmappa for enkel tilgang til all boligdokumentasjon.',
    status: 'UNDER_VURDERING',
    votes: 15,
    hasVoted: true,
    comments: 1,
    createdAt: '2024-11-19T14:00:00Z',
    author: {
      name: 'Erik Larsen',
      role: 'Bruker'
    }
  },
  {
    id: '3',
    title: 'Vedlikeholdspåminnelser',
    description: 'Automatiske påminnelser om vedlikehold basert på boligens alder og tidligere utført arbeid.',
    status: 'PRODUKSJON',
    votes: 18,
    hasVoted: false,
    comments: 2,
    createdAt: '2025-01-18T13:00:00Z',
    author: {
      name: 'Condo',
      role: 'Condo'
    }
  },
  {
    id: '4',
    title: 'Varslingsinnstillinger',
    description: 'Mer detaljerte innstillinger for varsler, inkludert mulighet for å velge mellom push, e-post og SMS.',
    status: 'UNDER_VURDERING',
    votes: 12,
    hasVoted: false,
    comments: 2,
    createdAt: '2023-12-19T10:00:00Z',
    author: {
      name: 'Marie Hansen',
      role: 'Bruker'
    }
  },
  {
    id: '5',
    title: 'Beboerforum',
    description: 'Et dedikert forum for beboere hvor man kan diskutere saker, dele erfaringer og organisere sosiale aktiviteter.',
    status: 'LANSERT',
    votes: 31,
    hasVoted: true,
    comments: 2,
    createdAt: '2024-05-19T12:00:00Z',
    author: {
      name: 'Condo',
      role: 'Condo'
    }
  },
  {
    id: '6',
    title: 'Energiovervåking',
    description: 'Integrasjon med strømmålere for sanntidsvisning av forbruk og automatiske sparetips.',
    status: 'PRODUKSJON',
    votes: 20,
    hasVoted: false,
    comments: 2,
    createdAt: '2024-12-18T14:00:00Z',
    author: {
      name: 'Per Olsen',
      role: 'Bruker'
    }
  }
];