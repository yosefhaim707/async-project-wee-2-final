# Curl Examples

These examples use JSONPlaceholder posts and preserve the visitor cookie in
`cookies.txt`.

```bash
curl.exe -i http://localhost:3000/ -c cookies.txt -b cookies.txt
curl.exe -i http://localhost:3000/health -c cookies.txt -b cookies.txt
curl.exe -i http://localhost:3000/api-info -c cookies.txt -b cookies.txt
curl.exe -i "http://localhost:3000/external/search?query=1" -c cookies.txt -b cookies.txt
curl.exe --% -i -X POST http://localhost:3000/items/import -H "Content-Type: application/json" -c cookies.txt -b cookies.txt --data-raw "{\"externalId\":\"1\",\"status\":\"saved\",\"priority\":4,\"tags\":[\"jsonplaceholder\",\"post\"],\"notes\":\"Imported from JSONPlaceholder\"}"
curl.exe -i http://localhost:3000/items -c cookies.txt -b cookies.txt
curl.exe -i "http://localhost:3000/items?status=saved&tag=post" -c cookies.txt -b cookies.txt
curl.exe --% -i -X PATCH http://localhost:3000/items/ITEM-1 -H "Content-Type: application/json" -c cookies.txt -b cookies.txt --data-raw "{\"status\":\"done\",\"priority\":5,\"notes\":\"Updated after testing\"}"
curl.exe -i http://localhost:3000/stats -c cookies.txt -b cookies.txt
curl.exe -i -X DELETE http://localhost:3000/items/ITEM-1 -c cookies.txt -b cookies.txt
```
