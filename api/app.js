var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const http = require('http')
const socketIo = require('socket.io')

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
const emojiRouter = require('./routes/emojiroutes')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var testAPIRouter = require('./routes/testAPI')

const app = express()
const apiPort = 8000

//API_SOCKET_IO starts here *****

const server = http.createServer(app)
const io = socketIo(server) // < Interesting!
let interval

io.on('connection', socket => {
  socket.on('disconnect', () => {
    clearInterval(interval)
  })
  socket.on('press heart', () => {
    io.emit('press heart')
  })
})

server.listen(apiPort, () => console.log(`Listening on port ${apiPort}`))

//API_SOCKET_IO ENDS HERE ****

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(cors())
app.use(bodyParser.json())

app.use('/api', emojiRouter)

app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/testAPI', testAPIRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

module.exports = app
