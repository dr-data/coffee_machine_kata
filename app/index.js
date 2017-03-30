// TODO: how about a wallet object to manage coins, key, credit, etc...
const Wallet = require('./Wallet')
const coffeeMaker = require('./coffeeMaker')
const teaMaker = require('./teaMaker')

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
  const coffee = coffeeMaker(this.credit)
  if (coffee.type !== 'none'){
    this.wallet.pay(coffeeMaker.price)
  }
  return coffee
}

CoffeeMachine.prototype.getTea = function(){
  const tea = teaMaker(this.credit)
  if (tea.type !== 'none'){
    this.wallet.pay(teaMaker.price)
  }
  return tea
}

function makeBeverage(type){
  makers[type]()
}

const makers = {
  coffee: coffeeMaker,
  tea: teaMaker
}



module.exports = CoffeeMachine
