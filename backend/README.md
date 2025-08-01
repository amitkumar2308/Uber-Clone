# API Documentation

## `/users/register`

### Description
This endpoint is used to register a new user. It performs the following steps:
1. Validates the input data using `express-validator`.
2. Hashes the user's password for secure storage.
3. Creates a new user record in the database.
4. Generates a JSON Web Token (JWT) for authentication.
5. Returns the token and user details in the response.

This endpoint is essential for user onboarding in the application.

---

### Request

- **Method:** POST
- **URL:** `/users/register`
- **Content-Type:** application/json

#### Request Body

The request body must be a JSON object with the following fields:

```json
{
  "fullname": {
    "firstname": "John", // Required, must be at least 3 characters
    "lastname": "Doe"    // Optional, must be at least 3 characters if provided
  },
  "email": "john.doe@example.com", // Required, must be a valid email address
  "password": "password123"        // Required, must be at least 6 characters
}
```

---

### Validations
The following validations are applied to the input data:
- **email:** Must be a valid email address.
- **fullname.firstname:** Must be at least 3 characters long.
- **fullname.lastname:** If provided, must be at least 3 characters long.
- **password:** Must be at least 6 characters long.

If any validation fails, the endpoint returns a `400 Bad Request` status with detailed error messages.

---

### Response

#### Success (User Registered)
- **Status Code:** 201 Created
- **Response Body:**

```json
{
  "token": "<JWT-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### Error (Validation Failed)
- **Status Code:** 400 Bad Request
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

#### Error (Missing Fields)
- **Status Code:** 500 Internal Server Error
- **Response Body:**

```json
{
  "error": "All fields are required"
}
```

---

### Workflow

1. **Validation:** The input data is validated using `express-validator`. If validation fails, a `400 Bad Request` response is sent with detailed error messages.
2. **Password Hashing:** The password is hashed using `bcrypt` for secure storage.
3. **User Creation:** A new user record is created in the database using the `userService.createUser` method.
4. **Token Generation:** A JWT is generated using the `generateAuthToken` method from the user model.
5. **Response:** The token and user details are returned in the response.

---

### Additional Notes
- The password is never stored in plain text. It is hashed using `bcrypt` before being saved to the database.
- The `lastname` field is optional but must meet the validation criteria if provided.
- The generated JWT can be used for authenticating subsequent requests to protected endpoints.
- Ensure that the `JWT_SECRET` environment variable is set in your `.env` file for token generation.

---

### Example Usage

#### Request
```bash
curl -X POST http://localhost:5000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64b0c8f4e4b0f5a1c8e4b0f5",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

## `/users/login`

### Description
This endpoint is used to authenticate an existing user. It performs the following steps:
1. Validates the input data using `express-validator`.
2. Checks if the user exists in the database.
3. Verifies the provided password against the stored hashed password.
4. Generates a JSON Web Token (JWT) for authentication.
5. Returns the token and user details in the response.

This endpoint is essential for user authentication in the application.

---

### Request

- **Method:** POST  
- **URL:** `/users/login`  
- **Content-Type:** application/json  

#### Request Body

The request body must be a JSON object with the following fields:

```json
{
  "email": "john.doe@example.com", // Required, must be a valid email address
  "password": "password123"        // Required, must be at least 6 characters
}
```

---

### Validations
The following validations are applied to the input data:
- **email:** Must be a valid email address.
- **password:** Must be at least 6 characters long.

If any validation fails, the endpoint returns a `400 Bad Request` status with detailed error messages.

---

### Response

#### Success (User Authenticated)
- **Status Code:** 200 OK
- **Response Body:**

