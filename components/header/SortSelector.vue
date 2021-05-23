<template>
  <div class="custom-slct">
    <label>
      <select class="slct js-type-sort" name="order">
        <option class="select-selected" value="default">
          По убыванию доната
        </option>
        <option value="value-desc">По убыванию доната</option>
        <option value="value-asc">По возрастанию доната</option>
        <option value="date-old">Сначала старые</option>
        <option value="date-new">Сначала новые</option>
        <option value="hidd">Только скрытые</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SortSelector',
}
</script>

<style scoped></style>
