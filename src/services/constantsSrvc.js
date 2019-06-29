export const API_V1 = "/api/v1.0";

export const dateFormats = {
  short: "MMMM DD, YYYY"
};

export const reactModal = {
  overlayBg: "rgba(0, 0, 0, 0.7)"
};

export const subjects = {
  WISDOM: 11,
  RIGHT_VIEW: 4,
  RIGHT_INTENTION: 1,
  ETHICS: 10,
  RIGHT_SPEECH: 8,
  RIGHT_LIVELIHOOD: 3,
  RIGHT_ACTION: 6,
  MEDITATION: 9,
  RIGHT_EFFORT: 7,
  RIGHT_MINDFULNESS: 5,
  RIGHT_CONCENTRATION: 2,
  BUDDHA: 12
};

export const subjectsList = [
  { id: 12, first_child_id: 11, right_sibling_id: null, name: "Buddha" },
  {
    id: 1,
    first_child_id: null,
    right_sibling_id: null,
    name: "Right Intention"
  },
  {
    id: 2,
    first_child_id: null,
    right_sibling_id: null,
    name: "Right Concentration"
  },
  {
    id: 3,
    first_child_id: null,
    right_sibling_id: null,
    name: "Right Livelihood"
  },
  { id: 4, first_child_id: null, right_sibling_id: 1, name: "Right View" },
  {
    id: 5,
    first_child_id: null,
    right_sibling_id: 2,
    name: "Right Mindfulness"
  },
  { id: 6, first_child_id: null, right_sibling_id: 3, name: "Right Action" },
  { id: 7, first_child_id: null, right_sibling_id: 5, name: "Right Effort" },
  { id: 8, first_child_id: null, right_sibling_id: 6, name: "Right Speech" },
  { id: 9, first_child_id: 7, right_sibling_id: null, name: "Meditation" },
  { id: 10, first_child_id: 8, right_sibling_id: 9, name: "Ethics" },
  { id: 11, first_child_id: 4, right_sibling_id: 10, name: "Wisdom" }
];

export const actionConstants = {
  TOGGLE_SUBJECT_FILTER: "TOGGLE_SUBJECT_FILTER",
  POST_PRACTICE_REQUEST: "POST_PRACTICE_REQUEST",
  POST_PRACTICE_REFRESH_REQUEST: "POST_PRACTICE_REFRESH_REQUEST",
  POST_PRACTICE_SUCCESS: "POST_PRACTICE_SUCCESS",
  POSTS_PRACTICE_REQUEST: "POSTS_PRACTICE_REQUEST",
  POSTS_PRACTICE_REFRESH_REQUEST: "POSTS_PRACTICE_REFRESH_REQUEST",
  POSTS_PRACTICE_SUCCESS: "POSTS_PRACTICE_SUCCESS",
  PRACTICE_FAILURE: "PRACTICE_FAILURE",
  PRACTICE_EXPLORER_REQUEST: "PRACTICE_EXPLORER_REQUEST",
  PRACTICE_EXPLORER_REFRESH_REQUEST: "PRACTICE_EXPLORER_REFRESH_REQUEST",
  PRACTICE_EXPLORER_SUCCESS: "PRACTICE_EXPLORER_SUCCESS",
  PRACTICE_EXPLORER_FAILURE: "PRACTICE_EXPLORER_FAILURE",
  PRACTICE_ADDED: "PRACTICE_ADDED",
  PRACTICE_DELETED: "PRACTICE_DELETED",
  PRACTICE_EDITTED: "PRACTICE_EDITTED",
  PRACTICE_ADDED_UPDATE_PRACTICE_EXPLORER:
    "PRACTICE_ADDED_UPDATE_PRACTICE_EXPLORER"
};
