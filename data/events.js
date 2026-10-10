/*
  ==========================================================
  JSAMG EVENTS
  ==========================================================
  HOW TO ADD A NEW EVENT:
  1. Copy one whole event block (from the { to the matching }, ).
  2. Paste it just BELOW the last event and change the words.
  3. Give it a new "id", a new "date" (YYYY-MM-DD) and a new poster file name.
  4. Put the poster picture inside the folder:  images/events/

  UPCOMING vs PAST happens automatically:
  once the event date has passed (using Jordan's date), the website moves it
  to the Past Events archive by itself. Nothing is ever deleted.
  (For a multi-day event, add  endDate: "YYYY-MM-DD",  under  date.)

  "categories" decides which filter buttons the event appears under.
  Choose any of:  lecture, conference, panel, social, networking, meeting, cme

  Optional lines can be left empty ("") or removed:
  poster, registrationLink, description, occasion, speaker, speakerTitle,
  talkTitle, panelTitle, panelDescription, dinner, sponsor, photos.

  "photos" is a list of picture paths, for example:
    photos: ["images/events/2026-10-13/photo1.jpg", "images/events/2026-10-13/photo2.jpg"],
*/
window.JSAMG = window.JSAMG || {};

window.JSAMG.eventCategories = {
  lecture:    { en: "Scientific Lectures",      ar: "المحاضرات العلمية" },
  conference: { en: "Conferences",              ar: "المؤتمرات" },
  panel:      { en: "Panel Discussions",        ar: "الجلسات النقاشية" },
  social:     { en: "Social Activities",        ar: "الأنشطة الاجتماعية" },
  networking: { en: "Professional Networking",  ar: "التواصل المهني" },
  meeting:    { en: "Scientific Meetings",      ar: "اللقاءات العلمية" },
  cme:        { en: "Continuing Medical Education", ar: "التعليم الطبي المستمر" }
};

window.JSAMG.events = [
  {
    id: "2026-08-12-social-gathering",
    date: "2026-08-12",
    startTime: "19:30",
    categories: ["lecture", "social", "networking"],
    poster: "images/events/2026-08-12-social-gathering.jpg",
    registrationLink: "",
    galleryAlbum: "2026-08-12-social-gathering",
    photos: [],
    en: {
      title: "JSAMG Social Gathering",
      dateText: "Wednesday, August 12, 2026",
      timeText: "7:30 PM",
      venue: "The St. Regis Amman, Jordan",
      description: "An evening of professional fellowship, welcoming new members, medical education, and recognition of outstanding contributions to medicine, including a Lifetime Achievement Award honoring Dr. Ziad Sharaiha for his pioneering contributions to gastroenterology and advanced medicine.",
      occasion: "Educational Lecture",
      speaker: "Dr. Ihab Shehadeh",
      speakerTitle: "",
      talkTitle: "Current Management of IBS",
      panelTitle: "",
      panelDescription: "",
      dinner: "Formal dinner reception followed the program.",
      sponsor: ""
    },
    ar: {
      title: "اللقاء الاجتماعي لجمعية الأطباء خريجي الولايات المتحدة الأمريكية",
      dateText: "الأربعاء 12 آب 2026",
      timeText: "7:30 مساءً",
      venue: "فندق سانت ريجيس، عمّان، الأردن",
      description: "أمسية للتواصل المهني والترحيب بالأعضاء الجدد، تضمنت محاضرة علمية وتكريمًا للإسهامات المتميزة في الطب، وتكريم الدكتور زياد شرايحة تقديرًا لإسهاماته الرائدة في أمراض الجهاز الهضمي والطب المتقدم.",
      occasion: "محاضرة علمية",
      speaker: "الدكتور إيهاب شحادة",
      speakerTitle: "",
      talkTitle: "التدبير العلاجي الحالي لمتلازمة القولون العصبي (IBS)",
      panelTitle: "",
      panelDescription: "",
      dinner: "تضمن البرنامج حفل عشاء رسميًا.",
      sponsor: ""
    }
  },
  {
    id: "2026-10-13-scientific-social-evening",
    date: "2026-10-13",
    startTime: "19:30",
    endTime: "21:30",
    featured: true,
    categories: ["lecture", "panel", "social"],
    poster: "images/events/2026-10-13-scientific-social-evening.jpg",
    registrationLink: "",
    photos: [],
    en: {
      title: "Scientific & Social Evening",
      dateText: "Tuesday, October 13, 2026",
      timeText: "7:30–9:30 PM",
      venue: "St. Regis Hotel, Amman, Jordan",
      description: "Members are cordially invited to an evening of medical education, professional exchange, and fellowship.",
      occasion: "World Thrombosis Day",
      speaker: "Dr. Sana Al-Sukhun",
      speakerTitle: "Consultant in Medical Oncology & Hematology",
      talkTitle: "Clot, Cancer, and Choice: Anticoagulation Beyond the Oncology Clinic",
      panelTitle: "Practicing Medicine in Jordan for 10+ Years: Challenges, Opportunities & Lessons Learned",
      panelDescription: "The discussion will explore physicians' professional experiences, challenges, opportunities, and lessons learned from practicing medicine in Jordan.",
      dinner: "Dinner will follow the presentations.",
      sponsor: "Khoury Drug Store"
    },
    ar: {
      title: "الأمسية العلمية والاجتماعية لجمعية الأطباء خريجي الولايات المتحدة الأمريكية",
      dateText: "الثلاثاء 13 تشرين الأول 2026",
      timeText: "7:30–9:30 مساءً",
      venue: "فندق سانت ريجيس، عمّان",
      description: "يُدعى الأعضاء إلى أمسية تجمع بين التعليم الطبي والتبادل المهني والزمالة.",
      occasion: "بمناسبة اليوم العالمي للتخثر",
      speaker: "الدكتورة سناء السخن",
      speakerTitle: "استشارية الأورام وأمراض الدم",
      talkTitle: "التخثر والسرطان والاختيار: العلاج بمضادات التخثر خارج عيادة الأورام",
      panelTitle: "ممارسة الطب في الأردن لأكثر من عشر سنوات: التحديات والفرص والدروس المستفادة",
      panelDescription: "ستستعرض الجلسة تجارب الأطباء المهنية والتحديات والفرص والدروس المستفادة من ممارسة الطب في الأردن.",
      dinner: "يتبع المحاضرات والجلسة النقاشية حفل عشاء.",
      sponsor: "مستودع أدوية خوري"
    }
  }
];
