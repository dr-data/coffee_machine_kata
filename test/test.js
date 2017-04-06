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
    it('As a user I can set the desired level of sugar to use (1 to 5) and the machine must use it to prepare the beverage.', function(){
      cf.addSugar(1)
      cf.insertCoin(20)
      cf.insertCoin(20)
      const tea = cf.getTea()
      assert.equal(tea.type, 'tea')
      assert.equal(tea.sugar, 1)
    })    

    it('As a user I can set the desired level of sugar to use (1 to 5) and the machine must use it to prepare the beverage.', function(){
      cf.addSugar(1)
      cf.addSugar(2)
      cf.insertCoin(20)
      cf.insertCoin(20)
      const tea = cf.getTea()
      assert.equal(tea.type, 'tea')
      assert.equal(tea.sugar, 3)
    })

    it('No more than 5 of sugar', function(){
      cf.addSugar(5)
      cf.addSugar(2)
      cf.insertCoin(20)
      cf.insertCoin(20)
      const tea = cf.getTea()
      assert.equal(tea.type, 'tea')
      assert.equal(tea.sugar, 5)
    })

    it('As a user I can add super-hot beverage addon', function(){
      cf.add('super-hot')
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.insertCoin(20)
      const tea = cf.getTea()
      assert.equal(tea.addons.length, 1)
      assert.equal(tea.addons[0], 'super-hot')
      assert.equal(cf.credit, 10)
    })

    it('As a user I can add lemon to tea', function(){
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.add('lemon')
      const tea = cf.getTea()
      assert.equal(tea.addons.length, 1)
      assert.equal(tea.addons[0], 'lemon')
    })
    
    it('As a user I can add milk to tea', function(){
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.add('milk')
      const tea = cf.getTea()
      assert.equal(tea.addons.length, 1)
      assert.equal(tea.addons[0], 'milk')
      assert.equal(cf.credit, 0)
    })

    it('As a user I cannot add lemon to coffee', function(){
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.add('lemon')
      const coffee = cf.getCoffee()
      assert.equal(coffee.message, 'you cannot have it')
      assert.equal(cf.credit, 60 )
    })
  

    it('As a user I can have a decaf coffee', function(){
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.add('decaf')
      const tea = cf.getCoffee()
      assert.equal(tea.addons.length, 1)
      assert.equal(tea.addons[0], 'decaf')
      assert.equal(cf.credit, 10)
    })

    it('As a user I can add nuts to chocolate', function(){
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.insertCoin(20)
      cf.add('nuts')
      cf.add('whipped-cream')
      const tea = cf.getChocolate()
      assert.equal(tea.addons.length, 2)
      assert.equal(tea.addons[0], 'nuts')
      assert.equal(tea.addons[1], 'whipped-cream')
      assert.equal(cf.credit, 0)
    })
  })
})