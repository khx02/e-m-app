const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const server = http.createServer(app);
const io = new Server(server);

const PORT_NUMBER = 8080;
server.listen(PORT_NUMBER, () => console.log(`Listening to port number ${PORT_NUMBER}`));
app.use(session({
    secret: 'what is session',
    resave: false,
    saveUninitialized: true
  }));

/**  
deprecated for A3
// ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: false }));
// bootstrap
app.use(express.static("node_modules/bootstrap/dist/css"));
// other static files
app.use(express.static("files"));
*/

// angular
app.use(express.static('./dist/assignment-3/browser'));
app.use(express.static('./public'));
// Json
app.use(express.json());


// Passport
app.use(passport.initialize());
app.use(passport.session());

// mongoDB
const mongoose = require("mongoose");
// const url = "mongodb://10.192.0.4:27017/fit2095db";
const url = "mongodb://127.0.0.1:27017/fit2095db";
async function connectDB(url) {
    mongoose.connect(url);
    return `Connected to mongodb`;
}
connectDB(url).then(console.log).catch((error) => {
    console.log(error);
});


// firebase
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();
async function statsCounter() {
    const docRef = firestore.collection('stats').doc('counters');
    const doc = await docRef.get();
    if (!doc.exists) {
        await docRef.set({
            "Create": 0,
            "Read": 0,
            "Update": 0,
            "Delete": 0 
        });
    } 
    return docRef;
}
async function incrementCounter(field) {
    const docRef = await statsCounter();
    await docRef.update({
        [field]: admin.firestore.FieldValue.increment(1)
    });
}
module.exports = incrementCounter;

// simplify endpoint
const default_endpoint = '/33491968/Hong'
// const endpoint_join = (pathString) => path.join(default_endpoint, pathString); 
const api_join = (pathString) => path.join(default_endpoint, 'api', 'v1', pathString);

// deprecated for A3
// home
// app.get('/', async (req, res) => {
//     driverCount = await Driver.countDocuments({});
//     packageCount = await Package.countDocuments({});
//     // res.render('index' , {driverCount: driverCount, packageCount: packageCount} );
// })

// register
// non-api deprecatred for A3
// app.get(endpoint_join('register'), (req, res) => {
//     res.render('register');
// });
// app.post(endpoint_join('register'), async (req, res) => {
//     const 
//         alphanumeric = /^[0-9a-zA-Z]+$/
//         userName = req.body.username, 
//         password = req.body.password,
//         confirmPassword = req.body.con_password;
    
//     if (userName.match(alphanumeric) && 
//         userName.length >= 6 &&
//         password.length >= 5 &&
//         password.length <= 10 &&
//         password === confirmPassword) {
//         await firestore.collection('accounts').doc().set({ username: userName, password: password});
//         res.redirect(endpoint_join('login'));
//     } else {
//         res.render('invalid');
//     }
// });

app.post(api_join('register'), async (req, res) => {
    const 
        alphanumeric = /^[0-9a-zA-Z]+$/;
        userName = req.body.username, 
        password = req.body.password;

    const user = await firestore.collection('accounts').where('username', '==', userName).get();

    if (userName.match(alphanumeric) && 
        userName.length >= 6 &&
        password.length >= 5 &&
        password.length <= 10 &&
        user.empty) {
        await firestore.collection('accounts').doc().set({ username: userName, password: password});
        res.status(200).json({ status: 'Sign Up successful' });
    } else {
        res.status(400).json({ status: 'Invalid username or password' });
    }
});

// login
// non-api deprecated for A3
// app.get(endpoint_join('login'), (req, res) => {
//     res.render('login');
// });
// app.post(endpoint_join('login'), async (req, res) => {
//     const doc = await firestore.collection('accounts').where('username', '==', req.body.username).where('password', '==', req.body.password).get();
//     if (doc.empty) {
//         res.render('invalid');
//     } else {
//         userAuth = true;
//         res.redirect('/');
//     }
// });
// app.post(api_join('login'), async (req, res) => {
//     const doc = await firestore.collection('accounts').where('username', '==', String(req.body.username)).where('password', '==', String(req.body.password)).get();
//     if (doc.empty) {
//         res.status(401).json({ status: 'Invalid username or password' });
//     } else {
//         res.status(200).json({ status: 'Login successful' });
//     }
// });

