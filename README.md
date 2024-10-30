## QuickBite

### Overview

This project is a food delivery application designed with a microservices architecture. It includes separate frontends for users and administrators, and utilizes a variety of technologies to ensure scalability, maintainability, and performance.

### Technologies Used

#### Backend
- **Flask**: For services requiring complex data processing.
- **Node.js**: For services needing to handle a large number of concurrent connections.
- **Express.js**: Web framework for Node.js services.
- **Redis**: For caching and session management.
- **MySQL**: For structured data storage.
- **MongoDB**: For unstructured data storage.

#### Frontend
- **React**: For building user interfaces.
<!-- - **Vite**: For fast and efficient development. -->

#### Security
- **JSON Web Tokens (JWT)**: For user authentication and authorization.
- **OAuth**: For third-party authentication.

### Project Structure

```
food-delivery-app/
├── backend/
│   ├── user-service/
│   ├── restaurant-service/
│   ├── order-service/
│   ├── delivery-service/
│   ├── admin-service/
│   ├── common/
│   └── docker-compose.yml
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── admin-frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── database/
│   ├── mysql/
│   ├── mongodb/
│   └── redis/
├── docs/
└── README.md
```

### Services

#### User Service
- **Technology**: Flask
- **Responsibilities**: User authentication, profiles, and preferences.
- **Database**: MySQL, Redis

#### Restaurant Service
- **Technology**: Node.js, Express.js
- **Responsibilities**: Restaurant data, menus, and reviews.
- **Database**: MongoDB

#### Order Service
- **Technology**: Node.js, Express.js
- **Responsibilities**: Order creation, tracking, and history.
- **Database**: MySQL, Redis

#### Delivery Service
- **Technology**: Flask
- **Responsibilities**: Delivery personnel management, tracking, and logistics.
- **Database**: MongoDB

#### Admin Service
- **Technology**: Node.js, Express.js
- **Responsibilities**: Admin functionalities like managing users, restaurants, orders, and deliveries.
- **Database**: MySQL, MongoDB

### Frontend

#### User Frontend
- **Technology**: React,
- **Responsibilities**: User interface for browsing restaurants, placing orders, and tracking deliveries.

#### Admin Frontend
- **Technology**: React, Vite
- **Responsibilities**: Admin interface for managing users, restaurants, orders, and deliveries.

### Setup Instructions

#### Prerequisites
- Node.js
- Python
- Docker
- MySQL
- MongoDB
- Redis

#### Backend Setup
1. Navigate to each service directory under `backend/`.
2. Install dependencies:
   - For Flask services: `pip install -r requirements.txt`
   - For Node.js services: `npm install`
3. Configure environment variables as needed.
4. Start each service:
   - For Flask services: `python run.py`
   - For Node.js services: `node server.js`

#### Frontend Setup
1. Navigate to `frontend/` and `admin-frontend/` directories.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

#### Database Setup
1. Initialize MySQL, MongoDB, and Redis using the scripts in the `database/` directory.

#### Docker Setup
1. Navigate to the `backend/` directory.
2. Run `docker-compose up` to start all services.

### Documentation

- **Architecture**: Detailed architecture documentation can be found in `docs/architecture.md`.
- **API Specifications**: API specifications can be found in `docs/api-specs.md`.

### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

### License

This project is licensed under the MIT License.

---

This README provides a comprehensive overview of your food delivery app project, including the technologies used, project structure, setup instructions, and more.