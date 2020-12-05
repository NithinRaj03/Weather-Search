const path = require("path");
const express = require("express");
const hbs = require("hbs");
//const request = require("request");

//Loading geocast and forecast files
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3333;

//Defines path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and  views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Static Directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Nithin Raj",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me: ",
        name: "Nithin Raj",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help!",
        name: "Nithin Raj",
        helpText: "Hey Im here to Help!",
    });
});

app.get("/weather", (req, res) => {
    const address = req.query.address;

    if (!address) {
        return res.send({
            error: "You must provide a address term",
        });
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.render({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: address
            })
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 Page",
        name: "Nithin Raj",
        errorMessage: "Help Article not found!",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 Page",
        name: "Nithin Raj",
        errorMessage: "Page not found!",
    });
});

app.listen(port, () => {
    console.log(`Server running on the port ${port} `);
});