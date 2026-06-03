# Curl Examples

These examples use JSONPlaceholder posts.

```powershell
curl.exe -i http://localhost:3000/
curl.exe -i http://localhost:3000/health
curl.exe -i http://localhost:3000/api-info
curl.exe -i "http://localhost:3000/external/search?query=1"
curl.exe --% -i -X POST http://localhost:3000/items/import -H "Content-Type: application/json" --data-raw "{\"externalId\":\"1\",\"status\":\"saved\",\"priority\":4,\"tags\":[\"jsonplaceholder\",\"post\"],\"notes\":\"Imported from JSONPlaceholder\"}"
curl.exe -i http://localhost:3000/items
curl.exe -i "http://localhost:3000/items?status=saved&tag=post"
curl.exe --% -i -X PATCH http://localhost:3000/items/ITEM-1 -H "Content-Type: application/json" --data-raw "{\"status\":\"done\",\"priority\":5,\"notes\":\"Updated after testing\"}"
curl.exe -i -X DELETE http://localhost:3000/items/ITEM-1
```
