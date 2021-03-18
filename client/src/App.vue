<template>
  <div id="app" class="Todo-List-Page">
    <todo-list />
  </div>
</template>

<script>
import TodoList from "./components/TaskList";

export default {
  name: 'App',
  components: {
    TodoList,
  }
}
</script>

<style>

.Task-List {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50% ,-50%);
}

.Todo-List-Page {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(var(--color-vue-green), #9198e5);
}
</style>
