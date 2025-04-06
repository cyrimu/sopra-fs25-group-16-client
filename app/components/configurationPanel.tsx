import React from 'react';
import {Form, Radio, Select} from 'antd';
import {GAME_TYPE} from "@/lib/features/game/game.types";
import {LANGUAGES} from "@/lib/features/lobby/languages.types";
import styles from "@/styles/page.module.css";

const ConfigurationPanel: React.FC = () => {

    // Radio with GAME_TYPE enum
    const [gameType, setGameType] = React.useState(GAME_TYPE.text);
    const [language, setLanguage] = React.useState(LANGUAGES.english);

    const handleGameTypeChange = (e: any) => {
        setGameType(e.target.value);
    };

    const handleLanguageChange = (e: any) => {
        setLanguage(e.target.value);
    };

    return (
        <div>
            <Form layout="vertical">
                <Form.Item label="Game Type">
                    <div style={{textAlign: 'center'}}>
                       <Radio.Group value={gameType} onChange={handleGameTypeChange} style={{width: '100%'}}>
                           <Radio.Button value={GAME_TYPE.text} style={{width: '50%', color: gameType === GAME_TYPE.text ? 'black' : 'white', backgroundColor: gameType === GAME_TYPE.text ? 'white' : 'black'}}>Word</Radio.Button>
                           <Radio.Button value={GAME_TYPE.image} style={{width: '50%', color: gameType === GAME_TYPE.image ? 'black' : 'white', backgroundColor: gameType === GAME_TYPE.image ? 'white' : 'black'}}>Picture</Radio.Button>
                       </Radio.Group>
                    </div>
                </Form.Item>
                {gameType === GAME_TYPE.text && (
                    <Form.Item label="Language">
                        <Select value={language} onChange={handleLanguageChange}>
                            {Object.values(LANGUAGES).map((lang) => (
                                <Select.Option key={lang} value={lang}>
                                    {lang}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                <div className={styles.formRow}>
                    <Form.Item label="Blue Spymaster" className={styles.formItem}>
                        <Select value={language} onChange={handleLanguageChange}>
                            {Object.values(LANGUAGES).map((lang) => (
                                <Select.Option key={lang} value={lang}>
                                    {lang}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Blue Spymaster" className={styles.formItem}>
                        <Select value={language} onChange={handleLanguageChange}>
                            {Object.values(LANGUAGES).map((lang) => (
                                <Select.Option key={lang} value={lang}>
                                    {lang}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className={styles.formRow}>
                    <Form.Item label="Blue Spymaster" className={styles.formItem}>
                        <Select value={language} onChange={handleLanguageChange}>
                            {Object.values(LANGUAGES).map((lang) => (
                                <Select.Option key={lang} value={lang}>
                                    {lang}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Blue Spymaster" className={styles.formItem}>
                        <Select value={language} onChange={handleLanguageChange}>
                            {Object.values(LANGUAGES).map((lang) => (
                                <Select.Option key={lang} value={lang}>
                                    {lang}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
}

export default ConfigurationPanel;