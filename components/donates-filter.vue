<template>
  <div class="container filter-donates">
    <div class="slct__group">
      <div class="custom-slct">
        <select class="slct js-type-sort" name="order">
          <option value="default">По убыванию доната</option>
          <option value="value-desc">По убыванию доната</option>
          <option value="value-asc">По возрастанию доната</option>
          <option value="date-old">Сначала старые</option>
          <option value="date-new">Сначала новые</option>
          <option value="hidd">Только скрытые</option>
        </select>
      </div>
      <div id="toggle-theme">
        <i class="icon-toggle"></i>
      </div>
    </div>
  </div>
</template>

