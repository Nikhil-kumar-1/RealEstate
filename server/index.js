require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { userRoute } = require("./routes/userRoute");
const { residencyRoute } = require("./routes/residencyRoute");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);
