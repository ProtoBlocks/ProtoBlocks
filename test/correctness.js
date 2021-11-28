const should = require('chai').should()
const { LocalEntity, nonce, keygen, keypairgen } = require('../src');

suite('Correctness', () => {
  suite ('ISO_1_Pass_Unilateral_Authentication_Over_CCF', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_1_Pass_Unilateral_Authentication_Over_CCF') })

    test('valid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");
      const secret = nonce();
      this.protocol.Prover(bob, {Verifier: alice}, {Secret: secret})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: secret})
      result.should.be.true;
    })

    test('invalid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");

      this.protocol.Prover(bob, {Verifier: alice}, {Secret: nonce()})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: nonce()})

      result.should.be.false;
    })
  })

  suite ('ISO_1_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_1_Pass_Unilateral_Authentication') })

    test('valid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");
      const secret = keygen();
      this.protocol.Prover(bob, {Verifier: alice}, {SecretKey: secret})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {SecretKey: secret})
      result.should.be.true;
    })

    test('invalid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");

      this.protocol.Prover(bob, {Verifier: alice}, {SecretKey: keygen()})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {SecretKey: keygen()})

      result.should.be.false;
    })
  })

  suite ('ISO_2_Pass_Unilateral_Authentication_Over_CCF', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_2_Pass_Unilateral_Authentication_Over_CCF') })

    test('valid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");
      const secret = nonce();
      this.protocol.Prover(bob, {Verifier: alice}, {Secret: secret})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: secret})
      result.should.be.true;
    })

    test('invalid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");

      this.protocol.Prover(bob, {Verifier: alice}, {Secret: nonce()})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: nonce()})

      result.should.be.false;
    })
  })

  suite ('ISO_Public_Key_1_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_Public_Key_1_Pass_Unilateral_Authentication') })

    test('valid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");
      const { publicKey, privateKey } = keypairgen();
      this.publicKey = publicKey;
      this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: privateKey})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: publicKey})
      result.should.be.true;
    })

    test('invalid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");

      const { publicKey, privateKey } = keypairgen();
      this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: privateKey})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: this.publicKey})

      result.should.be.false;
    })
  })

  suite ('ISO_Public_Key_2_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_Public_Key_2_Pass_Unilateral_Authentication') })

    test('valid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");
      const { publicKey, privateKey } = keypairgen();
      this.publicKey = publicKey;
      this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: privateKey})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: publicKey})
      result.should.be.true;
    })

    test('invalid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");

      const { publicKey, privateKey } = keypairgen();
      this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: privateKey})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: this.publicKey})

      result.should.be.false;
    })
  })

  suite ('Nonce_Return_2_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/Nonce_Return_2_Pass_Unilateral_Authentication') })

    test('valid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");
      const secret = keygen();
      this.protocol.Prover(bob, {Verifier: alice}, {SecretKey: secret})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {SecretKey: secret})
      result.should.be.true;
    })

    test('invalid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");

      this.protocol.Prover(bob, {Verifier: alice}, {SecretKey: keygen()})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {SecretKey: keygen()})

      result.should.be.false;
    })
  })

  suite ('Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication') })

    test('valid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");
      const secret = keygen();
      this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: secret})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: secret})
      result.should.be.true;
    })

    test('invalid', async () => {
      const alice = new LocalEntity("Alice");
      const bob = new LocalEntity("Bob");

      this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: keygen()})
      const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: keygen()})

      result.should.be.false;
    })
  })
})
