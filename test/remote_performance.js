const should = require('chai').should()
const { LocalEntity, nonce, keygen, keypairgen } = require('../src');

suite('Remote Performance', () => {
  suite ('ISO_1_Pass_Unilateral_Authentication_Over_CCF', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_1_Pass_Unilateral_Authentication_Over_CCF') })

    test('baseline performance', async () => {
      for(let i = 0; i < 1000; i++) {
        const alice = new LocalEntity("Alice", false, 10);
        const bob = new LocalEntity("Bob", false, 10);
        const secret = nonce();
        this.protocol.Prover(bob, {Verifier: alice}, {Secret: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: secret})
        result.should.be.true;
      }
    })

    test('secure performance', async () => {
      for(let i = 0; i < 1000; i++) {
        const alice = new LocalEntity("Alice", true, 10);
        const bob = new LocalEntity("Bob", true, 10);
        const secret = nonce();
        this.protocol.Prover(bob, {Verifier: alice}, {Secret: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: secret})
        result.should.be.true;
      }
    })
  })

  suite ('ISO_1_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_1_Pass_Unilateral_Authentication') })

    test('baseline performance', async () => {
      for(let i = 0; i < 1000; i++) {
        const alice = new LocalEntity("Alice", false, 10);
        const bob = new LocalEntity("Bob", false, 10);
        const secret = keygen();
        this.protocol.Prover(bob, {Verifier: alice}, {SecretKey: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {SecretKey: secret})
        result.should.be.true;
      }
    })

    test('secure performance', async () => {
      for(let i = 0; i < 1000; i++) {
        const alice = new LocalEntity("Alice", true, 10);
        const bob = new LocalEntity("Bob", true, 10);
        const secret = keygen();
        this.protocol.Prover(bob, {Verifier: alice}, {SecretKey: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {SecretKey: secret})
        result.should.be.true;
      }
    })
  })

  suite ('ISO_2_Pass_Unilateral_Authentication_Over_CCF', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_2_Pass_Unilateral_Authentication_Over_CCF') })

    test('baseline performance', async () => {
      for(let i = 0; i < 100; i++) {
        const alice = new LocalEntity("Alice", false, 10);
        const bob = new LocalEntity("Bob", false, 10);
        const secret = nonce();
        this.protocol.Prover(bob, {Verifier: alice}, {Secret: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: secret})
        result.should.be.true;
      }
    })

    test('secure performance', async () => {
      for(let i = 0; i < 100; i++) {
        const alice = new LocalEntity("Alice", true, 10);
        const bob = new LocalEntity("Bob", true, 10);
        const secret = nonce();
        this.protocol.Prover(bob, {Verifier: alice}, {Secret: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {Secret: secret})
        result.should.be.true;
      }
    })
  })

  suite ('ISO_Public_Key_1_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_Public_Key_1_Pass_Unilateral_Authentication') })

    test('baseline performance', async () => {
      for(let i = 0; i < 10; i++) {
        const alice = new LocalEntity("Alice", false, 10);
        const bob = new LocalEntity("Bob", false, 10);
        const { publicKey, privateKey } = keypairgen();
        this.publicKey = publicKey;
        this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: privateKey})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: publicKey})
        result.should.be.true;
      }
    })

    test('secure performance', async () => {
      for(let i = 0; i < 10; i++) {
        const alice = new LocalEntity("Alice", true, 10);
        const bob = new LocalEntity("Bob", true, 10);
        const { publicKey, privateKey } = keypairgen();
        this.publicKey = publicKey;
        this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: privateKey})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: publicKey})
        result.should.be.true;
      }
    })
  })

  suite ('ISO_Public_Key_2_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/ISO_Public_Key_2_Pass_Unilateral_Authentication') })

    test('baseline performance', async () => {
      for(let i = 0; i < 10; i++) {
        const alice = new LocalEntity("Alice", false, 10);
        const bob = new LocalEntity("Bob", false, 10);
        const { publicKey, privateKey } = keypairgen();
        this.publicKey = publicKey;
        this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: privateKey})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: publicKey})
        result.should.be.true;
      }
    })

    test('secure performance', async () => {
      for(let i = 0; i < 10; i++) {
        const alice = new LocalEntity("Alice", true, 10);
        const bob = new LocalEntity("Bob", true, 10);
        const { publicKey, privateKey } = keypairgen();
        this.publicKey = publicKey;
        this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: privateKey})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: publicKey})
        result.should.be.true;
      }
    })
  })

  suite ('Nonce_Return_2_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/Nonce_Return_2_Pass_Unilateral_Authentication') })

    test('baseline performance', async () => {
      for(let i = 0; i < 100; i++) {
        const alice = new LocalEntity("Alice", false, 10);
        const bob = new LocalEntity("Bob", false, 10);
        const secret = keygen();
        this.protocol.Prover(bob, {Verifier: alice}, {SecretKey: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {SecretKey: secret})
        result.should.be.true;
      }
    })

    test('secure performance', async () => {
      for(let i = 0; i < 100; i++) {
        const alice = new LocalEntity("Alice", true, 10);
        const bob = new LocalEntity("Bob", true, 10);
        const secret = keygen();
        this.protocol.Prover(bob, {Verifier: alice}, {SecretKey: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {SecretKey: secret})
        result.should.be.true;
      }
    })
  })

  suite ('Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication', () => {
    suiteSetup(() => { this.protocol = require('./protocols/Nonce_Return_Public_Key_2_Pass_Unilateral_Authentication') })

    test('baseline performance', async () => {
      for(let i = 0; i < 100; i++) {
        const alice = new LocalEntity("Alice", false, 10);
        const bob = new LocalEntity("Bob", false, 10);
        const secret = keygen();
        this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: secret})
        result.should.be.true;
      }
    })

    test('secure performance', async () => {
      for(let i = 0; i < 100; i++) {
        const alice = new LocalEntity("Alice", true, 10);
        const bob = new LocalEntity("Bob", true, 10);
        const secret = keygen();
        this.protocol.Prover(bob, {Verifier: alice}, {PrivateKey: secret})
        const result = await this.protocol.Verifier(alice, {Prover: bob}, {PublicKey: secret})
        result.should.be.true;
      }
    })
  })
})
