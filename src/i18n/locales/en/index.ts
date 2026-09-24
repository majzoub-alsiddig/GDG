// src/i18n/locales/en/index.ts
import common from "./common.json";
import home from "./home.json";
import about from "./about.json";
import articles from "./articles.json";
import events from "./events.json";
import courses from "./courses.json";
import team from "./team.json";
import faq from "./faq.json";

// Uncomment as you translate each page:
// import admin from "./admin.json";

const en = {
  ...common,
  ...home,
  ...about,
  ...articles,
  ...events,
  ...courses,
  ...team,
  ...faq,
  // ...admin,
};

export default en;
