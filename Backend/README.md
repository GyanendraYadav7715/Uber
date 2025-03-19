
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

## Endpoints

### 2. **Login User**

#### Endpoint
`POST /users/login`

#### Description
Authenticates a user by verifying their email and password, and returns a JSON Web Token (JWT) for authorization.

#### Request Body
Send the following JSON object in the request body:

| Field       | Type   | Required | Description                           |
|-------------|--------|----------|---------------------------------------|
| `email`     | String | Yes      | A valid email address.                |
| `password`  | String | Yes      | The user's password.                  |

#### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

#### Responses

##### Success (200 OK)
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

##### Invalid Credentials (401 Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

##### Validation Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
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
- Use a tool like Postman or cURL to test the endpoint.
- The response includes a JWT (`token`) for authenticating subsequent API requests.

---
### 3. **Get User Profile**

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

### 4. **Logout User**

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

### 5. **Register Captain Endpoint**

#### Endpoint
`POST /captain/register`

#### Description
Registers a new capatain by creating an account with their first name, last name, email, and password,color,plate,capacity,vehicleType.

#### Request Body
Send the following JSON object in the request body:

| Field         | Type   | Required | Description                           |
|---------------|--------|----------|---------------------------------------|
| `fullname`    | Object | Yes      | Contains `firstname` and `lastname`. |
| `fullname.firstname` | String | Yes      | captain's first name (min. 3 characters). |
| `fullname.lastname`  | String | No       | captain's last name.                    |
| `email`       | String | Yes      | A valid, unique email address.        |
| `password`    | String | Yes      | captain's password (min. 6 characters).  |
| `vehicle`    | Object | Yes      | Contains `color` and `plate` and `capacity` and `vehicleType`. |
| `vehicle.color` | String | Yes      | Color must be at least 3 charcter long |
| `vehicle.plate`  | String |  Yes       | Plate must be at least 4 charcter long                    |
| `vehicle.capacity` | number | Yes      | Capacity must be at least 1 charcter long |
| `vehicle.vehicleType`  | String |  Yes       | enum:['car','auto','bike']                    |
#### Example Request
```json
{
  "fullname": {
    "firstname": "Priya",
    "lastname": "Sharma"
  },
  "email": "priyasharma@example.com",
  "password": "hashed_password", 
  "vehicle": {
    "color": "Blue",
    "plate": "MH12CD5678",
    "capacity": 5,
    "vehicleType": "car"
  }
  
}
```

#### Responses

##### Success (201 Created)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU1MTBhMDBjNzBkNTQ4OWJjODgwMzMiLCJpYXQiOjE3MzM2MjgwNjQsImV4cCI6MTczMzcxNDQ2NH0.Rd_49vGJUmaaiv8ipJ7ZlU97Q0etJ5V_390LJ5LMfv4",
    "captain": {
        "fullname": {
            "firstname": "Priya",
            "lastname": "Sharma"
        },
        "email": "priyasharma@example.com",
        "password": "$2b$10$JYtmquYCEk7./NRXwMDWe..ER/EdaYlm7zuWMZ8EOzdSe.NDuqJFW",
        "status": "active",
        "vehicle": {
            "color": "Blue",
            "plate": "MH12CD5678",
            "capacity": 5,
            "vehicleType": "car"
        },
        "_id": "675510a00c70d5489bc88033",
        "__v": 0
    }
}
```
### 2. **Login Captain**

#### Endpoint
`POST /captain/login`

#### Description
Authenticates a captain by verifying their email and password, and returns a JSON Web Token (JWT) for authorization.

#### Request Body
Send the following JSON object in the request body:

| Field       | Type   | Required | Description                           |
|-------------|--------|----------|---------------------------------------|
| `email`     | String | Yes      | A valid email address.                |
| `password`  | String | Yes      | The user's password.                  |

#### Example Request
```json
{
     "email": "priyasharma@example.com",
  "password": "hashed_password"
}
```

#### Responses

##### Success (200 OK)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU0MDY5YjFjOWI2YmRjOTU0MGE4MWMiLCJpYXQiOjE3MzM3Mjk4MDEsImV4cCI6MTczMzgxNjIwMX0.QYrc3d2MqmOm2B_DK790O5Un9Ruf0uprbIt8GERSmic",
    "captain": {
        "fullname": {
            "firstname": "Priya",
            "lastname": "Sharma"
        },
        "vehicle": {
            "color": "Blue",
            "plate": "MH12CD5678",
            "capacity": 5,
            "vehicleType": "car"
        },
        "_id": "6754069b1c9b6bdc9540a81c",
        "email": "priyasharma@example.com",
        "password": "$2b$10$e5QevDYR7KY4xPu.rbx5hekw/vpD.V/fxVAkpGWQIGnHHG1tIIHTa",
        "status": "active",
        "__v": 0
    }
}
```

##### Invalid Credentials (401 Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

##### Validation Error (400 Bad Request)
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

##### Server Error (500 Internal Server Error)
```json
{
  "error": "Internal Server Error"
}
```
 
 
### 3. **Get Captain Profile**

#### Endpoint
`GET /captain/profile`

#### Description
Retrieves the profile information of the currently authenticated captain.

#### Authentication
Requires a valid JSON Web Token (JWT) to be provided via cookies or the `Authorization` header.

#### Headers
| Key             | Value             | Required | Description                           |
|------------------|-------------------|----------|---------------------------------------|
| `Authorization` | `Bearer <token>`  | Yes      | The JWT obtained during login.        |

#### Example Request (Using Authorization Header)
```bash
GET /capatian/profile HTTP/1.1
Host: localhost:3000
Authorization:bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU0MDY5YjFjOWI2YmRjOTU0MGE4MWMiLCJpYXQiOjE3MzM2MzAyNzQsImV4cCI6MTczMzcxNjY3NH0.2vqx9lQp-Vng0S34nw590g1eA4sJKEQnDblSkZNn-0Q
```

#### Example Response (200 OK)
```json
{
    "fullname": {
        "firstname": "Priya",
        "lastname": "Sharma"
    },
    "vehicle": {
        "color": "Blue",
        "plate": "MH12CD5678",
        "capacity": 5,
        "vehicleType": "car"
    },
    "_id": "6754069b1c9b6bdc9540a81c",
    "email": "priyasharma@example.com",
    "status": "active",
    "__v": 0
}
```

#### Unauthorized Response (401 Unauthorized)
```json
{
  "error": "Authentication required"
}
```

---

### 4. **Logout User**

#### Endpoint
`GET /captain/logout`

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
GET /captain/logout HTTP/1.1
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

 

 
