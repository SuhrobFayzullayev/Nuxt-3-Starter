import { locales } from "~/constants";

export interface DefaultObject {
  [key: string]: unknown;
}

export const localeCodes = locales.map((locale) => locale.id);
type LocaleCodeType = (typeof localeCodes)[number];

export const formatDate = (
  date?: string | number | Date,
  formatvalue: string = "dd.mm.yyyy"
) => {
  // get formated date separator
  const separator: string = formatvalue.includes(".")
    ? "."
    : formatvalue.includes("-")
      ? "-"
      : "/";

  // splited format date
  const splitedFormat: string[] = formatvalue.split(`${separator}`);

  // date to date format
  const selectedDate: Date = new Date(date!);

  // date
  const mm: number = selectedDate.getMonth() + 1;
  const dd: number = selectedDate.getDate();
  const yyyy: number = selectedDate.getFullYear();

  // get date index
  const yearIndex = splitedFormat.indexOf("yyyy");
  const monthIndex = splitedFormat.indexOf("mm");

  // format date
  if (yearIndex == 0 && monthIndex == 1)
    return `${yyyy}${separator}${mm < 10 ? "0" + mm : mm}${separator}${
      dd < 10 ? "0" + dd : dd
    }`;
  else if (yearIndex == 2 && monthIndex == 1)
    return `${dd < 10 ? "0" + dd : dd}${separator}${
      mm < 10 ? "0" + mm : mm
    }${separator}${yyyy}`;
  else if (yearIndex == 0 && monthIndex == 2)
    return `${yyyy}${separator}${dd < 10 ? "0" + dd : dd}${separator}${
      mm < 10 ? "0" + mm : mm
    }`;
  else
    return `${mm < 10 ? "0" + mm : mm}${separator}${
      dd < 10 ? "0" + dd : dd
    }${separator}${yyyy}`;
};

export const formatPrice = (number: number, n = 2, x = 3, s = ",", c = ".") => {
  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? "\\D" : "$"})`;
  const num = number.toFixed(Math.max(0, ~~n));

  return (c ? num.replace(".", c) : num).replace(
    new RegExp(re, "g"),
    `$&${s || ","}`
  );
};

export const getIdFromSlug = (slug: string) => {
  return slug.split("-")[slug.split("-").length - 1];
};

export const getUid = (prefix = "") => {
  const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
  return prefix ? `${prefix}-${id}` : id;
};

export const titleToUrl = (title: string) => {
  return title
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const isObject = (value: unknown) => {
  return (
    value != null && typeof value === "object" && Array.isArray(value) === false
  );
};

export const isNullish = (val: any) => {
  return [null, undefined, false].includes(val);
};

export const parseJSON = (value: string) => {
  try {
    return JSON.parse(value) as unknown;
  } catch (e) {
    return false;
  }
};

export const formatPhoneNumber = (phone: string) => {
  return phone.replace(/[^0-9]/gi, "");
};

export const beautifyPhoneNumber = (phone: unknown) => {
  if (!phone || typeof phone !== "string") return "";
  const cleaned = formatPhoneNumber(phone);
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
  if (!match) return "";
  return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
};

export const wait = <T>(time: number) => {
  return new Promise<T>((resolve) => setTimeout(resolve, time));
};

export const detectActiveLink = (router: any, path: string): boolean => {
  const currentRoute = router.currentRoute.value.name;

  const isTrue =
    `/${currentRoute}` == `${path}-id` || `/${currentRoute}` == `${path}`;

  return isTrue;
};

export const findObjectInArray = (arr: any[] = [], param: any, query: any) => {
  if ((Array.isArray(arr) && arr.length === 0) || !param || !query) {
    return {};
  }
  const obj = arr.find((el) => el[param] === query);
  return (isObject(obj) && obj) || {};
};

export const extractAttributeValue = (text: string, attributeName = "src") => {
  const regex = new RegExp(`${attributeName}=["'](.*?)["']`);
  const match = text.match(regex)?.[1];
  return match;
};

export const stripTags = (input?: string) => {
  if (!input) return "";
  return input.replace(/<(?:.|\n)*?>/gm, "");
};

export const handleArrayI18n = (
  data: Array<DefaultObject>,
  langKeys: string[],
  currentLang: LocaleCodeType | string
) => {
  if (data) {
    const EN: string = "en";
    const RU: string = "ru";

    switch (currentLang) {
      case EN:
        return data.map((i) => {
          const langData: DefaultObject = {};

          for (const key of langKeys) {
            const langKey = key.concat("_", EN);
            if (i[langKey]) {
              langData[key] = i[langKey];
            }
          }

          return {
            ...i,
            ...langData,
          };
        });

      case RU:
        return data.map((i) => {
          const langData: DefaultObject = {};

          for (const key of langKeys) {
            const langKey = key.concat("_", RU);
            if (i[langKey]) {
              langData[key] = i[langKey];
            }
          }

          return {
            ...i,
            ...langData,
          };
        });

      default:
        return [];
    }
  }
  return [];
};
