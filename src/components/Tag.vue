<template>
    <div class="fm-tag-list">
        <span v-for="(tag, index) in tags" :key="index">
          <i class="badge badge-pill" :class="tag.active" v-on:click.prevent="selectTagState(tag.name, index)">{{ tag.name }}</i>
        </span>
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
      let tags = this.tags;
      tags[index].active = !tags[index].active
      this.tags = tags
      this.selectTag(tag)
    },
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
