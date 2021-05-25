<template>
  <el-checkbox :value="value" @input="$emit('change', $event)">
    Only hidden?
  </el-checkbox>
</template>

<script>
export default {
  name: 'HiddenCheckbox',
  props: {
    value: {
      default: false,
      type: Boolean,
    },
  },
}
</script>
