'use strict';

/**
 * Module dependencies.
 */
var config = require('./config');

module.exports = function(app) {

  var apiPrefix = config.apiPrefix;

  //Block routes
  var blocks = require('../app/controllers/blocks');
  // app.get(apiPrefix + '/blocks', blocks.list);
  app.get(apiPrefix + '/blocks', blocks.latest);
  app.get(apiPrefix + '/blocks/latest', blocks.latest);


  app.get(apiPrefix + '/block/:blockHash', blocks.show);
  app.param('blockHash', blocks.block);

  app.get(apiPrefix + '/block-index/:height', blocks.blockindex);
  app.param('height', blocks.blockindex);

  // Transaction routes
  var transactions = require('../app/controllers/transactions');
  app.get(apiPrefix + '/tx/:txid', transactions.show);
  app.param('txid', transactions.transaction);
  app.get(apiPrefix + '/txs', transactions.list);
  app.get(apiPrefix + '/txs/latest', transactions.latest);
  app.post(apiPrefix + '/tx/send', transactions.send);

  // Address routes
  var addresses = require('../app/controllers/addresses');
  app.get(apiPrefix + '/address/:addr', addresses.show);
  app.get(apiPrefix + '/address/:addr/balance', addresses.balance);
  app.get(apiPrefix + '/address/:addr/utxo', addresses.utxo);

  // Top100 routes
  var top100 = require('../app/controllers/top100');
  app.get(apiPrefix + '/top100', top100.show);

  // Status route
  var st = require('../app/controllers/status');
  app.get(apiPrefix + '/status', st.show);

  app.get(apiPrefix + '/sync', st.sync);
  app.get(apiPrefix + '/peer', st.peer);

  // Currency
  var currency = require('../app/controllers/currency');
  app.get(apiPrefix + '/currency', currency.index);

  //Home route
  var index = require('../app/controllers/index');
  app.get(apiPrefix + '/version', index.version);
  app.get('*', index.render);
};
