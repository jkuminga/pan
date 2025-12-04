import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import routes from './src/routes/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


app.use('/', routes);

app.listen(3000, ()=>{
    console.log('connected to port 3000');
})
