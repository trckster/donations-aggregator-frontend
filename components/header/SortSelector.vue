<template>
  <div class="custom-slct">
    <div
      class="select-selected"
      :class="{ 'select-active': $store.getters.isFilterOpen }"
      :data-sort="value"
      @click="$store.commit('toggleFilter')"
    >
      {{ selectedLabel }}
    </div>
    <div
      class="select-items"
      :class="{ 'select-hide': !$store.getters.isFilterOpen }"
    >
      <div
        v-for="(option, i) of options"
        :key="i"
        :data-sort="option.value"
        @click="
          $emit('change', option.value)
          $store.commit('toggleFilter')
        "
      >
        {{ option.label }}
      </div>
    </div>
    <!-- <select
      class="slct js-type-sort"
      name="order"
      @change="$emit('change', $event)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select> -->
  </div>
</template>

<script>
export default {
  name: 'SortSelector',
  props: {
    value: {
      default: 'amount-desc',
      type: String,
    },
  },
  data() {
    return {
      options: [
        {
          value: 'amount-desc',
          label: 'По убыванию доната',
        },
        {
          value: 'amount-asc',
          label: 'По возрастанию доната',
        },
        {
          value: 'time-asc',
          label: 'Сначала старые',
        },
        {
          value: 'time-desc',
          label: 'Сначала новые',
        },
      ],
    }
  },
  computed: {
    selectedLabel() {
      return this.options.find((option) => option.value === this.value).label
    },
  },
}
</script>
