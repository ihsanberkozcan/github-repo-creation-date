import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
      translation: {
        title: "GitHub Repository Creation Date",
        subtitle: "Paste the URL of the Github repository",
        createdAt: "Created At:",
        notValid: " is not valid URL",
      },
    },
    tr: {
      translation: {
        title: "GitHub Reposu Oluşturma Tarihi",
        subtitle: "Github reposunun URL'sini yapıştırın",
        createdAt: "Oluşturuldu:",
        notValid: " geçerli bir URL değil",
      },
    },
  };
  
  i18n.use(initReactI18next).init({
    lng: "en",
    resources,
  });
  
  export default i18n;