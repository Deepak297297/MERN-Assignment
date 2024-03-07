let rem = 5;
setInterval(()=>{
  rem = 5;
}, 1000)
function rateLimitter(req, res, next) {
  rem--;
  if (rem < 0) {
    return res.status(429).send("Too many requests");
  }
  next();
}

export default rateLimitter;
