import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_KEY = 'AIzaSyDgyWwwmHOROsPZclCm-LGzZs_uoYNhVDk';
const LANGUAGES = [
    'es', 'fr', 'pt', 'de', 'ar', 'hi', 'bn', 'zh', 'ja', 'id', 'tr', 'vi', 'ko', 'ru', 'it', 'pl', 'th', 'tl'
];

const sourceTranslation = {
    "app_title": "Identity Journey",
    "one_word_today": "One word, today",
    "pick_sentence": "Pick the sentence that feels closest to your day.",
    "done": "DONE",
    "not_found_title": "404",
    "not_found_text": "Oops! Page not found",
    "return_home": "Return to Home",
    "back_home": "Back to Home",
    "mon": "Mon",
    "tue": "Tue",
    "wed": "Wed",
    "thu": "Thu",
    "fri": "Fri",
    "sat": "Sat",
    "sun": "Sun",
    "sentence_0": "I felt seen for who I am today",
    "sentence_1": "I kept a part of myself hidden today",
    "sentence_2": "I'm still figuring myself out — and that's okay",
    "sentence_3": "I felt free to just be me today",
    "sentence_4": "Today was hard, but I'm still here",
    "quote_0": "Being seen is everything. Hold onto that feeling — it's yours.",
    "quote_1": "Hiding isn't weakness. Sometimes it's wisdom. Your time will come.",
    "quote_2": "The most honest thing anyone can say is 'I'm still learning who I am.' You're doing that.",
    "quote_3": "That freedom? That's what you deserve every single day.",
    "quote_4": "Still here is more than enough. That took strength.",
    "select_language": "Select Language"
};

async function translateText(text: string, targetLanguage: string) {
    try {
        const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
            q: text,
            target: targetLanguage,
            format: 'text'
        });
        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error(`Error translating to ${targetLanguage}:`, error);
        return text;
    }
}

async function generate() {
    const localesDir = path.join(process.cwd(), 'src', 'i18n', 'locales');
    if (!fs.existsSync(localesDir)) {
        fs.mkdirSync(localesDir, { recursive: true });
    }

    // Save English
    fs.writeFileSync(path.join(localesDir, 'en.json'), JSON.stringify(sourceTranslation, null, 2));
    console.log('Saved en.json');

    for (const lang of LANGUAGES) {
        console.log(`Translating to ${lang}...`);
        const translated: any = {};
        const keys = Object.keys(sourceTranslation);

        // Batch translate to avoid massive API calls
        const textsToTranslate = keys.map(key => (sourceTranslation as any)[key]);

        try {
            const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
                q: textsToTranslate,
                target: lang,
                format: 'text'
            });

            const translatedTexts = response.data.data.translations.map((t: any) => t.translatedText);
            keys.forEach((key, index) => {
                translated[key] = translatedTexts[index];
            });

            fs.writeFileSync(path.join(localesDir, `${lang}.json`), JSON.stringify(translated, null, 2));
            console.log(`Saved ${lang}.json`);
        } catch (error) {
            console.error(`Failed to generate ${lang}:`, error);
        }
    }
}

generate();
