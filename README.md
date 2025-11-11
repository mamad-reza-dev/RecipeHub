<h1 align="center">
    <img alt="project" title="#About" src="https://cdn.imgurl.ir/uploads/j45142_837shots_so.png" />
</h1>

<h1 align="center">
  <a target="_blank" href="https://mamad-reza-dev-recipehub.vercel.app/"> 👨‍🍳 RecipeHub </a>
</h1>

<p align="center">
 <a href="#about">About</a> |
 <a href="#features">Features</a> |
 <a href="#project-structure">Project Structure</a> |
 <a href="#getting-started">Getting Started</a> | 
 <a href="#tech-stack">Tech Stack</a>
</p>

## About

**RecipeHub** is a modern web application built with **React** and
**TailwindCSS** that allows users to search, explore, and bookmark their
favorite recipes from around the world.  
It integrates with the **Forkify API** to deliver real-time recipe data with a
clean, responsive, and fast user experience.

---

## Features

- [x] Search for recipes by name or ingredients
- [x] View detailed recipe information
- [x] Bookmark your favorite recipes
- [x] Skeleton loading for images
- [x] Fully responsive design

---

## Project Structure

```
src/
├── components/       # All UI components
│   ├── common/       # Reusable common components (Button, Loader, EmptyState, etc.)
│   ├── Header.jsx
│   ├── BookmarkPanel.jsx
│   ├── SearchSidebar.jsx
│   ├── Main.jsx
│   ├── RecipeView.jsx
│   └── RecipeDetail.jsx
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
└── App.jsx           # Main app component
```

---

## Getting Started

```bash
# Clone this repository
$ git clone https://github.com/mamad-reza-dev/RecipeHub.git

# Access the project folder in your terminal
$ cd RecipeHub

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# The application will open on the port: 5173 - go to http://localhost:5173
```

---

## Tech Stack

The following technologies and tools were used to build this project:

### **Core Platform**

- [React](https://react.dev/) – Frontend library for building user interfaces
- [Vite](https://vite.dev/) – Next-generation frontend tooling for fast builds
  and development
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework for
  rapid UI development

### **Utilities & APIs**

- [Forkify API](https://forkify-api.herokuapp.com/v2) – Public API used to fetch
  recipe data
- [Poppins](https://fonts.google.com/specimen/Poppins) – Main font used for
  typography
