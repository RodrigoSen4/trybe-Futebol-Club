import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamsModel from '../database/models/TeamsModel';
import teamsMock from './mocks/teams.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes da rota de login', () => {
  let chaiHttpResponse: Response;

  it('Deve retornar um status 200 e todos os teams', async () => {
    sinon
    .stub(TeamsModel, "findAll")
    .resolves(teamsMock.teams as TeamsModel[]);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock.teams);
    (TeamsModel.findAll as sinon.SinonStub).restore();

  });

  it('Deve retornar um status 200 e time com o id passado', async () => {
    const id = 6;

    sinon
    .stub(TeamsModel, "findByPk")
    .resolves(teamsMock.idteam as TeamsModel);
    
    chaiHttpResponse = await chai
      .request(app)
      .get(`/teams/${id}`);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock.idteam);

    (TeamsModel.findAll as sinon.SinonStub).restore();
  });

});