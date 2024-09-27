import chai, { use, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index'; // Express 앱을 가져옵니다.

const { expect } = chai;
use(chaiHttp);

describe('API 테스트', () => {
	describe('POST /interpolate', () => {
		it('보간 결과를 반환해야 합니다.', (done) => {
			request(app)
				.post('/interpolate')
				.send({ p1: { x: 0, y: 0, value: 0 }, p2: { x: 10, y: 10, value: 10 }, t: 0.5 })
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('x', 5);
					expect(res.body).to.have.property('y', 5);
					expect(res.body).to.have.property('value', 5);
					done();
				});
		});
	});

	describe('POST /calculate-values', () => {
		it('계산된 값을 반환해야 합니다.', (done) => {
			request(app)
				.post('/calculate-values')
				.send({ points: [{ x: 0, y: 0, value: 0 }, { x: 10, y: 10, value: 10 }] })
				.end((err, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.be.greaterThan(0);
					done();
				});
		});
	});
});