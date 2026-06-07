# הנחיות תלמידים: פרויקט תרגול Async JavaScript

## המשימה

בפרויקט הזה תבנו שרת Node.js קטן עם קריאה ל־JSONPlaceholder, שמירה לקובץ JSON ונתיבי CRUD מקומיים.

הקוד צריך להשתמש ב־Callbacks, Promises, `fetch`, `async/await`, `try/catch` ופעולות קובץ לא חוסמות.

## תוצר נדרש

שרת Node.js שמבצע שלושה דברים מרכזיים:

1. קורא מידע חיצוני מ־JSONPlaceholder בעזרת `fetch`.
2. שומר פריטים מקומיים בקובץ JSON בעזרת `fs/promises`.
3. קורא JSON body מתוך בקשות HTTP בעזרת Callbacks ו־Promise.

הפרויקט הוא Backend בלבד ונבדק דרך `curl`, Postman או Insomnia.

## דרישות קוד

### Callbacks

צריך להשתמש ב־Callbacks כדי לקרוא body מתוך `req`:

```js
req.on("data", callback);
req.on("end", callback);
req.on("error", callback);
```

### Promises

צריך להשתמש ב־Promise לפחות בפונקציה שמפענחת JSON body:

```js
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    // callbacks
  });
}
```

### async/await

צריך להשתמש ב־`async/await` בקריאות שיכולות לקחת זמן:

- קריאה ל־API חיצוני.
- קריאה מקובץ.
- כתיבה לקובץ.
- טיפול בבקשות שמחכות לנתונים.

### try/catch

צריך להשתמש ב־`try/catch` סביב פעולות אסינכרוניות שעלולות להיכשל:

- `fetch`
- `response.json()`
- קריאה וכתיבה לקובץ
- פענוח JSON body

### Non-Blocking

אין להשתמש ב:

```js
readFileSync;
writeFileSync;
```

צריך להשתמש ב:

```js
fs/promises;
fetch;
async/await;
```

## API חיצוני

הפרויקט משתמש ב־JSONPlaceholder בלבד:

```txt
https://jsonplaceholder.typicode.com/
```

צריך לתמוך ב:

```txt
GET /posts
GET /posts/:id
```

בשרת המקומי, החיפוש מתבצע דרך:

```txt
GET /external/search?query=...
```

## מבנה פריט מקומי

כל פריט מקומי צריך לכלול:

- `id`
- `sourceApi`
- `itemType`
- `externalId`
- `title`
- `description`
- `status`
- `priority`
- `tags`
- `notes`
- `rawData`
- `createdAt`
- `updatedAt`

ערכי `status` מותרים:

- `saved`
- `in_progress`
- `done`
- `archived`

`priority` חייב להיות מספר שלם בין `1` ל־`5`.

## נתיבים נדרשים

| Method | Path | תיאור |
| --- | --- | --- |
| `GET` | `/` | מידע כללי ורשימת נתיבים |
| `GET` | `/health` | בדיקת תקינות |
| `GET` | `/api-info` | מידע על JSONPlaceholder |
| `GET` | `/external/search?query=...` | חיפוש ב־API החיצוני |
| `POST` | `/items` | יצירת פריט ידני |
| `POST` | `/items/import` | ייבוא פריט מתוך JSONPlaceholder |
| `GET` | `/items` | קריאת כל הפריטים המקומיים |
| `GET` | `/items/:id` | קריאת פריט אחד |
| `PATCH` | `/items/:id` | עדכון פריט |
| `DELETE` | `/items/:id` | מחיקת פריט |

## דרישות לפי קבצים

### `main.js`

מפעיל את השרת.

### `server.js`

אחראי על:

- יצירת שרת עם `node:http`.
- קריאת הנתיב וה־method.
- קריאת query params.
- קריאת JSON body כשצריך.
- הפעלת פעולות אסינכרוניות.
- החזרת JSON.
- טיפול בשגיאות.

### `modules/ApiClient.js`

אחראי על:

- קריאה ל־JSONPlaceholder עם `fetch`.
- בדיקת `response.ok`.
- קריאת JSON עם `await response.json()`.
- הפיכת פוסט חיצוני למבנה אחיד.

### `modules/CollectionManager.js`

אחראי על:

- טעינת פריטים מהקובץ.
- שמירת פריטים לקובץ.
- יצירת פריט ידני.
- ייבוא פריט חיצוני.
- קריאה, עדכון ומחיקה של פריטים.
- ולידציה של `title`, `status`, `priority` ו־`tags`.

### `modules/fileStorage.js`

אחראי על קריאה וכתיבה לקובץ בעזרת `fs/promises`.

### `modules/requestUtils.js`

אחראי על:

- פענוח URL.
- פענוח JSON body בעזרת Callbacks ו־Promise.

## הרצת הפרויקט

```powershell
npm start
```

השרת אמור לרוץ על:

```txt
http://localhost:3000
```

## בדיקות מומלצות

בדיקת שרת:

```powershell
curl.exe -i http://localhost:3000/health
```

חיפוש ב־API חיצוני:

```powershell
curl.exe -i "http://localhost:3000/external/search?query=1"
```

יצירת פריט:

```powershell
curl.exe --% -i -X POST http://localhost:3000/items -H "Content-Type: application/json" --data-raw "{\"title\":\"Practice item\",\"description\":\"Created for async practice\",\"status\":\"saved\",\"priority\":3,\"tags\":[\"async\",\"manual\"],\"notes\":\"Testing callbacks and promises\"}"
```

ייבוא פריט:

```powershell
curl.exe --% -i -X POST http://localhost:3000/items/import -H "Content-Type: application/json" --data-raw "{\"externalId\":\"1\",\"status\":\"saved\",\"priority\":4,\"tags\":[\"fetch\",\"promise\"],\"notes\":\"Imported from JSONPlaceholder\"}"
```

קריאת כל הפריטים:

```powershell
curl.exe -i http://localhost:3000/items
```

עדכון פריט:

```powershell
curl.exe --% -i -X PATCH http://localhost:3000/items/ITEM-1 -H "Content-Type: application/json" --data-raw "{\"status\":\"done\",\"priority\":5,\"notes\":\"Updated after testing\"}"
```

מחיקת פריט:

```powershell
curl.exe -i -X DELETE http://localhost:3000/items/ITEM-1
```

בדיקות שגיאה:

- שליחת JSON לא תקין צריכה להחזיר שגיאה.
- יצירת פריט בלי `title` צריכה להחזיר שגיאה.
- קריאת פריט שלא קיים צריכה להחזיר שגיאה.

## רשימת בדיקה לפני הגשה

- [ ] הפרויקט רץ עם `npm start`.
- [ ] יש קריאה חיצונית עם `fetch`.
- [ ] יש שימוש ב־`async/await`.
- [ ] יש שימוש ב־`try/catch`.
- [ ] יש שימוש ב־Callbacks ב־`parseJsonBody`.
- [ ] יש Promise שמחזיר את תוצאת פענוח ה־body.
- [ ] יש שמירה לקובץ עם `fs/promises`.
- [ ] אין שימוש ב־`readFileSync` או `writeFileSync`.
- [ ] יש יצירת פריט ידני.
- [ ] יש ייבוא פריט מ־JSONPlaceholder.
- [ ] יש קריאה, עדכון ומחיקה של פריטים.
- [ ] יש טיפול ב־JSON לא תקין.
- [ ] יש ולידציה לשדות המרכזיים.
