function coffeeMaker(credit){
  if (credit >= coffeeMaker.price){
    return { type: 'coffee'}
  }
  return { type: 'none' }
}

coffeeMaker.price = 30

module.exports = coffeeMaker