export const CHATBOT_CONFIG = {
  id: 'HfzFUh2PS77T4ZFXSgRLH',
  domain: 'chatbase.co',
  scriptUrl: 'https://www.chatbase.co/embed.min.js',
  language: 'no',
  theme: {
    primaryColor: '#2563eb',
    fontSize: '16px',
    fontFamily: 'Inter var, system-ui, sans-serif'
  }
} as const;

declare global {
  interface Window {
    chatbase: {
      (action: 'setConfig', config: any): void;
      (action: 'open'): void;
      (action: 'close'): void;
      (action: 'getState'): string;
      q?: any[];
    } & ((...args: any[]) => number)
  }
}