```json
{
  "token": "<JWT-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

#### Error (Validation Failed)
- **Status Code:** 400 Bad Request
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

#### Error (User Not Found)
- **Status Code:** 404 Not Found
- **Response Body:**

```json
{
  "error": "User not found"
}
```

#### Error (Invalid Password)
- **Status Code:** 401 Unauthorized
- **Response Body:**

```json
{
  "message": "Unauthorized access"
}
```

---

### Workflow

1. **Validation:** The input data is validated using `express-validator`. If validation fails, a `400 Bad Request` response is sent with detailed error messages.
2. **User Lookup:** The system checks if the user exists in the database.
3. **Password Verification:** The provided password is verified against the stored hashed password.
4. **Token Generation:** A JWT is generated using the `generateAuthToken` method from the user model.
5. **Response:** The token and user details are returned in the response.

---

### Additional Notes
- The password is compared in its hashed form for security. It is never decrypted or logged.
- The generated JWT can be used for authenticating subsequent requests to protected endpoints.
- Ensure that the `JWT_SECRET` environment variable is set in your `.env` file for token generation.

---

### Example Usage

#### Request
```bash
curl -X POST http://localhost:5000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64b0c8f4e4b0f5a1c8e4b0f5",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

## `/users/logout`

### Description
This endpoint is used to log out an authenticated user. It performs the following steps:
1. Invalidates the user's JSON Web Token (JWT).
2. Removes the token from the client-side storage (e.g., cookies, local storage).
3. Returns a success message in the response.

This endpoint is essential for user security, ensuring that the user's session can be terminated.

---

### Request

- **Method:** POST
- **URL:** `/users/logout`
- **Content-Type:** application/json

#### Request Body

The request body must be a JSON object with the following fields:

```json
{
  "token": "<JWT-token>" // Required, the token to be invalidated
}
```

---

### Validations
The following validations are applied to the input data:
- **token:** Must be a valid JWT.

If any validation fails, the endpoint returns a `400 Bad Request` status with detailed error messages.

---

### Response

#### Success (Logged Out)
- **Status Code:** 200 OK
- **Response Body:**

```json
{
  "message": "Logged out successfully"
}
```

#### Error (Validation Failed)
- **Status Code:** 400 Bad Request
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

#### Error (Invalid Token)
- **Status Code:** 401 Unauthorized
- **Response Body:**

```json
{
  "error": "Invalid token"
}
```

---

### Workflow

1. **Validation:** The input data is validated using `express-validator`. If validation fails, a `400 Bad Request` response is sent with detailed error messages.
2. **Token Invalidation:** The provided token is invalidated, preventing its future use.
3. **Response:** A success message is returned in the response.

---

### Additional Notes
- The token should be removed from the client-side storage (e.g., cookies, local storage) after a successful logout.
- Ensure that the `JWT_SECRET` environment variable is set in your `.env` file for token validation.

---

### Example Usage

#### Request
```bash
curl -X POST http://localhost:5000/users/logout \
-H "Content-Type: application/json" \
-d '{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}'
```

#### Response
```json
{
  "message": "Logged out successfully"
}
```

## `/users/profile`

### Description
This endpoint is used to retrieve the profile of the currently authenticated user. It requires the user to be logged in and provides their profile details in the response.

---

### Request

- **Method:** GET  
- **URL:** `/users/profile`  
- **Headers:**  
  - `Authorization: Bearer <JWT-token>` (or a valid token in cookies)

---

### Response

#### Success (User Profile Retrieved)
- **Status Code:** 200 OK  
- **Response Body:**

