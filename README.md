## Taxi App Backend API
Server side node.js application to interface with database written for the android application I worked at
### Routes
**GET** ```/api/users``` - Get list of users

**GET** ```/api/users/drivers``` - Get list of drivers

**GET** ```/api/users/:userId``` - Get user

**GET** ```/api/trips``` - Get list of trips

**GET** ```/api/trips/:userId``` - Get user trips list

**POST** ```/api/users/register``` - Create new user

**POST** ```/api/auth/login``` - Returns token if correct username and password is provided

**POST** ```/api/trips/add``` - Create new trip

**PUT** ```/api/users/:userId``` - Update user

**DELETE** ```/api/users/:userId``` - Delete user
