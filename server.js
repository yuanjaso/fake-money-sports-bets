const express = require('express');

// environment variables
const PORT = process.env.PORT;

const app = express();
app.use(express.static(`${__dirname}/dist/fake-money-sports-bets/`));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
