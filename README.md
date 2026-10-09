# JSAMG Website — Maintenance Guide

Jordanian Society of American Medical Graduates (JSAMG)
جمعية الأطباء خريجي الولايات المتحدة الأمريكية

This is a simple website made of ordinary files. There is no database, no
monthly fee, and nothing to install. You can open it on your own computer,
and it can be published for free with GitHub Pages.

---

## 1. What is inside the folder?

```
jsamg-website/
├── index.html          ← Home page
├── about.html          ← About Us
├── board.html          ← Board of Directors
├── events.html         ← Events (upcoming + past archive)
├── news.html           ← News & Announcements
├── gallery.html        ← Photo Gallery
├── membership.html     ← Membership
├── contact.html        ← Contact Us
├── .nojekyll           ← helper file for GitHub Pages (leave it)
│
├── data/               ← ★ THE FOLDER YOU WILL EDIT ★ (all the content)
│   ├── events.js       ← all events
│   ├── news.js         ← all news
│   ├── board.js        ← Board of Directors
│   ├── gallery.js      ← photo albums
│   ├── contact.js      ← address, telephone, social media (optional)
│   ├── site-text.js    ← menu, footer, homepage words, official email
│   └── text-*.js       ← words of each page (About, Membership, …)
│
├── images/             ← pictures
│   ├── logo/           ← the official logo (do not change)
│   ├── board/          ← board photographs
│   ├── events/         ← event posters
│   ├── news/           ← pictures for news items
│   └── gallery/        ← gallery photographs
│
├── css/style.css       ← colors and design (leave alone)
└── js/main.js          ← the website's engine (leave alone)
```

**The golden rule:** to change *content*, edit files inside `data/` and add
pictures inside `images/`. You almost never need to touch anything else.

Every piece of text exists twice: `en:` (English) and `ar:` (Arabic).
Always update **both**.

---

## 2. How to see your changes on your computer first

1. Save the file you edited.
2. Double-click `index.html` (or the page you changed) to open it in Chrome.
3. Press **F5** to refresh. If you still see the old version, press
   **Ctrl + Shift + R**.

---

## 3. How to edit a data file safely

Data files look like this:

```js
{
  id: "my-event",
  date: "2026-12-01",
  en: { title: "My Event" },
  ar: { title: "فعاليتي" }
},
```

- Change **only the words between the quotation marks** `" "`.
- Keep every **quotation mark**, **comma**, **brace** `{ }` and **bracket** `[ ]`.
- Copy-and-paste a whole block rather than typing a new one from scratch.
- If the page goes blank after an edit, a comma or quotation mark is probably
  missing. Undo your last change, or ask Claude to check the file.

Use a plain text editor (Notepad on Windows, or VS Code). **Do not use
Microsoft Word** — it changes the quotation marks.

---

## 4. Add a new scientific event

1. Put the poster picture in `images/events/` (for example `2026-12-01-lecture.jpg`).
2. Open `data/events.js`.
3. Copy the whole October 13 block (from its `{` to its `},`).
4. Paste it **just below** the last event.
5. Change: `id`, `date` (format `YYYY-MM-DD`), `startTime`, `endTime`,
   `categories`, `poster`, and every English and Arabic line.
6. Delete any optional line you do not need (speaker, panel, dinner, sponsor …).
7. To add a registration button, write the link in `registrationLink: "https://..."`.

