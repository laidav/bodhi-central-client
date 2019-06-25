export const compareMaps = (map1, map2) => {
  let testVal;
  if (map1.size !== map2.size) {
    return false;
  }
  for (var [key, val] of map1) {
    testVal = map2.get(key);
    // in cases of an undefined value, make sure the key
    // actually exists on the object so there are no false positives
    if (testVal !== val || (testVal === undefined && !map2.has(key))) {
      return false;
    }
  }
  return true;
};

export const getYoutubeEmbedUrl = url => {
  function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return "error";
    }
  }

  return "//www.youtube.com/embed/" + getId(url);
};

export const checkedIdsFromSubjectMap = subjectMap => {
  return Array.from(subjectMap)
    .filter(([subjectId, checked]) => checked)
    .map(item => item[0]);
};

export const arrayUnion = (arr1, arr2) => {
  const result = arr1.concat(arr2);

  for (let i = 0; i < result.length; ++i) {
    for (let j = i + 1; j < result.length; ++j) {
      if (result[i] === result[j]) result.splice(j--, 1);
    }
  }
  return result;
};
