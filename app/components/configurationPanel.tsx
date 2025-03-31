import React, { } from 'react';
import {Form, Radio, Select} from 'antd';
import {GAME_TYPE} from "@/lib/features/game/game.types";
import { LANGUAGES } from "@/lib/features/lobby/languages.types";


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
                    <Radio.Group value={gameType} onChange={handleGameTypeChange}>
                        <Radio.Button value={GAME_TYPE.text}>Text</Radio.Button>
                        <Radio.Button value={GAME_TYPE.image}>Image</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Language">
                    <Select value={language} onChange={handleLanguageChange}>
                        {Object.values(LANGUAGES).map((lang) => (
                            <Select.Option key={lang} value={lang}>
                                {lang}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ConfigurationPanel;