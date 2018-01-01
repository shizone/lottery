'use strict'

import _ from 'lodash'
import { app } from 'hyperapp'
import { div, ol, li } from '@hyperapp/html'

const state = {
  members: [
    {userName: 'UserName1', displayName: 'DisplayName1'},
    {userName: 'UserName2', displayName: 'DisplayName2'},
    {userName: 'UserName3', displayName: 'DisplayName3'},
    {userName: 'UserName4', displayName: 'DisplayName4'}
  ]
}

const actions = {
  down: (value: any) => (state: any) => ({ count: state.count - value }),
  up: (value: any) => (state: any) => ({ count: state.count + value })
}

const view = (state: any, actions: any) =>
  div([
    ol(_.map(state.members, (member: any) => 
      li(member.displayName + '(' + member.userName + ')')
    ))
  ])

const main = app(state, actions, view, document.body)