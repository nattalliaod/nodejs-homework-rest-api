const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

db
  .then(() => {
    app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
