// import { Schema, models, model } from "mongoose";
// import { unique } from "next/dist/build/utils";

// const userSchema = new Schema({
//   name: {
//     type: String,
//     trim: true,
//   },
//   family: {
//     type: String,
//     trim: true,
//   },
//   gender: {
//     type: String,
//     trim: true,
//   },
//   father: {
//     type: String,
//     trim: true,
//   },
//   codeMeli: {
//     type: String,
//     trim: true,
//     unique: true
//   },
//   birthDay: {
//     type: String,
//   },
//   phone: {
//     type: String,
//     trim: true,
//   },
//   married: {
//     type: String,
//     trim: true,
//   },
//   childs: {
//     type: String,
//   },
//   sallary: {
//     type: String,
//   },
//   yarane: {
//     type: Boolean,
//   }
// });

// const User = models.User || model("User", userSchema);

// export default User;


// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    family: String,
    gender: String,
    father: String,

    codeMeli: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: [/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"],
    },

    phone: {
      type: String,
      required: true,
      match: [/^\d{11}$/, "شماره تلفن باید ۱۱ رقم باشد"],
    },

    birthDay: String,
    married: String,
    childs: String,
    sallary: String,
    yarane: Boolean,
  },
  { timestamps: true }
);


export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
