module.exports = (req, res, next) => {
  res.status(404).send({ message: 'Error' }).end()
  // Se puede complejizar cuanto se quiera hasta enviar un
  // tracking a un servicio
}
