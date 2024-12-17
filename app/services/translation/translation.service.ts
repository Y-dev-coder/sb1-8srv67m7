import { Observable } from '@nativescript/core';

export class TranslationService extends Observable {
  private apiKey = process.env.GOOGLE_TRANSLATE_API_KEY || '';
  private baseUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor() {
    super();
  }

  async translateText(text: string, fromLang: string, toLang: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: fromLang,
          target: toLang,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Translation failed');
      }
      
      return data.data?.translations?.[0]?.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }

  async detectLanguage(text: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/detect?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Language detection failed');
      }
      
      return data.data?.detections?.[0]?.[0]?.language || 'en';
    } catch (error) {
      console.error('Language detection error:', error);
      throw error;
    }
  }
}