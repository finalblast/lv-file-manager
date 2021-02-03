<template>
    <div class="fm-tag-list">
        <span v-for="(tag, index) in tags" v-on:click.prevent="selectTagState(tag.name, index)" class="badge badge-pill" :class="tag.active ? 'badge-info' : 'badge-light'">{{ tag.name }}</span>
    </div>
</template>

<script>
import helper from './../mixins/helper';
import manager from './../mixins/manager';

import GET from './../http/get-queries';

export default {
  name: 'Tag',
  mixins: [helper, manager],
  props: {
    manager: { type: String, required: true },
  },
  data() {
    return {
      tags: []
    };
  },
  computed: {

  },
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      GET.tags().then((response) => {
        this.tags = response.data
      })
    },

    selectTagState(tag, index) {
      this.tags[index].active = !this.tags[index].active
      this.selectTag(tag)
    }
  },
};
</script>

<style lang="scss">
  .fm-tag-list {
    span {
      cursor: pointer;
    }
  }
</style>
