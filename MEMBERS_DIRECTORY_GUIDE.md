# Members Directory — How to Update It
# دليل الأعضاء — طريقة التحديث

The Members Directory page is `members.html`. You never need to edit that page.
Everything you change lives in **two places**:

| What you want to do            | Where                     |
|--------------------------------|---------------------------|
| Add, edit, hide or remove a member | `data/members.json`   |
| Add or replace a photograph    | `members-photos/` folder  |

After any change on GitHub, wait 1–2 minutes, open the website and press
**Ctrl + Shift + R** (or pull down to refresh on a phone).

> ⚠️ **Privacy — please read.** Everything inside `data/members.json` can be
> downloaded by anyone on the internet, even fields the page does not show.
> **Never** put personal mobile numbers, private email addresses, national ID
> numbers, registration answers, committee choices or comments in this file.
> Only add a clinic phone number if the member agreed to publish it.

---

## 1. Every member has a permanent ID

Each member has an ID like `JSAMG-001`, `JSAMG-002` … `JSAMG-042`.

- The ID never changes, even if the member's details change.
- A new member gets the **next unused number** (the next one is `JSAMG-043`).
- **Never reuse** an ID, even if a member is removed.
- The ID is also the member's **photo file name**.

**To see every member's ID on the page**, open the directory with `?ids=1`
at the end of the address, for example:
`https://jsamg789.github.io/jsamg-website/members.html?ids=1`
(Visitors never see the IDs unless they add this themselves.)

---

## 2. Add or replace a photograph (no code needed)

1. Prepare a photo of the member's face, preferably **square**
   (for example 400 × 400 pixels). Ask Claude to crop/resize it if needed.
2. Save it as **JPG** and name it exactly with the member's ID:
   `JSAMG-007.jpg`  ← capital letters, dash, three digits, `.jpg`
3. On GitHub, open the folder `members-photos` → **Add file** → **Upload files**,
   drag the photo in, and click **Commit changes**.

That's all. The photo appears automatically, cut into a circle.
Members without a photo show the default avatar.

- **To replace a photo:** upload a new file with the **same name**. GitHub will
  replace the old one.
- **To remove a photo:** delete the file. The default avatar comes back.
- **Not a JPG?** (PNG, WEBP…) Either convert it to JPG, or upload it and write its
  file name in that member's `"photo"` line, e.g. `"photo": "JSAMG-007.png",`

---

## 3. Edit a member's information

1. On GitHub, open `data` → `members.json` → click the **pencil** (Edit).
2. Press **Ctrl + F** and search for the member's name or ID.
3. Change only the text **between the quotation marks**.
4. Click **Commit changes**.

What each line means:

```json
{
  "id": "JSAMG-007",                     ← permanent ID (do not change)
  "name_en": "Mohammed Akram Sbeih",     ← name in English
  "name_ar": "محمد أكرم عزيز صبيح",        ← name in Arabic
  "specialty_en": "Surgery",             ← main specialty (used in the Specialty filter)
  "specialty_ar": "الجراحة",
  "subspecialty_en": "Bariatric Surgery",← optional
  "subspecialty_ar": "جراحة السمنة",
  "institution_en": "…",                 ← optional: current hospital / university / clinic
  "institution_ar": "…",
  "city_en": "Amman",                    ← optional; two cities: "Amman, Bakersfield"
  "city_ar": "عمّان",                     ←          in Arabic:  "عمّان، بيكرسفيلد"
  "country_en": "Jordan",                ← two countries: "Jordan, USA"
  "country_ar": "الأردن",                 ← in Arabic: "الأردن، الولايات المتحدة الأمريكية"
  "us_training_en": "…",                 ← US training institution(s), written in English
  "training_type_en": "Residency, Fellowship",
  "training_type_ar": "إقامة، زمالة",
  "clinic_phone": "+962 6 000 0000",     ← ONLY if the member agreed; "" to hide
  "booking_link": "",                    ← optional online booking page (must start with https://)
  "photo": "",                           ← leave "" — photos are found automatically by ID
  "show": true                           ← true = shown, false = hidden
}
```

Tips:
- Any optional line can be left empty `""` — it is simply not shown.
- **Spell the specialty and country exactly the same way** for every member
  (e.g. always `Pediatrics`, never `Paediatrics`), so the filters group them together.
- Two clinic numbers: separate them with a comma: `"+962 6 464 2110, +962 79 597 0988"`.
- The filters, the alphabetical order and the member count update themselves.

---

## 4. Add a new member

1. Make sure the member **agreed to be listed**, and which details they agreed to publish.
2. Open `data/members.json` for editing (as above).
3. Go to the **last member** at the bottom of the file. Copy their whole block,
   from `{` to `}`.
4. After that block's `}` type a **comma** `,` then paste the copy below it.
5. In the pasted copy, change the `"id"` to the next number (e.g. `JSAMG-043`)
   and replace every value with the new member's details.
6. Check that the file still ends with `}` then `]`, and that **no comma** sits
   right before the final `]`.
7. Click **Commit changes**.

## 5. Hide or remove a member

- **Hide** (recommended, easy to undo): change `"show": true` to `"show": false`.
- **Remove completely:** delete the member's whole block from `{` to `},`.
  Also delete their photo from `members-photos/`.

---

## 6. If the directory page shows an error or goes blank

A comma, quotation mark or bracket is probably missing in `members.json`.

- Undo your last change (on GitHub: open the file → **History** → choose the
  previous version), **or**
- Paste the file into **jsonlint.com** — it shows the exact line with the mistake, **or**
- Paste the file into a chat with Claude and ask: *"Please check this members.json file for mistakes."*

Use Notepad or VS Code — **not Microsoft Word** (Word changes the quotation marks).

**Previewing on your own computer:** the directory reads `members.json` over the
internet, so it shows its list on the published GitHub Pages site. If you
double-click `members.html` on your computer you will see a short note instead —
that is normal.

---

## 7. Easiest way: let Claude do it

Paste the whole `data/members.json` into a chat with Claude and say, for example:

> "Add this new member to members.json with the next ID, in English and Arabic,
> and keep everything else exactly the same: …"

> "Update the institution of JSAMG-015 to …"

> "Here is the updated membership spreadsheet. Rebuild members.json with only the
> members who agreed to be listed and only the approved public fields."

Then replace the file's content on GitHub with Claude's answer and commit.

---

## ملخص بالعربية

- **بيانات الأعضاء** موجودة في ملف واحد: `data/members.json`. عدّل النص بين علامات التنصيص فقط.
- **لكل عضو رقم دائم** مثل `JSAMG-007` لا يتغير ولا يُعاد استخدامه. العضو الجديد يأخذ الرقم التالي (`JSAMG-043`).
- **لإضافة صورة:** سمِّ الصورة باسم رقم العضو بصيغة JPG، مثل `JSAMG-007.jpg`، وارفعها إلى مجلد `members-photos`. تظهر الصورة تلقائياً بشكل دائري دون أي تعديل آخر. لاستبدالها ارفع صورة جديدة بالاسم نفسه.
- **لإخفاء عضو:** غيّر `"show": true` إلى `"show": false`.
- **لعرض أرقام الأعضاء على الصفحة:** أضف `?ids=1` إلى نهاية رابط صفحة الدليل.
- **تنبيه للخصوصية:** كل ما في ملف `members.json` يمكن لأي شخص تنزيله. لا تضع فيه أرقام الهواتف الشخصية أو البريد الإلكتروني الخاص أو أي بيانات تسجيل سرية. رقم العيادة يُضاف فقط بموافقة العضو.
