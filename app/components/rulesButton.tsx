import React from "react";
import { Button as AntButton, ButtonProps } from "antd";

interface CustomButtonProps extends ButtonProps {
    iconType?: "question";
}

const rulesButton: React.FC<CustomButtonProps> = ({ iconType, ...props }) => {
    let icon;
    if (iconType === "question") {
        icon = (
            <span style={{
                fontSize: '50px',
                fontFamily: 'Gabarito',
                fontWeight: 'bold'
            }}>
                ?
            </span>
        );
    }

    return (
        <div style={{ position: 'absolute', top: 0, right: 0, margin: '10px' }}>
            <AntButton {...props} icon={icon} shape="circle" style={{ width: 50, height: 50 }} />
        </div>
    );
};

export default rulesButton;