import { thinky, type, r } from '../../boilerplate/database'

export const Todo = thinky.createModel(
  'Todo',
  {
    id: type.string().uuid(4),
    text: type.string().max(255),
    done: type.boolean(),
    createdAt: type.date().default(r.now())
  }
)

export default Todo
