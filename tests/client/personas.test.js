'use strict';

require('dotenv').config();

const PSID = process.env.TEST_PSID,
      Client = require('./util/client-generator');

/* PERSONAS API TESTS */ 
describe('Personas API', () => {

  let recipient = {'id': PSID}, persona_id;

  test('Create persona', done => {
    Client.createPersona(
      'John',
      'https://github.com/amuramoto/messenger-node/raw/master/tests/client/assets/dog.jpg'
    ).then(res => {
      expect(res).toHaveProperty('id');
      persona_id = res.id;
      done();
    });
  });

  test('Get persona', done => {
    Client.getPersona(persona_id).then(res => {
      expect(res).toHaveProperty('name');
      expect(res).toHaveProperty('profile_picture_url');
      expect(res).toHaveProperty('id');
      done();
    });
  });

  test('Get all personas', done => {
    Client.getAllPersonas().then(res => {
      expect(res).toHaveProperty('data');
      expect(res).toHaveProperty('paging');
      done();
    });
  });

  // Sender action, quick replies, template
  test('Send text message with persona', done => {
    Client.sendText(recipient, 'test', persona_id).then(res => {
      expect(res).toHaveProperty('recipient_id');
      expect(res).toHaveProperty('message_id');
      done();
    });
  });

  test('Send attachment with persona', done => {
    jest.setTimeout(15000);
    Client.sendAttachment({
      'type':'image',
      'source':'https://github.com/amuramoto/messenger-node/raw/master/tests/client/assets/dog.jpg',
      'is_reusable': true,
    }, recipient, persona_id).then(res => {
      expect(res).toHaveProperty('recipient_id');
      expect(res).toHaveProperty('message_id');
      expect(res).toHaveProperty('attachment_id');
      done();
    });
  });

  test('Delete persona', done => {
    Client.deletePersona(persona_id).then(res => {
      expect(res).toHaveProperty('success');
      expect(res.success).toEqual(true);
      done();
    });
  });
});
