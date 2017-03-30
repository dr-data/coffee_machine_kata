// TODO: how about a wallet object to manage coins, key, credit, etc...
const Wallet = require('./Wallet')
const coffeeMaker = require('./coffeeMaker')
const teaMaker = require('./teaMaker')
const chocolateMaker = require('./chocolateMaker')

function CoffeeMachine(){
  this.wallet = new Wallet()
  this.credit = 0  
}

Object.defineProperty(CoffeeMachine.prototype, 'credit', {
  get: function() { return this.wallet.credit },
})

CoffeeMachine.prototype.insertCoin = function(coin){
  this.wallet.insertCoin(coin)
}

CoffeeMachine.prototype.reset = function(){
  return this.wallet.reset()
}

CoffeeMachine.prototype.insertKey = function(key) {
  this.wallet.insertKey(key)
}

CoffeeMachine.prototype.releaseKey = function(){
  return this.wallet.releaseKey()
}

CoffeeMachine.prototype.getCoffee = function(){
  return this.makeBeverage('coffee')
}

CoffeeMachine.prototype.getTea = function(){
  return this.makeBeverage('tea')
}

CoffeeMachine.prototype.getChocolate = function(){
  return this.makeBeverage('chocolate')
}

CoffeeMachine.prototype.makeBeverage = function(type) {
  const beverage = makers[type](this.credit)
  if (beverage.type !== 'none'){
    this.wallet.pay(makers[type].price)
  }
  return beverage
}

const makers = {
  coffee: coffeeMaker,
  tea: teaMaker,
  chocolate: chocolateMaker
}



module.exports = CoffeeMachine
