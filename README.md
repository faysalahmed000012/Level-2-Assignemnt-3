# Sports Facility Booking Platform

live link: https://level-2-assignemnt-3-ohoq.vercel.app/

### Technology

- node js
- TypeScript
- express js
- MongoDB
- Mongoose
- JsonWebToken

## How To Run This Project

Please follow the below instructions to run different branches of this repository in your machine:

1. Login to your GitHub account in your Terminal.

2. Clone this repository
   ```sh
   git clone https://github.com/faysalahmed000012/Level-2-Assignemnt-3.git
   ```
3. Go to the cloned project directory
   ```sh
   cd Level-2-Assignemnt-3
   ```
4. Run these commands (Make sure typescript is installed in your computer)
   ```sh
   npm install
   tsc
   ```
5. Now Run the project
   ```sh
   node  ./dist/server.js
   ```

## Features

- See Facilities
- Book Facility (cancel anytime)
- See Your Booking
- User Authentication and Authorization

## Application Routes

Authentication:

- POST /api/auth/signup --> To sign up.
- GET /api/auth/login --> For user login.
- POST /api/auth/refresh-token --> To get a new access token.

Facility:

- GET /api/facility --> To get all facility.
- POST /api/facility (Admin Only) --> To create a facility.
- PUT /api/facility/:id (Admin Only) --> To update a facility.
- DELETE /api/facility/:id (Admin Only) --> To soft delete a facility.

Booking:

- POST /api/bookings (User Only) --> To book a facility.
- GET /api/bookings (Admin Only) --> To see all bookings.
- GET /api/bookings/user (User Only) --> To see bookings that user made.
- DELETE /api/bookings/:id (User Only) --> To cancel a booking.
- GET /api/check-availability?date=YYYY-MM-DD --> To see available slots of that day.
