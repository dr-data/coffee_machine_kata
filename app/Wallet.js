function Wallet(credit){
  this.credit = 0
}

Wallet.prototype.insertCoin = function(coin){
  if (acceptedCoins.indexOf(coin) >= 0){
    this.credit = this.credit + coin    
  }
}

Wallet.prototype.reset = function(){
  const credit = this.credit
  this.credit = 0
  return credit
}

Wallet.prototype.insertKey = function(key){
  this.key = key
  this.credit = this.credit + this.key.credit
}
Wallet.prototype.releaseKey = function(){
  const key = this.key
  this.key = null
  key.credit = this.reset()
  return key
}
Wallet.prototype.pay = function(price){
  this.credit = this.credit - price
}

const acceptedCoins = [5, 10, 20]

module.exports = Wallet