// Authentication
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const doc = await firestore.collection('accounts')
        .where('username', '==', username)
        .where('password', '==', password)
        .get();

      if (doc.empty) {
        return done(null, false, { message: 'Incorrect username or password.' });
      } else {
        const user = doc.docs[0].data();
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(async function(username, done) {
  try {
    const doc = await firestore.collection('accounts')
      .where('username', '==', username)
      .get();
    if (doc.empty) {
      done(new Error('User not found'));
    } else {
      const user = doc.docs[0].data();
      done(null, user);
    }
  } catch (err) {
    done(err);
  }
});

app.post(api_join('login'), (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
        if (!user) {
            // Send failure response with custom message
            return res.status(401).json({ status: 'fail', message: info.message || 'Invalid username or password' });
        }
        // Log in the user
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ status: 'error', message: 'Login failed' });
            }
            // Send success response
            return res.status(200).json({ status: 'success', message: 'Login successful', user: user });
        });
    })(req, res, next);
});

app.use('/33491968/Hong/api/v1', (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(401).json({ status: 'Log In first', message: 'Unauthenticated' });
    }
});

// socket.io
io.on('connection', (socket) => {
    socket.on('translate', async (p, target) => {
        try {
            const translations = await translateText(p.description, target ? target : 'en');
            io.sockets.emit('translate', translations);
        } catch (error) {
            console.error('Error translating text:', error);
            io.sockets.emit('translate', []);
        }
    });

    socket.on('textToSpeech', async (text) => {
        try {
            const file_path = await tts(text);
            io.sockets.emit('textToSpeech', file_path);
        } catch (error) {
            console.error('Error converting text to speech:', error);
            io.sockets.emit('textToSpeech', '');
        }
    });

    socket.on('generateAI', async (text) => {
        try {
            let question = `Distance from Melbourne to ${text} in km`
            const result = await geminiModel.generateContent(question);
            io.sockets.emit('generateAI', result.response.text());
        } catch (error) {
            console.error('Error generating AI:', error);
            io.sockets.emit('generateAI', '');
        }
    });
});

// Translate
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate();
async function translateText(text, target) {
    let [translations] = await translate.translate(text, target);
    translations = Array.isArray(translations) ? translations : [translations];
    return translations;
  }

// Text to Speech 
const { writeFile } = require('node:fs/promises');
const textToSpeech = require("@google-cloud/text-to-speech");
const { uuid } = require('uuidv4');
const client = new textToSpeech.TextToSpeechClient();
async function tts(text) {
    const request = {
      input: {text: text},
      // Select the language and SSML voice gender (optional)
      voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3'},
    };
  
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
  
    // Save the generated binary audio content to a local file
    file_path = `${uuid()}.mp3`;
    await writeFile(`public/${file_path}`, response.audioContent, 'binary');
    return file_path;
  }

// Generative AI
const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemini_api_key = "AIzaSyB4we9OysQ7FS3kA-G4qzIq811VWiU0NQM";

const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});

// deprecated for A3
// Authentication Flag
// let userAuth = true; 

// // Middleware to check authentication
// app.get("*", (req, res, next) => {
//     if (userAuth) {
//         next();
//     } else {
//         res.redirect(endpoint_join('login'));
//     }
// });

// Routes
// const driverRouter = require('./routes/drivers-route');
const driverApiRouter = require('./routes/drivers-route-api');
// app.use(endpoint_join('drivers'), driverRouter);
app.use(api_join('drivers'), driverApiRouter);

// const packageRouter = require('./routes/packages-route');
const packageApiRouter = require('./routes/packages-route-api');
// app.use(endpoint_join('packages'), packageRouter);
app.use(api_join('packages'), packageApiRouter);

// Stat 
// non-api deprecated for A3
// app.get(endpoint_join('stats'), async (req, res) => {
//     const docRef = await statsCounter();
//     const doc = await docRef.get();
//     if (doc.exists) {
//         res.render('stats', { stats: doc.data() });
//     } else {
//         res.render('stats', { stats: {} });
//     }
// })
app.get(api_join('stats'), async (req, res) => {
    const docRef = await statsCounter();
    const doc = await docRef.get();
    if (doc.exists) {
        res.status(200).json(doc.data());
    } else {
        res.status(404).json({});
    }
})

// deprecated for A3
// error page 
// app.get("*", (req, res) => res.send("404 Not Found"));