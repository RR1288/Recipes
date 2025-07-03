# Recipe Costing App

A simple web application to manage ingredients and recipes, calculate total costs, and generate suggested prices for selling — built to replace manual spreadsheets and bring structure to food costing.

---

## Tech Stack

- **Frontend**: Vite + React
- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Validation**: Yup (with React Hook Form)
- **Styling**: Bootstrap (with future plans for custom UI/UX)

---

## Motivation

This project was born out of frustration with managing recipe costs in messy Excel sheets. I wanted a tool that:

- Lets me create a database of ingredients with prices
- Allows recipe creation with dynamic ingredient selection
- Automatically calculates the cost and suggests a price per unit
- Is more enjoyable and maintainable than spreadsheets

---

## Development Process

### Phase 1: Ingredients & Recipes
- Created backend models and REST API endpoints for ingredients and recipes
- Enabled full CRUD operations from the frontend
- Used `Yup` + `React Hook Form` to validate user input

### Phase 2: UI & Navigation
- Implemented dynamic ingredient search and selection for recipes
- Added toast notifications for feedback
- Built an editable recipe form that works for both creation and updates

### Phase 3: Optimizations & Code Clean-Up
- Refactored schema design to embed essential data in recipes
- Calculated cost per serving and suggested price using business logic
- Made the form fully reusable and scalable

---

## Features

- Ingredient management (name, unit, price)
- Recipe creation and editing with ingredient selection
- Automatic cost calculations and pricing suggestions
- Form validation with live error display
- Toast notifications for user feedback
- DataGrid for managing large lists

---

## Future Plans

- Improved UI/UX design with custom styles and animations
- Add image or video support for recipes
- Responsive mobile layout
- Dashboard for reporting (total cost, revenue potential, etc.)
- Filtering and advanced search by cost, category, etc.
- Export to PDF or Excel for printable costing sheets

---

## Project Structure (Simplified)

```
├── backend/
│   ├── models/
│   ├── controllers/
│   └── routes/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
```

---

## Lessons Learned

- Embedding key data (like `ingredient.name`) in recipes simplifies queries
- `react-hook-form` with `yup` gives great flexibility and validation power
- Thoughtful defaults and careful schema design reduce bugs down the line
- The importance of modular, reusable components in scaling UI

---

## Screenshots

> Coming soon — planning to include styled recipe cards, charts, and more!

---

## Running Locally

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

## Prerequisites
To run this project locally, you need to have a MongoDB server running on your machine. By default, the backend connects to MongoDB at:

```bash
mongodb://localhost:27017/Recipes
```
Make sure to:

Install MongoDB Community Server if you don't have it.

- Start the MongoDB service (`mongod`) before running the backend server.
- If your MongoDB is running on a different port or host, update the connection string in your backend configuration (`.env` file).
---

## 📬 Contact

Created with passion by **[Your Name]**  
📫 [your.email@example.com]  
🔗 [your portfolio or LinkedIn]

---