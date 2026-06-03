# פרויקט תרגול Async JavaScript

`public-api-crud-hub-week-two-training` הוא פרויקט Node.js קטן לתרגול הנושאים שנלמדים במצגות:

- Single Thread
- Call Stack
- Event Loop
- Blocking ו־Non-Blocking
- Callbacks
- Promises
- `fetch`
- `async/await`
- `try/catch`

הפרויקט מפעיל שרת Node.js פשוט, קורא מידע מ־JSONPlaceholder בעזרת `fetch`, ושומר פריטים מקומיים בקובץ JSON בעזרת `fs/promises`.

## מה הפרויקט עושה

- מפעיל שרת עם `node:http`.
- קורא פוסטים מ־JSONPlaceholder.
- מנרמל תוצאה חיצונית למבנה קבוע.
- מאפשר לשמור פריט ידני או לייבא פריט חיצוני.
- מאפשר לקרוא, לעדכן ולמחוק פריטים מקומיים.
- שומר את הפריטים ב־`data/savedItems.json`.
- משתמש ב־Callbacks כדי לקרוא body מתוך בקשת HTTP.
- משתמש ב־Promise כדי לעטוף את קריאת ה־body.
- משתמש ב־`async/await` ו־`try/catch` בקריאות API, קבצים ונתיבי שרת.
- נמנע מפעולות קובץ Blocking כמו `readFileSync` ו־`writeFileSync`.

## נושאי התרגול בקוד

### Single Thread ו־Event Loop

JavaScript מריץ קוד על thread אחד. לכן פעולות שיכולות לקחת זמן, כמו בקשת API או קריאת קובץ, נכתבות בצורה אסינכרונית.

בפרויקט רואים את זה בעיקר ב:

- `fetch` מול JSONPlaceholder.
- `fs/promises` לקריאה וכתיבה לקובץ.
- `parseJsonBody(req)` שמחכה ל־body בלי לעצור את השרת.

### Blocking ו־Non-Blocking

הפרויקט משתמש בפעולות Non-Blocking:

```js
await fetch(url);
await storage.read();
await storage.write(items);
```

אין להשתמש בפעולות Blocking:

```js
readFileSync;
writeFileSync;
```

### Callbacks

בקובץ `modules/requestUtils.js`, הפונקציה `parseJsonBody(req)` משתמשת ב־Callbacks של Stream:

```js
req.on("data", callback);
req.on("end", callback);
req.on("error", callback);
```

זה תרגול ישיר לרעיון של Callback: פונקציה שנשלחת כפרמטר ורצה כשהפעולה מסתיימת.

### Promises

`parseJsonBody(req)` מחזירה Promise:

```js
return new Promise((resolve, reject) => {
  // callbacks call resolve or reject
});
```

גם `fetch`, `response.json()` ו־`fs/promises` מחזירים Promises.

### async/await ו־try/catch

השרת משתמש ב־`async/await` כדי שהקוד יהיה קריא מלמעלה למטה:

```js
try {
  const results = await apiClient.searchExternalItems(searchQuery);
  sendJson(res, 200, { success: true, data: results });
} catch (error) {
  sendError(res, error.statusCode ?? 500, error.message);
}
```

## הרצת הפרויקט

```powershell
npm start
```

השרת רץ כברירת מחדל ב:

```txt
http://localhost:3000
```

אפשר לשנות port עם משתנה סביבה:

```powershell
$env:PORT = "3131"; npm start
```

## מבנה הפרויקט

```txt
public-api-crud-hub-week-two-training/
├── package.json
├── main.js
├── server.js
├── README.md
├── README-students.md
├── data/
│   └── savedItems.json
├── examples/
│   ├── curl-examples.md
│   └── selected-api.md
└── modules/
    ├── ApiClient.js
    ├── CollectionManager.js
    ├── apiResultFactory.js
    ├── config.js
    ├── fileStorage.js
    ├── idGenerator.js
    ├── printUtils.js
    ├── requestUtils.js
    ├── responseUtils.js
    └── savedItemFactory.js
```

## תפקידי הקבצים

### `main.js`

נקודת הכניסה של הפרויקט. מפעיל את השרת.

### `server.js`

מגדיר את שרת ה־HTTP, קורא את הנתיבים, מפעיל את פעולות ה־async ומחזיר JSON.

### `modules/ApiClient.js`

מכיל את `createApiClient(apiConfig)`.

התפקיד שלו:

- לבנות URL ל־JSONPlaceholder.
- לקרוא ל־API עם `fetch`.
- לבדוק `response.ok`.
- לקרוא `await response.json()`.
- לנרמל פוסט חיצוני למבנה אחיד.