```json
{
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

## `/captains/register`

### Description
This endpoint is used to register a new captain. It performs the following steps:
1. Validates the input data using `express-validator`.
2. Hashes the captain's password for secure storage.
3. Creates a new captain record in the database.
4. Generates a JSON Web Token (JWT) for authentication.
5. Returns the token and captain details in the response.

This endpoint is essential for onboarding captains into the application.

---

### Request

- **Method:** POST  
- **URL:** `/captains/register`  
- **Content-Type:** application/json  

#### Request Body

The request body must be a JSON object with the following fields:

```json
{
  "fullname": {
    "firstname": "John", // Required, must be at least 3 characters
    "lastname": "Doe"    // Optional, must be at least 3 characters if provided
  },
  "email": "john.doe@example.com", // Required, must be a valid email address
  "password": "password123",       // Required, must be at least 6 characters
  "vehicle": {
    "color": "Red",                // Required, must be at least 3 characters
    "plate": "ABC123",             // Required, must be unique and at least 3 characters
    "capacity": 4,                 // Required, must be at least 1
    "vehicleType": "car"           // Required, must be one of ['car', 'bike', 'auto']
  }
}
```

---

### Validations
The following validations are applied to the input data:
- **email:** Must be a valid email address.
- **fullname.firstname:** Must be at least 3 characters long.
- **fullname.lastname:** If provided, must be at least 3 characters long.
- **password:** Must be at least 6 characters long.
- **vehicle.color:** Must be at least 3 characters long.
- **vehicle.plate:** Must be unique and at least 3 characters long.
- **vehicle.capacity:** Must be at least 1.
- **vehicle.vehicleType:** Must be one of ['car', 'bike', 'auto'].

If any validation fails, the endpoint returns a `400 Bad Request` status with detailed error messages.

---

### Response

#### Success (Captain Registered)
- **Status Code:** 201 Created
- **Response Body:**

```json
{
  "token": "<JWT-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null
  }
}
```

#### Error (Validation Failed)
- **Status Code:** 400 Bad Request
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

#### Error (Missing Fields)
- **Status Code:** 500 Internal Server Error
- **Response Body:**

```json
{
  "error": "All fields are required"
}
```

---

### Workflow

1. **Validation:** The input data is validated using `express-validator`. If validation fails, a `400 Bad Request` response is sent with detailed error messages.
2. **Password Hashing:** The password is hashed using `bcrypt` for secure storage.
3. **Captain Creation:** A new captain record is created in the database using the `captainService.createCaptain` method.
4. **Token Generation:** A JWT is generated using the `generateAuthToken` method from the captain model.
5. **Response:** The token and captain details are returned in the response.

---

### Additional Notes
- The password is never stored in plain text. It is hashed using `bcrypt` before being saved to the database.
- The `lastname` field is optional but must meet the validation criteria if provided.
- The generated JWT can be used for authenticating subsequent requests to protected endpoints.
- Ensure that the `JWT_SECRET` environment variable is set in your `.env` file for token generation.

---

### Example Usage

#### Request
```bash
curl -X POST http://localhost:5000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}'
```

#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64b0c8f4e4b0f5a1c8e4b0f5",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null
  }
}
```

## `/captains/login`

### Description
This endpoint is used to authenticate an existing captain. It performs the following steps:
1. Validates the input data using `express-validator`.
2. Checks if the captain exists in the database.
3. Verifies the provided password against the stored hashed password.
4. Generates a JSON Web Token (JWT) for authentication.
5. Returns the token and captain details in the response.

---

### Request

- **Method:** POST  
- **URL:** `/captains/login`  
- **Content-Type:** application/json  

#### Request Body

The request body must be a JSON object with the following fields:

```json
{
  "email": "john.doe@example.com", // Required, must be a valid email address
  "password": "password123"        // Required, must be at least 6 characters
}
```

---

### Validations
The following validations are applied to the input data:
- **email:** Must be a valid email address.
- **password:** Must be at least 6 characters long.

If any validation fails, the endpoint returns a `400 Bad Request` status with detailed error messages.

---

### Response

#### Success (Captain Authenticated)
- **Status Code:** 200 OK
- **Response Body:**

```json
{
  "token": "<JWT-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null
  }
}
```

#### Error (Validation Failed)
- **Status Code:** 400 Bad Request
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

#### Error (Captain Not Found)
- **Status Code:** 404 Not Found
- **Response Body:**

```json
{
  "error": "Captain not found"
}
```

#### Error (Invalid Password)
- **Status Code:** 401 Unauthorized
- **Response Body:**

```json
{
  "message": "Unauthorized access"
}
```

---

### Workflow

1. **Validation:** The input data is validated using `express-validator`. If validation fails, a `400 Bad Request` response is sent with detailed error messages.
2. **Captain Lookup:** The system checks if the captain exists in the database.
3. **Password Verification:** The provided password is verified against the stored hashed password.
4. **Token Generation:** A JWT is generated using the `generateAuthToken` method from the captain model.
5. **Response:** The token and captain details are returned in the response.

---

### Additional Notes
- The password is compared in its hashed form for security. It is never decrypted or logged.
- The generated JWT can be used for authenticating subsequent requests to protected endpoints.
- Ensure that the `JWT_SECRET` environment variable is set in your `.env` file for token generation.

---

### Example Usage

#### Request
```bash
curl -X POST http://localhost:5000/captains/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

#### Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64b0c8f4e4b0f5a1c8e4b0f5",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "socketId": null
  }
}
```



