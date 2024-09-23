import React, { useEffect, useState } from "react";
import { 
    Button,
    Divider
} from "@mui/material";

export const QsBlock = (props) => {

    const {
        data,
        setIsGameStart,
    } = props;

    const styles = {
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        block: {
            width: "600px",
            height: "500px",
            textAlign: "left",
        },
        submitBox: {
            width: "600px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "0 10px 0 100px",
        },
        submitText: {
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "15px",
            lineHeight: "15px",
            textAlign: "center",
            color: "#293264",
            padding: "0",
        },
        submitButton: {
            width: "120px",
            height: "35px",
            background: "#4D5B9E",
            borderRadius: "10px",
            marginTop: "5px",

            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "12px",
            lineHeight: "12px",
            color: "#F5F7FB",
        },
        text: {
            fontFamily: "Karla",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "18px",
            lineHeight: "20px",
        },
        buttonBox: {
            display: "flex",
            flexDirection: "row",
            gap: "13px",
            marginBottom: "16px",
        },
        button: {
            margin: "0 5px 0 0",
            border: "0.794239px solid #4D5B9E",
            borderRadius: "7.94239px",
            minWidth: "120px",
            minHeight: "32px",
            position: "relative",
            padding: "4px 7px",
            textTransform: "none",
            background: "#F5F7FB",

            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "12px",
            lineHeight: "12px",
            textAlign: "center",
            color: "#293264",
        },
        checkedButton: {
            background: "#D6DBF5",
        },
        correctButton: {
            border: "0.794239px solid #94D7A2",
            background: "#94D7A2",
        },
        wrongButton: {
            border: "0.794239px solid #F8BCBC",
            background: "#F8BCBC",
        },
    }

    const [selectedAnswer, setSelectedAnswer] = useState({});

    useEffect(() => {
        // initialize a dictionary with empty string to track the selected answer
        setSelectedAnswer(
            Object.fromEntries(
                Array.from({ length: data.length }, (_, i) => [`${i}`, ""])
            )
        )
    }, [data])

    const handleButtonClick = (qsId, ansId) => {
        setSelectedAnswer(prevSelectedAnswer => {
            return {
                ...prevSelectedAnswer,
                [qsId]: ansId
            }
        });
    }

    // count number of correct answer
    let count = data.length;

    const [checkAnswer, setCheckAnswer] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = () => {
        setCheckAnswer(true);
        const isAnyEmpty = Object.values(selectedAnswer).some(value => value === "");
        setIsCompleted(!isAnyEmpty);
    }

    // restart the game
    const handleRestart = () => {
        setIsGameStart(false);
        setCheckAnswer(false);
        setIsCompleted(false);
    }

    return (
        <div style={styles.content}>
            <div className="content-scrollable">
                <div style={styles.block}>
                    {data.map((item, qsId) => {
                        return (
                            <div>
                                <p style={styles.text}>{item.question}</p>

                                <div style={styles.buttonBox}>
                                    {item.answers.map((answer, ansId) => {
                                        const checked = selectedAnswer[qsId] === ansId;
                                        const isSubmit = checkAnswer && isCompleted;
                                        const corrected = item.correct_answer_index === ansId;
                                        const isWrong = checked && isSubmit && !corrected;

                                        if (isWrong) { count--; };

                                        return (
                                            <Button
                                                disabled={isSubmit}
                                                sx={{
                                                    ...styles.button,
                                                    ...(checked && styles.checkedButton),
                                                    ...(isSubmit && corrected && styles.correctButton),
                                                    ...(isWrong && styles.wrongButton)
                                                }}
                                                onClick={() => handleButtonClick(qsId, ansId)}>
                                                {answer}
                                            </Button>
                                        )
                                    })}
                                </div>

                                <Divider variant="middle"/>
                            </div>
                        )
                    })}
                </div>
            </div>

            {(isCompleted) ? (
                <div style={styles.submitBox}>
                    <p style={styles.submitText}>
                        {`You scored ${count}/${data.length} correct answers`}
                    </p>
                    <Button
                        sx={styles.submitButton}
                        onClick={handleRestart}
                        >
                        Play Again
                    </Button>
                </div>
            ) : (
                <div style={styles.submitBox}>
                    <p style={styles.submitText}>
                        {(checkAnswer ? "The questions are not completed !" : "")}
                    </p>
                    <Button
                        sx={styles.submitButton}
                        onClick={handleSubmit}
                        >
                        Check Answers
                    </Button>
                </div>
            )}

        </div>
    )
}