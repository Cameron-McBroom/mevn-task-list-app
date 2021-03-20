<template>
  <div class="Task-List" :style="{height: taskListComputedHeight}">

    <h1 class="heading">Add a new task</h1>

    <task-list-add-item-bar @addTodo="addNewTodo" v-model="newTodo"/>

      <task-list-drop-down
          class="task-list-incomplete-header"
          label="Incomplete Tasks"
          :header="false"
          :is-open="incompleteTaskOpen"
          :count="incompleteTaskCount"
          @click="toggleIncomplete($event)"
      />

    <transition name="fade" @before-leave="beforeLeave">
      <task-list-list show="incomplete" v-if="incompleteTaskOpen"/>
    </transition>

    <task-list-drop-down v-show="completedTaskCount > 0"
        class="task-list-complete-header"
        label="Complete Tasks"
        :header="true"
        :is-open="completeTaskOpen"
        :count="completedTaskCount"
        @click="toggleComplete($event)"
    />

    <transition name="fade" @before-leave="beforeLeave">
      <task-list-list show="complete" v-if="completeTaskOpen"/>
    </transition>

  </div>
</template>

<script>

import TaskListAddItemBar from "./TaskListAddItemBar";
import TaskListDropDown from "./TaskListDropDown";
import TaskListList from "./TaskListList";

export default {
  name: 'TodoList',
  components: {
    TaskListList,
    TaskListDropDown,
    TaskListAddItemBar,
  },
  props: {
    msg: String
  },
  data() {
    return {
      newTodo: "",
      incompleteTaskOpen: true,
      completeTaskOpen: false
    }
  },
  computed: {
    tasks() {
      return this.$store.getters['tasks/getTasks']
    },

    incompleteTasks() {
      if (!this.tasks) return
      return this.tasks.filter(item => !item.complete)
    },

    completeTasks() {
      if (!this.tasks) return
      return this.tasks.filter(item => item.complete)
    },

    incompleteTaskCount() {
      return this.incompleteTasks.length;
    },

    completedTaskCount() {
      return this.completeTasks.length;
    },

    taskListComputedHeight() {
      if (!this.tasks) return
      const emptyHolderSize = 150
      const incompleteDropdownSize = 50
      const completeDropdownSize = this.completedTaskCount > 0 ? 50 : 0
      const incompleteTaskSize = this.incompleteTaskOpen ? (this.incompleteTaskCount * 56) : 0
      const completeTasksOpenSize = this.completeTaskOpen ? (this.completedTaskCount * 58) : 0

      return `${
        ( emptyHolderSize + incompleteDropdownSize + incompleteTaskSize + completeTasksOpenSize + completeDropdownSize)
      }px`
    }

  },
  methods: {
    async addNewTodo() {
      if (!this.taskValid()) {
        this.focusOnInput()
        return
      }

      try {
        await this.$store.dispatch('tasks/addTask', {description: this.newTodo})
        this.newTodo = "";
      }
      catch (e) {
        console.log(e)
      }
    },

    toggleIncomplete(value) {
      const maxHeight = 600
      const taskItemHeight = 56
      const totalTasks = this.tasks.length

      if (value && totalTasks * taskItemHeight > maxHeight) {
        this.completeTaskOpen = false
        this.incompleteTaskOpen = true
      }
      else {
        this.incompleteTaskOpen = value
      }
    },

    toggleComplete(value) {
      const maxHeight = 600
      const taskItemHeight = 56
      const totalTasks = this.tasks.length

      if (value && totalTasks * taskItemHeight > maxHeight) {
        this.incompleteTaskOpen = false
        this.completeTaskOpen = true
      }
      else {
        this.completeTaskOpen = value
      }
    },

    beforeLeave(el) {
      // special function that stops animated elements from jumping when they are changed to absolute as they fade out
      const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
      el.style.width = width
      el.style.height = height
    },

    taskValid() {
      return this.newTodo && this.newTodo.length >= 1
    },

    focusOnInput() {
      // this.$refs.newTask.focus();
    },

  },

  async created() {
    await this.$store.dispatch('tasks/loadTasks')
  }
}
</script>

<style scoped>

.Task-List {
  display: inline-block;
  box-shadow: rgba(0, 0, 0, 0.05) 0 6px 24px 0, rgba(0, 0, 0, 0.08) 0 0 0 1px;
  border-radius: 10px;
  background-color: var(--color-background-panel);
  padding: 1rem 1rem;
  max-height: 650px;
  min-height: 150px;
  min-width: 350px;
  width: 100%;
  max-width: 600px;

  -webkit-transition: all .6s cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all .6s cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all .6s cubic-bezier(0.42, 0, 0.58, 1);
  transition: all .6s cubic-bezier(0.42, 0, 0.58, 1);
  overflow: hidden;
}

h1 {
  margin-bottom: 1rem;
  text-align: left;
}

.task-list-complete-header {
  position: absolute;
  width: 100%;
  padding: 0 1rem;
  left: 0;
}

.task-list-incomplete-header {
  margin-top: .5rem;
  scrollbar-width: none;
}

.fade-leave-active {
  position: absolute;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 500px){
  .Task-List {
    border-radius: 0 0 10px 10px;
  }
}

</style>
