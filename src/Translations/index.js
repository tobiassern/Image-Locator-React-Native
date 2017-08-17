import { Util } from 'expo';
import { en } from './en';
import { sv } from './sv';

const locale = null;

Util.getCurrentLocaleAsync().then((response) => { 
	locale = response;
});
const translations = { en, sv }
export function translate(string) {
	return translations[locale] && translations[locale][string] ? translations[locale][string] : '** No translation **';
}