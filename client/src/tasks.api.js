import axios from 'axios';

axios.defaults.port = 3000

export default {
    async getTaskById(id) {
        const response = await axios.get(`/api/tasklistitems/${id}`);
        return response.data;
    },

    async getTasks() {
        const response = await axios.get("/api/tasklistitems");
        return response.data;
    },

    async deleteTaskById(id) {
        const response = await axios.delete(`/api/tasklistitems/${id}`);
        return response.data
    },

    async addNewTask(task) {
        const response = await axios.post('/api/tasklistitems', {
            description: task.name
        })
        return response.data
    },

    // async markComplete(id, complete) {
    //     const response = await axios.put(`/tasklistitems/${id}/${complete.toLocaleString().toLocaleLowerCase()}`)
    //     return response.data;
    // },

    async updateTask(id, updatedTask) {
      const response = await axios.put(`/api/tasklistitems/${id}`, {
          description : updatedTask.name,
          complete: updatedTask.done
      })
        return response.data

    }
}
