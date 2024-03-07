function rateLimitter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const times = req.rateLimitter[ip] || [];
  times.push(now);
  req.rateLimitter[ip] = times.filter((time) => now - time < 60000);
  if (times.length > 5) {
    return res.status(429).send("Too many requests");
  }
  next();
}

export default rateLimitter;