### `modules/CollectionManager.js`

מכיל את `createCollectionManager(...)`.

התפקיד שלו:

- לטעון פריטים מקובץ.
- לשמור פריטים לקובץ.
- ליצור פריט ידני.
- לייבא פריט מ־API חיצוני.
- לקרוא פריטים.
- לעדכן פריט.
- למחוק פריט.

### `modules/fileStorage.js`

מכיל פעולות קובץ אסינכרוניות עם `fs/promises`.

### `modules/requestUtils.js`

מכיל פענוח URL ופענוח JSON body בעזרת Callbacks ו־Promise.

## API חיצוני

הפרויקט משתמש ב־JSONPlaceholder:

```txt
https://jsonplaceholder.typicode.com/
```

חיפוש:

```txt
GET https://jsonplaceholder.typicode.com/posts
```

פריט בודד:

```txt
GET https://jsonplaceholder.typicode.com/posts/:id
```

## מבנה פריט מקומי

כל פריט שנשמר בקובץ המקומי כולל:

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

## נתיבים זמינים

| Method | Path | פעולה |
| --- | --- | --- |
| `GET` | `/` | מידע כללי ורשימת נתיבים |
| `GET` | `/health` | בדיקת תקינות |
| `GET` | `/api-info` | מידע על JSONPlaceholder |
| `GET` | `/external/search?query=...` | חיפוש פוסטים חיצוניים |
| `POST` | `/items` | יצירת פריט ידני |
| `POST` | `/items/import` | ייבוא פריט חיצוני |
| `GET` | `/items` | קריאת כל הפריטים המקומיים |
| `GET` | `/items/:id` | קריאת פריט אחד |
| `PATCH` | `/items/:id` | עדכון פריט |
| `DELETE` | `/items/:id` | מחיקת פריט |

## דוגמאות בדיקה ב־PowerShell

בדיקת שרת:

```powershell
curl.exe -i http://localhost:3000/health
```

חיפוש חיצוני:

```powershell
curl.exe -i "http://localhost:3000/external/search?query=1"
```

יצירת פריט ידני:

```powershell
curl.exe --% -i -X POST http://localhost:3000/items -H "Content-Type: application/json" --data-raw "{\"title\":\"Practice item\",\"description\":\"Created for async practice\",\"status\":\"saved\",\"priority\":3,\"tags\":[\"async\",\"manual\"],\"notes\":\"Uses JSON body parsing\"}"
```

ייבוא פריט מ־JSONPlaceholder:

```powershell
curl.exe --% -i -X POST http://localhost:3000/items/import -H "Content-Type: application/json" --data-raw "{\"externalId\":\"1\",\"status\":\"saved\",\"priority\":4,\"tags\":[\"fetch\",\"promise\"],\"notes\":\"Imported from JSONPlaceholder\"}"
```

קריאת פריטים:

```powershell
curl.exe -i http://localhost:3000/items
```

עדכון פריט:

```powershell
curl.exe --% -i -X PATCH http://localhost:3000/items/ITEM-1 -H "Content-Type: application/json" --data-raw "{\"status\":\"done\",\"priority\":5,\"notes\":\"Updated with async file save\"}"
```

מחיקת פריט:

```powershell
curl.exe -i -X DELETE http://localhost:3000/items/ITEM-1
```

## בדיקות מומלצות

1. `npm start`
2. `GET /health`
3. `GET /external/search?query=1`
4. `POST /items`
5. `POST /items/import`
6. `GET /items`
7. `PATCH /items/:id`
8. `DELETE /items/:id`
9. שליחת JSON לא תקין ובדיקה שמתקבלת שגיאה
10. יצירת פריט בלי `title` ובדיקה שמתקבלת שגיאה

## שאלות להבנה

1. איפה בפרויקט מופיעים Callbacks?
2. למה `parseJsonBody(req)` מחזירה Promise?
3. אילו פעולות בפרויקט הן Non-Blocking?
4. איפה משתמשים ב־`await`?
5. למה צריך `try/catch` סביב פעולות אסינכרוניות?
6. מה ההבדל בין המידע שחוזר מ־JSONPlaceholder לבין הפריטים שנשמרים בקובץ?
7. למה לא משתמשים ב־`readFileSync` ו־`writeFileSync`?
8. איך Event Loop מאפשר לשרת להמשיך לקבל בקשות בזמן שמחכים ל־API או לקובץ?

## קישור לריפו

[yosefhaim707/async-project-wee-2-final](https://github.com/yosefhaim707/async-project-wee-2-final)
