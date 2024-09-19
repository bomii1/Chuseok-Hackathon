// express 모듈 셋팅
const express = require('express')
const app = express();

app.listen(7777)

// 쉽게 말해 미들웨어를 만든 것 -> use 이용해 써야겠다고 말만하면 됨
const bookRouter = require('./_routes/bookRoutes') 

app.use("/books", bookRouter);