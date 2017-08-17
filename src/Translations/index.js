import { Util } from 'expo';
import { en } from './en';
import { sv } from './sv';

const locale = null;

Util.getCurrentLocaleAsync().then((response) => { 
	console.log("locale: ", response);
	let short_locale = response.split('-');
	console.log(short_locale);
	short_locale = short_locale[0];
	console.log(short_locale);
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