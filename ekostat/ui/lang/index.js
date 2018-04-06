import {addLocaleData} from 'react-intl';

import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

import sv_SE from './sv-SE.json';
import en_US from './en-US.json';

addLocaleData([...en, ...sv]);

const languages = {
  'en-US': en_US,
  'sv-SE': sv_SE
};

const locales = Object.keys(languages);

const translation = (locale) => languages[locale];

const defaultLocale =  navigator.language in languages ? navigator.language : 'en-US';

export {defaultLocale, locales, translation};
