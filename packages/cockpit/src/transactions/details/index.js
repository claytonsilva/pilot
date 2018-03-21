import {
  all,
  props,
  resolve,
} from 'bluebird'

import {
  __,
  assoc,
  complement,
  map,
  merge,
  pipe,
  path,
  always,
  ifElse,
  isNil,
  pathSatisfies,
  propSatisfies,
  uncurryN,
  when,
} from 'ramda'

import result from './result'

const fetchRecipient = client => splitRule =>
  client.recipients.find({ id: splitRule.recipient_id })
    .then(recipient => merge(splitRule, { recipient }))

const fetchRecipients = uncurryN(2, client =>
  ifElse(
    pathSatisfies(isNil, ['transaction', 'split_rules']),
    always(resolve(null)),
    pipe(
      path(['transaction', 'split_rules']),
      map(fetchRecipient(client)),
      all
    )
  ))

const hasSplitRules = propSatisfies(complement(isNil), 'split_rules')

/* eslint-disable-next-line camelcase */
const groupInstallments = (client, { split_rules, payables }) =>
  map(rule => merge(
    rule,
    { installments: payables.filter(p => p.split_rule_id === rule.id) }
  ), split_rules)

const details = client => transactionId =>
  props({
    transaction: client.transactions.find({ id: transactionId }),
    operations: client.gatewayOperations.find({ transactionId }),
    payables: client.payables.find({ transactionId }),
    chargebacks: client.chargebacks.find({ transaction_id: transactionId }),
  })
    .then(data => fetchRecipients(client, data).then(assoc('split_rules', __, data)))
    .then((data) => {
      const buildSplitRulesInstallments = when(
        hasSplitRules,
        obj => assoc('split_rules', groupInstallments(client, data), obj)
      )

      return buildSplitRulesInstallments(data)
    })
    .then(result)


export default details
