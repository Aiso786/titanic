import * as express from 'express';
import * as cors from 'cors';

require('dotenv').config();

const app = express();
app.use(cors())

const passengerRoutes = require('./routes/passengers')

app.listen(5000, () => {
    console.log('server is listening on port 5000');
})

app.use(express.json());
app.use('/api/passengers', passengerRoutes)