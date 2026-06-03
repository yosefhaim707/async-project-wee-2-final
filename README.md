# פרויקט מסכם שבוע 2: מרכז CRUD ל־Public APIs

## תקציר הפרויקט

`public-api-crud-hub-week-two-training` הוא פרויקט Node.js מסכם לשבוע 2.

בפרויקט הזה יש לבחור **API אחד בלבד** מתוך חמשת ה־APIs המאושרים שמופיעים בהמשך ה־README.

אין להשתמש ב־API אחר ואין להוסיף אופציה נוספת לרשימה.

ועל בסיסו בונה מערכת קטנה שמנהלת **אוסף אישי של פריטים**.

ה־API החיצוני מספק JSON פשוט עם מידע טקסטואלי שקל לקרוא, לנרמל ולשמור, לדוגמה:

- פוסטים או משימות דמו
- ספרים
- מדינות
- חגים ציבוריים
- לוח שנה יהודי, פרשות ולימוד יומי

המערכת המקומית צריכה לאפשר לבצע **CRUD מלא** על פריטים שנשמרו מה־API או נוספו ידנית.

הפרויקט רץ דרך Node.js בלבד, בלי UI, בלי HTML, בלי CSS ובלי Frontend.

כל התקשורת עם המערכת מתבצעת דרך:

- `curl`
- Postman / Insomnia אם רוצים
- הדפסת מידע עם `console.log`
- תשובות JSON מהשרת

---

## משך הפרויקט

הפרויקט מיועד ליום לימודים אחד מלא.

החלקים שחייבים להיות מוגשים:

- שרת HTTP בסיסי עם Node.js Vanilla
- חיבור ל־API חיצוני עם `fetch`
- CRUD מלא על פריטים מקומיים
- שמירה לקובץ JSON בעזרת `fs/promises`
- Query params
- פענוח JSON body
- Status codes נכונים
- Cookies בסיסיים לזיהוי משתמש מקומי
- הפרדה לקבצים ומודולים
- שימוש ב־async/await ו־try/catch

---

## תוכן עניינים

