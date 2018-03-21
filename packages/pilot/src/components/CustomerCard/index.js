import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  CardTitle,
  CardContent,

  Grid,
  Row,
  Col,
} from 'former-kit'

import { mapObjIndexed } from 'ramda'

import style from './style.css'

const fields = (labels, contents) => mapObjIndexed((label, key) => (
  <div className={style.field}>
    <span>{label}</span>
    <p>{contents[key]}</p>
  </div>
), labels)

const CustomerCard = ({ title, labels, contents }) => {
  const customer = fields(labels, contents)

  return (
    <Card>
      <CardTitle title={title} />
      <CardContent>
        <Grid>
          <Row>
            <Col palm={12} tablet={6} desk={4} tv={4}>
              { customer.name }
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {customer.document_number}
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {customer.born_at}
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {customer.gender}
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {customer.phone}
            </Col>

            <Col palm={12} tablet={6} desk={4} tv={4}>
              {customer.email}
            </Col>

            <Col palm={12} tablet={4} desk={4} tv={4}>
              {customer.zip_code}
            </Col>

            <Col palm={12} tablet={8} desk={8} tv={8}>
              {customer.street}
            </Col>

            <Col palm={12} tablet={2} desk={1} tv={1}>
              {customer.number}
            </Col>

            <Col palm={12} tablet={10} desk={3} tv={3}>
              {customer.complement}
            </Col>

            <Col palm={12} tablet={8} desk={4} tv={4}>
              {customer.neighborhood}
            </Col>

            <Col palm={12} tablet={4} desk={3} tv={3}>
              {customer.city}
            </Col>

            <Col palm={12} tablet={4} desk={1} tv={1}>
              {customer.state}
            </Col>
          </Row>
        </Grid>
      </CardContent>
    </Card>
  )
}

const shape = {
  name: PropTypes.string,
  document_number: PropTypes.string,
  born_at: PropTypes.string,
  gender: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  zip_code: PropTypes.string,
  street: PropTypes.string,
  number: PropTypes.string,
  complement: PropTypes.string,
  neighborhood: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
}

CustomerCard.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.shape(shape).isRequired,
  contents: PropTypes.shape(shape).isRequired,
}

export default CustomerCard
