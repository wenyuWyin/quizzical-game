import React, { useEffect, useState } from "react"

export default function Answer(props) {

    let styles = "answer"
    let count = 5

    function displayAnswer(option, index, formIndex) {
        if (option == index) {
            styles = "correct_answer"
        } else if (option == formIndex) {
            styles = "wrong_answer"
            count--
        } else {
            styles = "answer"
        }

        return styles
    }

    const answer_components = props.final_data.map((item, index) => {
        return (
            <div key={index} className="block">
                <p className="block--question">{item.question}</p>
                <div className="block--answer">
                    <div className={displayAnswer(0, item.correct_answer, props.formData[index])}>
                        {item.options[0]}
                    </div>

                    <div className={displayAnswer(1, item.correct_answer, props.formData[index])}>
                        {item.options[1]}
                    </div>

                    <div className={displayAnswer(2, item.correct_answer, props.formData[index])}>
                        {item.options[2]}
                    </div>

                    <div className={displayAnswer(3, item.correct_answer, props.formData[index])}>
                        {item.options[3]}
                    </div>
                </div>
                <hr />
            </div>
        )
    })

    return (
        <div>
            {props.isSubmit ? 
                <div>
                    {answer_components}
                    <div className="submit">
                        <p className="submit--text">You scored {count}/5 correct answers</p>
                        <button onClick={props.handleRestart} className="submit--btn">Play again</button>
                    </div>
                </div>
                :
                <div>
                    {props.components}
                    <button onClick={props.handleSubmit} className="submit--btn">Check answers</button>
                </div>
            }
        </div>
    )
}
    