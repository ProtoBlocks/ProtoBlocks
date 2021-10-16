const { Protocol } = require('../src/index.js')
const should = require('chai').should()

suite('Protocol', () => {
  suiteSetup(() => {
    this.protocol = new Protocol()
  })

  test('hello', () => {
    this.protocol.hello().should.equal('Hello World')
  })
})
