<template>
    <div
        class="drop-down"
        :class="{header: header}"
        @click="handleClick" >

      <h3 class="drop-down-title"> {{ label }} ({{count}})</h3>

      <fa-icon icon="chevron-down" class="drop-down-icon" :class="{'rotate-down': isOpen}"/>

    </div>
</template>

<script>

export default {
  name: "TaskListDropDown",
  props: ['label', 'count', 'isOpen', 'header'],
  methods: {
    handleClick() {
      this.$emit('click', !this.isOpen)
    }
  }

}
</script>

<style scoped>

.drop-down {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  transition: all .3s ease-in-out;

}

.drop-down.header {
  border-radius: 0 0 10px 10px;
  border-top: 1px solid lightgray;
}

.drop-down:hover {
  cursor: pointer;
}

.drop-down-icon {
  width: 50px;
  transition: all .3s ease-in-out;
}

.drop-down-icon.rotate-down {
  transform: rotate(180deg);
}

</style>
