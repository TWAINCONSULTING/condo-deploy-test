import type { ForumPost } from '../types/forum';

export const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Er det interesse for el-bildelingsordning?',
    content: 'Er det interesse for å starte en bildelingsordning i Digitalgården? Vi kunne hatt 1-2 el-biler tilgjengelig for booking via Getaround. Del gjerne deres tanker om dette.',
    category: 'discussion',
    scope: 'building',
    authorId: '1',
    authorName: 'Erik Larsen',
    createdAt: '2025-02-19T09:30:00Z',
    likes: 18,
    comments: [
      {
        id: '1-1',
        content: 'Hvordan ser dette regnestykket ut?',
        authorName: 'Ole Hansen',
        createdAt: '2025-02-19T10:15:00Z',
        likes: 5,
        hasLiked: false
      },
      {
        id: '1-2',
        content: 'Getaround opplyser om at vi kan tjene rundt 8000 kr på bilene i måneden.',
        authorName: 'Erik Larsen',
        createdAt: '2025-02-19T10:45:00Z',
        likes: 8,
        hasLiked: true
      },
      {
        id: '1-3',
        content: 'Kan vi kanskje heller ta en varebil og en el-bil? Ser stadig folk slite med å rygge henger inn i bakgården',
        authorName: 'Kari Nilsen',
        createdAt: '2025-02-19T11:30:00Z',
        likes: 12,
        hasLiked: false
      }
    ],
    hasLiked: false,
    tags: ['miljø', 'deling', 'transport'],
    images: []
  },
  {
    id: '2',
    title: 'Plantebytting i bakgården',
    content: 'Velkommen til vårens første plantedag! Vi skal dele planter og stiklinger, og sørge for fine og grønne hjem. Det blir servert pølser og brus. Ta med grønne venner og godt humør!',
    category: 'event',
    scope: 'building',
    authorId: '3',
    authorName: 'Styret',
    createdAt: '2025-02-15T14:00:00Z',
    likes: 25,
    comments: [],
    hasLiked: false,
    tags: ['dugnad', 'fellesskap'],
    eventDate: '2024-03-23',
    eventTime: '11:00',
    images: []
  },
  {
    id: '3',
    title: 'Selger spisebord med 6 stoler',
    content: 'Pent brukt spisebord i eik med 6 stoler selges grunnet flytting. Bordet er 180x90cm og kan trekkes ut til 240cm. Stolene er trukket i grått stoff. Kjøpt på Bolia for 2 år siden.',
    category: 'marketplace',
    scope: 'building',
    authorId: '4',
    authorName: 'Marie Hansen',
    createdAt: '2025-01-18T16:45:00Z',
    likes: 4,
    comments: [
      {
        id: '3-1',
        content: 'Hva er prisforslaget?',
        authorName: 'Per Olsen',
        createdAt: '2025-01-18T17:00:00Z',
        likes: 0,
        hasLiked: false
      }
    ],
    hasLiked: false,
    tags: ['møbler', 'salg'],
    marketplaceType: 'sell',
    images: []
  },
  {
    id: '4',
    title: 'Anbefaling: Ny sushi-restaurant i nabolaget',
    content: 'Har prøvd den nye sushi-restauranten "Sakura" som åpnet i Storgata 15. Fantastisk kvalitet og hyggelig betjening. De har også take-away med 10% rabatt. Absolutt verdt et besøk!',
    category: 'recommendations',
    scope: 'area',
    authorId: '5',
    authorName: 'Sofia Berg',
    createdAt: '2025-01-17T19:20:00Z',
    likes: 15,
    comments: [
      {
        id: '4-1',
        content: 'Takk for tipset! Skal prøve den i helgen.',
        authorName: 'Lars Jensen',
        createdAt: '2025-01-17T20:00:00Z',
        likes: 2,
        hasLiked: false
      }
    ],
    hasLiked: true,
    tags: ['restaurant', 'mat', 'anbefaling'],
    images: []
  },
  {
    id: '5',
    title: 'Gis bort: IKEA Billy bokhylle',
    content: 'Gir bort IKEA Billy bokhylle i hvitt. 80x28x202cm. Pent brukt, noen små merker. Må hentes i 4. etasje innen søndag.',
    category: 'marketplace',
    scope: 'building',
    authorId: '6',
    authorName: 'Thomas Nilsen',
    createdAt: '2025-01-16T12:30:00Z',
    likes: 7,
    comments: [],
    hasLiked: false,
    tags: ['møbler', 'gratis'],
    marketplaceType: 'give',
    images: []
  },
  {
    id: '6',
    title: 'Yogakveld i fellesrommet',
    content: 'Inviterer til yogakveld i fellesrommet! Alle nivåer er velkomne. Ta med egen matte hvis du har, ellers har vi noen til utlån. Vi fokuserer på grunnleggende stillinger og avspenning.',
    category: 'event',
    scope: 'building',
    authorId: '7',
    authorName: 'Emma Strand',
    createdAt: '2025-01-15T10:00:00Z',
    likes: 20,
    comments: [
      {
        id: '6-1',
        content: 'Dette høres fantastisk ut! Jeg blir med.',
        authorName: 'Kari Nilsen',
        createdAt: '2025-01-15T10:30:00Z',
        likes: 3,
        hasLiked: true
      }
    ],
    hasLiked: false,
    tags: ['yoga', 'fellesskap', 'trening'],
    eventDate: '2025-02-01',
    eventTime: '18:00',
    images: []
  },
  {
    id: '7',
    title: 'Problemer med varmtvann i 5. etasje',
    content: 'Er det flere i 5. etasje som opplever problemer med varmtvannet? Hos meg kommer det bare lunkent vann på badet.',
    category: 'discussion',
    scope: 'building',
    authorId: '8',
    authorName: 'Henrik Berntsen',
    createdAt: '2025-01-14T08:15:00Z',
    likes: 12,
    comments: [
      {
        id: '7-1',
        content: 'Ja, samme problem her i leilighet 52!',
        authorName: 'Anna Moe',
        createdAt: '2025-01-14T08:30:00Z',
        likes: 2,
        hasLiked: false
      },
      {
        id: '7-2',
        content: 'Vi har kontaktet rørlegger som kommer i morgen for å sjekke dette.',
        authorName: 'Styret',
        createdAt: '2025-01-14T09:00:00Z',
        likes: 8,
        hasLiked: true
      }
    ],
    hasLiked: false,
    tags: ['vedlikehold', 'problem'],
    images: []
  },
  {
    id: '8',
    title: 'Anbefaling: Dyktig elektriker',
    content: 'Vil anbefale Elektro AS som nettopp oppgraderte det elektriske anlegget i leiligheten min. Profesjonelle, ryddige og konkurransedyktige priser. De har god erfaring med gamle bygg.',
    category: 'recommendations',
    scope: 'area',
    authorId: '9',
    authorName: 'Ole Jensen',
    createdAt: '2025-01-13T15:45:00Z',
    likes: 9,
    comments: [],
    hasLiked: false,
    tags: ['håndverker', 'anbefaling'],
    images: []
  },
  {
    id: '9',
    title: 'Filmkveld: Oscar-vinnere',
    content: 'Inviterer til filmkveld i fellesrommet hvor vi ser årets Oscar-vinnere. Det blir popcorn og god stemning! Plass til 15 personer.',
    category: 'event',
    scope: 'building',
    authorId: '10',
    authorName: 'Maria Solberg',
    createdAt: '2025-01-12T20:00:00Z',
    likes: 16,
    comments: [
      {
        id: '9-1',
        content: 'Fantastisk initiativ! Jeg kommer!',
        authorName: 'Erik Larsen',
        createdAt: '2025-01-12T20:30:00Z',
        likes: 4,
        hasLiked: false
      }
    ],
    hasLiked: true,
    tags: ['sosialt', 'film', 'underholdning'],
    eventDate: '2025-01-26',
    eventTime: '19:00',
    images: []
  },
  {
    id: '10',
    title: 'Ønskes lånt: Drill',
    content: 'Noen som har en drill jeg kan låne i morgen? Skal henge opp noen bilder og hyller.',
    category: 'marketplace',
    scope: 'building',
    authorId: '11',
    authorName: 'Anders Haugen',
    createdAt: '2025-01-11T17:30:00Z',
    likes: 3,
    comments: [
      {
        id: '10-1',
        content: 'Jeg har en du kan låne! Send meg en melding.',
        authorName: 'Thomas Nilsen',
        createdAt: '2025-01-11T17:45:00Z',
        likes: 2,
        hasLiked: true
      }
    ],
    hasLiked: false,
    tags: ['verktøy', 'lån'],
    marketplaceType: 'borrow',
    images: []
  }
];