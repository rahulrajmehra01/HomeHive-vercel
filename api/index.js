const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place')
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const Booking = require('./models/Booking');
const Review = require('./models/Review');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Razorpay = require("razorpay");


require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:5173',
// }));

app.use(cors({
  credentials: true,
  origin: process.env.ORIGIN_URL,
}));


mongoose.connect(process.env.MONGODB_URL);

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});


function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

// test modal
app.get('/test', (req, res) => {
  res.json("test okkkk");
});

// Register modal
app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try{
    const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc);
  } catch(e) {
    res.status(422).json(e);
  }

});


// Login modal
// Login modal
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('Login failed');
    }
  } else {
    res.status(404).json('User not found');
  }
});



// Profile modal
app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});


// Logout modal
app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true);
});


// Photo Upload modal
// app.post('/upload-by-link' , async (req,res) => {
//   const {link} = req.body;
//   const newName = 'photo' + Date.now() + '.jpg';
//   await imageDownloader.image({
//     url: link,
//     dest: '/tmp/' +newName,
//   });
//   const url = await uploadToS3('/tmp/' +newName, newName, mime.lookup('/tmp/' +newName));
//   res.json(url);
// });
app.post('/upload-by-link' , async (req,res) => {
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' +newName,
  });
  res.json(newName);
});

// const photosMiddleware = multer({dest:'uploads'});
// app.post('/upload', photosMiddleware.array('photos', 100), async (req,res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const {path,originalname,mimetype} = req.files[i];
//     const url = await uploadToS3(path, originalname, mimetype);
//     uploadedFiles.push(url);
//   }
//   res.json(uploadedFiles);
// });
const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), async (req,res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname,mimetype} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads/', ''));
  }
  res.json(uploadedFiles);
});


// create new Places(properties) modal

app.post('/places', (req,res) => {
  const {token} = req.cookies;
  const {
    title,address,category,addedPhotos,description,price,
    perks,extraInfo,checkIn,checkOut,maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner:userData.id,price,
      title,address,category,photos:addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,
    });
    res.json(placeDoc);
  });
});


// Get places(properties) modal
app.get('/user-places', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Place.find({owner:id}));
  });
});


// Get place(properties) details by id modal
app.get('/places/:id', async (req,res) => {
  const {id} = req.params;
  res.json(await Place.findById(id));
});


// Update places(properties) modal
app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    category,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        category,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json('ok');
    }
  });
});



// Get places(properties) details modal
app.get('/places', async (req,res) => {
  res.json( await Place.find());
});


// Create new booking modal
// app.post('/bookings', async (req, res) => {
//   const userData = await getUserDataFromReq(req);
//   const {
//     place,
//     checkIn,
//     checkOut,
//     numberOfGuests,
//     name,
//     phone,
//     price,
//   } = req.body;

//   // Check if the user is trying to book their own property
//   const placeData = await Place.findById(place);
//   if (placeData.owner.toString() === userData.id) {
//     return res.status(422).json('You cannot book your own property.');
//   }

//   Booking.create({
//     place,
//     checkIn,
//     checkOut,
//     numberOfGuests,
//     name,
//     phone,
//     price,
//     user: userData.id,
//   })
//     .then((doc) => {
//       res.json(doc);
//     })
//     .catch((err) => {
//       throw err;
//     });
// });


// Create new booking modal
app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
  } = req.body;

  // console.log("Creating booking...");

  const placeData = await Place.findById(place);
  if (placeData.owner.toString() === userData.id) {
    return res.status(422).json("You cannot book your own property.");
  }

  let orderId; // Initialize orderId variable

  const options = {
    amount: price * 100,
    currency: "INR",
    receipt: "booking_receipt",
  };

  try {
    const order = await razorpay.orders.create(options);
    orderId = order.id; // Assign orderId value

    // Create the booking in the database
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
      orderId,
    });

    booking.orderId = orderId; // Assign orderId value to booking object
    await booking.save();

    // console.log("Booking created successfully:", booking);

    res.json(booking);
  } catch (error) {
    console.log("Error creating booking:", error);
    res.status(500).json("Booking creation failed");
  }
});





// Get booking details modal
app.get('/bookings', async (req,res) => {
  const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('place') );
});

// Create booking modal for guests
app.post('/guest-bookings', async (req, res) => {
  const {
    place, checkIn, checkOut, numberOfGuests, name, phone, price,
  } = req.body;
  Booking.create({
    place, checkIn, checkOut, numberOfGuests, name, phone, price,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});

// Get booking modal for hosts
app.get('/host-bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const places = await Place.find({ owner: userData.id }).select('_id maxGuests');
  const placeIds = places.map((place) => place._id);
  const bookings = await Booking.find({ place: { $in: placeIds } }).populate('place');

  // Map the bookings to include the `maxGuests` property from the corresponding place
  const mappedBookings = bookings.map((booking) => {
    const { maxGuests } = places.find((place) => place._id.toString() === booking.place._id.toString());
    return { ...booking.toObject(), maxGuests };
  });

  res.json(mappedBookings);
});


// ...

// Create an endpoint for creating a review
app.post('/reviews', async (req, res) => {
  const { token } = req.cookies;
  const { title, rating, comment, propertyId } = req.body;

  try {
    const userData = await getUserDataFromReq(req);
    
    if (!userData) {
      return res.status(401).json({ error: 'Please login to leave the Review' });
    }

    const existingReview = await Review.findOne({ user: userData.id, property: propertyId });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this place.' });
    }

    const review = await Review.create({
      title,
      rating,
      comment,
      user: userData.id,
      property: propertyId,
    });

    res.json({ message: 'Review added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create review.' });
  }
});


// Create an endpoint for retrieving reviews of a specific place
app.get('/reviews/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.find({ property: id }).populate('user');
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve reviews.' });
  }
});

// ...



app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running on port ....');
});
