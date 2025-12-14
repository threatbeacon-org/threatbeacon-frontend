# ThreatBeacon API Endpoints Documentation

This document contains all API endpoints that the frontend expects from the backend implementation.

## Base Configuration

- **Base URL**: Configured via `NEXT_PUBLIC_API_BASE_URL` environment variable
- **Authentication**: Basic Authentication (username:password encoded in Base64)
- **Content-Type**: `application/json`

## Authentication

The frontend uses Basic Authentication. Credentials are stored in sessionStorage after successful login.

**Login Validation**: The frontend validates credentials by making a request to `/api/risk`. If this request succeeds, the credentials are considered valid.

## API Endpoints

### 1. Risk Status

#### GET `/api/risk`
**Purpose**: Fetch current risk status and summary information
**Authentication**: Required
**Response**:
```json
{
  "level": "NORMAL" | "SUSPICIOUS" | "CRITICAL",
  "buzzerMuted": boolean,
  "lastUpdated": string (ISO 8601 datetime),
  "activeIncidents": number,
  "criticalCount": number,
  "suspiciousCount": number
}
```

### 2. Beacon Control

#### POST `/api/beacon/mute`
**Purpose**: Mute the buzzer/alert system
**Authentication**: Required
**Request Body**: None
**Response**: Empty (204 No Content)

### 3. Incidents

#### GET `/api/incidents`
**Purpose**: Fetch list of all incident summaries
**Authentication**: Required
**Response**:
```json
[
  {
    "id": number,
    "type": string,
    "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
    "status": "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
    "createdAt": string (ISO 8601 datetime)
  }
]
```

#### GET `/api/incidents/{id}`
**Purpose**: Fetch detailed information for a specific incident
**Authentication**: Required
**Path Parameters**: `id` (number) - Incident ID
**Response**:
```json
{
  "id": number,
  "type": string,
  "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "status": "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
  "createdAt": string (ISO 8601 datetime),
  "updatedAt": string (ISO 8601 datetime),
  "eventCount": number,
  "mainIps": string[],
  "countries": string[]
}
```

#### GET `/api/incidents/{id}/insights`
**Purpose**: Fetch AI-generated insights for a specific incident
**Authentication**: Required
**Path Parameters**: `id` (number) - Incident ID
**Response**:
```json
{
  "insight": string,
  "generatedAt": string (ISO 8601 datetime),
  "confidence": number (0-100)
}
```

### 4. Event Ingestion

#### POST `/api/events`
**Purpose**: Receive security events from SIEM systems
**Authentication**: Required (may use different auth mechanism for SIEM integration)
**Request Body**: Varies based on SIEM event format
**Response**: Confirmation of event receipt

## Error Handling

### HTTP Status Codes
- **200**: Success
- **204**: Success (no content)
- **401**: Unauthorized - Invalid or missing credentials
- **404**: Not Found - Resource doesn't exist
- **500**: Internal Server Error

### Error Response Format
```json
{
  "error": "Error description",
  "status": number,
  "message": "Detailed error message"
}
```

## Frontend Behavior

### Authentication Flow
1. User enters username/password in login form
2. Frontend encodes credentials as Base64 and stores in sessionStorage
3. Frontend makes a test request to `/api/risk` to validate credentials
4. If successful, user is redirected to dashboard
5. If 401 is received, credentials are cleared and user is shown error

### Auto-logout
- Any 401 response automatically clears credentials and redirects to `/login`
- Credentials are stored in sessionStorage and persist across page refreshes

### Polling/Real-time Updates
- Risk status and incidents are polled periodically using SWR
- Frontend expects real-time updates from backend

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## Testing Endpoints

You can test endpoints with curl:

```bash
# Test authentication and risk status
curl -u username:password http://localhost:8080/api/risk

# Test incidents list
curl -u username:password http://localhost:8080/api/incidents

# Test specific incident
curl -u username:password http://localhost:8080/api/incidents/1

# Test incident insights
curl -u username:password http://localhost:8080/api/incidents/1/insights

# Test mute buzzer
curl -u username:password -X POST http://localhost:8080/api/beacon/mute
```

## Notes for Backend Implementation

1. **CORS**: Ensure backend allows requests from the frontend domain
2. **Date Format**: All datetime fields should use ISO 8601 format
3. **Validation**: Validate all request parameters and return appropriate error codes
4. **Rate Limiting**: Consider implementing rate limiting for security
5. **Logging**: Log authentication attempts and API access for audit purposes
