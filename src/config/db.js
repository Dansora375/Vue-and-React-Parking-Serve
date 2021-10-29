const DATA_BASE = 'vue-base'
const USER = 'vue-user'
const PASSWORD = '1234567890_Mintic'
const TsT = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}

module.exports = {
  DATA_BASE,
  USER,
  PASSWORD,
  TsT
}
