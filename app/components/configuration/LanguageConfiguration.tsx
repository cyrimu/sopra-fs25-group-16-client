import { selectLanguage, setLanguage } from "@/lib/features/lobby";
import { LANGUAGES } from "@/lib/features/lobby/languages.types";
import { Form, Select } from "antd";
import { span } from "framer-motion/client";
import { useDispatch, useSelector } from "react-redux";

const LanguageConfiguration: React.FC = () => {
  const dispatch = useDispatch();

  const language = useSelector(selectLanguage);

  const handleLanguageChange = (language: LANGUAGES) => {
    dispatch(setLanguage(language));
  };

  return (
    <Form.Item
      label={
        <span style={{ fontFamily: "Special Elite", color: "white" }}>
          Language
        </span>
      }
    >
      <Select value={language} onChange={handleLanguageChange}>
        {Object.values(LANGUAGES).map((lang) => (
          <Select.Option key={lang} value={lang}>
            {lang[0].toUpperCase()}
            {lang.substring(1)}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default LanguageConfiguration;
