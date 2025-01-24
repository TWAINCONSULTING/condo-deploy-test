import type { DocumentGroup } from '../types/documents';

export const documentCategories: DocumentGroup[] = [
  {
    title: 'Årsrapporter og økonomi',
    documents: [
      { id: 'arsrapport-2024', name: 'Årsrapport 2024', link: '/documents/arsrapport_2024.pdf' },
      { id: 'budsjett-2024', name: 'Budsjett 2024', link: '/documents/budsjett_2024.pdf' },
      { id: 'regnskap-2023', name: 'Regnskap 2023', link: '/documents/regnskap_2023.pdf' },
      { id: 'langsiktig-budsjett', name: 'Langsiktig budsjettplan 2024-2026', link: '/documents/langsiktig_budsjett.pdf' }
    ]
  },
  {
    title: 'Vedlikehold og oppgraderinger',
    documents: [
      { id: 'vedlikeholdsplan-2024', name: 'Vedlikeholdsplan 2024', link: '/documents/vedlikeholdsplan_2024.pdf' },
      { id: 'tilstandsrapport-2023', name: 'Tilstandsrapport 2023', link: '/documents/tilstandsrapport_2023.pdf' },
      { id: 'oppgraderingsplan', name: 'Oppgraderingsplan 2024-2025', link: '/documents/oppgraderingsplan.pdf' }
    ]
  },
  {
    title: 'Styredokumenter',
    documents: [
      { id: 'styrevedtak-2024', name: 'Styrevedtak 2024', link: '/documents/styrevedtak_2024.pdf' },
      { id: 'styreinstruks', name: 'Styreinstruks', link: '/documents/styreinstruks.pdf' },
      { id: 'fullmakter', name: 'Fullmaktsmatrise', link: '/documents/fullmakter.pdf' }
    ]
  }
];