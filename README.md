# Store Rating App

A full-stack web application that allows users to submit and manage ratings for registered stores on the platform.  
This project was built as part of the **FullStack Intern Coding Challenge**, implementing all required functionalities for **System Administrator**, **Normal User**, and **Store Owner** roles.

---

## 🚀 Tech Stack

**Frontend:** React.js (Vite)  
**Backend:** Express.js  
**Database:** MySQL  
**Authentication:** JWT-based login system  
**Styling:** Tailwind CSS 
**HTTP Client:** Axios  

---

## 📌 Features

### 1. System Administrator
- Add new stores, normal users, and admin users.
- Dashboard displaying:
  - Total number of users
  - Total number of stores
  - Total number of submitted ratings
- View and filter:
  - List of stores (Name, Email, Address, Rating)
  - List of users (Name, Email, Address, Role)
- View detailed user profiles (including store ratings for store owners).
- Logout functionality.

### 2. Normal User
- Signup & login.
- Update password.
- View and search registered stores (by name or address).
- View store details:
  - Store Name
  - Address
  - Overall Rating
  - User's Submitted Rating
- Submit and modify store ratings (1–5).
- Logout functionality.

### 3. Store Owner
- Login & password update.
- Dashboard showing:
  - List of users who rated their store.
  - Average store rating.
- Logout functionality.

---

## 🛠 Form Validations
- **Name:** Min 20 chars, Max 60 chars
- **Address:** Max 400 chars
- **Password:** 8–16 chars, at least 1 uppercase & 1 special character
- **Email:** Standard email validation

---

## 📊 Additional Functionalities
- Sorting for key table fields (Name, Email, etc.).
- Search and filter options for listings.
- Proper database schema design following best practices.

---

## 📷 Screenshots

### Login/Sign-Up
<img width="1920" height="1080" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_39_34" src="https://github.com/user-attachments/assets/0fc2f981-824b-4bb1-958e-081963e5c8ff" />
<img width="1920" height="1080" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_40_26" src="https://github.com/user-attachments/assets/28944678-c001-42f7-a48c-04c453d6b8e3" />

### User Dashboard
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_40_38" src="https://github.com/user-attachments/assets/3e1b2b79-544b-442a-9281-e51b7a8f2d7c" />
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_40_42" src="https://github.com/user-attachments/assets/59e8614a-4b59-4a44-ac3a-ba08c6a7f0b8" />
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_40_45" src="https://github.com/user-attachments/assets/79ad777b-b530-4ad0-8038-a361f1963ff9" />


### Store Owner Dashboard
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_41_52" src="https://github.com/user-attachments/assets/c00f983e-9f12-4647-9ab6-9320d9d6cb19" />
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_42_01" src="https://github.com/user-attachments/assets/49c8e773-69eb-4559-b70a-1f6a6914639a" />



### Admin Dashboard
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_42_14" src="https://github.com/user-attachments/assets/d7c119ae-3a5f-40f5-b068-ef2a5607ef41" />
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_42_23" src="https://github.com/user-attachments/assets/f19f9e5c-96a8-4bb9-b403-f8ba003a4acc" />
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_42_37" src="https://github.com/user-attachments/assets/0f07939a-826e-4e3a-9708-5c9339933c56" />

---

## 🗄 Database Schema

**Tables:**
- `users` — Stores user details, roles, and authentication credentials.
- 
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    role ENUM('admin', 'normal', 'store_owner') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

- `stores` — Stores information about each registered store.
CREATE TABLE stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(400),
    owner_id INT,  -- links to users table if store has an owner
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

- `ratings` — Stores user-submitted ratings for stores.
CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating INT CHECK(rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(user_id, store_id), -- ensures one rating per user per store
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);
