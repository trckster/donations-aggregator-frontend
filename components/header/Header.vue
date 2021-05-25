<template>
  <div class="container filter-donates">
    <div class="slct__group">
      <SortSelector :value="value.sort" @change="updateSort" />
      <HiddenCheckbox :value="value.is_hidden" @change="updateIsHidden" />
      <ThemeToggle />
    </div>
  </div>
</template>

<script>
import ThemeToggle from './ThemeToggle'
import SortSelector from './SortSelector'
import HiddenCheckbox from './HiddenCheckbox'
export default {
  name: 'Header',
  components: { HiddenCheckbox, SortSelector, ThemeToggle },
  props: {
    value: {
      type: Object,
      default: () => ({
        sort: 'amount-desc',
        is_hidden: false,
      }),
    },
  },
  methods: {
    updateSort(newValue) {
      const newFilters = this.value
      newFilters.sort = newValue
      this.$emit('change', newFilters)
    },
    updateIsHidden(newValue) {
      const newFilters = this.value
      newFilters.is_hidden = newValue
      this.$emit('change', newFilters)
    },
  },
}
</script>
