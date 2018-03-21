const pagarme = require('pagarme')
const cockpit = require('.')

pagarme.client.connect({ api_key: 'ak_test_k' })
  .then(cockpit)
  .then(cli => cli.transactions.details(2971711))
  .then(result => console.log(JSON.stringify(result, undefined, 2)))
  .catch(err => console.log(JSON.stringify(err.response, undefined, 2)))
