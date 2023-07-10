import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function Language({ setLanguage }) {
  const { i18n } = useTranslation();
  const handleLanguage = async (e) => {
    setLanguage(e.target.value);
    await i18n.changeLanguage(e.target.value);
  };

  return (
    <select name="Language" className="language" onChange={handleLanguage}>
      <option value="en-US">🇺🇸</option>
      <option value="tr-TR">🇹🇷</option>
    </select>
  );
}

Language.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};
export default Language;
