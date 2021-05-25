<template>
  <span class="custom-slct">
    <label>
      <select class="slct js-type-sort" name="order">
        <option class="select-selected" value="default">
          По убыванию доната
        </option>
        <option value="value-desc">По убыванию доната</option>
        <option value="value-asc">По возрастанию доната</option>
        <option value="date-old">Сначала старые</option>
        <option value="date-new">Сначала новые</option>
      </select>
    </label>

    <el-select :value="value" @input="$emit('change', $event)">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </span>
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
          label: 'Сначала старые',
        },
      ],
    }
  },
}
</script>
