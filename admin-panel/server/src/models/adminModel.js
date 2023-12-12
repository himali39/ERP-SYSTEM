const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
    accessToken: String,
    refreshToken: String,
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  // var salt = bcrypt.genSaltSync(10);
  const admin=this;
  if(admin.isModified("password")) {
  this.password = await bcrypt.hash(this.password, 10);
  }
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
