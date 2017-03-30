function chocolateMaker(credit){
  if (credit >= chocolateMaker.price){
    return { type: 'chocolate'}
  }
  return { type: 'none' }
}

chocolateMaker.price = 60

module.exports = chocolateMaker