(function (bookmarks) {

  var dfs_tree_writer = function (dom_node, root) {
    var i, child;
    for (i = 0; i < root.children.length; i++) {
      child = root.children[i];

      // container for this child
      var li_ele = document.createElement('li');
      dom_node.appendChild(li_ele);

      // add title to li for this item
      var title_ele = document.createElement('span');
      title_ele.textContent = child.id + ' - ' + child.title;
      li_ele.appendChild(title_ele);

      // add input field for bookmarks
      var input_ele = document.createElement('input');
      input_ele.type = 'text';
      chrome.storage.sync.get(child.id, (function (entry_id, data) {
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
            .split(' ');

            // add bookmark tags to storage
            var bookmark_info = {};
            bookmark_info[entry_id] = tags;
            chrome.storage.sync.set(bookmark_info);
        } else {
          // ensure the storage key is removed
          chrome.storage.sync.remove(entry_id);
        }
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

  // grab the tree and start writing it out
  var bookmark_tree = chrome.bookmarks.getTree(function (tree) {

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
  });

})(chrome.bookmarks);
