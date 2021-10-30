module.exports = (error, req, res, next) => {
  console.error(error)
  console.log(error.name)
  // if (error.name === 'CastError') {
  //   res.status(404).send({ error: 'id used is malformed' })
  // } else {
  //   res.status(500).end()
  // }
  res.status(500).send({ error: 'something is going wrong ' })
    .json({ mensaje: `${error}` })
}
