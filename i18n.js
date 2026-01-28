/* Translation Engine (stub) */
const dict = {};
let lang = 'en';
export function setLang(l){ lang = l; }
export function t(key){ return (dict[lang] && dict[lang][key]) || key; }
