
export function flattenBookmarksTree (tree) {
  let bookmarks = [];

  if (tree.length > 0) {
    let nodeStack = tree;

    while (nodeStack.length > 0) {

      let currentNode = nodeStack.pop();
      bookmarks.push(currentNode);

      if (currentNode.children && currentNode.children.length > 0) {
        currentNode.children.forEach(childNode => {
          nodeStack.push(childNode);
        });
      }
    }
  }

  return bookmarks;
};

