/*
  ==========================================================
  JSAMG PHOTO GALLERY
  ==========================================================
  The gallery is made of ALBUMS. Each album has a title and a list of photos.

  HOW TO ADD PHOTOS TO AN ALBUM:
  1. Put the picture file in the folder:  images/gallery/
  2. Add one line inside that album's "photos" list, like this:
       { src: "images/gallery/my-photo.jpg",
         en: "Caption in English", ar: "التعليق بالعربية" },

  HOW TO CREATE A NEW ALBUM:
  1. Copy a whole album block (from the { to the matching }, ).
  2. Paste it below the last album.
  3. Change the "id", the titles, and the photos.

  Tip: photos from a phone are very large. Ask Claude to shrink them
  before you upload, so the website stays fast.
*/
window.JSAMG = window.JSAMG || {};

window.JSAMG.gallery = [
  {
    id: "leadership",
    en: {
      title: "Society Leadership",
      description: "The current JSAMG leadership."
    },
    ar: {
      title: "قيادة الجمعية",
      description: "الهيئة الإدارية الحالية للجمعية."
    },
    photos: [
      {
        src: "images/board/board-group-photo.jpg",
        en: "The current JSAMG leadership",
        ar: "الهيئة الإدارية الحالية للجمعية"
      }
    ]
  },
  {
    id: "2026-10-13-scientific-social-evening",
    en: {
      title: "Scientific & Social Evening — October 13, 2026",
      description: "Official poster of the Scientific & Social Evening."
    },
    ar: {
      title: "الأمسية العلمية والاجتماعية — 13 تشرين الأول 2026",
      description: "الملصق الرسمي للأمسية العلمية والاجتماعية."
    },
    photos: [
      {
        src: "images/events/2026-10-13-scientific-social-evening.jpg",
        en: "Official poster of the Scientific & Social Evening",
        ar: "الملصق الرسمي للأمسية العلمية والاجتماعية"
      }
    ]
  }
];
