<template>
  <div class="container filter-donates">
    <div class="slct__group">
      <SortSelector />
      <HiddenCheckbox />
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
}
</script>

<style scoped></style>
