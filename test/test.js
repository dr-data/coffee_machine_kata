const assert = require('chai').assert
const CoffeeMachine = require('../app')
let cf = null

describe('Coffee Machine', function(){
  beforeEach(function(){
    cf = new CoffeeMachine();
  })

  it('When the coffee machine starts it is ready to operate and the credit is zero.', function(){

    assert.isNotNull(cf)
    assert.equal(cf.credit, 0)
  })

  describe('As a user I can insert coins', function(){

    it('5cents the displayed credit should grow accordingly.', function(){
      cf.insertCoin(5)
      assert.equal(cf.credit, 5)
    })

    it('10cents the displayed credit should grow accordingly.', function(){
      cf.insertCoin(10)
      assert.equal(cf.credit, 10)
    })

    it('5cents + 10cents the displayed credit should grow accordingly.', function(){
      cf.insertCoin(5)
      cf.insertCoin(10)
      assert.equal(cf.credit, 15)
    })

    it('10cents + 10cents + 20cents the displayed credit should grow accordingly.', function(){
      cf.insertCoin(10)
      cf.insertCoin(10)
      cf.insertCoin(20)
      assert.equal(cf.credit, 40)
    })

    it('Invalid coins credit should not grow', function(){
      cf.insertCoin(10)
      cf.insertCoin(50)
      assert.equal(cf.credit, 10)
    })
  })

  it('As a user I can cancel the operation and have the money back.', function() {
    cf.insertCoin(10)
    const rest = cf.reset()
    assert.equal(rest, 10)
    assert.equal(cf.credit, 0)
  })

  describe('Using key', function(){
    it ('As a user I can insert a prepaid key with some credit.', function(){
      const key = {credit: 10}
      cf.insertKey(key)
      assert.equal(cf.credit, 10)
    })

    it ('As a user I can insert a prepaid key with some credit that should be added to current credit', function(){
      const key = {credit: 10}
      cf.insertCoin(20)
      cf.insertKey(key)
      assert.equal(cf.credit, 30)
    })

    it('As a user I can extract the key', function(){
      const key = {credit: 10}
      cf.insertKey(key)
      const released = cf.releaseKey()
      assert.equal(key, released)
      assert.equal(released.credit, 10)
    })

    it ('As a user I can insert a prepaid key and I can recharge it with coins', function(){
      const key = {credit: 0}
      cf.insertCoin(20)
      cf.insertKey(key)
      const released = cf.releaseKey()
      assert.equal(released.credit, 20)
    })
  })
  describe('Making beverages', function(){
    it('with 30cent the user can get a coffee', function(){
      cf.insertCoin(10)
      cf.insertCoin(20)
      const coffee = cf.getCoffee()
      assert.equal(coffee.type, 'coffee')
      assert.equal(cf.credit, 0)
    })

    it('with less thant 30cent the user cannot get a coffee', function(){
      cf.insertCoin(10)
      const beverage = cf.getCoffee()
      assert.equal(beverage.type, 'none')
    })

    it('with 40cent the user can get a coffee and rest(10cent)', function(){
      cf.insertCoin(20)
      cf.insertCoin(20)
      const coffee = cf.getCoffee()
      assert.equal(coffee.type, 'coffee')
      assert.equal(cf.credit, 10)
    })

    it('with 40cent the user can get a tea', function(){
      cf.insertCoin(20)
      cf.insertCoin(20)
      const tea = cf.getTea()
      assert.equal(tea.type, 'tea')
      assert.equal(cf.credit, 0)
    })

    it('with 60cent the user can get a chocolate', function(){
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.insertCoin(20)
      const choco = cf.getChocolate()
      assert.equal(choco.type, 'chocolate')
      assert.equal(cf.credit, 0)
    })

    it('with 50cent the user can get a tea', function(){
      cf.insertCoin(20)
      cf.insertCoin(10)
      cf.insertCoin(20)
      const tea = cf.getTea()
      assert.equal(tea.type, 'tea')
      assert.equal(cf.credit, 10)
    })

    it('As a user if I buy the beverage with the key the costs are lower than the actual prices of 0.5cents.', function(){
      cf.insertKey({ credit: 50 })
      const tea = cf.getTea()
      assert.equal(tea.type, 'tea')
      assert.equal(cf.credit, 15)
    })
  })

  describe('Add-ons', function(){
    

  })
})