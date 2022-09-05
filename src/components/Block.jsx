import React, { useState } from "react"
import Answer from "./Answer"

export default function Block(props) {

    //store data
    const [formData, setFormData] = useState(
        {
            0:"",
            1:"",
            2:"",
            3:"",
            4:""
        }
    )

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const [isSubmit, setIsSubmit] = useState(false)
    const [notComplete, setNotComplete] = useState(false)

    //display the question in radio button
    const components = props.final_data.map((item, index) => {
        return (
            <div className="block">
                <p className="block--question">{item.question}</p>
                <div className="block--answer">
                    <div className="button">
                        <input 
                            type="radio"
                            id="0"
                            name={index}
                            value={0}
                            onChange={handleChange}
                        />
                        <label>
                            {item.options[0]}
                        </label>
                    </div>

                    <div className="button">
                        <input 
                            type="radio"
                            id="1"
                            name={index}
                            value={1}
                            onChange={handleChange}
                        />
                        <label>
                            {item.options[1]}
                        </label>
                    </div>

                    <div className="button">
                        <input 
                            type="radio"
                            id="2"
                            name={index}
                            value={2}
                            onChange={handleChange}
                        />
                        <label>
                            {item.options[2]}
                        </label>
                    </div>

                    <div className="button">
                        <input 
                            type="radio"
                            id="3"
                            name={index}
                            value={3}
                            onChange={handleChange}
                        />
                        <label>
                            {item.options[3]}
                        </label>
                    </div>
                </div>
                <hr />
            </div>
        )
    })

    function handleSubmit() {
        for (var key in formData) {
            if (formData[key] === "") {
                setNotComplete(true)
                break
            } else {
                setNotComplete(false)
                setIsSubmit(true)
            }
        }
    }

    function handleRestart() {
        setNotComplete(false)
        setIsSubmit(false)
    }

    return (
        <div className="content">
            {notComplete ? 
                <div>
                    {components}
                    <div className="submit">
                        <p className="submit--text">The questions are not completed !</p>
                        <button onClick={handleSubmit} className="submit--btn">Check answers</button>
                    </div>
                </div>
                :
                <Answer 
                    isSubmit={isSubmit} 
                    handleSubmit={handleSubmit} 
                    formData={formData} 
                    final_data={props.final_data}
                    components={components} 
                    handleRestart={handleRestart} />
            }  
        </div>
    )
}