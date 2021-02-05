<template>
    <div class="modal-content fm-modal-add-tag">
        <div class="modal-header">
            <h5 class="modal-title">{{ lang.modal.addTag.title }}</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="hideModal">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label for="fm-input-add-tag">{{ lang.modal.addTag.fieldName }}</label>
                <tag-input :tags="tags"></tag-input>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-info"
                    v-bind:disabled="submitDisable"
                    v-on:click="addTags">{{ lang.btn.submit }}
            </button>
            <button class="btn btn-default" v-on:click="hideModal">{{ lang.btn.cancel }}</button>
        </div>
    </div>
</template>

<script>
import modal from '../../mixins/modal';
import helper from '../../mixins/helper';

import TagInput from './../TagInput';

export default {
  name: 'Rename',
  mixins: [modal, helper],

  components: {
    TagInput
  },

  data() {
    return {
      tags: []
    };
  },
  computed: {
    // Selected files and folders
    selectedList() {
      return this.$store.getters[`fm/${this.activeManager}/selectedList`];
    },

    // submit button disable
    submitDisable() {
      return this.tags.length == 0
    },
  },
  mounted() {

  },
  methods: {
    // rename item
    addTags() {
      this.$store.dispatch('fm/addTags', {
        selectedList: this.selectedList,
        tags: this.tags
      }).then(() => {
        // close modal window
        this.hideModal();

        this.$store.dispatch('fm/getTags').then((response) => {
          this.$store.commit('fm/setExistingTags', response.data);
        });
      });
    },
  },
};
</script>
