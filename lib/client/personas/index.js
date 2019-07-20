function Personas (GraphRequest) {
  this.createPersona = createPersona.bind(GraphRequest);
  this.getPersona = getPersona.bind(GraphRequest);
  this.getAllPersonas = getAllPersonas.bind(GraphRequest);
  this.deletePersona = deletePersona.bind(GraphRequest);
}

/**
 * Creates a new [persona](https://developers.facebook.com/docs/messenger-platform/send-messages/personas).
 * @param {Integer} name The display name of the persona.
 * @param {Integer} profile_picture_url The URL of the user icon associated with the persona.
 * @return {Promise} The API response
 * @memberof Client#
 * @example
 * let name = 'John Mathew',
 *     profile_picture_url = 'https://facebook.com/john_image.jpg';
 * Client.createPersona(name, profile_picture_url)
 *   .then(res => {
 *     console.log(res); // { "id": "<PERSONA_ID>" }
 *   });
 */
function createPersona(name, profile_picture_url) {
  if (!name) {
    return Promise.reject('A name is required to create a new persona');
  }

  if (!profile_picture_url) {
    return Promise.reject('A profile picture is required to create a new persona');
  }

  let payload = {
    'name': name,
    'profile_picture_url': profile_picture_url,
  };

  let request_options = {
    'method': 'POST',
    'path': '/me/personas',
    'payload': payload,
  };

  return this.sendGraphRequest(request_options);
}

/**
 * Retrieves the ID, name, and profile picture of a persona.
 * @param {Integer} persona_id The ID of a persona. Created with {@link #createPersona|createPersona()}.
 * @return {Promise<Object>} The API response
 * @memberof Client#
 * @example
 * let persona_id = 123456789;
 * Client.getPersona(persona_id)
 *  .then(res => {
 *    console.log(res);
 *      // {
 *      //   "name": "John Mathew",
 *      //   "profile_picture_url": "https://facebook.com/john_image.jpg",
 *      //   "id": "123456789"
 *      // }
 *   });
 */
function getPersona(persona_id) {
  let options = {
    'method': 'GET',
    'path': '/' + persona_id,
  };

  return this.sendGraphRequest(options);
}

/**
 * Retrieves the list of all [personas](https://developers.facebook.com/docs/messenger-platform/send-messages/personas).
 * @return {Promise} The API response
 * @memberof Client#
 * @example
 * Client.getAllPersonas()
 *  .then(res => {
 *    console.log(res);
 *    // {
 *    //   "data": [
 *    //     {
 *    //       "name": "John Mathew",
 *    //       "profile_picture_url": "https://facebook.com/john_image.jpg",
 *    //       "id": "<PERSONA_ID>"
 *    //     },
 *    //     {
 *    //       "name": "David Mark",
 *    //       "profile_picture_url": "https://facebook.com/david_image.jpg",
 *    //       "id": "<PERSONA_ID>"
 *    //     },
 *    //   ],
 *    //   "paging": {
 *    //     "cursors": {
 *    //       "before": "QVFIUlMtR2ZATQlRtVUZALUlloV1",
 *    //       "after": "QVFIUkpnMGx0aTNvUjJNVmJUT0Yw"
 *    //     }
 *    //   }
 *    // }
 *  });
 */
function getAllPersonas() {
  let options = {
    'method': 'GET',
    'path': '/me/personas',
  };

  return this.sendGraphRequest(options);
}

/**
 * Deletes a [persona](https://developers.facebook.com/docs/messenger-platform/send-messages/personas).
 * @param {Integer} persona_id The ID of the persona to delete.
 * @return {Promise} The API response
 * @memberof Client#
 * @example
 * Client.deletePersona(123456789)
 *  .then(res => {
 *    console.log(res);
 *    // {
 *    //   "success": true
 *    // }
 *  });
 */
function deletePersona(persona_id) {
  if (!persona_id) {
    return Promise.reject('persona_id required');
  }

  let request_options = {
    'method': 'DELETE',
    'path': '/' + persona_id
  };

  return this.sendGraphRequest(request_options);
}

module.exports = Personas;
