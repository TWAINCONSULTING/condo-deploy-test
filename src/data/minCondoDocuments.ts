import type { DocumentGroup } from '../types/documents';

export const documentCategories: DocumentGroup[] = [
  {
    title: 'Dokumentasjon og sertifikasjoner',
    documents: [
      { id: 'samsvarserklaring', name: 'Samsvarserklæring elektrisk anlegg', link: '/documents/samsvarserklaring.pdf' },
      { id: 'brann', name: 'Brannsikkerhetsdokumentasjon', link: '/documents/brann_dokumentasjon.pdf' },
      { id: 'energi', name: 'Energimerking', link: '/documents/energimerking.pdf' },
      { id: 'fdv', name: 'FDV-dokumentasjon', link: '/documents/fdv.pdf' }
    ]
  },
  {
    title: 'Vedlikehold og oppussing',
    documents: [
      { id: 'bad-rehab', name: 'Veileder for badoppussing', link: '/documents/bad_veileder.pdf' },
      { id: 'ventilasjon', name: 'Vedlikeholdsmanual ventilasjon', link: '/documents/ventilasjon.pdf' },
      { id: 'varme', name: 'Brukermanual varmeanlegg', link: '/documents/varme.pdf' }
    ]
  }
];

export const importantDocuments = [
  {
    title: 'Husordensregler',
    fileName: 'Husordensregler_for_Digitalgården.pdf'
  },
  {
    title: 'Vedtekter',
    fileName: 'Vedtekter_for_Digitalgården.pdf'
  },
  {
    title: 'Forsikringsavtale',
    fileName: 'Forsikringsavtale.pdf'
  }
];