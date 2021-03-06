const mongoose = require('mongoose');
const cities = require('./cities');
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

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '6085951309c2024924927776',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ipsam fugit similique laudantium, eligendi cupiditate doloremque praesentium omnis aut ratione, nulla saepe quam velit quisquam, eaque quidem. Aspernatur, ea tenetur?',
            price,
            geometry: { 
                type : "Point", 
                coordinates : [ 
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/nemo1919/image/upload/v1619869369/YelpCamp/chosyr9cdqprpyusjqu5.png',
                    filename: 'YelpCamp/chosyr9cdqprpyusjqu5'
                  },
                  {
                    url: 'https://res.cloudinary.com/nemo1919/image/upload/v1619869348/YelpCamp/wlrl5wxmx6m1saehiake.jpg',
                    filename: 'YelpCamp/wlrl5wxmx6m1saehiake'
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})