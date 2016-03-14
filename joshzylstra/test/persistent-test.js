var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var expect = chai.expect;
var request = chai.request;
require(__dirname + '/../server');

describe('Test HTTP with persistence',() => {

it('Should show a string result from a GET request', (done) => {
    request('localhost:3000')
      .get('/information')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.be.a('string');
        done();

      })
  })

  it('Should Create a New JSON file', (done) => {
    request('localhost:3000')
      .post('/information')
      .send({'information': 'data'})
      .end((err, res) => {
        expect(err).to.eql(null)
        expect(res.body).to.eql({'information':'data'});
        done();
      })
  })

  it('Checking for Errors', (done) => {
    request('localhost:3000')
      .get('/randomURL')
      .end((err, res) => {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('404 Not Found');
        done();
      })
  })
})
