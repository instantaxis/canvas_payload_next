#!/usr/bin/env node
/**
 * scripts/merge-tasks.cjs
 *
 * Merge fields from original .taskmaster/tasks/tasks.json into tasks-updated.json.
 * Copies description, details, testStrategy, priority, status, metadata and dependencies.
 */

const fs = require('fs')
const path = require('path')

const originalPath = path.resolve(__dirname, '../.taskmaster/tasks/tasks.json')
const updatedPath = path.resolve(__dirname, '../tasks-updated.json')

function mergeTask(original, updated) {
  // copy core fields
  ;[
    'title',
    'description',
    'details',
    'testStrategy',
    'priority',
    'status',
    'dependencies',
  ].forEach((key) => {
    if (original[key] !== undefined) updated[key] = original[key]
  })
  // merge metadata
  if (original.metadata) updated.metadata = original.metadata

  // merge subtasks by id
  if (Array.isArray(original.subtasks) && Array.isArray(updated.subtasks)) {
    const origById = Object.fromEntries(original.subtasks.map((st) => [st.id, st]))
    updated.subtasks.forEach((st) => {
      const o = origById[st.id]
      if (o) {
        ;[
          'title',
          'description',
          'details',
          'testStrategy',
          'status',
          'dependencies',
          'parentTaskId',
        ].forEach((k) => {
          if (o[k] !== undefined) st[k] = o[k]
        })
      }
    })
  }
  return updated
}

function main() {
  const origJson = JSON.parse(fs.readFileSync(originalPath, 'utf-8'))
  const updJson = JSON.parse(fs.readFileSync(updatedPath, 'utf-8'))

  const origTasks = origJson.master.tasks
  const updTasks = updJson.master.tasks

  const origById = Object.fromEntries(origTasks.map((t) => [t.id, t]))

  const mergedTasks = updTasks.map((u) => {
    const o = origById[u.id]
    if (o) return mergeTask(o, u)
    return u
  })

  updJson.master.tasks = mergedTasks

  fs.writeFileSync(updatedPath, JSON.stringify(updJson, null, 2))
  console.log('tasks-updated.json merged successfully.')
}

main()
