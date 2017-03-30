function teaMaker(credit){
  if (credit >= teaMaker.price){
    return { type: 'tea'}
  }
  return { type: 'none' }
}

teaMaker.price = 40

module.exports = teaMaker