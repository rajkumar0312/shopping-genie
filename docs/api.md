# API v1

## GET /health

Returns service health.

## GET /api/v1/platforms

Returns configured platform metadata.

## POST /api/v1/search

Request:

```json
{
  "query": "iphone 17 256gb",
  "latitude": 23.0225,
  "longitude": 72.5714,
  "pincode": "380015"
}
```

Response contains a normalized `results` array with:
- platform
- product title
- price
- MRP
- availability
- delivery text
- product URL
- last checked timestamp

Sprint 1A currently returns mock data.
