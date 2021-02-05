<template>
  <div class="fm-tag-list">
    <span v-for="(tag, index) in existingTags" :key="index" v-on:click.prevent="selectTagState(tag.name, index)" class="badge badge-pill" :class="{ 'badge-info': tag.active }">{{ tag.name }}</span>
  </div>
</template>

<script>
import manager from './../mixins/manager';

import GET from './../http/get-queries';

export default {
  name: 'Tag',
  mixins: [manager],
  props: {
    manager: { type: String, required: true },
  },
  data() {
    return {
      tags: this.existingTags
    };
  },
  computed: {

  },
  mounted() {
    this.getTags()
  },
  methods: {
    getTags() {
      this.$store.dispatch('fm/getTags').then((response) => {
        this.$store.commit('fm/setExistingTags', response.data);
      });
    },

    selectTagState(tag, index) {
      let tagInstance = this.existingTags[index]
      tagInstance.active = !tagInstance.active
      this.existingTags.splice(index, 1, tagInstance)
      this.selectTag()
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
