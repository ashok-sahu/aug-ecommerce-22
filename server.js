const mongoose = require("mongoose");
const dotenv = require("dotenv");
const chalk = require("chalk");
const app = require("./server/app");
dotenv.config({ path: "./server/config/config.env" });

//configurations
const PORT = process.env.PORT || 4000;
const DATABASE = process.env.MONGO_URL;

//database connection
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(
      chalk.bold.cyanBright(`database connected successfully`)
    );
  })
  .catch((error) => {
    console.log(chalk.red.bold(`error while connect to database`));
  });

//server connection
app.listen(PORT, () => {
  console.log(
    chalk.blue.bold(
      `server is listening http://localhost:${PORT}`
    )
  );
});
