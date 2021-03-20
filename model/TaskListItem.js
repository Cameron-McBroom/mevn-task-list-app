const {Schema, model} = require('mongoose')


const TaskListItemSchema = new Schema(
    {
        description: {
            type: String,
            required: true
        },
        complete: {
            type: Boolean,
            default: false
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        notes: {
            type: String
        },
        dueDate: {
            type: Date
        }

    }
)

const TaskListItem = model('taskListItem', TaskListItemSchema)

module.exports = TaskListItem
