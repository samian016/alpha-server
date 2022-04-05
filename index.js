const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient } = require("mongodb");
const FacebookStrategy = require("passport-facebook").Strategy;

const passportSetup = require("./passport");
const cookieSession = require('cookie-session');
const passport = require("passport");

app.use(express.json())
app.use(cookieSession({ name: "session", keys: ["alpha"], maxAge: 24 * 60 * 60 * 100 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);






const uri = `mongodb+srv://pioneer:pioneerAlpha@cluster0.xh4av.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});








async function run() {
    try {
        await client.connect();
        await console.log("Server and Database connection succesfully!");
        const pioneerAlpha = client.db("pioneerAlpha");
        const users = pioneerAlpha.collection("users");




        app.post("/register/demoUser", async (req, res) => {
            const user = await users.findOne({ email: req.body.email });
            // console.log(user);
            if (!user) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(req.body.password, salt)
                // console.log(hashedPassword);
                const result = await users.insertOne({ email: req.body.email, password: hashedPassword });
                // console.log(result);
                res.send(result)
            }
            else {
                res.send({ message:"All ready exist" })
            }
            // console.log(req.body.email, req.body.password);
        })
        app.post("/login", async (req, res) => {
            const user = await users.findOne({ email: req.body.email });

            if (user) {
                // console.log(user);
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    // console.log(result);
                    if (result) {
                        res.send(result)
                    }
                    else {
                        res.send(result)
                    }
                });
            }
            else {
                res.send(false)
            }
            // console.log(req.body.email, req.body.password);
        })









    }
    finally {

    }
}
run().catch(console.dir)
app.get("/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:3000/success",
        failureRedirect: "http://localhost:3000/",
    })
);

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/mine',
    passport.authenticate('facebook', {
        successRedirect: "http://localhost:3000/success",
        failureRedirect: 'http://localhost:3000/'
    })
);


app.get('/', (req, res) => {
    res.send('Running on port')
})
app.listen(5000, () => {
    console.log("listining on port 5000");
})
// 467265865184647
// ce65c39e77004e4cf70e88bf4612a2b9
// http://localhost:3000/auth/facebook/login