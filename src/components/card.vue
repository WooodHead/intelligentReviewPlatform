<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['textcnm']
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
