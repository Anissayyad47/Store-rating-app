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
### Search Store by name
<img width="1920" height="1080" alt="Vite + React and 12 more pages - Personal - Microsoft​ Edge 18-08-2025 12_11_30" src="https://github.com/user-attachments/assets/e84638ac-f6f1-4a09-91e9-4e33c32dcf2c" />
### Add Your Rating
<img width="1920" height="1080" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_41_10" src="https://github.com/user-attachments/assets/3a19183e-ffcf-4f1a-bca7-fdf4397953c7" />

### Update Password and Logout
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_40_42" src="https://github.com/user-attachments/assets/59e8614a-4b59-4a44-ac3a-ba08c6a7f0b8" />
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_40_45" src="https://github.com/user-attachments/assets/79ad777b-b530-4ad0-8038-a361f1963ff9" />



### Store Owner Dashboard
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_41_52" src="https://github.com/user-attachments/assets/c00f983e-9f12-4647-9ab6-9320d9d6cb19" />
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_42_01" src="https://github.com/user-attachments/assets/49c8e773-69eb-4559-b70a-1f6a6914639a" />
<img width="1920" height="1080" alt="Vite + React and 12 more pages - Personal - Microsoft​ Edge 18-08-2025 12_12_28" src="https://github.com/user-attachments/assets/b330789e-4e22-40eb-8ce0-07aac0d99ad1" />
### Search user by name
<img width="1920" height="1080" alt="Vite + React and 12 more pages - Personal - Microsoft​ Edge 18-08-2025 12_10_00" src="https://github.com/user-attachments/assets/721e26de-8a48-4045-877f-090e43803337" />


### Admin Dashboard
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_42_14" src="https://github.com/user-attachments/assets/d7c119ae-3a5f-40f5-b068-ef2a5607ef41" />
<img width="1920" height="1080" alt="Vite + React and 12 more pages - Personal - Microsoft​ Edge 18-08-2025 12_12_11" src="https://github.com/user-attachments/assets/628477ff-0d0d-4058-b31b-ef7f6cc61996" />
### Filter and search user and stores
<img width="1920" height="1080" alt="Vite + React and 12 more pages - Personal - Microsoft​ Edge 18-08-2025 12_12_03" src="https://github.com/user-attachments/assets/d04909cc-cef9-4736-b191-11ebe8651e63" />
### Add uers, and stores 
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_42_23" src="https://github.com/user-attachments/assets/f19f9e5c-96a8-4bb9-b403-f8ba003a4acc" />
<img width="1920" height="1032" alt="Vite + React and 2 more pages - Personal - Microsoft​ Edge 16-08-2025 14_42_37" src="https://github.com/user-attachments/assets/0f07939a-826e-4e3a-9708-5c9339933c56" />

