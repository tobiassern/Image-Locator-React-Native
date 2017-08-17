import { Util } from 'expo';
import { en } from './en';
import { sv } from './sv';

const locale = null;

Util.getCurrentLocaleAsync().then((response) => { 
	let short_locale = response.split('-');
	short_locale = short_locale[0];
	locale = short_locale;
});

const translations = { en, sv }

export function translate(string) {
	if(translations[locale]) {
		return translations[locale][string] ? translations[locale][string] : '** No translation **';
	} else {
		return translations.en[string] ? translations.en[string] : '** No translation **';
	}
}