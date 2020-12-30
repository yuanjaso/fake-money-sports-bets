const express = require('express');

// environment variables
const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
