function createMaker(type, price) {
  const maker = function(credit) {
    if (credit >= maker.price){
      return { type: type}
    }
    return { type: 'none' }
  }
  maker.price = price
  return maker
}

module.exports = createMaker