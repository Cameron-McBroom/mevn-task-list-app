<template>
  <div class="Task-List" :style="{height: taskListComputedHeight}">
    <h1 class="heading">Add a new task</h1>

    <task-list-add-item-bar @addTodo="addNewTodo" v-model="newTodo"/>

    <div class="task-list-items">

      <transition-group name="list" tag="p">
        <div
            :class="{task: true, done:item.done}"
            v-for="item in items"
            :key="item.id">

          <task-list-item
              class="list-item"
              :task="item"
              @checked="markTaskDone(item.id)"
              @delete="deleteTask(item.id)"
              @update="updateTask(item.id, $event)"/>

        </div>
      </transition-group>


    </div>

    <task-list-info
        :task-count="items.length"
        :incomplete-task-count="incompleteTaskCount"
        @clear-all="clearTasks"/>

  </div>
</template>

<script>

import TaskListAddItemBar from "./TaskListAddItemBar";
import TaskListItem from "./TaskListItem";
import TaskListInfo from "./TaskListInfo";
import taskApi from "@/tasks.api";

export default {
  name: 'TodoList',
  components: {TaskListAddItemBar, TaskListItem, TaskListInfo},
  props: {
    msg: String
  },
  data() {
    return {
      items: [],
      newTodo: "",
    }
  },
  computed: {
    incompleteTaskCount() {
      return this.items.filter(item => !item.done).length;
    },
    taskListComputedHeight() {
      return `${(200 + this.items.length * 55)}px`
    }
  },
  methods: {
    addNewTodo() {
      const valid = this.validateNewTodo()

      if (valid) {
        taskApi.addNewTask({name: this.newTodo})
        .then(task => {
          this.newTodo = "";
          this.items.unshift(this.parseTask(task));
          this.increaseTaskListHeight()
          this.moveIncompleteItemsUp();
        })
      } else  {
        this.focusOnInput();
      }
    },
    validateNewTodo(id, optString) {
      if (this.newTodo === "") return false

      // optional string means editing existing task
      if (optString) {
        // check it's greater than 1 character and not the same
        return optString.length >= 1 && this.getTaskName(id) !== optString;
      }
      return this.newTodo.length >= 1;
    },

    focusOnInput() {
      this.$refs.newTask.focus();
    },

    deleteTask(id) {
      let index = this.getTaskIndex(id);
      taskApi.deleteTaskById(id)
      .then(() => {
        this.items.splice(index, 1)
        this.decreaseTaskListHeight()
      })

    },

    clearTasks() {
      // TODO - Add in a notification for confirmation
      this.items.forEach((item) => {

        taskApi.deleteTaskById(item.id)
          .then(() => {
              const filtedItems = this.items.filter(task => task.id !== item.id)
              this.items = filtedItems
              this.decreaseTaskListHeight()
          })
        })

    },

    markTaskDone(id) {
      let index = this.getTaskIndex(id)

      // Change the item complete or incomplete
      const copiedTask = Object.assign({}, this.items[index])

      copiedTask.done = !this.items[index].done;

      taskApi.updateTask(id, copiedTask)
      .then(() => {
        this.items[index].done = !this.items[index].done
        this.moveIncompleteItemsUp();
      })
      .catch(err => {
        // if there was an error we need to change the item back
        this.items[index].done = !this.items[index]
        console.log(err)
    })
    },

    updateTask(id, update) {
      let index = this.getTaskIndex(id);

      const valid = this.validateNewTodo(id, update);

      const updatedTask = Object.assign({}, this.items[index]).name = update;

      if (valid) {
        taskApi.updateTask(id, updatedTask)
      .then(task => {
        console.log(task)
        this.items[index].name = task.description;
      })
        .catch(err => console.log(err))
      }
      else
        //Sets the field back to what was stored
        this.$forceUpdate();
    },

    moveIncompleteItemsUp() {
      for(let i = 0; i < this.items.length; i++) {
        while (this.items[i].done && this.items[i+1] && !this.items[i+1].done) {
          this.swapItems(i, i+1)
        }
      }

    },

    increaseTaskListHeight() {
      this.taskListHeight += 50
    },

    decreaseTaskListHeight() {
      this.taskListHeight -= 50
    },

    swapItems(a, b) {
      let temp = this.items[a]
      this.items[a] = this.items[b]
      this.items[b] = temp
    },

    getTaskIndex(id) {
      return this.items.findIndex(item => item.id === id);
    },

    getTaskName(id) {
      return this.items.findIndex(item => item.id === id).name;
    },

    parseTask(task) {
      return {
        id: task._id,
        name: task.description,
        done: task.complete
      }

    }
  },
  beforeMount() {
    taskApi.getTasks()
        .then(tasks => this.items = tasks.map(task => this.parseTask(task)))
        .catch(err => console.log(err))
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
  max-height: 600px;
  min-height: 200px;
  min-width: 350px;
  width: 100%;
  max-width: 600px;

  -webkit-transition: all .6s cubic-bezier(0.42, 0, 0.58, 1);
  -moz-transition: all .6s cubic-bezier(0.42, 0, 0.58, 1);
  -o-transition: all .6s cubic-bezier(0.42, 0, 0.58, 1);
  transition: all .6s cubic-bezier(0.42, 0, 0.58, 1);
}

h1 {
  margin-bottom: 1rem;
  text-align: left;
}

.new-item {
  padding-right: 7px;
}


.task-list-items {
  box-sizing: border-box;
  margin: 1rem 0 ;
  max-height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
}

.Todo-List-Info {
  width: 100%;
  padding: 0 calc(1rem + 7px) 0 1rem;
  position: absolute;
  bottom: 1rem;
  left: 0;
}

.Todo-List-Info h3 {
  align-self: center;
}

.list-item {
  position: relative;
  overflow: hidden;
}

.list-leave-active {
  /*position: absolute;*/
  transition: all .4s;
}

.list-enter-active {
  transition: all .4s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
}


@media screen and (max-width: 500px){
  .Task-List {
    border-radius: 0 0 10px 10px;
  }

  h1 {
    text-align: center;
    font-size: x-large;
  }
}

</style>
