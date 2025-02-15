# RPanel Server

RPanel's backend API, built with Node.js and MongoDB, provides a robust and scalable foundation for managing the admin panel's data and operations.

Main Url: https://rpanel-server.vercel.app

API Docs: https://documenter.getpostman.com/view/4549736/2s9YeAAa8f

Features: 
- JWT role based authentication
- Password resets
- Captcha validation
- Custom input validations
- User management (CRUD)
- User logs
- Github releases

Requirements:
- MongoDB account
- Node 18.x

How to run on your localhost:
- copy or clone
- rename .env.example to .env
- edit .env values
- run npm install
- run npm seed (to save first admin)
- run npm start
- access using http://localhost:9000
