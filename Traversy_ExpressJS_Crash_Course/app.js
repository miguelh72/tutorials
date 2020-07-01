const express = require("express");
const exphbs = require("express-handlebars");

const logger = require("./middleware/logger");

const members = require("./Members");

const PORT = process.env.PORT || 3000;

const app = express();

// Connect custom middleware
app.use(logger);

// Handlebars view engine middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Link routes
app.get('/', (req, res) => { 
    res.render('index', {
        title: "Member App",
        members
    });
});

app.use('/api/members', require('./routes/api/members'));

// Set static folder
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));