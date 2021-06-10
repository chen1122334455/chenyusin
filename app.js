const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
var port = process.env.PORT || 3000;
app.listen(port);

// express app
const app = express();
// app.listen(port, () => {
//     console.log(`listening on port ${port}`);
// });

const dbURI = "mongodb+srv://user1:chen0409@cluster0.sv3o3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => app.listen(port)).catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');



// static folder
app.use(express.static('public'));

// middleware of morgan logger
app.use(morgan('short'));



// mongoose & mongodb test
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: '南臺科技大學田徑校隊參加110年全國大專校院田徑公開賽 勇獲2金、3銀、5銅《2021/3/31》',
        content: '南臺科技大學田徑校隊日前參加由中華民國田徑協會舉辦之「110年全國大專校院田徑公開賽」，控晶一甲姚博薰在一般男子組「400公尺跨欄」榮獲金牌；碩研電機二甲王柏文、碩專企管二甲李中銘、自控三甲陳世得、控晶一甲姚博薰四位同學也在「4*400公尺接力」榮獲金牌，該兩項比賽更是破大會紀錄，刷出新紀錄，此外，南臺科大在此次比賽中共榮獲2金、3銀、5銅、2個第4名、2個第5名、1個第6名、2個第7名及1個第8名等優異成績。'

    });



    blog.save().then(result => {
        res.send(result);
    }).catch(err => {
        console.log(err);
    });
});


app.get('/', (req, res) => {
    res.redirect('blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: '首頁' });
});

// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().then(result => {
        res.render('index', { blogs: result, title: "About me" });
    }).catch(err => {
        console.log(err);
    });
});

app.get('/education', (req, res) => {
    res.render('education', { title: 'education' });
});

app.get('/skills', (req, res) => {
    res.render('skills', { title: 'skills' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '找不到網頁' });
});

