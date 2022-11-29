import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/UserModel';
import userMocks from './mocks/user.mocks';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da rota de login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(userMocks.userMock as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Deve retornar um status 200 e um token se o login for feito corretamente', async () => {
    const validUser = {
      email: "mock user",
      password: "secret_admin"
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...validUser })

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.haveOwnProperty('token');
  });

  it('Deve retornar um status 400 se nenhum email for passado', async () => {
    const invalidUser = {
      password: "12345"
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...invalidUser })

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

  it('Deve retornar um status 401 caso nenhum usuario seja encontrado no banco de dados', async () => {
    (UserModel.findOne as sinon.SinonStub).restore();
    sinon
      .stub(UserModel, "findOne")
      .resolves(null);

    const validUser = {
      email: "useruser",
      password: "12345"
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...validUser })

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.eq('Incorrect email or password');
  });

  it('Deve retornar um status 401 caso um token não enviado', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/login/validate')

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.eq('token not provided');
  });

});