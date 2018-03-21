import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardContent,
  CardTitle,

  Grid,
  Row,
  Col,
} from 'former-kit'
import {
  mapObjIndexed,
  values,
  splitEvery,
} from 'ramda'

import style from './style.css'

const objectFields = (labels, contents) => (
  mapObjIndexed((label, key) => (
    <div className={style.item}>
      <span>{label}</span>
      <p>{contents[key]}</p>
    </div>
  ), labels)
)

const fieldsToArray = (labels, contents) => values(objectFields(labels, contents))

const fieldsColumns = (labels, contents) => {
  const fields = fieldsToArray(labels, contents)
  return splitEvery(fields.length / 3, fields)
}

const composeIndex = (parentIndex, index) => `${parentIndex}_col_${index}`

const TransactionDetailsCard = ({ title, labels, contents }) => (
  <Card>
    <CardTitle title={title} />
    <CardContent>
      <Grid>
        <Row>
          {
            fieldsColumns(labels, contents).map((fields, parentIndex) =>
              fields.map((field, index) => (
                <Col
                  palm={12}
                  tablet={6}
                  desk={4}
                  tv={4}
                  key={composeIndex(parentIndex, index)}
                >
                  { field }
                </Col>
              ))
            )
          }
        </Row>
      </Grid>
    </CardContent>
  </Card>
)

const shape = {
  tid: PropTypes.string,
  acquirer_name: PropTypes.string,
  authorization_code: PropTypes.string,
  acquirer_response_code: PropTypes.string,
  antifraud_score: PropTypes.number,
  nsu: PropTypes.number,
  soft_descriptor: PropTypes.string,
  subscription_id: PropTypes.string,
  capture_method: PropTypes.string,
}

TransactionDetailsCard.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.shape(shape).isRequired,
  contents: PropTypes.shape(shape).isRequired,
}

export default TransactionDetailsCard
