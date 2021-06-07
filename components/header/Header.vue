<template>
  <div class="container filter-donates">
    <div class="slct__group">
      <SortSelector :value="sort" @change="updateSort" />
      <HiddenToggle :value="is_hidden" @change="updateIsHidden" />
      <ThemeToggle />
    </div>
  </div>
</template>

<script>
import ThemeToggle from './ThemeToggle'
import SortSelector from './SortSelector'
import HiddenToggle from './HiddenToggle'
export default {
  name: 'Header',
  components: {
    HiddenToggle,
    SortSelector,
    ThemeToggle,
  },
  data() {
    return {
      sort: 'amount-desc',
      is_hidden: false,
    }
  },
  methods: {
    updateSort(newValue) {
      this.sort = newValue
      this.$emit('change', { sort: newValue })
    },
    updateIsHidden(newValue) {
      this.is_hidden = newValue
      this.$emit('change', { is_hidden: newValue })
    },
  },
}
</script>
