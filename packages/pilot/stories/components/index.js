import React from 'react'
import { storiesOf } from '@storybook/react'

import Section from './Section'
import TransactionDetailsCard from './TransactionDetailsCard'

storiesOf('Components', module)
  .add('TransactionDetailsCard', () => (
    <Section>
      <TransactionDetailsCard />
    </Section>
  ))
