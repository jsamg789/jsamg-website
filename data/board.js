/*
  ==========================================================
  JSAMG BOARD OF DIRECTORS
  ==========================================================
  HOW TO UPDATE AFTER AN ELECTION:
  - Change the names and positions below (English and Arabic).
  - To add a personal photo: put the picture in images/board/ and write its path in "photo".
    Example:  photo: "images/board/dr-name.jpg"
  - "specialty" and "bio" are left empty on purpose. Add them only when you have the official text.
  - Please make sure the English spellings of the names are correct.
  - The order of this list does NOT correspond to the order of people in the group photograph.
*/
window.JSAMG = window.JSAMG || {};

window.JSAMG.boardPhoto = {
  src: "images/board/board-group-photo.jpg",
  width: 1280,
  height: 1024
};

window.JSAMG.board = [
  {
    id: "president",
    photo: "",
    en: { name: "Dr. Mohammad Amer Al-Khatib", position: "President", specialty: "", bio: "" },
    ar: { name: "د. محمد عامر الخطيب", position: "رئيس الجمعية", specialty: "", bio: "" }
  },
  {
    id: "vice-president",
    photo: "",
    en: { name: "Dr. Sana Al-Sukhun", position: "Vice President", specialty: "", bio: "" },
    ar: { name: "د. سناء السخن", position: "نائب الرئيس", specialty: "", bio: "" }
  },
  {
    id: "scientific-chair",
    photo: "",
    en: { name: "Dr. Ashraf Haddad", position: "Chair, Scientific Committee", specialty: "", bio: "" },
    ar: { name: "د. أشرف حداد", position: "رئيس اللجنة العلمية", specialty: "", bio: "" }
  },
  {
    id: "secretary",
    photo: "",
    en: { name: "Dr. Maher Al-Saghir", position: "Secretary", specialty: "", bio: "" },
    ar: { name: "د. ماهر الصغير", position: "أمين السر", specialty: "", bio: "" }
  },
  {
    id: "media-chair",
    photo: "images/board/fareed-khdair.jpg",
    en: { name: "Prof. Fareed Khdair", position: "Chair, Media Committee", specialty: "", bio: "" },
    ar: { name: "الأستاذ الدكتور فريد خضير", position: "رئيس اللجنة الإعلامية", specialty: "", bio: "" }
  },
  {
    id: "social-chair",
    photo: "",
    en: { name: "Dr. Arafat Samara", position: "Chair, Social Committee", specialty: "", bio: "" },
    ar: { name: "د. عرفات سمارة", position: "رئيس اللجنة الاجتماعية", specialty: "", bio: "" }
  }
];