1. [דרישות מרכזיות](#דרישות-מרכזיות)
2. [מה הפרויקט מדגים](#מה-הפרויקט-מדגים)
3. [טכנולוגיות בשימוש](#טכנולוגיות-בשימוש)
4. [כלל חשוב: אין UI](#כלל-חשוב-אין-ui)
5. [בחירת API](#בחירת-api)
6. [חמשת ה־APIs המאושרים](#חמשת-הapis-המאושרים)
7. [מבנה הפרויקט](#מבנה-הפרויקט)
8. [הרצת הפרויקט](#הרצת-הפרויקט)
9. [זרימת האפליקציה](#זרימת-האפליקציה)
10. [מודלי הדאטה המרכזיים](#מודלי-הדאטה-המרכזיים)
11. [נתיבי HTTP](#נתיבי-http)
12. [דרישות CRUD](#דרישות-crud)
13. [חיבור ל־API חיצוני](#חיבור-לapi-חיצוני)
14. [מחלקת `CollectionManager`](#מחלקת-collectionmanager)
15. [מערכת שמירה לקובץ](#מערכת-שמירה-לקובץ)
16. [Cookies ו־Statelessness](#cookies-וstatelessness)
17. [מערכת סטטיסטיקות](#מערכת-סטטיסטיקות)
18. [כלי עזר להדפסה ולוגים](#כלי-עזר-להדפסה-ולוגים)
19. [ולידציה וטיפול בשגיאות](#ולידציה-וטיפול-בשגיאות)
20. [מושגי JavaScript ו־Node.js בפרויקט](#מושגי-javascript-וnodejs-בפרויקט)
21. [דרישות המימוש](#דרישות-המימוש)
22. [בדיקות עם `curl`](#בדיקות-עם-curl)
23. [שאלות להגשה](#שאלות-להגשה)
24. [מגבלות נוכחיות](#מגבלות-נוכחיות)
25. [רשימת בדיקה להגשה](#רשימת-בדיקה-להגשה)
26. [קישור לריפו](#קישור-לריפו)

---

## דרישות מרכזיות

המערכת צריכה להיות Backend קטן ומסודר שכולל את נושאי שבוע 2:

- HTTP
- Request / Response
- REST
- HTTP Methods
- Status Codes
- Headers
- Vanilla Node.js HTTP Server
- Routing ידני עם `req.url` ו־`req.method`
- Query params
- פענוח JSON body
- `req` בתור Stream
- Cookies
- Statelessness
- Callbacks
- Promises
- `async/await`
- `try/catch`
- `fetch`
- Blocking vs Non-Blocking
- Single Thread ו־Event Loop

בנוסף, המימוש משתמש גם ב:

- ES Modules
- פונקציות Factory
- קלאסים
- Closures
- מערכים
- מתודות מערך
- אובייקטים
- מתודות אובייקטים
- מתודות מחרוזת
- לוגיקת ולידציה
- סטטיסטיקות
- כלי הדפסה

---

## מה הפרויקט מדגים

הפרויקט מדגים איך לבנות שרת קטן בלי Express.

השרת יודע:

- לקבל בקשות HTTP.
- לזהות `method` ו־`url`.
- לקרוא query params מתוך ה־URL.
- לקרוא JSON body מתוך בקשות `POST` ו־`PATCH`.
- לשלוח תשובות JSON.
- להחזיר status codes מתאימים.
- לקרוא API חיצוני עם `fetch`.
- לשמור דאטה מקומי בקובץ JSON.
- לטעון דאטה מקומי בתחילת הריצה.
- לבצע CRUD מלא על הפריטים המקומיים.
- להשתמש ב־Cookie כדי לזהות משתמש מקומי פשוט.
- להדפיס לוגים ברורים עם `console.log`.
- לחשב סטטיסטיקות על האוסף.

---

## טכנולוגיות בשימוש

הפרויקט משתמש ב:

- Node.js
- JavaScript
- ES Modules
- Vanilla `node:http`
- `node:url`
- `node:fs/promises`
- `fetch` גלובלי
- קבצי JSON
- סקריפטים של npm

אין להשתמש ב־Express בפרויקט הזה.

הפרויקט נדרש להישאר ב־Vanilla Node.js HTTP Server.

---

## כלל חשוב: אין UI

אין לבנות UI בפרויקט הזה.

לא משתמשים ב:

- HTML
- CSS
- DOM
- React
- UI בדפדפן
- טפסים (`Forms`)
- כפתורים (`Buttons`)

הפרויקט הוא Backend בלבד.

מותר להשתמש רק ב:

- `console.log`
- תשובות JSON
- `curl`
- Postman / Insomnia
- קבצי JSON

כל פלט חשוב צריך להיות מודפס בצורה ברורה בטרמינל או מוחזר כ־תשובת JSON.

---

## בחירת API

יש לבחור **API אחד בלבד** מתוך הרשימה המאושרת בפרק הבא.

אין לבחור API אחר מתוך `public-apis/public-apis`, אין להוסיף API עצמאי, ואין להרחיב את הרשימה מעבר לחמש האופציות שמופיעות במסמך.

ארבע מהאופציות נבחרו מתוך המחקר המצורף, והאופציה החמישית עודכנה ל־Hebcal כדי להתאים טוב יותר לקהל יהודי/חרדי. כל החמישייה עומדת באותם קריטריונים:

- עובד ב־HTTPS.
- מחזיר JSON פשוט.
- לא דורש OAuth.
- לא דורש הרשמה מורכבת.
- מתאים ל־`fetch` פשוט ב־Node.js.
- יש לו תיעוד ברור ודוגמאות נוחות.
- מחזיר מידע טקסטואלי או מידע שקל להפוך לטקסט.
- מאפשר לבנות סביבו אוסף מקומי עם CRUD.

בכל מימוש צריך לממש ב־`ApiClient`:

```js
searchExternalItems(query);
getExternalItemById(externalId);
normalizeExternalItem(rawItem);
```

אם ה־API שנבחר לא תומך בשליפת פריט בודד לפי ID, צריך להסביר זאת ב־README של ההגשה ולייבא פריטים מתוך התוצאה המלאה שחזרה מ־`searchExternalItems`.

---

## חמשת ה־APIs המאושרים

אלו **חמש האופציות היחידות** לפרויקט.

| API | תחום | רעיון לפרויקט | חיפוש או רשימה | פריט בודד | הערה חשובה |
| --- | --- | --- | --- | --- | --- |
| JSONPlaceholder | פוסטים / משימות דמו | מנהל משימות או פוסטים | `GET /posts`, `GET /posts?userId=1` | `GET /posts/1` | API דמו. פעולות כתיבה לא נשמרות באמת בשרת החיצוני. |
| Open Library | ספרים | רשימת קריאה אישית | `GET /search.json?q=dune` | `GET /works/OL45883W.json` | מומלץ לשמור `workId` בלי `/works/`. |
| REST Countries | מדינות | לוח יעדים לטיול או מחקר מדינות | `GET /name/israel?fields=...` | `GET /alpha/IL?fields=...` | תמיד כדאי להשתמש ב־`fields` כדי לקבל JSON קטן וברור. |
| Nager.Date | חגים ציבוריים | לוח חגים ותאריכים חשובים | `GET /publicholidays/2026/US` | אין endpoint ישיר לחג בודד | מייבאים מתוך תוצאת החיפוש המלאה. |
| Hebcal | לוח שנה יהודי | לוח תאריכים, פרשות ולימוד יומי | `GET /hebcal?...` | אין endpoint ישיר לאירוע בודד | מתאים במיוחד לקהל יהודי/חרדי; מייבאים מתוך תוצאת החיפוש המלאה. |

---

### 1. JSONPlaceholder

JSONPlaceholder הוא API דמו שמחזיר פוסטים, תגובות, משימות, משתמשים ועוד.
הוא מתאים למימוש שרוצה נתונים פשוטים ל־`fetch`, נרמול ו־CRUD מקומי.

תיעוד:

```txt
https://jsonplaceholder.typicode.com/
```

הגדרות בסיס:

```js
export const apiConfig = {
  apiName: "JSONPlaceholder",
  baseUrl: "https://jsonplaceholder.typicode.com",
  itemType: "post",
};
```

חיפוש או רשימה:

```js
const url = "https://jsonplaceholder.typicode.com/posts";
const response = await fetch(url);
const posts = await response.json();
```

סינון פשוט לפי `userId`:

```js
const userId = encodeURIComponent(query);
const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
```

פריט בודד:

```js
const url = `https://jsonplaceholder.typicode.com/posts/${externalId}`;
```

נרמול מומלץ:

```js
normalizeExternalItem(post) {
  return createApiResult({
    externalId: String(post.id),
    title: post.title,
    description: post.body,
    sourceUrl: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    rawData: post,
  });
}
```

הערה חשובה: זה API דמו. אפשר להשתמש בו כמקור קריאה חיצוני, אבל לא להסתמך על כך ש־`POST`, `PATCH` או `DELETE` באמת משנים את השרת החיצוני.
ה־CRUD האמיתי של הפרויקט מתבצע רק בקובץ המקומי שלכם.

---

### 2. Open Library

Open Library מחזיר מידע על ספרים: כותרת, מחברים, שנת פרסום, שפות, מזהים וקישורים.
זה API טוב למנהל רשימת קריאה.

תיעוד:

```txt
https://openlibrary.org/dev/docs/api/search
https://openlibrary.org/developers/api
```

הגדרות בסיס:

```js
export const apiConfig = {
  apiName: "Open Library",
  baseUrl: "https://openlibrary.org",
  itemType: "book",
};
```

חיפוש ספרים:

```js
const queryText = encodeURIComponent(query);
const url = `https://openlibrary.org/search.json?q=${queryText}&limit=10`;
const response = await fetch(url);
const data = await response.json();
const books = data.docs;
```

פריט בודד לפי `workId`:

```js
const url = `https://openlibrary.org/works/${externalId}.json`;
```

בתוצאות החיפוש השדה `key` נראה כך:

```txt
/works/OL45883W
```

לכן כדאי לשמור את ה־`externalId` כך:

```js
const externalId = rawBook.key.replace("/works/", "");
```

נרמול מומלץ:

```js
normalizeExternalItem(rawBook) {
  const externalId = rawBook.key.replace("/works/", "");
  const authors = rawBook.author_name?.join(", ") ?? "Unknown author";

  return createApiResult({
    externalId,
    title: rawBook.title,
    description: `${authors}. First published: ${rawBook.first_publish_year ?? "unknown"}`,
    sourceUrl: `https://openlibrary.org${rawBook.key}`,
    rawData: rawBook,
  });
}
```

---

### 3. REST Countries

REST Countries מחזיר מידע על מדינות: שם, עיר בירה, אזור, אוכלוסייה, שפות, מטבעות ועוד.
זה API טוב ללוח יעדים, מחקר מדינות או רשימת מקומות לביקור.

תיעוד:

```txt
https://restcountries.com/
```

הגדרות בסיס:

```js
export const apiConfig = {
  apiName: "REST Countries",
  baseUrl: "https://restcountries.com/v3.1",
  itemType: "country",
};
```

חיפוש מדינה לפי שם:

```js
const countryName = encodeURIComponent(query);
const fields = "name,cca2,capital,region,population,languages,flags";
const url = `https://restcountries.com/v3.1/name/${countryName}?fields=${fields}`;
const response = await fetch(url);
const countries = await response.json();
```

פריט בודד לפי קוד מדינה:

```js
const code = encodeURIComponent(externalId);
const fields = "name,cca2,capital,region,population,languages,flags";
const url = `https://restcountries.com/v3.1/alpha/${code}?fields=${fields}`;
```

נרמול מומלץ:

```js
normalizeExternalItem(country) {
  const capital = country.capital?.[0] ?? "Unknown capital";
  const languages = Object.values(country.languages ?? {}).join(", ");

  return createApiResult({
    externalId: country.cca2,
    title: country.name.common,
    description: `${capital}. ${country.region}. Population: ${country.population}. Languages: ${languages}`,
    imageUrl: country.flags?.png ?? "",
    sourceUrl: `https://restcountries.com/v3.1/alpha/${country.cca2}`,
    rawData: country,
  });
}
```

הערה חשובה: ב־REST Countries כדאי להשתמש תמיד ב־`fields`, במיוחד ב־`/all`, כדי לא לקבל תשובה גדולה מדי או שגיאה.

---

### 4. Nager.Date

Nager.Date מחזיר חגים ציבוריים לפי שנה וקוד מדינה.
זה API טוב ללוח חגים, תכנון חופשות או רשימת תאריכים חשובים.

תיעוד:

```txt
https://date.nager.at/api
```

הגדרות בסיס:

```js
export const apiConfig = {
  apiName: "Nager.Date",
  baseUrl: "https://date.nager.at/api/v3",
  itemType: "holiday",
};
```

בפרויקט הזה מומלץ שה־`query` יהיה בפורמט:

```txt
YYYY-CC
```

לדוגמה:

```txt
2026-US
```

חיפוש חגים:

```js
const [year, countryCode] = query.split("-");
const safeYear = encodeURIComponent(year);
const safeCountryCode = encodeURIComponent(countryCode.toUpperCase());
const url = `https://date.nager.at/api/v3/publicholidays/${safeYear}/${safeCountryCode}`;
const response = await fetch(url);
const holidays = await response.json();
```

ל־Nager.Date אין endpoint פשוט של חג בודד לפי ID.
לכן בפרויקט הזה `getExternalItemById` יכול להחזיר שגיאה מסודרת, והייבוא צריך להתבצע מתוך `externalItem` מלא שחזר מ־`searchExternalItems`.

נרמול מומלץ:

```js
normalizeExternalItem(holiday) {
  return createApiResult({
    externalId: `${holiday.countryCode}-${holiday.date}-${holiday.name}`,
    title: holiday.localName || holiday.name,
    description: `${holiday.name}. Date: ${holiday.date}. Types: ${(holiday.types ?? []).join(", ")}`,
    sourceUrl: "https://date.nager.at/api",
    rawData: holiday,
  });
}
```

---

### 5. Hebcal

Hebcal מחזיר מידע על לוח השנה היהודי: חגים, ראש חודש, פרשת השבוע, זמני הדלקת נרות והבדלה, ודפי לימוד יומיים כמו Daf Yomi.
בפרויקט הזה נשתמש בו בעיקר לתאריכים, פרשות ולימוד יומי, כי זה תחום שימושי וניטרלי יותר לקהל יהודי/חרדי מאשר API בידורי.

תיעוד:

```txt
https://www.hebcal.com/home/developer-apis
https://www.hebcal.com/home/195/jewish-calendar-rest-api
```

הגדרות בסיס:

```js
export const apiConfig = {
  apiName: "Hebcal",
  baseUrl: "https://www.hebcal.com",
  itemType: "jewish-calendar-event",
};
```

בפרויקט הזה מומלץ שה־`query` יהיה בפורמט:

```txt
YYYY-MM
```

לדוגמה:

```txt
2026-05
```

אם רוצים שנה שלמה, אפשר לשלוח רק:

```txt
2026
```

חיפוש אירועי לוח שנה יהודי:

```js
const [year, month = "x"] = query.split("-");
const safeYear = encodeURIComponent(year);
const safeMonth = encodeURIComponent(month);

const params = new URLSearchParams({
  v: "1",
  cfg: "json",
  year: safeYear,
  month: safeMonth,
  maj: "on",
  min: "on",
  mod: "on",
  nx: "on",
  s: "on",
  F: "on",
  i: "on",
  lg: "he",
});

const url = `https://www.hebcal.com/hebcal?${params.toString()}`;
const response = await fetch(url);
const data = await response.json();
const events = data.items;
```

המשמעות של הפרמטרים המרכזיים:

- `cfg=json` מחזיר JSON.
- `year` ו־`month` קובעים טווח תאריכים.
- `maj`, `min`, `mod`, `nx` מוסיפים סוגי חגים ואירועים.
- `s=on` מוסיף פרשת השבוע.
- `F=on` מוסיף Daf Yomi.
- `i=on` משתמש בלוח ארץ ישראל.
- `lg=he` מחזיר כותרות בעברית כאשר יש תרגום זמין.

ל־Hebcal אין endpoint פשוט של אירוע בודד לפי ID.
לכן בפרויקט הזה `getExternalItemById` יכול להחזיר שגיאה מסודרת, והייבוא צריך להתבצע מתוך `externalItem` מלא שחזר מ־`searchExternalItems`.

נרמול מומלץ:

```js
normalizeExternalItem(event) {
  const title = event.hebrew || event.title;
  const descriptionParts = [
    event.hdate ? `Hebrew date: ${event.hdate}` : "",
    event.category ? `Category: ${event.category}` : "",
    event.memo ?? "",
  ].filter(Boolean);

  return createApiResult({
    externalId: `${event.date}-${event.category}-${event.title}`,
    title,
    description: descriptionParts.join(". "),
    sourceUrl: event.link ?? "https://www.hebcal.com/hebcal",
    rawData: event,
  });
}
```

דוגמת URL מלאה לבדיקה:

```txt
https://www.hebcal.com/hebcal?v=1&cfg=json&year=2026&month=5&maj=on&min=on&mod=on&nx=on&s=on&F=on&i=on&lg=he
```

הערה חשובה: Hebcal לא דורש הרשמה או API key, אבל כן משתמש ב־rate limiting. אל תריצו הרבה בקשות בלולאה; בקשה אחת לחודש או שנה מספיקה לפרויקט הזה.

---

## מבנה הפרויקט

```txt
public-api-crud-hub-week-two-training/
│
├── package.json
├── README.md
├── main.js
├── server.js
│
├── data/
│   └── savedItems.json
│
├── modules/
│   ├── config.js
│   ├── idGenerator.js
│   ├── savedItemFactory.js
│   ├── apiResultFactory.js
│   ├── ApiClient.js
│   ├── CollectionManager.js
│   ├── fileStorage.js
│   ├── requestUtils.js
│   ├── responseUtils.js
│   ├── cookieUtils.js
│   ├── stats.js
│   └── printUtils.js
│
└── examples/
    ├── curl-examples.md
    └── recommended-apis.md
```

---

## הסבר לפי קבצים

### `package.json`

הקובץ מגדיר את הפרויקט כפרויקט Node.js.

דוגמה:

```json
{
  "name": "public-api-crud-hub-week-two-training",
  "version": "1.0.0",
  "main": "main.js",
  "type": "module",
  "scripts": {
    "start": "node main.js"
  }
}
```

החלק החשוב:

```json
"type": "module"
```

זה אומר שהפרויקט משתמש ב־ES Modules:

```js
import
export
```

ולא ב:

```js
require;
module.exports;
```

---

### `main.js`

`main.js` הוא נקודת הכניסה של האפליקציה.

הוא צריך:

1. לייבא את `startServer` מתוך `server.js`.
2. להדפיס הודעת פתיחה.
3. להפעיל את השרת.

דוגמה רעיונית:

```js
import { startServer } from "./server.js";
import { printTitle } from "./modules/printUtils.js";

printTitle("Public API CRUD Hub");
startServer(3000);
```

---

### `server.js`

זה הקובץ שמייצר את שרת ה־HTTP.

הוא משתמש ב:

```js
import http from "node:http";
```

או:

```js
import * as http from "node:http";
```

התפקידים שלו:

- ליצור שרת עם `http.createServer`.
- לקבל `req` ו־`res`.
- לזהות את ה־route לפי `req.url` ו־`req.method`.
- לקרוא query params.
- לקרוא body בבקשות שדורשות body.
- לקרוא לפונקציות של `CollectionManager`.
- להחזיר תשובת JSON.
- להחזיר `404` אם אין route מתאים.

---

### `data/savedItems.json`

זה קובץ הדאטה המקומי של הפרויקט.

בהתחלה הוא יכול להיראות כך:

```json
[]
```

כל פריט שנוצר, מיובא, מתעדכן או נמחק משפיע על הקובץ הזה.

חשוב:

- אין להשתמש ב־Database.
- אין להשתמש ב־LocalStorage.
- אין להשתמש ב־Browser.
- השמירה מתבצעת רק לקובץ JSON דרך Node.js.

---

### `modules/config.js`

קובץ ההגדרות של אחד מחמשת ה־APIs המאושרים שנבחר למימוש.

אין להגדיר כאן API אחר.

דוגמה ל־Open Library:

```js
export const apiConfig = {
  apiName: "Open Library",
  baseUrl: "https://openlibrary.org",
  searchPath: "/search.json",
  itemType: "book",
};
```

דוגמה ל־REST Countries:

```js
export const apiConfig = {
  apiName: "REST Countries",
  baseUrl: "https://restcountries.com/v3.1",
  searchPath: "/name",
  itemType: "country",
};
```

כל הגדרות ה־API צריכות להיות במקום אחד.

---

### `modules/idGenerator.js`

קובץ זה יוצר IDs בעזרת closure.

```js
export function createIdGenerator(prefix = "ID") {
  let currentId = 0;

  return function generateId() {
    currentId += 1;
    return `${prefix}-${currentId}`;
  };
}
```

שימוש לדוגמה:

```js
const generateItemId = createIdGenerator("ITEM");

generateItemId(); // ITEM-1
generateItemId(); // ITEM-2
```

זה ממשיך את החומר של שבוע 1.

---

### `modules/savedItemFactory.js`

פונקציית Factory שיוצרת פריט מקומי שמור.

```js
export function createSavedItem({
  id,
  userId,
  sourceApi,
  itemType,
  externalId,
  title,
  description = "",
  status = "saved",
  priority = 3,
  tags = [],
  notes = "",
  rawData = {},
}) {
  return {
    id,
    userId,
    sourceApi,
    itemType,
    externalId,
    title: title.trim(),
    description,
    status,
    priority,
    tags,
    notes,
    rawData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
```

---

### `modules/apiResultFactory.js`

פונקציית Factory שמייצרת מבנה אחיד לתוצאה מה־API החיצוני.

כל API חיצוני, לא משנה איך הוא מחזיר דאטה, צריך להפוך למבנה אחיד.

```js
export function createApiResult({
  externalId,
  title,
  description = "",
  imageUrl = "",
  sourceUrl = "",
  rawData = {},
}) {
  return {
    externalId,
    title,
    description,
    imageUrl,
    sourceUrl,
    rawData,
  };
}
```

---

### `modules/ApiClient.js`

זה הקובץ היחיד שאמור להשתנות משמעותית בין מימוש למימוש.

התפקיד שלו הוא לדבר עם ה־API החיצוני.

הוא צריך לכלול class:

```js
export class ApiClient {
  constructor(apiConfig) {
    this.apiConfig = apiConfig;
  }

  async searchExternalItems(query) {
    // קריאה ל־API החיצוני
  }

  async getExternalItemById(externalId) {
    // שליפת פריט אחד לפי ID, אם ה־API שנבחר תומך בזה
  }

  normalizeExternalItem(rawItem) {
    // המרת הדאטה הגולמי מה־API למבנה של createApiResult
  }
}
```

### חוקים חשובים לקובץ הזה

- חובה להשתמש ב־`fetch`.
- חובה להשתמש ב־`async/await`.
- חובה לבדוק `response.ok`.
- חובה להשתמש ב־`try/catch` או לזרוק שגיאה מסודרת.
- חובה להחזיר מערך נקי של תוצאות מנורמלות.
- אסור לשים לוגיקת CRUD בקובץ הזה.

---

### `modules/CollectionManager.js`

זה הקלאס המרכזי של המערכת.

הוא מנהל את כל הפריטים המקומיים.

```js
export class CollectionManager {
  constructor({ generateItemId, storage, apiClient }) {
    this.items = [];
    this.generateItemId = generateItemId;
    this.storage = storage;
    this.apiClient = apiClient;
  }

  async load() {}
  async save() {}
  async createItem(data) {}
  async importItemFromExternalApi(data) {}
  getAllItems(filters = {}) {}
  getItemById(itemId) {}
  async updateItem(itemId, updates) {}
  async deleteItem(itemId) {}
  getStats() {}
}
```

ה־Manager לא אמור להכיר את `req` ו־`res`.

הוא מקבל דאטה רגיל ומחזיר דאטה רגיל.

זאת הפרדה חשובה:

```txt
server.js
אחראי על HTTP

CollectionManager.js
אחראי על הלוגיקה העסקית

ApiClient.js
אחראי על API חיצוני

fileStorage.js
אחראי על קבצים
```

---

### `modules/fileStorage.js`

קובץ זה אחראי על קריאה וכתיבה לקובץ JSON.

הוא צריך להשתמש ב:

```js
import { readFile, writeFile } from "node:fs/promises";
```

פונקציות חובה:

```js
export async function readJsonFile(filePath, defaultValue = []) {}
export async function writeJsonFile(filePath, data) {}
```

חוקים:

- אין להשתמש ב־`readFileSync`.
- אין להשתמש ב־`writeFileSync`.
- חובה להשתמש ב־`async/await`.
- חובה לטפל במקרה שהקובץ עדיין לא קיים.
- חובה להשתמש ב־`JSON.parse` ו־`JSON.stringify`.

---

### `modules/requestUtils.js`

קובץ עזר לקריאת מידע מתוך בקשת HTTP.

פונקציות חובה:

```js
export function getPathAndQuery(req) {}
export function parseJsonBody(req) {}
```

`parseJsonBody` צריך לאסוף body מתוך `req`.

זכרו:

`req` הוא Stream.

לכן צריך להקשיב ל:

```js
req.on("data", callback);
req.on("end", callback);
```

דוגמה רעיונית:

```js
export function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        if (!body) {
          resolve({});
          return;
        }

        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });
  });
}
```

הקוד הזה משלב גם Callbacks וגם Promises.

---

### `modules/responseUtils.js`

קובץ עזר לשליחת תשובות JSON.

פונקציות חובה:

```js
export function sendJson(res, statusCode, data) {}
export function sendError(res, statusCode, message) {}
```

דוגמה רעיונית:

```js
export function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}
```

---

### `modules/cookieUtils.js`

קובץ עזר לעבודה עם Cookies.

פונקציות חובה:

```js
export function parseCookies(req) {}
export function getOrCreateVisitorId(req, res, generateVisitorId) {}
```

ה־Cookie בפרויקט הזה לא משמש לאבטחה אמיתית.

הוא משמש רק כדי להדגים ש־HTTP הוא Stateless, ושהשרת צריך לקבל בכל בקשה מזהה כלשהו אם הוא רוצה לדעת מי המשתמש.

שם ה־Cookie:

```txt
visitorId
```

דוגמה ל־Header:

```txt
Set-Cookie: visitorId=VIS-1; HttpOnly; SameSite=Lax
```

ב־localhost לא חייבים להשתמש ב־`Secure`, כי `Secure` מיועד ל־HTTPS.

---

### `modules/stats.js`

קובץ זה מחשב סטטיסטיקות על הפריטים המקומיים.

פונקציה חובה:

```js
export function calculateCollectionStats(items) {}
```

הסטטיסטיקות צריכות לכלול לפחות:

- totalItems
- itemsByStatus
- itemsByPriority
- mostUsedTag
- newestItem
- oldestItem
- averagePriority

דוגמה לתוצאה:

```js
{
  totalItems: 8,
  itemsByStatus: {
    saved: 4,
    in_progress: 2,
    done: 1,
    archived: 1
  },
  itemsByPriority: {
    1: 1,
    2: 2,
    3: 3,
    4: 1,
    5: 1
  },
  mostUsedTag: 'travel',
  averagePriority: 3.1
}
```

---

### `modules/printUtils.js`

קובץ זה מכיל פונקציות שמדפיסות לטרמינל.

פונקציות מומלצות:

```js
export function printTitle(title) {}
export function printRequestLog(req, statusCode) {}
export function printServerStarted(port) {}
export function printExternalApiSearch(apiName, query, count) {}
export function printError(error) {}
```

הלוגים צריכים להיות מרוכזים ולא מפוזרים בכל הקבצים בצורה מבולגנת.

---

## הרצת הפרויקט

### 1. יצירת תיקיית הפרויקט

```bash
mkdir public-api-crud-hub-week-two-training
cd public-api-crud-hub-week-two-training
npm init -y
```

### 2. עדכון `package.json`

הוסיפו:

```json
{
  "type": "module",
  "scripts": {
    "start": "node main.js"
  }
}
```

### 3. יצירת תיקיות

```bash
mkdir modules data examples
```

### 4. יצירת קובץ דאטה

```bash
echo "[]" > data/savedItems.json
```

### 5. הרצת השרת

```bash
npm start
```

השרת צריך להדפיס:

```txt
=================================
Public API CRUD Hub פועל
השרת מאזין על port 3000
=================================
```

---

## זרימת האפליקציה

הזרימה המרכזית של האפליקציה:

### שלב 1 — הפעלת השרת

`main.js` מפעיל את השרת.

```txt
npm start
```

---

### שלב 2 — יצירת Cookie למבקר

בבקשה הראשונה, השרת בודק אם יש Cookie בשם `visitorId`.

אם אין, הוא יוצר אחד חדש.

```txt
visitorId=VIS-1
```

---

### שלב 3 — חיפוש ב־API החיצוני

המשתמש בודק דאטה מה־API החיצוני.

דוגמה:

```txt
GET /external/search?query=1
```

השרת:

1. קורא query param בשם `query`.
2. קורא ל־`ApiClient.searchExternalItems(query)`.
3. מחזיר תוצאות JSON.
4. מדפיס לוג בטרמינל.

---

### שלב 4 — יצירת פריט מקומי

המשתמש שומר פריט מקומי.

אפשרות 1: יצירה ידנית:

```txt
POST /items
```

אפשרות 2: יצירה מתוך API חיצוני:

```txt
POST /items/import
```

---

### שלב 5 — קריאת פריטים

המשתמש קורא את כל הפריטים:

```txt
GET /items
```

או פריט בודד:

```txt
GET /items/ITEM-1
```

או עם סינונים (`filters`):

```txt
GET /items?status=saved&tag=travel&priority=5
```

---

### שלב 6 — עדכון פריט

המשתמש מעדכן פריט:

```txt
PATCH /items/ITEM-1
```

לדוגמה:

```json
{
  "status": "done",
  "priority": 5,
  "notes": "חשוב לבדוק שוב בסוף השבוע"
}
```

---

### שלב 7 — מחיקת פריט

המשתמש מוחק פריט:

```txt
DELETE /items/ITEM-1
```

---

### שלב 8 — צפייה בסטטיסטיקות

המשתמש מבקש סטטיסטיקות:

```txt
GET /stats
```

---

## מודלי הדאטה המרכזיים

### מודל פריט שמור

כל פריט מקומי צריך להיראות בערך כך:

```js
{
  id: 'ITEM-1',
  userId: 'VIS-1',
  sourceApi: 'Open Library',
  itemType: 'book',
  externalId: 'OL12345W',
  title: 'Harry Potter and the Philosopher Stone',
  description: 'תוצאת ספר מ־Open Library',
  status: 'saved',
  priority: 4,
  tags: ['fantasy', 'books'],
  notes: 'לבדוק אם זמין בעברית',
  rawData: {},
  createdAt: '2026-05-25T10:00:00.000Z',
  updatedAt: '2026-05-25T10:00:00.000Z'
}
```

### שדות

| שדה           | סוג    | משמעות                              |
| ------------- | ------ | ----------------------------------- |
| `id`          | string | מזהה מקומי ייחודי                   |
| `userId`      | string | מזהה Cookie מקומי                   |
| `sourceApi`   | string | שם ה־API שממנו הגיע הפריט           |
| `itemType`    | string | סוג הפריט: book, country, game וכו׳ |
| `externalId`  | string | מזהה מה־API החיצוני                 |
| `title`       | string | שם הפריט                            |
| `description` | string | תיאור קצר                           |
| `status`      | string | מצב הפריט                           |
| `priority`    | number | עדיפות 1 עד 5                       |
| `tags`        | array  | תגיות                               |
| `notes`       | string | הערות משתמש                         |
| `rawData`     | object | הדאטה המקורי מה־API                 |
| `createdAt`   | string | תאריך יצירה                         |
| `updatedAt`   | string | תאריך עדכון אחרון                   |

---

### ערכי סטטוס מותרים

```txt
saved
in_progress
done
archived
```

אפשר להתאים את הסטטוסים לתחום שנבחר.

לדוגמה בפרויקט ספרים:

```txt
to_read
reading
finished
abandoned
```

אבל אם משנים סטטוסים, צריך לעדכן גם את הולידציה וגם את הסטטיסטיקות.

---

## נתיבי HTTP

### נתיב פתיחה

```txt
GET /
```

מחזיר הודעת תקינות קצרה ורשימת נתיבים זמינים.

---

### נתיב בדיקת תקינות

```txt
GET /health
```

מחזיר:

```json
{
  "success": true,
  "message": "Server is active",
  "visitorId": "VIS-1"
}
```

---

### נתיב מידע על ה־API

```txt
GET /api-info
```

מחזיר מידע על ה־API שנבחר.

```json
{
  "success": true,
  "data": {
    "apiName": "JSONPlaceholder",
    "itemType": "post",
    "baseUrl": "https://jsonplaceholder.typicode.com"
  }
}
```

---

### נתיב חיפוש ב־API החיצוני

```txt
GET /external/search?query=1
```

מחזיר תוצאות מה־API החיצוני אחרי נרמול (`normalization`).

```json
{
  "success": true,
  "data": []
}
```

---

### נתיב יצירת פריט

```txt
POST /items
```

יוצר פריט ידנית.

דוגמה ל־Body:

```json
{
  "title": "פריט ידני",
  "description": "נוצר ללא API חיצוני",
  "status": "saved",
  "priority": 3,
  "tags": ["manual", "test"],
  "notes": "זה פריט מקומי"
}
```

Status code מוצלח:

```txt
201 Created
```

---

### נתיב ייבוא פריט

```txt
POST /items/import
```

יוצר פריט מקומי מתוך פריט מה־API החיצוני.

דוגמה ל־Body:

```json
{
  "externalId": "1",
  "status": "saved",
  "priority": 4,
  "tags": ["jsonplaceholder", "post"],
  "notes": "Found from JSONPlaceholder"
}
```

אם ה־API שנבחר לא תומך בשליפה לפי ID, אפשר לשלוח במקום זה את כל האובייקט שחזר מהחיפוש:

```json
{
  "externalItem": {
    "externalId": "abc-123",
    "title": "תוצאה לדוגמה",
    "description": "תיאור לדוגמה"
  },
  "status": "saved",
  "priority": 4,
  "tags": ["example"]
}
```

---

### נתיב קריאת כל הפריטים

```txt
GET /items
```

מחזיר את כל הפריטים של המשתמש הנוכחי.

אפשר לתמוך ב־query params:

```txt
GET /items?status=saved
GET /items?tag=post
GET /items?priority=5
GET /items?search=sunt
```

---

### נתיב קריאת פריט בודד

```txt
GET /items/:id
```

דוגמה:

```txt
GET /items/ITEM-1
```

אם הפריט לא קיים:

```txt
404 Not Found
```

---

### נתיב עדכון פריט

```txt
PATCH /items/:id
```

דוגמה:

```txt
PATCH /items/ITEM-1
```

דוגמה ל־Body:

```json
{
  "status": "done",
  "priority": 5,
  "notes": "סיימתי לבדוק את הפריט הזה"
}
```

שדות שמותר לעדכן:

- `title`
- `description`
- `status`
- `priority`
- `tags`
- `notes`

שדות שאסור לעדכן ישירות:

- `id`
- `userId`
- `createdAt`

---

### נתיב מחיקת פריט

```txt
DELETE /items/:id
```

דוגמה:

```txt
DELETE /items/ITEM-1
```

אם המחיקה הצליחה:

```json
{
  "success": true,
  "message": "הפריט נמחק בהצלחה"
}
```

---

### נתיב סטטיסטיקות

```txt
GET /stats
```

מחזיר סטטיסטיקות על הפריטים של המשתמש הנוכחי.

---

### נתיב 404

כל נתיב שלא קיים צריך להחזיר:

```txt
404 Not Found
```

```json
{
  "success": false,
  "message": "Route not found"
}
```

---

## דרישות CRUD

הפרויקט חייב לכלול CRUD מלא.

### יצירה

חובה לתמוך לפחות באחת משתי האפשרויות, ועדיף בשתיהן:

1. יצירת פריט ידנית דרך `POST /items`.
2. יצירת פריט מתוך API חיצוני דרך `POST /items/import`.

---

### קריאה

חובה לתמוך ב:

- קריאת כל הפריטים.
- קריאת פריט אחד לפי ID.
- סינון לפי לפחות שני query params.

לדוגמה:

```txt
status
tag
priority
search
```

---

### עדכון

חובה לתמוך בעדכון חלקי דרך `PATCH`.

לא צריך לממש `PUT` בפרויקט הזה.

---

### מחיקה

חובה לתמוך במחיקה לפי ID.

המחיקה יכולה להיות hard delete:

```js
items = items.filter((item) => item.id !== itemId);
```

או soft delete:

```js
item.status = "archived";
```

אבל אם בוחרים soft delete, עדיין צריך נתיב בשם `DELETE /items/:id`.

---

## חיבור ל־API חיצוני

### זרימה נדרשת

כאשר קוראים ל:

```txt
GET /external/search?query=...
```

השרת צריך:

1. לבדוק שיש query.
2. לקרוא ל־API החיצוני עם `fetch`.
3. לבדוק `response.ok`.
4. לפרסר JSON עם `await response.json()`.
5. לנרמל את התוצאות למבנה אחיד.
6. להחזיר JSON ללקוח.
7. להדפיס לוג ברור בטרמינל.

---

### דוגמה לתוצאה מנורמלת

```js
{
  externalId: 'OL12345W',
  title: 'Harry Potter',
  description: 'ספר מאת J.K. Rowling',
  imageUrl: '',
  sourceUrl: 'https://openlibrary.org/works/OL12345W',
  rawData: {}
}
```

---

### כלל חשוב

לא שומרים את כל הדאטה מה־API כאילו הוא הדאטה המרכזי של האפליקציה.

ה־API החיצוני הוא מקור מידע.

הפרויקט המקומי הוא מערכת ניהול קטנה מעל המידע הזה.

כלומר:

```txt
External API = מקור קריאה בלבד
קובץ JSON מקומי = הדאטה שעליו מבצעים CRUD
```

---

## מחלקת `CollectionManager`

`CollectionManager` הוא הלב של הפרויקט.

הוא צריך לנהל את המערך:

```js
this.items = [];
```

### ה־`constructor`

```js
constructor({ generateItemId, generateVisitorId, storage, apiClient }) {
  this.items = [];
  this.generateItemId = generateItemId;
  this.generateVisitorId = generateVisitorId;
  this.storage = storage;
  this.apiClient = apiClient;
}
```

---

### המתודה `load()`

טוען את הפריטים מהקובץ.

```js
async load() {
  this.items = await this.storage.read();
}
```

---

### המתודה `save()`

שומר את המערך לקובץ.

```js
async save() {
  await this.storage.write(this.items);
}
```

---

### המתודה `createItem(data)`

יוצר פריט מקומי חדש.

חובה לבצע ולידציה:

- title לא ריק.
- priority בין 1 ל־5.
- status תקין.
- tags הוא מערך.

---

### המתודה `importItemFromExternalApi(data)`

יוצר פריט מתוך API חיצוני.

הפונקציה יכולה:

1. לקבל `externalId`.
2. להביא את הפריט מה־API.
3. לנרמל אותו.
4. ליצור ממנו `SavedItem`.
5. לשמור אותו בקובץ.

או:

1. לקבל `externalItem` שכבר הגיע מחיפוש.
2. ליצור ממנו `SavedItem`.
3. לשמור אותו בקובץ.

---

### המתודה `getAllItems(filters = {})`

מחזיר פריטים לפי סינונים (`filters`).

דוגמאות לסינונים (`filters`):

```js
{
  status: 'saved',
  tag: 'travel',
  priority: '5',
  search: 'japan'
}
```

צריך להשתמש ב־מתודות מערך:

- `filter`
- `includes`
- `map`
- `sort`, אם רוצים

---

### המתודה `getItemById(itemId)`

מחזיר פריט לפי ID.

צריך להשתמש ב:

```js
find();
```

---

### המתודה `updateItem(itemId, updates)`

מעדכן פריט קיים.

חובה לעדכן גם:

```js
updatedAt: new Date().toISOString();
```

---

### המתודה `deleteItem(itemId)`

מוחק פריט.

אפשר להחזיר:

```js
{
  success: (true, deletedItem);
}
```

או:

```js
{
  success: false,
  message: 'Item not found'
}
```

---

### המתודה `getStats()`

מחזיר סטטיסטיקות בעזרת `calculateCollectionStats`.

---

## מערכת שמירה לקובץ

הפרויקט צריך לשמור דאטה בקובץ:

```txt
data/savedItems.json
```

### זרימת עבודה

שמירת הדאטה מתבצעת בצורה אסינכרונית:

```txt
קריאת קובץ → JSON.parse → שימוש בדאטה → עדכון → JSON.stringify → כתיבה לקובץ
```

### חוקים

- כל יצירה (`Create`) צריכה לשמור לקובץ.
- כל עדכון (`Update`) צריך לשמור לקובץ.
- כל מחיקה (`Delete`) צריכה לשמור לקובץ.
- כאשר השרת מתחיל, הוא צריך לטעון את הקובץ.
- אם הקובץ לא קיים, צריך להתחיל עם `[]`.

---

## Cookies ו־Statelessness

HTTP הוא Stateless.

כל בקשה עומדת בפני עצמה.

לכן, אם רוצים לזהות שהבקשה הנוכחית שייכת לאותו משתמש כמו הבקשה הקודמת, צריך לשלוח מזהה כלשהו.

בפרויקט הזה נשתמש ב־Cookie פשוט:

```txt
visitorId=VIS-1
```

### התנהגות נדרשת

בכל בקשה:

1. לבדוק אם יש Cookie בשם `visitorId`.
2. אם יש — להשתמש בו.
3. אם אין — ליצור חדש.
4. לשלוח אותו חזרה עם `Set-Cookie`.
5. לשמור פריטים עם אותו `userId`.
6. להחזיר רק פריטים של אותו `userId`.

### דוגמה

ה־Response הראשון:

```txt
Set-Cookie: visitorId=VIS-1; HttpOnly; SameSite=Lax
```

ה־Request הבא:

```txt
Cookie: visitorId=VIS-1
```

כך השרת יודע לסנן את הפריטים של אותו מבקר.

---

## מערכת סטטיסטיקות

הסטטיסטיקות צריכות לעבוד על הפריטים של המשתמש הנוכחי בלבד.

### סטטיסטיקות חובה

```js
{
  (totalItems,
    itemsByStatus,
    itemsByPriority,
    mostUsedTag,
    averagePriority,
    newestItem,
    oldestItem);
}
```

### מתודות מערך לשימוש

חובה להשתמש לפחות בחלק מהמתודות הבאות:

```js
filter();
map();
reduce();
find();
some();
sort();
```

---

## כלי עזר להדפסה ולוגים

למרות שהשרת מחזיר JSON, עדיין חשוב להדפיס לוגים ברורים.

### לוגים מינימליים

השרת צריך להדפיס:

- מתי השרת עלה.
- כל בקשה שנכנסת.
- `method` ו־`path`.
- `status code` שהוחזר.
- חיפוש שבוצע מול API חיצוני.
- שגיאות.

דוגמה:

```txt
[GET] /external/search?query=japan → 200
[POST] /items → 201
[PATCH] /items/ITEM-1 → 200
[DELETE] /items/ITEM-1 → 200
```

---

## ולידציה וטיפול בשגיאות

### מבנה שגיאה כללי

כל שגיאה צריכה לחזור במבנה קבוע:

```json
{
  "success": false,
  "message": "הודעת שגיאה כאן"
}
```

### מבנה הצלחה כללי

כל הצלחה צריכה לחזור במבנה ברור:

```json
{
  "success": true,
  "data": {}
}
```

או:

```json
{
  "success": true,
  "message": "הפריט נוצר בהצלחה",
  "data": {}
}
```

---

### ולידציות חובה

#### יצירת פריט

- `title` חובה.
- `title` חייב להיות string.
- `title.trim()` לא יכול להיות ריק.
- `priority` חייב להיות מספר בין 1 ל־5.
- `status` חייב להיות מתוך הרשימה המותרת.
- `tags` חייב להיות מערך.

#### ייבוא פריט

- חובה לשלוח `externalId` או `externalItem`.
- אם API נכשל, לא יוצרים פריט מקומי.
- אם הפריט כבר נשמר בעבר, אפשר לחסום כפילות לפי `externalId`.

#### קריאת פריט

- אם `id` לא קיים — להחזיר `404`.

#### עדכון פריט

- אי אפשר לעדכן `id`.
- אי אפשר לעדכן `createdAt`.
- אם status לא תקין — להחזיר `400`.
- אם priority לא תקין — להחזיר `400`.

#### מחיקת פריט

- אם הפריט לא קיים — להחזיר `404`.

#### גוף JSON

אם ה־JSON לא תקין:

```txt
400 Bad Request
```

```json
{
  "success": false,
  "message": "JSON body לא תקין"
}
```

---

## מושגי JavaScript ו־Node.js בפרויקט

### HTTP

הפרויקט כולל שימוש ב:

- Request
- Response
- Methods
- Status codes
- Headers
- REST routes
- JSON APIs

---

### שרת HTTP ב־Node.js Vanilla

הפרויקט כולל:

```js
http.createServer((req, res) => {
  // route handling
});
```

וגם:

```js
server.listen(3000);
```

---

### ניתוב (Routing)

הפרויקט כולל routing ידני בעזרת:

```js
req.url;
req.method;
```

---

### פרמטרי Query

הפרויקט כולל קריאה של query params:

```txt
GET /items?status=saved&tag=travel
```

---

### פענוח Body (`Body parsing`)

הפרויקט כולל קריאה של body מתוך `req` Stream:

```js
req.on("data", callback);
req.on("end", callback);
```

---

### `Callbacks`

`Callbacks` מופיעים ב:

- `http.createServer`
- `req.on('data')`
- `req.on('end')`
- פונקציות לוגים אם בוחרים לממש אותן עם callback

---

### `Promises`

הפרויקט כולל `Promises` דרך:

- `fetch`
- `response.json()`
- `fs/promises`
- `parseJsonBody` שמחזיר Promise

---

### `async/await`

חובה להשתמש ב־`async/await` ב:

- קריאה ל־API חיצוני
- קריאה מקובץ
- כתיבה לקובץ
- handlers של routes שצריכים לחכות לדאטה

---

### `try/catch`

חובה להשתמש ב־`try/catch` סביב:

- פענוח JSON
- `fetch`
- פעולות קבצים
- handlers אסינכרוניים של routes

---

### `Blocking` מול `Non-Blocking`

אסור להשתמש בפעולות `blocking` כמו:

```js
readFileSync;
writeFileSync;
```

במקום זה משתמשים ב:

```js
await readFile(...)
await writeFile(...)
await fetch(...)
```

השרת לא אמור להיתקע בזמן שהוא מחכה לקובץ או ל־API.

---

### `Single Thread` ו־`Event Loop`

הזרימה האסינכרונית בנויה כך שפעולות כמו `fetch` וקריאת קבצים לא יתקעו את כל הריצה.

הזרימה נראית כך:

```txt
request מגיע
↓
fetch מתחיל
↓
Node ממשיך לעבוד
↓
התשובה חוזרת
↓
await ממשיך את הפונקציה
```

---

### מודולים (`Modules`)

הפרויקט חייב להיות מחולק לקבצים.

לא כותבים את כל הקוד בקובץ אחד.

---

### קלאסים

`CollectionManager` ו־`ApiClient` צריכים להיות קלאסים (`classes`).

---

### פונקציות Factory

`createSavedItem` ו־`createApiResult` צריכים להיות פונקציות Factory.

---

### Closures

`createIdGenerator` צריך להשתמש ב־closure.

---

### מתודות מערך (`Array Methods`)

חובה להשתמש ב־מתודות מערך (`array methods`) עבור:

- חיפוש פריטים
- סינון פריטים
- סטטיסטיקות
- מחיקה
- עדכון

---

## דרישות המימוש

### משימה 1 — הקמת הפרויקט

צרו את מבנה התיקיות והקבצים.

ודאו ש:

```bash
npm start
```

מריץ את `main.js`.

---

### משימה 2 — בחירת API חיצוני

בחרו API אחד בלבד מתוך חמשת ה־APIs המאושרים:

- JSONPlaceholder
- Open Library
- REST Countries
- Nager.Date
- Hebcal

אין לבחור API אחר.

כתבו ב־`README.md`:

- שם ה־API.
- קישור לתיעוד.
- איזה סוג דאטה הוא מחזיר.
- איזה endpoint ישמש את `searchExternalItems`.
- איזה endpoint ישמש את `getExternalItemById`, או למה אין endpoint כזה במקרה של Nager.Date או Hebcal.

---

### משימה 3 — יצירת קובץ הגדרות (`config`)

ממשו את `modules/config.js` לפי ה־API שבחרתם.

---

### משימה 4 — יצירת פונקציות Factory

ממשו:

- `createSavedItem`
- `createApiResult`

---

### משימה 5 — יצירת מחולל IDs

ממשו מחולל IDs מבוסס `closure`.

צרו לפחות שני מחוללים:

```js
const generateItemId = createIdGenerator("ITEM");
const generateVisitorId = createIdGenerator("VIS");
```

---

### משימה 6 — מימוש שמירה לקובץ (`File Storage`)

ממשו:

```js
readJsonFile(filePath, defaultValue);
writeJsonFile(filePath, data);
```

---

### משימה 7 — מימוש `ApiClient`

ממשו:

```js
searchExternalItems(query);
getExternalItemById(externalId);
normalizeExternalItem(rawItem);
```

אם ה־API לא תומך ב־`get by id`, הסבירו זאת ב־README וממשו import מתוך `externalItem` מלא.

---

### משימה 8 — מימוש `CollectionManager`

ממשו CRUD מלא:

- יצירה (`create`)
- קריאת כל הפריטים (`read all`)
- קריאת פריט יחיד (`read one`)
- עדכון (`update`)
- מחיקה (`delete`)

וגם:

- ייבוא מ־API חיצוני
- סינונים (`filters`)
- סטטיסטיקות (`stats`)

---

### משימה 9 — מימוש שרת HTTP

ממשו את כל הנתיבים (`routes`).

חובה להשתמש ב:

```js
http.createServer;
req.url;
req.method;
res.end;
```

---

### משימה 10 — מימוש פענוח Body של בקשה

ממשו `parseJsonBody(req)` בעזרת:

```js
req.on("data");
req.on("end");
```

---

### משימה 11 — מימוש Cookies

ממשו `visitorId` cookie.

ודאו שהפריטים נשמרים לפי מבקר (`visitor`).

---

### משימה 12 — מימוש סטטיסטיקות

ממשו `GET /stats`.

---

### משימה 13 — הוספת לוגים

הוסיפו הדפסות ברורות לטרמינל.

---

### משימה 14 — בדיקת כל הפרויקט

בדקו את כל ה־CRUD עם `curl`.

---

## בדיקות עם `curl`

### בדיקת תקינות

```bash
curl -i http://localhost:3000/
```

```bash
curl -i http://localhost:3000/health
```

---

### חיפוש ב־API החיצוני

```bash
curl -i "http://localhost:3000/external/search?query=1" \
  -c cookies.txt \
  -b cookies.txt
```

---

### יצירת פריט ידני

```powershell
curl.exe --% -i -X POST http://localhost:3000/items -H "Content-Type: application/json" -c cookies.txt -b cookies.txt --data-raw "{\"title\":\"Test item\",\"description\":\"Created with curl\",\"status\":\"saved\",\"priority\":3,\"tags\":[\"test\",\"manual\"],\"notes\":\"Created manually\"}"
```

---

### קריאת כל הפריטים

```bash
curl -i http://localhost:3000/items \
  -c cookies.txt \
  -b cookies.txt
```

---

### קריאת פריטים עם סינון

```bash
curl -i "http://localhost:3000/items?status=saved&tag=test" \
  -c cookies.txt \
  -b cookies.txt
```

---

### קריאת פריט בודד

```bash
curl -i http://localhost:3000/items/ITEM-1 \
  -c cookies.txt \
  -b cookies.txt
```

---

### עדכון פריט

```powershell
curl.exe --% -i -X PATCH http://localhost:3000/items/ITEM-1 -H "Content-Type: application/json" -c cookies.txt -b cookies.txt --data-raw "{\"status\":\"done\",\"priority\":5,\"notes\":\"Updated after testing\"}"
```

---

### מחיקת פריט

```bash
curl -i -X DELETE http://localhost:3000/items/ITEM-1 \
  -c cookies.txt \
  -b cookies.txt
```

---

### קבלת סטטיסטיקות

```bash
curl -i http://localhost:3000/stats \
  -c cookies.txt \
  -b cookies.txt
```

---

## שאלות להגשה

ענו על השאלות הבאות בתוך `README.md` או בתגובות בסוף `main.js`.

1. איזה API נבחר?
2. מה ההבדל בין הדאטה מה־API החיצוני לבין הדאטה המקומי שנשמר בקובץ?
3. מה ההבדל בין `GET /items` לבין `GET /external/search`?
4. איפה בפרויקט השתמשתם ב־query params?
5. איפה בפרויקט השתמשתם ב־body?
6. למה `req` הוא Stream?
7. למה `parseJsonBody` מחזיר Promise?
8. איפה השתמשתם ב־async/await?
9. למה חשוב לבדוק `response.ok` אחרי `fetch`?
10. למה HTTP נחשב Stateless?
11. איך ה־Cookie עוזר לזהות visitor בין בקשות?
12. למה אסור להשתמש ב־`readFileSync` בפרויקט הזה?
13. איזה status code מחזירים כשפריט לא נמצא?
14. איזה status code מחזירים כשנוצר פריט חדש?

---

## מגבלות נוכחיות

למימוש הנוכחי יש את המגבלות הבאות:

### 1. אין אימות אמיתי (`Authentication`)

ה־Cookie לא מוכיח זהות אמיתית.

הוא רק מזהה visitor מקומי.

---

### 2. אין מסד נתונים (`Database`)

הדאטה נשמר בקובץ JSON בלבד.

קובץ JSON לא מתאים למערכת עם הרבה משתמשים או עומס כתיבה גבוה.

---

### 3. אין Frontend

אין UI.

הבדיקות מתבצעות דרך `curl`, Postman ו־console.

---

### 4. אין Express

הפרויקט לא משתמש ב־Express.

---

### 5. ה־API החיצוני עלול להיכשל

ה־API החיצוני יכול להיות לא זמין, איטי, או לשנות פורמט.

לכן צריך טיפול טוב בשגיאות (`error handling`).

---

### 6. שמירה פשוטה לקובץ

אם שתי בקשות כותבות לקובץ באותו הזמן, יכולות להיות בעיות.

במערכת עם כתיבה מקבילית נדרש מנגנון שמירה מתאים יותר.

---

## רשימת בדיקה להגשה

לפני ההגשה ודאו שיש לכם:

- [ ] `package.json` עם `type: module` ו־`npm start`.
- [ ] שרת HTTP שרץ על port 3000.
- [ ] אין שימוש ב־Express.
- [ ] אין UI ואין HTML/CSS.
- [ ] יש API חיצוני שנבחר מתוך חמשת ה־APIs המאושרים בלבד.
- [ ] יש `ApiClient` עם `fetch`.
- [ ] יש CRUD מלא.
- [ ] יש `GET /`.
- [ ] יש `GET /external/search`.
- [ ] יש `GET /items`.
- [ ] יש `GET /items/:id`.
- [ ] יש `POST /items` או `POST /items/import`.
- [ ] יש `PATCH /items/:id`.
- [ ] יש `DELETE /items/:id`.
- [ ] יש `GET /stats`.
- [ ] יש פענוח (`parsing`) ל־query params.
- [ ] יש פענוח (`parsing`) ל־JSON body.
- [ ] יש שימוש ב־Cookies.
- [ ] יש שמירה לקובץ JSON.
- [ ] אין שימוש ב־readFileSync/writeFileSync.
- [ ] יש ולידציה.
- [ ] יש טיפול בשגיאות (`error handling`).
- [ ] יש `status codes` נכונים.
- [ ] יש לוגים מסודרים ב־`console`.
- [ ] יש README שמסביר איזה API נבחר ואילו endpoints משמשים את המימוש.
- [ ] יש תשובות לשאלות ההגשה.

---

## קישור לריפו

[yosefhaim707/async-project-week-2](https://github.com/yosefhaim707/async-project-week-2)
