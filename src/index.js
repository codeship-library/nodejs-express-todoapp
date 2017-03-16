import app from './server';

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Your app is running on port ${port}`); // eslint-disable-line
});
