import express from 'express'
import dotenv from 'dotenv/config'
import http from 'http'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'

import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import tagRoutes from './routes/tagRoutes.js'

const app = express()
const server = http.createServer(app);

mongoose.connect(process.env.DB_URL);

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload())

app.use('/users', userRoutes);
app.use('/category', categoryRoutes);
app.use('/tags', tagRoutes)

app.use((error, req, res, next) => {
    res.status(400).json({ok: false, error: error.message});
})


server.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Server started on port ${server.address().port}`);
})