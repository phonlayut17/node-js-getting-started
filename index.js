const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5001

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/username/:usr', (req, res) => {
    var usr_val = req.params.usr //ตัวแปรที่เก็บค่า username
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("get value /username/" + usr_val)
    res.end()
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
