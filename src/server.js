import app from './app';

const port = Number(process.env.PORT);

app.listen(port || 3000);
