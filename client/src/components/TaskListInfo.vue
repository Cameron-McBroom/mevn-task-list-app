<template>
  <div class="Todo-List-Info">
    <h3>You have {{incompleteTaskCount}} pending tasks </h3>
    <button
        v-if="taskCount > 0"
        class="todo-list-info-clear-btn"
        @click="$emit('clear-all')">
      Clear All
    </button>
  </div>
</template>
<script>
export default {
  name: 'TaskListInfo',
  props: {
    taskCount: Number,
    incompleteTaskCount: Number
  }
}
</script>
<style scoped>

h1 {
  margin-bottom: 1rem;
  text-align: left;
}


.Todo-List-Info {
  display: flex;

  justify-content: space-between;
  height: 2rem;
}

.Todo-List-Info h3 {
  align-self: center;
}

.todo-list-info-clear-btn {
  background: darkgrey;
  border-radius: var(--border-radius-default);
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
}

.todo-list-info-clear-btn:hover {
  opacity: 1;
}

</style>
