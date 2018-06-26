import React from 'react'
import { storiesOf } from '@storybook/react'

import { withInfo } from '@storybook/addon-info'

storiesOf('Getting Started', module).add(
  'Introduction',
  withInfo({
    text: `
    # {{cookiecutter.project_slug}}
  `,
    header: false,
    source: false
  })(() => <div />)
)
