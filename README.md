# Store Rating App

A full-stack web application that allows users to submit and manage ratings for registered stores on the platform.  
This project was built as part of the **FullStack Intern Coding Challenge**, implementing all required functionalities for **System Administrator**, **Normal User**, and **Store Owner** roles.

---

## 🚀 Tech Stack

**Frontend:** React.js (Vite)  
**Backend:** Express.js  
**Database:** MySQL  
**Authentication:** JWT-based login system  
**Styling:** Tailwind CSS / CSS Modules (update based on your choice)  
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

### Admin Dashboard
![Admin Dashboard](images/admin_dashboard.png)

### Store List
![Store List](images/store_list.png)

### Rating Submission
![Rating Submission](images/rating_submission.png)

*(Replace the `images/...` paths with your actual screenshot locations)*

---

## 🗄 Database Schema

**Tables:**
- `users` — Stores user details, roles, and authentication credentials.
- `stores` — Stores information about each registered store.
- `ratings` — Stores user-submitted ratings for stores.

![Database Schema](images/db_schema.png)

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Store-rating-app.git
cd Store-rating-app
