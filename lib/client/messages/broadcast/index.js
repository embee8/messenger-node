function Broadcast (GraphRequest) {
  this.sendBroadcast = sendBroadcast;
  this.startBroadcastReachEstimation = startBroadcastReachEstimation;
  this.getBroadcastReachEstimation = getBroadcastReachEstimation;
  this.callBroadcastApi = callBroadcastApi.bind(GraphRequest);
}

/**
 * Sends a new broadcast message via the [Broadcast API](https://developers.facebook.com/docs/messenger-platform/reference/broadcast-api).
 * @param  {Integer}  message_creative_id  The ID of a message creative to send in the broadcast. Created by calling {@link #createmessagecreative|Client.createMessageCreative()}.
 * @param  {Integer}  custom_label_id   _Optional._ The ID of a custom label to target for the broadcast. Created by calling {@link #createcustomlabel|Client.createCustomLabel()}.
 * @return {Promise}  The API response
 * @memberof  Client#
 * @example
 * let message_creative_id = 499792492764246,
 *     custom_label_id = 097046973276-46; // optional
 * Client.sendBroadcast(message_creative_id, custom_label_id)
 *   .then(res => {
 *     console.log(res); // {'broadcast_id': 397230957240952}
 *   });
 */
function sendBroadcast (message_creative_id, custom_label_id) {
  if (!message_creative_id) {
    return Promise.reject('Valid message_creative_id required');
  }

  let options = {
    'message_creative_id': message_creative_id
  };

  if (custom_label_id) options.custom_label_id = custom_label_id;

  return this.callBroadcastApi(options);
}

/**
 * Start a reach estimation for the number of people that will be 
 * reached by a broadcast to all users or to users associated with 
 * a custom label.
 * @param  {Integer}  custom_label_id   _Optional._ The ID of a custom label targeted by the broadcast. Created by calling {@link #createcustomlabel|Client.createCustomLabel()}.
 * @return {Promise<Object>}  The API Response
 * @memberof  Client#
 * @example
 * let custom_label_id = 3467390467035645 //optional
 * Client.startBroadcastReachEstimation(custom_label_id)
 *   .then(res => {
 *     console.log(res); // {"reach_estimation_id": "9485676932424"}
 *   });
 */
function startBroadcastReachEstimation (custom_label_id) {
  let options = {
    'custom_label_id': custom_label_id || true
  };
  return this.callBroadcastApi(options);
}

/**
 * Get the current status of a broadcast reach estimation
 * {@link #startbroadcastreachestimation|`startBroadcastReachEstimation` 
 * must be run first to get a `reach_estimation_id`.
 * @param  {Integer}  reach_estimation_id   The reach estimation ID.
 * @return {Promise<Object>}  The API Response
 * @memberof  Client#
 * @example
 * Client.getBroadcastReachEstimation(9485676932424)
 *   .then(res => {
 *     console.log(res); // {"reach_estimation": "100", "id": "9485676932424"}
 *   });
 */
function getBroadcastReachEstimation (reach_estimation_id) {
  if (!reach_estimation_id) {
    return Promise.reject('Valid reach_estimation_id required');

  }
  let options = {
    'reach_estimation_id': reach_estimation_id
  };
  return this.callBroadcastApi(options);
}

function callBroadcastApi (options) {
  let request_options = {'api_version': 'v2.11'};

  if (options.message_creative_id) {
    request_options.path = '/me/broadcast_messages';
    request_options.payload = options;
  } else if (options.custom_label_id) {
    request_options.path = '/me/broadcast_reach_estimations';
    request_options.payload = {};
    if (typeof options.custom_label_id === 'string') {
      request_options.payload = options;
    }
  } else if (options.reach_estimation_id) {
    request_options.path = `/${options.reach_estimation_id}`;
  }

  return this.sendGraphRequest(request_options);
}

module.exports = Broadcast;
