# <b>Backend</b>

> ### API for CRUD operations for the App containing the following requests
> <ul><li>GET</li><li>POST</li><li>PUT</li><li>DELETE</li><ul>

## Usage

Change the config file in `AppServer` and change the `MONGOURI` to your `MONGODB Atlas` url.

## Install Dependencies

```
npm install
```

## Run App

```
nodemon server.js
```

### Version : 1.0.0
### License : MIT

## <b>ROUTES</b>

`NOTE` : If you are running the app on an android emulator the replace the <b>localhost</b> with the following :-

```
10.0.2.2
```
If you are running the app on a real device then replace the localhost with your `IP ADDRESS`

### GET all Transactions

```
http://localhost:3000/getAll
```

### POST a transaction

```
http://localhost:3000/createTrans/:id
```

### UPDATE a particular transaction

```
http://localhost:3000/updateTrans/:id
```

### DELETE a transaction

```
http://localhost:3000/deleteTrans/:id
```


# APP

### Technologies/Packages Used

<ul>
    <li>React Native 0.62</li>
    <li>react-native-modal</li>
</ul>

## Usage

cd into the `client` directory and run
```
npm install
react-native run-android
```

### Note :- `Be sure to keep the server running prior to running the app.` 

