const request = require('supertest');
let expect;
import('chai').then(chai => {
  expect = chai.expect;
});
const sinon = require('sinon');
const app = require('../app');
const Parser = require('rss-parser');
const db = require('../config/database');

describe('GET /rss/fetch-rss', function() {
  let parserStub, dbStub;

  beforeEach(() => {
    // RSS Parser와 데이터베이스 함수를 스텁으로 대체
    parserStub = sinon.stub(Parser.prototype, 'parseURL');
    dbStub = sinon.stub(db, 'query');
  });

  afterEach(() => {
    // 스텁 제거
    sinon.restore();
  });

  it('should fetch and store RSS feeds successfully', function(done) {
    // 테스트를 위한 가짜 데이터 설정
    parserStub.resolves({
      items: [
        { title: 'Test Article', link: 'http://example.com', contentSnippet: 'Summary', isoDate: '2020-01-01T00:00:00Z' }
      ]
    });
    dbStub.resolves([[], { affectedRows: 1 }]); // INSERT 쿼리의 결과를 모방

    request(app)
      .get('/rss/fetch-rss')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.equal('RSS Feeds fetched and stored successfully.');
        sinon.assert.calledOnce(parserStub);
        sinon.assert.calledWithExactly(dbStub, sinon.match.string, sinon.match.array);
        done();
      });
  });

  it('should handle errors when fetching RSS feeds', function(done) {
    parserStub.rejects(new Error('Failed to fetch RSS'));
    
    request(app)
      .get('/rss/fetch-rss')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.text).to.equal('Error fetching or storing RSS feeds.');
        done();
      });
  });
});
