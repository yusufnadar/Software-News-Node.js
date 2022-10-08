const express = require('express');
const app = express();
const newsApi = require('./routes/news');

// json formatında gelen istekler için kullanılır yoksa req.body null olur
app.use(express.json());

// encoded isteklerinde kullanılır yoksa req.body null olur
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
    console.log('Başarıyla dinleniyor ' + 8080);
});
app.use('/api/news', newsApi);









