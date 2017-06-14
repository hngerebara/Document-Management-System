// This will be our application entry. We'll setup our server here.
import app from './server/config/app';

const port = parseInt(process.env.PORT, 10) || 8090;
app.set('port', port);

app.listen(port, () => {
  console.log('server is connected');
});

