const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(morgan('dev'));

const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:5001';
const eventsServiceUrl = process.env.EVENTS_SERVICE_URL || 'http://localhost:5002';
const ticketsServiceUrl = process.env.TICKETS_SERVICE_URL || 'http://localhost:5003';

app.use('/users', proxy(userServiceUrl));
app.use('/events', proxy(eventsServiceUrl));
app.use('/tickets', proxy(ticketsServiceUrl));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API Gateway is running' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
