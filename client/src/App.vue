<template>
  <div id="app" class="Todo-List-Page">
    <todo-list />
  </div>
</template>

<script>
import TodoList from "./components/TaskList/TaskList";

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


body {
  background: linear-gradient(var(--color-vue-green), #9198e5);
}

@media screen and (max-width: 500px) {
  .Task-List {
    position: relative;
    transform: initial;
    top: initial;
    left: initial;
  }
}

</style>
