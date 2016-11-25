
function keyComparator (item1, item2, key) {
  let v1 = item1[key];
  let v2 = item2[key];

  if (v1 > v2) {
    return 1;
  }

  if (v1 < v2) {
    return -1;
  }

  return 0;
}

export function bookmarkDefaultComparator (b1, b2) {
  return keyComparator(b1, b2, 'id');
};

export function bookmarkTitleComparatorAsc (b1, b2) {
  return keyComparator(b1, b2, 'title');
};

export function bookmarkTitleComparatorDsc (bookmark1, bookmark2) {
  return bookmarkTitleComparatorAsc(bookmark2, bookmark1);
};

function getNodePathFromMapping (node, nodeMap) {
  let nodePathParts = [];
  let currentParent = nodeMap[node.parentId];

  while (currentParent) {
    nodePathParts.push(currentParent.title);
    currentParent = nodeMap[currentParent.parentId];
  }

  return nodePathParts.reverse().join('/');
}

export function flattenBookmarksTree (tree) {
  let bookmarks = [];

  if (tree.length > 0) {
    let nodeStack = tree;
    let nodeMap = {};

    while (nodeStack.length > 0) {

      let currentNode = nodeStack.pop();

      if (!currentNode.url) {
        nodeMap[currentNode.id] = currentNode;
      }

      currentNode.path = getNodePathFromMapping(currentNode, nodeMap);
      bookmarks.push(currentNode);

      if (currentNode.children && currentNode.children.length > 0) {
        currentNode.children.forEach(childNode => {
          nodeStack.push(childNode);
        });
      }
    }
  }

  return bookmarks.sort(bookmarkDefaultComparator);
};

