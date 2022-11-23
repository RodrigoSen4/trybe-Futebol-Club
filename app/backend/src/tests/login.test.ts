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

  it('deve ser retornado um status 200 e um token caso o login seja válido', async () => {
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

  it('deve ser retornado um status de 400 caso nenhum email seja fornecido', async () => {
    const invalidUser = {
      password: "any password"
    };

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ ...invalidUser })

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.eq('All fields must be filled');
  });

});