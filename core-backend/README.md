# Core Dashboard Backend

A lightweight Express backend serving core dashboard features (events and attendance) in a separate folder.

## Setup

```bash
cd core-backend
npm install
npm run start   # starts on http://localhost:5050 (CORE_PORT env var to change)
```

Create a `.env` file (optional):

```
CORE_PORT=5050
```

## Endpoints

- GET `/health` → `{ ok: true }`

### Events
- GET `/api/events` → List events (id, title, date, time, location, status, category, attendees)
- GET `/api/events/:eventId` → Event details including participants and their current attendance state
- POST `/api/events` → Create event
  - Body:
    ```json
    {
      "title": "string",
      "description": "string",
      "date": "YYYY-MM-DD",
      "time": "HH:mm",
      "location": "string",
      "status": "upcoming|ongoing|completed|cancelled",
      "category": "string",
      "participants": [
        { "id": "string", "teamName": "string", "uid": "string", "email": "string", "phone": "string" }
      ]
    }
    ```

### Attendance
- PUT `/api/events/:eventId/attendance`
  - Body:
    ```json
    {
      "entries": [
        { "participantId": "string", "attended": true, "dlNo": "string" }
      ]
    }
    ```

Data is stored in-memory (Maps). Replace with a real database as needed.

