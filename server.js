const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
const authRouter = require('./routes/auth');
const employeeRouter = require('./routes/employee'); 
const requestRouter = require('./routes/request');

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/employee', employeeRouter);
app.use("/api/request", requestRouter);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
