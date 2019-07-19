function SponsoredMessage (GraphRequest) {
  this.sendSponsoredMessage = sendSponsoredMessage.bind(GraphRequest);
}

/**
 * Sends a new [Sponsored Message via the Messenger Platform](https://developers.facebook.com/docs/messenger-platform/reference/sponsored-messages).
 * @param   {Integer}  ad_account_id  Your Facebook Ads account ID.
 * @param   {Object}   options  An object that describes the sponsored message to send.
 * @param   {String}   options.message_creative_id  The ID of a message creative to send. Created by calling {@link #createmessagecreative|Client.createMessageCreative()}.
 * @param   {String}   options.daily_budget  The maximum daily budget of the ad campaign for the Sponsored Message send.
 * @param   {String}   options.bid_amount  The maximum bid for each message recipient.
 * @param   {String}   options.targeting  {@link https://developers.facebook.com/docs/marketing-api/targeting-specs|Targeting spec} for the Sponsored Message send.
 * @return  {Promise<Object>}  The API response
 * @memberof  Client#
 * @example
 * let options = {
 *   'message_creative_id': '34967347634346',
 *   'daily_budget': '10',
 *   'bid_amount': '1',
 *   'targeting': '{'geo_locations': {'countries':['US']}}',
 *   'ad_account_id': '9352379502706' 
 * };
 * Client.sendSponsoredMessage('test', options)
 *   .then(res => {
 *     console.log(res);
 *     // {
 *     //   "ad_group_id": "6088387928148",
 *     //   "broadcast_id": "754911018029273",
 *     //   "success": true
 *     // }
 *   });
 */
function sendSponsoredMessage (ad_account_id, options) {
  let required = [
    'message_creative_id',
    'daily_budget',
    'bid_amount',
    'targeting'
  ];

  let request_options = {};

  required.forEach(prop => {
    if (!options[prop]) {
      return Promise.reject('Valid ' + prop + ' property required');
    }
  });

  if (!ad_account_id) {
    return Promise.reject('ad_account_id required');
  }

  options.access_token = this.getPageToken();

  request_options.path = '/act_' + ad_account_id + '/sponsored_message_ads';
  request_options.api_version = 'v2.11';
  request_options.formData = options;

  return this.sendGraphRequest(request_options);
}

module.exports = SponsoredMessage;
