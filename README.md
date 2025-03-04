# Meme NFT Platform

## Overview

This is a React-based web application that allows users to process images, generate memes, explore NFTs, and view detailed meme information. The platform integrates with the Chopin framework and uses React Router for navigation.

## Features

- **User Authentication**: Login functionality to access meme-related features.
- **Meme Processing**: Upload and process images to generate memes.
- **NFT Exploration**: Browse through all available meme NFTs.
- **My NFT Collection**: View your personal collection of meme NFTs.
- **Meme Details**: See specific details about individual memes.

## Technologies Used

- **React**: Frontend framework
- **Node**: Backend
- **React Router**: For handling navigation
- **Chopin Framework**: Address management
- **Tailwind CSS**: For styling

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/hatim85/Memify.git
   cd Memify
   ```

2. Start the proxy server:

   ```sh
   npx chopd
   ```

The application will run at `http://localhost:4000/`.

## Project Structure

```
.
├── src
│   ├── components
│   │   ├── Navbar.js
│   ├── pages
│   │   ├── LandingPage.js
│   │   ├── ImageProcessing.js
│   │   ├── ResultPage.js
│   │   ├── MyNFT.js
│   │   ├── AllMemes.js
│   │   ├── MemeDetails.js
│   ├── App.js
│   ├── Login.js
│   ├── index.js
│
├── public
├── package.json
├── README.md
```

## Routes

| Path          | Component       | Description                     |
| ------------- | --------------- | ------------------------------- |
| `/`           | Login           | User authentication page        |
| `/meme/:id`   | MemeDetails     | View details of a specific meme |
| `/explorenft` | AllMemes        | Explore all meme NFTs           |
| `/mynft`      | MyNFT           | View owned NFTs                 |
| `/landing`    | LandingPage     | Introduction page               |
| `/process`    | ImageProcessing | Process and create memes        |
| `/result`     | ResultPage      | View meme processing results    |
