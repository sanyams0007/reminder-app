const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}).then(() => {
    console.log("Connected to Database!!!");
}).catch(() => {
    console.log("Failed to Connect with Database...");
})