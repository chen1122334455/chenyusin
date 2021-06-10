const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
var port = 3000;

// express app
const app = express();
// app.listen(port, () => {
//     console.log(`listening on port ${port}`);
// });

const dbURI = "mongodb+srv://user1:chen0409@cluster0.sv3o3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => app.listen(port)).catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware self-defined logger
// app.use((req, res, next) => {
//     console.log('New http request: ');
//     // console.log('host: ', req.hostname, req);
//     console.log('path:', req.path);
//     console.log('method: ', req.method);
//     next();
// });

// static folder
app.use(express.static('public'));

// middleware of morgan logger
app.use(morgan('short'));

//app.get('/', (req, res) => {
//    const blogs = [
//        { title: '南臺科技大學田徑校隊參加110年全國大專校院田徑公開賽 勇獲2金、3銀、5銅《2021/3/31》料', content: '南臺科技大學田徑校隊日前參加由中華民國田徑協會舉辦之「110年全國大專校院田徑公開賽」，控晶一甲姚博薰在一般男子組「400公尺跨欄」榮獲金牌；碩研電機二甲王柏文、碩專企管二甲李中銘、自控三甲陳世得、控晶一甲姚博薰四位同學也在「4*400公尺接力」榮獲金牌，該兩項比賽更是破大會紀錄，刷出新紀錄，此外，南臺科大在此次比賽中共榮獲2金、3銀、5銅、2個第4名、2個第5名、1個第6名、2個第7名及1個第8名等優異成績。' },
//        { title: '南臺科技大學機械系榮獲第十七屆上銀機械碩士論文獎 科技大學特別獎及佳作獎《2021/3/30》', content: '「上銀機械碩士論文獎」素有碩士論文界諾貝爾獎的美譽，是每年各大專院校優秀論文競相爭取的最高榮譽，今年邁入第17個年頭，於03月27日上銀機械臺中總部舉行盛大的頒獎典禮，全國產學精英齊聚一堂，場面隆重熱鬧。南臺科技大學機械工程系瞿嘉駿副教授所指導的侯信恩同學，及劉雲輝教授指導的蕭伯御同學，分別榮獲「第十七屆銀機械碩士論文獎」科技大學特別獎與佳作獎，他們在得獎率不到兩成的激烈競賽脫穎而出，實屬不易。' },
//        { title: '南臺科大流行音樂產業系將在3月31日於校內三連堂前 盛大舉辦畢業展演巡迴演唱會《2021/3/30》', content: '南臺科技大學流行音樂產業系將迎來第三屆畢業班的畢業製作展演，展演將於北中南舉辦共四場巡迴演唱會，首場演出將於3月31日下午五點於校內三連堂前大草皮發表，該屆110級畢業班之畢業巡演名為《普通健康人類神奇行為の音樂研究發表會》，同學們發揮創意透過外星人與人類之題材，結合創作歌曲、平面與多媒體設計及舞台燈光效果作為展出核心。' }
//   ];
//    res.render('index', { title: '首頁', blogs });
//});

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