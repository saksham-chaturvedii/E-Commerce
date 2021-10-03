var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { redisClient, RedisStore, session } = require("./database/redis");
var { SECRET } = require("./config");

var app = express();

// Set up Redis as the session store:
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    // secret: "asfgaa",
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 10,
    },
  })
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const passport = require("passport");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
require("./middlewares/passport")(passport);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/passport", require("./routes/passport"));
app.use("/products", require("./routes/products"));
app.use("/streams", require("./routes/stream"));
app.use("/stripe", require("./routes/payment"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
