<template>
  <div class="new-item">
    <input
        :value="value"
        class="new-item-input"
        type="text"
        placeholder="Add a new todo.."
        @keypress.enter="addNewTodo"
        @input="update($event.target.value)"
    />

    <div class="new-item-button" @click="addNewTodo">
      <fa-icon class="new-item-button-icon" icon="plus"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TaskListAddItemBar',
  props: ['value'],
  methods: {
    addNewTodo() {
      this.$emit('addTodo');
    },
    update(value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style scoped>

h1 {
  margin-bottom: 1rem;
  text-align: left;
}

.new-item {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 3rem;
  margin: 0 auto;
}

.new-item-input {
  flex: 1;
  font-size: 18px;
  border-radius: var(--border-radius-default);
  padding: 0 8px;
  border: var(--border-default);
}

.new-item-input:focus {
  outline: none !important;
  border-radius: var(--border-radius-default);
  border: 1px solid var(--color-vue-green);
  padding: 0 8px;
}

.new-item-button {
  height: inherit;
  background: var(--color-vue-green);
  font-size: 20px;
  margin-left: .5rem;
  padding: 0 1rem;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
}

.new-item-button:hover {
  opacity: 1;
}

.new-item-button-icon {
  height: inherit;
  color: #F8F8F8;
}


.Todo-List-Info h3 {
  align-self: center;
}



</style>
