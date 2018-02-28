Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'));

new Vue({
  el: '#notebook',

  data: {

    // content: localStorage.getItem('content') || 'You can write in *markdown*' ,
    notes: JSON.parse(localStorage.getItem('notes')) || [] ,
    selectedId: localStorage.getItem('selected-id') || null,


  },

  methods: {

    addNote() {
      const time = Date.now();

      const note = {
        id: String(time),
        title: 'New note ' + (this.notes.length + 1),
        content: '**Hi! ** This notebook is using [markdown(https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formating',
        created: time,
        favourite: false,
      }

      this.notes.push(note);
    },

    selectNote(note) {
      this.selectedId = note.id
    },

    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
      // console.log('Notes are saved');
    },

    removeNote() {
      if (this.selectedNote && confirm('Delete the note?')) {
        const index = this.notes.indexOf(this.selectedNote);

        if(index !== -1) {
          this.notes.splice(index, 1);
        }
      }
    },

    favouriteNote() {
        this.selectedNote.favourite = !this.selectedNote.favourite;
    },

  },

  computed: {

    selectedNote() {
      return this.notes.find(note => note.id === this.selectedId)
    },

    // Markdown rendered to HTML
    notePreview() {
      return this.selectedNote ? marked(this.selectedNote.content) : 'wtf';
    },

    addTitle() {
      return this.notes.length + ' note(s) already';
    },

    sortedNotes() {
      // .sort((a, b) => (a.favourite === b.favourite) ? 0 : a.favourite ? -1)
      return this.notes.slice().sort((a, b) => a.created - b.created);
    },

  },

  // created() {
  //   // Restores previously saved content
  //   this.content = localStorage.getItem('content') || 'You can write in *markdown*' ;
  // },

  watch: {

    notes: {
      handler: 'saveNotes',
      deep: true,
    },

    selectedId(val) {
      localStorage.setItem('selected-id', val);
    },

  }, 


});