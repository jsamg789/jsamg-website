/*
  ==========================================================
  JSAMG NEWS & ANNOUNCEMENTS
  ==========================================================
  HOW TO ADD A NEWS ITEM:
  1. Copy one whole block (from the { to the matching }, ).
  2. Paste it at the TOP of the list (just under the [ line) and change the words.
  3. "date" format is YYYY-MM-DD.
  4. "image" and "link" are optional. Leave them as "" if not needed.
     Put pictures in the folder images/news/
  5. "category" decides the filter button. Choose one of:
       scientific, society, achievement, collaboration, education, update
*/
window.JSAMG = window.JSAMG || {};

window.JSAMG.newsCategories = {
  scientific:    { en: "Scientific Announcements",   ar: "إعلانات علمية" },
  society:       { en: "Society News",               ar: "أخبار الجمعية" },
  achievement:   { en: "Member Achievements",        ar: "إنجازات الأعضاء" },
  collaboration: { en: "Professional Collaborations", ar: "التعاون المهني" },
  education:     { en: "Educational Initiatives",    ar: "مبادرات تعليمية" },
  update:        { en: "Important Updates",          ar: "مستجدات مهمة" }
};

window.JSAMG.news = [
  {
    id: "2026-10-13-scientific-social-evening-report",
    date: "2026-10-14",
    category: "society",
    image: "images/gallery/2026-10-13-scientific-social-evening/photo-01.jpg",
    link: "gallery.html",
    en: {
      title: "JSAMG Hosts Scientific and Social Evening in Amman",
      text: "On October 13, 2026, JSAMG hosted a scientific and social evening at The St. Regis Amman. Dr. Sana Al-Sukhun delivered a World Thrombosis Day lecture, followed by a panel on practicing medicine in Jordan for over ten years, featuring Dr. Maher Sughayer of King Hussein Cancer Center, Dr. Arafat Samara from private practice, and Prof. Fareed Khdair of the University of Jordan. Members enriched the discussion with their experiences and perspectives. The evening concluded with dinner. JSAMG thanks all attendees and Khoury Drug Store for its generous sponsorship, and looks forward to further scientific and social gatherings. View the event photo gallery."
    },
    ar: {
      title: "جمعية الأطباء خريجي الولايات المتحدة الأمريكية تنظّم لقاءً علمياً واجتماعياً",
      text: "نظّمت الجمعية (JSAMG) يوم الثلاثاء 13 تشرين الأول 2026 لقاءً علمياً واجتماعياً في فندق سانت ريجيس عمّان. استُهل اللقاء بمحاضرة علمية قيّمة للدكتورة سناء السخن بمناسبة اليوم العالمي للتخثر، تلتها جلسة نقاشية حول ممارسة الطب في الأردن لأكثر من عشر سنوات، شارك فيها الدكتور ماهر الصغيّر من مركز الحسين للسرطان، والدكتور عرفات سمارة من القطاع الخاص، والأستاذ الدكتور فريد خضير من الجامعة الأردنية. وأثرى الحضور النقاش بمداخلاتهم وتجاربهم، واختُتم اللقاء بعشاء جمع أعضاء الجمعية. وتتقدم الجمعية بالشكر لجميع المشاركين ولمستودع أدوية خوري على رعايته الكريمة، وتتطلع إلى تنظيم لقاءات علمية واجتماعية دورية قادمة. شاهدوا صور اللقاء في معرض الصور."
    }
  },

  {
    id: "2026-08-12-social-gathering-report",
    date: "2026-08-12",
    category: "society",
    image: "images/gallery/2026-08-12-social-gathering/photo-01.jpg",
    link: "gallery.html",
    en: {
      title: "JSAMG Social Gathering — August 2026",
      text: "JSAMG held a social gathering at the St. Regis Amman on August 12, 2026, featuring a lecture by Dr. Ihab Shehadeh on the current management of IBS, a welcome to new members, and recognition of Dr. Ziad Sharaiha for his contributions to gastroenterology and advanced medicine. View the event photo gallery."
    },
    ar: {
      title: "اللقاء الاجتماعي لجمعية الأطباء خريجي الولايات المتحدة الأمريكية — آب 2026",
      text: "أقامت الجمعية لقاءً اجتماعياً في فندق سانت ريجيس عمّان يوم 12 آب 2026، تضمن الترحيب بالأعضاء الجدد ومحاضرة للدكتور إيهاب شحادة حول أحدث طرق علاج القولون العصبي، وتكريم الدكتور زياد شرايحة تقديراً لإسهاماته في أمراض الجهاز الهضمي والطب المتقدم. يمكنكم مشاهدة صور اللقاء في معرض الصور."
    }
  },

];
