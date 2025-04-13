"use client";
import React from "react";
import { Modal } from "antd";

interface RulesModalProps {
    visible: boolean;
    onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ visible, onClose }) => {
    return (
        <Modal
            title={"Game Rules"}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
                <h4>Objective</h4>
                <p>The objective of the game is to guess all your team&#39;s words or images before the other team does. The game can be played with either word cards in different languages or an image-based version, where each card features a picture instead of a word. This and the team setup can be configured by the host in the lobby. </p>
                <br/>
                <h4>Roles</h4>
                <p><strong>Spymaster:</strong> Gives one-word clues to help their team guess the correct cards.</p>
                <p><strong>Operatives:</strong> Work together to guess the words based on the Spymaster&#39;s clues.</p>
                <br/>
                <h4>Clues and Guesses</h4>
                <p>The Spymaster gives a one-word clue and a number indicating how many cards are related to the clue.</p>
                <p>Operatives then guess the cards, one at a time, until they either guess incorrectly or decide to stop.</p>
                <br/>
                <h4>Win Conditions</h4>
                <p>The first team to guess all their cards wins. Avoid guessing the assassin card, as it results in an instant loss.</p>

        </Modal>
    );
};

export default RulesModal;