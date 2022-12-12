const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const cors = require('cors');
const { urlencoded } = require('express');
// const initDatabase = require('./startUp/initDatabase');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use('/api', routes);

const PORT = config.get('port') ?? 8080;

// if (process.env.NODE_ENV === "production") {
//     console.log("Production");
// }
// if (process.env.NODE_ENV === "development") {
//     console.log("development");
// }

async function start() {
   try {
      /*      mongoose.connection.once('open', () => {
         initDatabase();
      });*/
      await mongoose.connect(config.get('mongoUri'));
      console.log(chalk.blue('MongoDB connected'));
      app.listen(PORT, () => {
         console.log(chalk.green(`Server has been started on port ${PORT}...`));
      });
   } catch (e) {
      console.log(chalk.red(e.message));
      process.exit(1);
   }
}

start();
