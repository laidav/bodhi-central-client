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
  const subjects = [];

  for (const [key, value] of subjectMap) {
    if (value) {
      subjects.push(key);
    }
  }

  return subjects;
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
