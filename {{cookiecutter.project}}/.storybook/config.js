import React from 'react'

import { configure, addDecorator } from '@storybook/react'
import { withNotes } from '@storybook/addon-notes'
import { setDefaults } from '@storybook/addon-info'
import { setOptions } from '@storybook/addon-options'

import { MemoryRouter } from 'react-router-dom'

setOptions({
  name: '{{cookiecutter.project_slug}}',
  url:
    'https://github.com/{{cookiecutter.github_org}}/{{cookiecutter.project_slug}}'
})

setDefaults({
  inline: true
})

const req = require.context('../stories', true, /.stories.js$/)
function loadStories() {
  require('../stories/index.stories.js')
  req.keys().forEach(filename => req(filename))
}

const withRouter = storyFn => (
  <MemoryRouter initialEntries={['/']}>{storyFn()}</MemoryRouter>
)
addDecorator(withRouter)

configure(loadStories, module)
