<template>
    <div class="fm-disk-list">
        <ul class="list-inline">
          <li><a href="" v-on:click.prevent="selectTag('test')">test</a></li>
        </ul>
    </div>
</template>

<script>
import helper from './../mixins/helper';
import manager from './../mixins/manager';

export default {
  name: 'Tag',
  mixins: [helper, manager],
  props: {
    manager: { type: String, required: true },
  },
  data() {
    return {};
  },
  computed: {

  },
  methods: {
  },
};
</script>

<style lang="scss">

</style>
