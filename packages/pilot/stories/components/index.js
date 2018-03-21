import React from 'react'
import { storiesOf } from '@storybook/react'

import CustomerCard from './CustomerCard'

storiesOf('Components', module)
  .add('CustomerCard', () => (
    <CustomerCard />
  ))
