import tasksApi from '../api/tasks.api'


const state = {
    tasks: []
};

const getters = {
    getTasks: (state) => state.tasks,
    getById: (state, id) => state.tasks.find(task => task._id === id)
};

const actions = {
    async loadTasks({commit} = {}) {
        const response = await tasksApi.getTasks()
        commit('setTasks', response)
    },

    async addTask({commit} = {}, task) {
        const response = await tasksApi.addNewTask(task)
        commit('addNewTask', response)
    },

    async deleteTask({commit} = {}, id ) {
        const response = await tasksApi.deleteTaskById(id)
        commit('deleteTask', response)
    },

    async updateTask({commit} = {}, task ) {
        const response = await tasksApi.updateTask(task._id, task)
        commit('updateTask', response)
    },

    async deleteAll({dispatch} = {}) {
        await tasksApi.deleteAll()
        dispatch('loadTasks')
    }

};

const mutations = {
    setTasks: (state, tasks) => state.tasks = tasks,

    addNewTask: (state, task) => state.tasks.unshift(task),

    updateTask: (state, task) => {
        let index = state.tasks.findIndex(t => t._id === task._id)
        let newTasks = [...state.tasks]
        newTasks[index] = task
        state.tasks = newTasks
    },

    deleteTask: (state, task) => {
        let index = state.tasks.findIndex(t => t._id === task._id)
        let newTasks = [...state.tasks]
        newTasks.splice(index, 1)
        state.tasks = newTasks

    }

}

export default {
    namespaced: true, state, getters, actions, mutations
}
