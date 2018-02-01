import {addLocaleData} from 'react-intl';

import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

import sv_SE from './sv-SE.json';

addLocaleData([...en, ...sv]);

const languages = {
	'en-US': {},
	'sv-SE': sv_SE
};

const locales = Object.keys(languages);

const translation = (locale) => languages[locale];

const defaultLocale =  navigator.language in languages ? navigator.language : 'en-US';

export {languages, defaultLocale, locales, translation};
