module.exports = function (req, res, next) {
  if (req.decoded.role == 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'You are not authorized!' })
  }
}