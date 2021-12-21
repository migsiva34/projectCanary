const express = require('express');
const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '61b8664379e1231e20574317',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, sit. Totam deserunt, sint, perferendis provident obcaecati molestias est aut, similique iste nobis delectus ea rerum aliquid officia atque eos tempore!',
            price,
            geometry: {
                type:"Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/migsilva/image/upload/v1624439618/YelpCamp/rv5mdq9wwcahdkng4bb8.jpg',
                    filename: 'YelpCamp/rv5mdq9wwcahdkng4bb8'
                },
                {
                    url:'https://res.cloudinary.com/migsilva/image/upload/v1624439615/YelpCamp/nu18ehqkiymq9x97uedz.jpg',
                    filename: 'YelpCamp/nu18ehqkiymq9x97uedz'
                },
                {
                    url:'https://res.cloudinary.com/migsilva/image/upload/v1624439613/YelpCamp/mtorunbbtmjg8jl61jlv.jpg',
                    filename:'YelpCamp/mtorunbbtmjg8jl61jlv'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})