const Wallet = require('./Wallet')
const coffeeMaker = require('./coffeeMaker')
const teaMaker = require('./teaMaker')
const chocolateMaker = require('./chocolateMaker')
const availableAddons = require('./availableAddons')

function CoffeeMachine() {
  this.wallet = new Wallet()
  this.credit = 0  
  this.sugar = 0
  this.addons = []
}

Object.defineProperty(CoffeeMachine.prototype, 'credit', {
  get: function() { return this.wallet.credit },
})

CoffeeMachine.prototype.insertCoin = function(coin) {
  this.wallet.insertCoin(coin)
}

CoffeeMachine.prototype.reset = function() {
  return this.wallet.reset()
}

CoffeeMachine.prototype.insertKey = function(key) {
  this.wallet.insertKey(key)
}

CoffeeMachine.prototype.releaseKey = function() {
  return this.wallet.releaseKey()
}

function preconditionMatch(addons, bev) {
  return addons.reduce(function(acc, a){
    return (acc && availableAddons[a].with.includes(bev))
  }, true)
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

  if (preconditionMatch(this.addons, type)) {
    const beverage = makers[type](this.credit)
    if (beverage.type !== 'none'){
      this.wallet.pay(makers[type].price)
      this.wallet.payAddons(this.addons)
      beverage.sugar = this.sugar
      beverage.addons = this.addons
      this.addons = []
    }
    return beverage
  } 
  return {message: 'you cannot have it'}
}

CoffeeMachine.prototype.addSugar = function(qty) {
  this.sugar += qty
  if (this.sugar > 5){
    this.sugar = 5
  }
}

CoffeeMachine.prototype.add = function(addon) {
  this.addons.push(addon)
}

const makers = {
  coffee: coffeeMaker,
  tea: teaMaker,
  chocolate: chocolateMaker
}



module.exports = CoffeeMachine
