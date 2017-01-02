
export function keyComparator (key, item1, item2) {
  let v1 = item1[key];
  let v2 = item2[key];

  if (v1 > v2) {
    return 1;
  }

  if (v1 < v2) {
    return -1;
  }

  return 0;
};

export function keyComparatorReverse (key, item1, item2) {
  return keyComparator(key, item2, item1);
};

export function nullComparator () {
  return 0;
}

export function bookmarkDefaultComparator (b1, b2) {
  return keyComparator('id', b1, b2);
};

export function tagDefaultComparator (t1, t2) {
  return keyComparator('id', t1, t2);
};

export function getEntitiesOfType (entityState, entityType) {

  return entityState.allIds.reduce((filteredList, currId) => {
    let entity = entityState.byId[currId];

    if (entity.entityType === entityType) {
      return filteredList.concat(entity);
    }

    return filteredList;
  }, []);
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
  let bookmarks = {};

  if (tree.length > 0) {
    let nodeStack = tree;
    let nodeMap = {};

    while (nodeStack.length > 0) {

      let currentNode = nodeStack.pop();

      if (!currentNode.url) {
        nodeMap[currentNode.id] = currentNode;
      }

      currentNode.path = getNodePathFromMapping(currentNode, nodeMap);
      bookmarks[currentNode.id] = currentNode;

      if (currentNode.children && currentNode.children.length > 0) {
        currentNode.children.forEach(childNode => {
          nodeStack.push(childNode);
        });
      }
    }
  }

  return bookmarks;
};

export function getSortedBookmarkIds (bookmarksById, comparator = bookmarkDefaultComparator) {
  return Object.keys(bookmarksById)
    .map(key => bookmarksById[key])
    .sort(comparator)
    .map(bookmark => bookmark.id);
};

