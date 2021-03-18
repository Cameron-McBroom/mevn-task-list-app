<template>

  <div class="task">
    <div
        class="task-check-box"
        :class="{checked: task.done}"
        @click="$emit('checked', task.id)">

      <fa-icon v-if="task.done" class="task-check-box-icon" icon="check"/>

    </div>

    <div class="task-item" @click="editingId = task.id" >

      <input
          ref="input"
          @blur="updated"
          class="task-item-input"
          :class="{disabled: editingId !== task.id}"
          :value="task.name"
      />

    </div>

    <div class="task-trash-button" @click="$emit('delete', task.id)">

      <fa-icon class="task-trash-icon" icon="trash"/>

    </div>
  </div>

</template>

<script>
export default {
  name: "TaskListItem",
  data() {
    return {
      editingId: null,
      editedVal: "",
    }
  },
  props: {
    task: Object
  },
  methods: {
    updated() {
      this.$emit('update', this.$refs.input.value);
    }
  }
}
</script>

<style scoped>

.task {
  display: flex;
  height: 50px;
  margin-bottom: .5rem;
}

.task-item {
  flex: 1;
  margin-left: .5rem;
}

.task-check-box {
  align-self: center;
  height: 30px;
  width: 30px;
  border: 1px solid lightgrey;
  border-radius: var(--border-radius-default);
  background: #F8F8F8;
}

.task-check-box:hover {
  background: lightgrey;
  cursor: pointer;
}

.task-check-box.checked {
  background: var(--color-vue-green);
  opacity: 0.8;
  border: none;
  transition: 0.2s;
}

.task-check-box.checked:hover {
  opacity: 1;
}

.task-check-box-icon {
  height: inherit;
}

.task.done .task-item-input,  .task.done  .task-item-input:hover{
  background: #F8F8F8;
  cursor: default;
  text-decoration-line: line-through;
  color: darkgrey;
}

.task-item-input {
  height: 100%;
  width: 100%;
  border: none;
  background-color: #F8F8F8;
  border-radius: var(--border-radius-default);
  padding-left: 8px;
  cursor: text;
  color: var(--color-default);
}

.task-item-input:hover, .task-item-input.disabled:hover {
  background: lightgrey;
}


.task-item-input:focus, .task-item-input:focus:hover {
  outline: none;
  background: white;
}

.task-trash-button {
  height: inherit;
  font-size: 20px;
  margin-left: .5rem;
  padding: 0 1rem;
  background: none;
  border-radius: var(--border-radius-default);
  transition: 0.3s;
}

.task.done .task-trash-button {
  color: darkgrey;
}

.task-trash-button:hover, .task.done .task-trash-button:hover {
  background: var(--color-danger);
  color: white;
  cursor: pointer;
  border-radius: var(--border-radius-default);
}

.task-trash-icon {
  height: inherit;
}

</style>
