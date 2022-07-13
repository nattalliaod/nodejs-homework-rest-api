const { mkdir } = require('fs/promises');
const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;

db
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server running at port: ${PORT}`);
      await mkdir(process.env.UPLOAD_FOLDER, { recursive: true });
    });
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
