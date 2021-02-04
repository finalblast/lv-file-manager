// Event bus
import EventBus from './../eventBus';

export default {
  computed: {
    selectedDisk() {
      return this.$store.state.fm[this.manager].selectedDisk;
    },

    // Selected directory
    selectedDirectory() {
      return this.$store.state.fm[this.manager].selectedDirectory;
    },

    // files list for selected directory
    files() {
      return this.$store.state.fm[this.manager].files;
    },

    // directories list for selected directory
    directories() {
      return this.$store.state.fm[this.manager].directories;
    },

    // selected files and folders
    selected() {
      return this.$store.state.fm[this.manager].selected;
    },

    // selected files and folders
    selectionType() {
      return this.$store.getters['fm/selectionType'];
    },

    // selected files and folders
    existingTags() {
      return this.$store.getters['fm/existingTags'];
    }
  },
  methods: {
    /**
     * Load selected directory and show files
     * @param path
     */
    selectDirectory(path) {
      this.$store.dispatch(`fm/${this.manager}/selectDirectory`, { path, history: true });
    },

    selectTag() {
      let tags = this.tags;

      let selectedTags = [];

      for (let i = 0; i < tags.length; i++) {
        if (tags[i].active) {
          selectedTags.push(tags[i].name)
        }
      }

      if (selectedTags.length) {
        this.$store.dispatch(`fm/${this.manager}/selectTag`, { selectedTags });
      } else {
        let path = this.selectedDirectory;
        this.$store.dispatch(`fm/${this.manager}/selectDirectory`, { path, history: true });
      }
    },

    // Level up directory
    levelUp() {
      // if this a not root directory
      if (this.selectedDirectory) {
        // calculate up directory path
        const pathUp = this.selectedDirectory.split('/').slice(0, -1).join('/');

        // load directory
        this.$store.dispatch(`fm/${this.manager}/selectDirectory`, { path: pathUp || null, history: true });
      }
    },

    /**
     * Check item - selected
     * @param type
     * @param path
     */
    checkSelect(type, path) {
      return this.selected[type].includes(path);
    },

    /**
     * Select items in list (files + folders)
     * @param type
     * @param path
     * @param event
     */
    selectItem(type, path, event) {
      // search in selected array
      const alreadySelected = this.selected[type].includes(path);

      // if multi select
      if (this.selectionType === 'multiple') {
        if (!alreadySelected) {
          // add new selected item
          this.$store.commit(`fm/${this.manager}/setSelected`, { type, path });
        } else {
          // remove selected item
          this.$store.commit(`fm/${this.manager}/removeSelected`, { type, path });
        }
      } else if (!alreadySelected) {
        this.$store.commit(`fm/${this.manager}/changeSelected`, { type, path });
      }
    },

    /**
     * Show context menu
     * @param item
     * @param event
     */
    contextMenu(item, event) {
      // el type
      const type = item.type === 'dir' ? 'directories' : 'files';
      const path = item.path;
      // search in selected array
      const alreadySelected = this.selected[type].includes(path);

      // if multi select
      if (this.selectionType === 'multiple') {
        if (!alreadySelected) {
          // add new selected item
          this.$store.commit(`fm/${this.manager}/setSelected`, { type, path });
        }
      } else if (!alreadySelected) {
        this.$store.commit(`fm/${this.manager}/changeSelected`, { type, path });
      }

      // create event
      EventBus.$emit('contextMenu', event);
    },
  },
};
