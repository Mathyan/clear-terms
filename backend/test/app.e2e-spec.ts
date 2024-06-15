import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('should add, get and delete a user', async () => {
    // Add a user
    const createUserResponse = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'test', email: 'test@test.com', password: 'test' })
      .expect(201);

    const userId = createUserResponse.body.id;

    // Get the user
    await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: userId,
          name: 'test',
          email: 'test@test.com',
        });
      });

    // Delete the user
    await request(app.getHttpServer()).delete(`/users/${userId}`).expect(200);

    // Verify the user is deleted
    await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
  });
});
