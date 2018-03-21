import {
  apply,
  always,
  applySpec,
  dissoc,
  flatten,
  has,
  ifElse,
  isNil,
  juxt,
  map,
  mergeAll,
  path,
  pathEq,
  pipe,
  prop,
  propEq,
  props,
  reject,
  sort,
  subtract,
  sum,
  pick,
  pluck,
  unless,
} from 'ramda'
import moment from 'moment'

import { transactionObj } from '../shared'

const chooseOperations = ifElse(
  pathEq(['transaction', 'payment_method'], 'boleto'),
  prop('gatewayOperations'),
  pipe(
    props(['gatewayOperations', 'chargebackOperations']),
    flatten,
    reject(propEq('type', 'conciliate'))
  )
)

const createOperationObj = applySpec({
  id: prop('id'),
  date_created: ifElse(
    has('date_created'),
    prop('date_created'),
    prop('created_at')
  ),
  type: prop('type'),
  status: ifElse(
    has('status'),
    prop('status'),
    always('success')
  ),
  cycle: prop('cycle'),
})

const buildOperations = applySpec({
  operations: pipe(
    chooseOperations,
    map(createOperationObj),
    sort((a, b) => (
      moment(a.date_created)
        .isSameOrBefore(moment(b.date_created))
    ))
  ),
})

const sumInstallmentsAmount = pipe(
  prop('installments'),
  pluck('amount'),
  sum
)

const sumPayableFees = pipe(props(['fee', 'anticipation_fee']), sum)

const sumInstallmentsCostAmount = pipe(
  prop('installments'),
  map(sumPayableFees),
  sum
)

const mapRecipients = map(applySpec({
  name: path(['recipient', 'bank_account', 'legal_name']),
  amount: sumInstallmentsAmount,
  net_amount: pipe(
    juxt([
      sumInstallmentsAmount,
      sumInstallmentsCostAmount,
    ]),
    apply(subtract)
  ),
  liabilities: pipe(
    juxt([
      ifElse(
        propEq('charge_processing_fee', true),
        always('mdr'),
        always(null)
      ),
      ifElse(
        propEq('liable', true),
        always('chargeback'),
        always(null)
      ),
    ]),
    reject(isNil)
  ),
  installments: pipe(
    prop('installments'),
    map(applySpec({
      number: prop('installment'),
      payment_date: prop('payment_date'),
      original_payment_date: prop('original_payment_date'),
      amount: prop('amount'),
      net_amount: sumPayableFees,
      costs: {
        mdr: prop('fee'),
        anticipation: prop('anticipation_fee'),
      },
    }))
  ),
}))

const buildRecipients = applySpec({
  recipients: unless(isNil, mapRecipients),
})

const mapTransactionToResult = applySpec({
  transaction: pipe(
    juxt([
      pipe(prop('transaction'), applySpec(transactionObj)),
      pipe(
        pick([
          'gatewayOperations',
          'chargebackOperations',
          'transaction',
        ]),
        buildOperations
      ),
      pipe(prop('split_rules'), buildRecipients),
    ]),
    mergeAll
  ),
  rest: pipe(
    dissoc('transaction'),
    dissoc('gatewayOperations'),
    dissoc('chargebackOperations'),
    dissoc('split_rules')
  ),
})

export default mapTransactionToResult
