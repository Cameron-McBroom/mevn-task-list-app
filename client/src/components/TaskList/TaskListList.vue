<template>
  <div :class=taskListClass>
    <transition-group name="list" tag="p"  v-if="tasks" @before-leave="beforeLeave">
      <div
          :class="{task: true, done: task.complete}"
          v-for="task in filteredTasks"
          :key="task._id">

        <task-list-item
            class="list-item"
            :task="task"
            @checked="markTaskDone(task)"
            @delete="removeTask(task)"
            @update="updateTaskDesc(task, $event)"/>

      </div>
    </transition-group>
  </div>
</template>


<script>
import TaskListItem from "./TaskListItem";

export default {
  name: "TaskListList",
  components: { TaskListItem },
  props: {
    show: String,
    validator: value => ['complete', 'incomplete', 'any'].includes(value)
  },
  data() {
    return {
      taskListClass: {
        'task-list-items': this.show === 'incomplete',
        'task-list-complete': this.show === 'complete'
      }
    }
  },
  computed: {
    tasks() {
      return this.$store.getters['tasks/getTasks']
    },

    incompleteTasks() {
      if (!this.tasks) return
      return this.tasks.filter(task => !task.complete)
    },

    completeTasks() {
      if (!this.tasks) return
      return this.tasks.filter(task => task.complete)
    },

    filteredTasks() {
      if (this.show === 'complete')
        return this.completeTasks

      else if (this.show === "incomplete")
        return this.incompleteTasks

      else
        return this.tasks
    }

  },

  methods: {
    async removeTask(task) {
      try {
        await this.$store.dispatch('tasks/deleteTask', task._id)
      }
      catch (e) {
        console.log(e)
      }
    },

    async markTaskDone(task) {
      task.complete = !task.complete

      try {
        await this.$store.dispatch('tasks/updateTask', task)
      }
      catch (e) {
        console.log(e)
      }

    },

    async updateTaskDesc(task, newDesc) {
      if (!this.taskValid(task, newDesc)) return

      task.description = newDesc

      try {
        await this.$store.dispatch('tasks/updateTask',  task)
      }
      catch (e) {
        console.log(e)
      }
    },

    taskValid(task, optString) {
      // optional string means editing existing task
      if (optString) {
        // check it's greater than 1 character and not the same
        return optString.length >= 1 && task.description !== optString;
      }

      if (!this.newTodo || this.newTodo.length < 1) return false

      return true

    },

    beforeLeave(el) {
      // special function that stops animated elements from jumping when they are changed to absolute as they fade out
      const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
      el.style.width = width
      el.style.height = height
    },
  },

  async created() {
    this.$store.dispatch('tasks/loadTasks')
  }

}



</script>

<style scoped>

.task-list-complete {
  margin-top: calc(50px);
}



.task-list-items {
  box-sizing: border-box;
  margin: 0 0 0 0;
  max-height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
}

.list-leave-active {
  position: absolute;
  transition: all .5s;
}

.list-enter-active {
  transition: all .5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
}



</style>
