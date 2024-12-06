
# API Documentation

## Base URL
The API runs on `http://localhost:<PORT>` (default port: `4000`).

---

## Endpoints

### 1. **Register User**

#### Endpoint
`POST /users/register`

#### Description
Registers a new user by creating an account with their first name, last name, email, and password.

#### Request Body
Send the following JSON object in the request body:

| Field         | Type   | Required | Description                           |
|---------------|--------|----------|---------------------------------------|
| `fullname`    | Object | Yes      | Contains `firstname` and `lastname`. |
| `fullname.firstname` | String | Yes      | User's first name (min. 3 characters). |
| `fullname.lastname`  | String | No       | User's last name.                    |
| `email`       | String | Yes      | A valid, unique email address.        |
| `password`    | String | Yes      | User's password (min. 6 characters).  |

#### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

#### Responses

##### Success (201 Created)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUxM2VhNTM5MjFiNmRjMzYwMmI0MDAiLCJpYXQiOjE2ODY2NTI5NzUsImV4cCI6MTY4NjY1NjU3NX0.F5zEJ-UOcZ-0r9YeiJvNHic7tpDqq5w-WdpOBHftH1c",
  "user": {
    "_id": "64e13ea53921b6dc3602b400",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

##### Validation Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "First name must be 3 charcter long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

##### Duplicate Email Error (400 Bad Request)
```json
{
  "error": "Email already registered."
}
```

##### Server Error (500 Internal Server Error)
```json
{
  "error": "Internal Server Error"
}
```

---

### Usage Notes
- Ensure `process.env.JWT_SECRET` is set in your environment for token generation.
- The `email` field must be unique.
- Use a tool like Postman or cURL to test the endpoint.

---
