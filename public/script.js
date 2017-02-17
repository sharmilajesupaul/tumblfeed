// Card Component
// - represents tumblr post
// - I would put them in a different folder under /components but since this is a
// simple application that isn't UI heavy, I decided to inlude the single one that
// I'm using here.
var Card = {
  template: document.getElementById('card').innerHTML,
  props: ['index', 'summary', 'imageUrl', 'body', 'isFavorite', 'type', 'postUrl'],
  methods: {
    emitFavorite: function(event) {
      this.$emit('favorite_post', this);
    },
    emitUnfavorite: function() {
      this.$emit('unfavorite_post', this);
    }
  }
};

// Tumblr Service
// Fetches data from tumblr.com
var Tumblr = {
  query: function(app, params) {
    return app.$http.post('/find_posts', params, function(blog) {
      return blog;
    }, function(error) {
      return { error: true }
    });
  }
};

// Imports Vue Resource -
// I would use a require statement and a front end build system.
// But I decided to just load in the dependencies in index.html for the sake
// of time.
Vue.use(VueResource);

// Instantiates the application
new Vue({
  el: '#root-wrapper',

  data: {
    posts: [],
    favorites: [],
    queryError: false,
    noQuery: false,
    loading: true,
    blog: "zandraart",
    tag: ""
  },

  components: {
    'card': Card
  },

  mounted: function() {
    this.queryPosts();
  },

  methods: {
    favorite: function(props) {
      this.favorites.push(props);
    },
    unfavorite: function(props) {
      var index = this.favorites.indexOf(props);
      this.favorites.splice(props.index, 1);
    },
    // Queries posts by tag and blog name
    queryPosts: function() {
      // if there is no tag or blog name, show error message
      this.noQuery = !this.tag && !this.blog;
      // refresh posts and show loading icon
      this.posts = [];
      this.loading = true;
      // remove any previous errors
      this.queryError = false;

      // Query for a new set of posts
      Tumblr.query(this, { tag: this.tag, blog: this.blog }).then(function(res) {
        this.posts = res.body.response.posts ? res.body.response.posts : res.body.response;
        this.loading = false;
      }).catch(function(error) {
        this.loading = false;
        if (!this.noQuery) {
          this.queryError = true;
        }
      });
    }
  }
});
