# Get Youtube Subscribers

It is used to do create,read,update and delete operations of Youtube Subscribers data from MongoDB Atlas Database.

## Demo

https://drive.google.com/file/d/1kvLPBsBBP5N2jlKG4E3ZWXV6Jt1VyPTG/view?usp=sharing

## Technologies that are used in this project.
  <ul>
    <li>Mongoose</li> 
    <li>Express</li>  
    <li>MongoDB</li> 
    <li>NodeJS</li>
    <li>Nodemon</li>  
  </ul>

## Team Members

- Narendra Rane
- Abinash Mohanty


## Features

- Get All Youtube Subscribers Objects
- Get All Youtube Subscribers Objects with specific fields
- Get Youtube Subscriber Object with specific id
- Insert Youtube Subscriber into MongoDB Database
- Update Youtube Subscriber into MongoDB Database
- Delete Youtube Subscriber into MongoDB Database
- Showing Error message if id not correct


## Deployment

The app has been deployed on 
https://get-youtube-subscribers-new.vercel.app/subscribers


## FAQ

#### How to add new subscribers?

Use Postman or thunder client to add new subscribers, Update or Delete subscribers from the database.


## Run Locally

Clone the project

```bash
  git clone https://github.com/narendrarane50/Get-Youtube-Subscribers.git
```

Go to the project directory

```bash
  cd Get-Youtube-Subscribers
```

Install dependencies

```bash
  npm install
```

Create MongoDB Database and Collection

```bash
  node src/createDatabase.js
```

Start the server

```bash
   npm start
```

