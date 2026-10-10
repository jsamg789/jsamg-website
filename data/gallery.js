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
    id: "2026-08-12-social-gathering",
    en: {
      title: "JSAMG Social Gathering — August 12, 2026",
      description: "An evening of professional fellowship, an educational lecture by Dr. Ihab Shehadeh on the current management of IBS, and recognition of Dr. Ziad Sharaiha. St. Regis Amman."
    },
    ar: {
      title: "اللقاء الاجتماعي للجمعية — 12 آب 2026",
      description: "أمسية للتواصل المهني تضمنت محاضرة للدكتور إيهاب شحادة حول أحدث طرق علاج القولون العصبي، وتكريم الدكتور زياد شرايحة، في فندق سانت ريجيس عمّان."
    },
    photos: [
      { src: "images/gallery/2026-08-12-social-gathering/photo-01.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-02.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-03.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-04.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-05.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-06.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-07.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-08.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-10.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-11.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-12.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-13.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-14.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-15.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-16.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-17.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-18.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-19.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-20.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-21.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-22.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-23.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-24.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-25.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-26.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-27.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-28.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-29.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-30.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-31.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-32.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-33.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-34.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-35.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-36.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-37.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-38.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-39.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-40.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-41.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-42.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-43.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-44.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-45.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-46.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-47.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-48.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-49.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-50.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-51.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-52.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-53.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" },
      { src: "images/gallery/2026-08-12-social-gathering/photo-54.jpg", en: "JSAMG Social Gathering — August 12, 2026", ar: "اللقاء الاجتماعي للجمعية — 12 آب 2026" }
    ]
  },

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