**Upcoming → Past is automatic.** After the event date has passed (using
Jordan's date), the event moves to the *Past Events Archive* by itself.
You never delete it and never move it by hand. The archive section appears on
the Events page as soon as the first event has passed.

For a multi-day event add `endDate: "2027-03-12",` under `date`.

**Event photographs:** add pictures to the event's `photos` list, e.g.
`photos: ["images/events/2026-10-13/photo1.jpg"],`.

The banner on the homepage ("Next event — date") and the featured event
update themselves from `data/events.js`.

---

## 5. Add a news item

1. (Optional) Put a picture in `images/news/`.
2. Open `data/news.js`.
3. Copy one whole news block and paste it at the **top** of the list.
4. Change the `id`, `date`, `category`, and the English and Arabic title and text.
5. `image` and `link` are optional — leave them as `""` if not needed.

The homepage shows the 3 newest items. Only real news should be added.

---

## 6. Add photographs and albums

1. **Shrink the photos first.** Phone photos are very large and slow the
   website. Ask Claude: *"Please resize these photos for the website."*
2. Put the pictures in `images/gallery/`.
3. Open `data/gallery.js`.
4. To add to an existing album, add a line inside its `photos` list:
   ```js
   { src: "images/gallery/my-photo.jpg", en: "Caption in English", ar: "التعليق بالعربية" },
   ```
5. To create a **new album**, copy a whole album block, paste it below the
   last one, and change its `id`, titles, and photos.

An album with no photos is hidden automatically.

---

## 7. Update the Board of Directors (after an election)

1. Open `data/board.js`.
2. Change the names and positions (English **and** Arabic).
3. To add a personal photo: put it in `images/board/`, then write
   `photo: "images/board/dr-name.jpg",` in that person's block.
4. To add a specialty or a short biography, fill in `specialty` and `bio`
   with the **official** text only. They stay hidden while empty.
5. To replace the group photograph, save the new file in `images/board/` and
   change the `src` line at the top of `data/board.js` (and in `data/gallery.js`).

---

## 8. Change contact details (address, telephone, social media)

Open `data/contact.js`. Fill in only what is official; anything left empty
stays hidden. It then appears on the Contact page **and** the homepage.

```js
address: { en: "Your address in English", ar: "العنوان بالعربية" },
phone: "+962 6 000 0000",
social: [
  { name: "Facebook", url: "https://www.facebook.com/your-page" },
],
```

The official email address is stored once, at the top of `data/site-text.js`
(`email: "info.jsamg@gmail.com"`). Change it there and it updates everywhere.

---

## 9. Edit text on the pages

| To change…                          | Open this file            |
|-------------------------------------|---------------------------|
| Menu, footer, homepage words        | `data/site-text.js`       |
| About Us page                       | `data/text-about.js`      |
| Board page words                    | `data/text-board.js`      |
| Events page words                   | `data/text-events.js`     |
| News page words                     | `data/text-news.js`       |
| Gallery page words                  | `data/text-gallery.js`    |
| Membership page                     | `data/text-membership.js` |
| Contact page                        | `data/text-contact.js`    |

---

## 10. Information still missing (add it whenever you have it)

The website looks complete without these. Each item below is **hidden** until
you fill it in, and then appears by itself.

| Information                         | Where to add it                              |
|-------------------------------------|----------------------------------------------|
| Society history / founding date     | `data/text-about.js` → `history`             |
| Official mission statement          | `data/text-about.js` → `mission`             |
| Official vision statement           | `data/text-about.js` → `vision`              |
| Official objectives                 | `data/text-about.js` → `objectives`          |
| Membership eligibility              | `data/text-membership.js` → `eligibility`    |
| Membership benefits                 | `data/text-membership.js` → `benefits`       |
| How to apply (official steps)       | `data/text-membership.js` → `steps`          |
| Address                             | `data/contact.js` → `address`                |
| Telephone                           | `data/contact.js` → `phone`                  |
| Social media accounts               | `data/contact.js` → `social`                 |
| Individual board photographs        | `images/board/` + `photo` in `data/board.js` |
| Board members' specialties / bios   | `specialty` and `bio` in `data/board.js`     |
| Photographs from society events     | `images/gallery/` + `data/gallery.js`        |

Please also double-check the **English spelling of each board member's name**
in `data/board.js`.

**Do not add fees, eligibility rules, or achievements unless they are official.**

---

## 11. Update the live website through GitHub (after publishing)

Once the website is published, every update follows the same simple pattern.
You only use the GitHub website — no programs to install, no commands.

**To change a text or data file**

1. Sign in at github.com and open your website's repository.
2. Click the folder `data`, then click the file you want (for example `events.js`).
3. Click the **pencil icon** (Edit this file).
4. Make your change (see sections 3–9 above).
5. Click the green **Commit changes** button, then confirm.
6. Wait 1–2 minutes, then open your website and press **Ctrl + Shift + R**.

**To add a picture**

1. Open the repository and click the folder where the picture belongs
   (for example `images` → `events`).
2. Click **Add file** → **Upload files**.
3. Drag your picture in, then click **Commit changes**.
4. Edit the matching data file (events, news, gallery, board) to use the picture.

GitHub's button names can change slightly over time. When you reach this
step, ask Claude and we will go through it together on your screen.

---

## 12. Updating with Claude (including the free plan)

You never need to understand the code. A simple routine:

1. Open a chat with Claude and **paste the whole content of the data file**
   you want to change (for example `data/events.js`).
2. Tell Claude what you want, for example:
   > "Add this event to the file, in English and Arabic, and keep everything
   > else exactly the same. Date: … Time: … Venue: … Speaker: …"
3. Copy Claude's complete answer.
4. On GitHub, edit that same file (section 11), delete the old content,
   paste the new content, and click **Commit changes**.

For photographs, ask Claude to resize them first, then upload them to the
`images` folder as in section 11.

Other useful requests:

- *"Add this news item to data/news.js: …"*
- *"Update the Board of Directors after the election: …"*
- *"Translate this text into natural, professional Arabic."*
- *"Check this file for mistakes before I save it."*
- *"Add a new page called Publications, in the same style as the others."*

---

## 13. Things to avoid

- Do not rename the files or folders (the pages find each other by name).
- Do not edit the logo or the original photographs.
- Do not change `css/style.css` or `js/main.js` unless Claude tells you to.
- Do not use Microsoft Word to edit data files.

---

## 14. Notes about publishing

- The website is static (HTML, CSS and JavaScript only) and works on GitHub
  Pages without any build step. All links inside the site are relative, so it
  works both from a folder on your computer and from a GitHub Pages address.
- After the website has its public address, search-engine extras (a sitemap,
  a robots file, and full address links for social-media previews) can be
  added in one short step with Claude.
