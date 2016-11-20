
!(function (bookmarks, storage) {

  // create a searchable data object for searching tags
  var tags;
  var tags_keys;
  var refresh_tags = function () {
    storage.sync.get(null, function (data) {
      // reset tag variables
      tags = {};
      tags_keys = [];

      // loop through all bookmark ids
      var id;
      for (id in data) {
        var bookmark_tags = data[id];
        var i;
        for (i = 0; i < bookmark_tags.length; i++) {
          var tag = bookmark_tags[i];
          if (tag in tags) {
            // this tag already exists, just add id if unique
            if (!(id in tags[tag])) {
              tags[tag].push(id);
            }
          } else {
            // doesn't exist yet, initialize it
            tags[tag] = [id];
          }
        }
      }

      // keep a list of all the keys
      tags_keys = Object.keys(tags);
    });
  };

  // tags stored as {<bookmark_id>: [<tag>,...]}
  var add_tags = function (id, tags) {
    var bookmark_info = {};
    bookmark_info[id] = tags;
    storage.sync.set(bookmark_info);
  };

  var dfs_tree_writer = function (dom_node, root) {
    var i, child;
    for (i = 0; i < root.children.length; i++) {
      child = root.children[i];

      // container for this child
      var li_ele = document.createElement('li');
      dom_node.appendChild(li_ele);

      // add title to li for this item
      var title_ele = document.createElement('span');
      if (child.url) {
        // this is an acutal bookmark, use a link
        var title_a_ele = document.createElement('a');
        title_a_ele.href = child.url;
        title_a_ele.textContent = child.title;
        title_a_ele.target = '_blank';
        title_ele.appendChild(title_a_ele);
      } else {
        // this is a folder, use just the title
        title_ele.textContent = child.title;
      }
      li_ele.appendChild(title_ele);

      // add input field for bookmarks
      var input_ele = document.createElement('input');
      input_ele.type = 'text';
      storage.sync.get(child.id, (function (entry_id, data) {
        if (data[entry_id]) {
          this.value = data[entry_id].join(',');
        }
      }).bind(input_ele, child.id));
      li_ele.appendChild(input_ele);

      // add save button for changing tags
      var save_btn = document.createElement('button');
      save_btn.textContent = 'Save';
      save_btn.addEventListener('click', (function (entry_id) {
        if (this.value) {
          // get list of tags as an array
          var tags = this.value
            // ensure multiple spaces in a row become only one space
            .replace(/\s{2,}/g, ' ')
            // ensure extra spaces around commas are reduced
            .replace(/\s?,\s?/g, ',')
            // turn this into an array
            .split(',');

            // add bookmark tags to storage
            add_tags(entry_id, tags);
        } else {
          // ensure the storage key is removed
          storage.sync.remove(entry_id);
        }

        // refresh tags
        refresh_tags();

      }).bind(input_ele, child.id));
      li_ele.appendChild(save_btn);

      if (!child.url) {
        // this is a folder, continue deeper
        var ul_ele = document.createElement('ul');
        li_ele.appendChild(ul_ele);

        dfs_tree_writer(ul_ele, child);
      }
    }
  };

  // set up tag search input and search results
  var search_input = document.getElementById('searchInput');
  var search_results = document.getElementById('searchResults');
  search_input.addEventListener('keyup', function () {
    var query = search_input.value;

    var matching_ids = [];
    if (query) {
      // loop through tags and add matching ids
      var i;
      for (i = 0; i < tags_keys.length; i++) {
        // does this tag start with the given query?
        var tag = tags_keys[i];
        if (tag.startsWith(query)) {
          // ensure we're only adding unique ids
          var j;
          for (j = 0; j < tags[tag].length; j++) {
            var id = tags[tag][j];
            var id_in_matches = false;
            var k;
            for (k = 0; k < matching_ids.length; k++) {
              if (id === matching_ids[k]) {
                // found a match, we can stop searching
                id_in_matches = true;
                break;
              }
            }

            if (!id_in_matches) {
              // didn't find the id in the list yet, add it
              matching_ids.push(id);
            }
          }
        }
      }
    }

    // build search results
    if (matching_ids.length > 0) {
      // have at least one match, clear out and rebuild results
      bookmarks.get(matching_ids, function (matches) {
        var results_ele = document.createElement('ul');
        var i;
        for (i = 0; i < matches.length; i++) {
          var bookmark_ele = document.createElement('li');
          bookmark_ele.innerHTML = matches[i].title
          results_ele.appendChild(bookmark_ele);
        }
        search_results.innerHTML = results_ele.outerHTML;
      });
    } else {
      // no results, let user know
      search_results.innerHTML = 'No search results.';
    }
  });

  var setup = function () {
    // grab the tree and start writing it out
    bookmarks.getTree(function (tree) {

      // find container to store list in
      var bookmark_list = document.getElementById('bookmarkList');

      if (tree.length > 0) {
        // start off the list
        bookmark_list.textContent = '';
        var ul_ele = document.createElement('ul');

        var i;
        for (i = 0; i < tree.length; i++) {
          dfs_tree_writer(ul_ele, tree[i]);
        }
      } else {
        bookmark_list.textContent = 'No bookmarks found.';
      }

      bookmark_list.appendChild(ul_ele);

      refresh_tags();
    });
  };

  setup();

})(chrome.bookmarks, chrome.storage);
