const { Router } = require('express')

const TaskListItem = require('../../model/TaskListItem')

const router = Router()

router.get('/', async (req, res) => {

    try {
        const taskListItems = await TaskListItem.find()

        if (!taskListItems) throw new Error("No taskListItems")

        const sorted = taskListItems.sort((a, b) => {
            return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
        })

        res.status(200).json(sorted)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newTaskListItem = new TaskListItem(req.body)

    try {
        const taskListItem = await newTaskListItem.save()

        if (!taskListItem) throw Error("Something went wrong saving the taskListItem")

        res.status(200).json(taskListItem)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

   try {
       const dbResponse = await TaskListItem.findByIdAndUpdate(id, req.body)

       if (!dbResponse) throw Error("Something went wrong updating the task")

       console.log(dbResponse)

       const updated = { ...dbResponse._doc, ...req.body }

       console.log(updated)

       res.status(200).json(updated)

   }
   catch (error) {
       res.status(500).json({ message: error.message })

   }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const removed = await TaskListItem.findByIdAndDelete(id)

        if (!removed) throw Error("Something went wrong deleting the record")

        res.status(200).json(removed)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

})

router.post('/deleteall', async (req, res) => {
    try {
        const response = await TaskListItem.deleteMany({})

        if (!response.ok) throw Error("Something went wrong deleting all records")

        res.status(200).json(response)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }
})

module.exports = router
