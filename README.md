# BookBusters

BookBusters: a peer-to-peer book sharing web application.
Donate your books by simply scanning their barcode and search for books available around you.

The repository contains back-end and front-and parts :

 - [the back-end part](./BACK) contains a PostgreSQL database managed, deployed and migrated with sqitch, and a REST API, developed with Node.js and Express.js and documented with JS-Doc Swagger, which queries four APIs for getting book information (GoogleBook, OpenLibrary, WorldCat, Inventory)
 
 - [the font-end part](./FRONT/bookbustersfront) contains a React application that use React Router and Material UI

## Start the project

### Back-end

- In the [BACK](./BACK) folder, install Node globally and the NPM dependencies
- Create a PostgreSQL database, install [sqitch](https://sqitch.org), configure sqitch configuration in a file named sqitch.conf by copying the sample file.
- Then deploy the database structure with this sqitch command:
 ```sh
 sqitch deploy
 ```
- Configure environment variables in an .env file following the sample file
- Finally, start the API :
```sh
npm start
```

### Front-end
- In the [FRONT/bookbustersfront](./FRONT/bookbustersfront) folder, install the NPM dependencies
- And just start the application :
```sh
npm start
```
