import { Observable } from '@nativescript/core';

export class TranslationService extends Observable {
  private apiKey = 'YOUR_GOOGLE_TRANSLATE_API_KEY';

  async translateText(text: string, targetLang: string): Promise<string> {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            target: targetLang,
          }),
        }
      );

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }
}