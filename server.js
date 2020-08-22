const dotenv = require("dotenv");
const chalk = require("chalk");
const app = require("./server/app");
dotenv.config({ path: "./server/config/config.env" });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    chalk.bgGreenBright.black(`server is listening http://localhost:${PORT}`)
  );
});
