import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import NewsModel from "./Models/NewsModel.js";
import DonationModel from "./Models/DonationModel.js";
import * as ENV from "./config.js";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ENV.CLIENT_URL, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
};

app.use(cors(corsOptions));
//Database connection
const connectString = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=${ENV.DB_APP_NAME}`;

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API
// USER
app.post("/registerUser", async (req, res) => {
  try {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPasswrod = await bcrypt.hash(password, 10);

    const user = new UserModel({
      userName: userName,
      email: email,
      password: hashedPasswrod,
    });

    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(500).json({ error: "User not found." });
    }
    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out Seccessfully" });
});

app.put("/updateProfile/:email/", async (req, res) => {
  const email = req.params.email;
  const userName = req.body.userName;
  const password = req.body.password;
  const profilePic = req.body.profilePic;
  try {
    const userToUpdate = await UserModel.findOne({ email: email });

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }
    userToUpdate.userName = userName;

    if (password !== userToUpdate.password) {
      const hashedPasswrod = await bcrypt.hash(password, 10);
      userToUpdate.password = hashedPasswrod;
    } else {
      userToUpdate.password = password;
    }

    userToUpdate.profilePic = profilePic;

    userToUpdate.save();
    res.send({ user: userToUpdate, msg: "Updated. " });
  } catch (err) {
    res.status(500).json({ error: err });
    return;
  }
});
// News
app.post("/addNews", async (req, res) => {
  try {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const details = req.body.details;
    const category = req.body.category;
    const type = req.body.type;

    const news = new NewsModel({
      title: title,
      imageURL: imageURL,
      details: details,
      category: category,
      type: type,
    });

    await news.save();
    res.send({ news: news, msg: "Add." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/viewNews", async (req, res) => {
  try {
    const news = await NewsModel.find({}).sort({ createdAt: 1 });

    const countNews = await NewsModel.countDocuments({});

    res.send({ news: news, count: countNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

//Update News
app.put("/updateNews/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const details = req.body.details;
    const category = req.body.category;
    const type = req.body.type;

    const newsToUpdate = await NewsModel.findOne({ _id: id });

    if (!newsToUpdate) {
      return res.status(404).json({ error: "News not found" });
    }
    newsToUpdate.title = title;
    newsToUpdate.imageURL = imageURL;
    newsToUpdate.details = details;
    newsToUpdate.category = category;
    newsToUpdate.type = type;

    await newsToUpdate.save();
    res.send({ news: newsToUpdate, msg: "News Updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
// Delete News
app.delete("/deleteNews/:id/", async (req, res) => {
  const id = req.params.id;
  try {
    const news = await NewsModel.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }
    res.status(200).json({ msg: "News deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the News" });
  }
});

//Like News
app.put("/likeNews/:newsId/", async (req, res) => {
  const newsId = req.params.newsId;
  const userId = req.body.userId;
  try {
    const newsToUpdate = await NewsModel.findOne({ _id: newsId });

    if (!newsToUpdate) {
      return res.status(404).json({ msg: "News not found." });
    }

    const userIndex = newsToUpdate.likes.users.indexOf(userId);

    if (userIndex !== -1) {
      const updatedNews = await NewsModel.findOneAndUpdate(
        { _id: newsId },
        {
          $inc: { "likes.count": -1 },
          $pull: { "likes.users": userId },
        },
        { new: true }
      );
      res.json({ news: updatedNews, msg: "News unliked" });
    } else {
      const updatedNews = await NewsModel.findOneAndUpdate(
        { _id: newsId },
        {
          $inc: { "likes.count": 1 },
          $addToSet: { "likes.users": userId },
        },
        { new: true }
      );
      res.json({ news: updatedNews, msg: "News liked." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

//Donations
//add donate
app.post("/addDonate", async (req, res) => {
  const { userId, newsId, amount, paymentMethod } = req.body;
  try {
    const news = await NewsModel.findById(newsId);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    console.log(news);

    let donation = await DonationModel.findOne({ userId });
    if (!donation) {
      donation = new DonationModel({ userId, items: [] });
    }

    donation.items.push({
      newsId: news._id,
      title: news.title,
      amount: amount,
      paymentMethod: paymentMethod,
    });

    donation.totalDonation = donation.items.length;

    await donation.save();
    res.status(200).json({ donation, message: "Donation Added" });
  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//get donations
app.get("/getdonation/:userId", async (req, res) => {
  const { userId } = req.params; // Get userId from route parameters

  try {
    const donation = await DonationModel.findOne({ userId: userId });

    res.send({ donation: donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});
// End API
const port = ENV.PORT || 3001;
app.listen(port, () => {
  console.log(`You are connected: ${port}`);
});
