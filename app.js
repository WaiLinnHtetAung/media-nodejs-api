import express from 'express'
import dotenv from 'dotenv/config'
import http from 'http'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

const app = express()
const server = http.createServer(app);

mongoose.connect(process.env.DB_URL);

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload())
app.use((error, req, res, next) => {
    error.stauts = error.status || 400;
    res.status(error.status).json({ok: false, error: error.message});
})

server.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Server started on port ${server.address().port}`);
})