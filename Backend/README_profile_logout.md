
# API Documentation

## Base URL
The API runs on `http://localhost:<PORT>` (default port: `3000`).

---

## Endpoints

### 1. **Get User Profile**

#### Endpoint
`GET /users/profile`

#### Description
Retrieves the profile information of the currently authenticated user.

#### Authentication
Requires a valid JSON Web Token (JWT) to be provided via cookies or the `Authorization` header.

#### Headers
| Key             | Value             | Required | Description                           |
|------------------|-------------------|----------|---------------------------------------|
| `Authorization` | `Bearer <token>`  | Yes      | The JWT obtained during login.        |

#### Example Request (Using Authorization Header)
```bash
GET /users/profile HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Example Response (200 OK)
```json
{
  "_id": "64e13ea53921b6dc3602b400",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketId": null
}
```

#### Unauthorized Response (401 Unauthorized)
```json
{
  "error": "Authentication required"
}
```

---

### 2. **Logout User**

#### Endpoint
`GET /users/logout`

#### Description
Logs out the currently authenticated user by clearing the token cookie and blacklisting the token.

#### Authentication
Requires a valid JSON Web Token (JWT) to be provided via cookies or the `Authorization` header.

#### Headers
| Key             | Value             | Required | Description                           |
|------------------|-------------------|----------|---------------------------------------|
| `Authorization` | `Bearer <token>`  | Yes      | The JWT obtained during login.        |

#### Example Request (Using Authorization Header)
```bash
GET /users/logout HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Example Response (200 OK)
```json
{
  "message": "Logged Out"
}
```

#### Unauthorized Response (401 Unauthorized)
```json
{
  "error": "Authentication required"
}
```

---

### Usage Notes
- Ensure `authMiddleware.authUser` is implemented to validate tokens and attach user data to `req.user`.
- The `logout` endpoint will store blacklisted tokens in `blacklistTokenModel`, preventing further use.
- Use tools like Postman or cURL for testing.
