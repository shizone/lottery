'use strict'

import _ from 'lodash'
import { app } from 'hyperapp'
import { div, h1, ol, li, button } from '@hyperapp/html'

const state = {
  members: [],
  current: 0
}

const actions = {
  shuffle: () => (state: any) => ({members: _.shuffle(state.members), current: 0}),
  dragover: (e: any) => (state: any) => dragOverHandler(e),
  drop: (e: any) => (state: any, actions: any) => dropHandler(e, state, actions),
  update: () => (state: any) => ({menbers: state.members, current: 0}),
  prev: () => (state: any) => ({menbers: state.members, current: 0 < state.current ? state.current - 1 : state.current}),
  next: () => (state: any) => ({menbers: state.members, current: state.current < state.members.length ? state.current + 1 : state.current})
}

function dragOverHandler(e: any) {
  e.preventDefault();
}

const dropHandler = function(e: any, state: any, actions: any) {
  e.stopPropagation()
  e.preventDefault()
  const files = e.dataTransfer.files
  _.each(files, (file: any) => {
    const reader = new FileReader()
    reader.onload = () => {
      state.members = _.chain(reader.result.split('\n'))
      .tail()
      .filter((line: string) => !_.isEmpty(line))
      .filter((line: string) => line.split(',')[4] !== '参加キャンセル')
      .map((line: string) => {
        const row = line.split(',')
        return {userName: row[1], displayName: row[2]}
      }).value()
      actions.update()
    }
    reader.readAsText(file, 'shift-jis')
  })
}

const view = (state: any, actions: any) =>
  div({class: 'app'}, [
    div([
      h1('connpassのCSVを読み込んで並べ替えるやつ'),
      div({
        class: 'droparea',
        ondragover: actions.dragover,
        ondrop: actions.drop
      }, 'connpassのCSVファイルをドロップ'),
      div({}, [button({
        class: 'pure-button pure-button-primary',
        onclick: actions.shuffle
      }, '順番を並べ替える')]),
      ol({
        class: 'members'
      }, _.map(state.members, (member: any, index: number) => 
        li(
          {class: index === state.current ? 'current' : ''}, 
          member.displayName + '(' + member.userName + ')')
      ))
    ])
  ])

const main = app(state, actions, view, document.body)
console.log('main')

document.onkeyup = (e) => {
  console.log('onkeypress')
  console.log(e)
  if (e.keyCode === 37)  {
    main.prev()
  } else if (e.keyCode === 39)  {
    main.next()
  }
}