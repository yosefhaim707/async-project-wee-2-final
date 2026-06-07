# פרויקט תרגול Async JavaScript

`public-api-crud-hub-week-two-training` הוא שרת Node.js קטן שמנהל פריטים מקומיים, קורא מידע מ־JSONPlaceholder ושומר נתונים בקובץ JSON.

הקוד משתמש ב־`fetch`, `fs/promises`, Callbacks, Promises, `async/await` ו־`try/catch`.

## פונקציונליות

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

## קישור לריפו

[yosefhaim707/async-project-wee-2-final](https://github.com/yosefhaim707/async-project-wee-2-final)
