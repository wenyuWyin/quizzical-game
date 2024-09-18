import React, { useEffect, useState } from "react"
import Block from "./Block"

export default function Quiz() {
    // retrieve data from API
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple");
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await res.json();
                setData(result.results);
            } catch (error) {
                console.error("Fetching data failed: ", error);
            }
        };

        fetchData();
    }, []);

    //reformat the data
    function replace(input) {
        input = input.replaceAll("&quot;", "\"");
        input = input.replaceAll("&#039;", "\'");
        return input;
    }

    function replaceArray(array) {
        for (var answer in array) {
            answer = replace(answer);
        }
        return array;
    }

    function getRandomIndex() {
        return Math.floor(Math.random()*4);
    }

    const useful_data = data.map((item, index) => {
        return ({
            index: index,
            question: replace(item.question),
            random_index: getRandomIndex(),
            incorrect_answers: item.incorrect_answers,
            correct_answer: item.correct_answer
        })
    })

    function combined_answer(incorrect_answers_array, correct_answer, randomIndex) {
        let answer = []
        let count = 0;
        for (let i = 0; i < 4; i++) {
            if (i == randomIndex) {
                answer.push(correct_answer)
            } else {
                answer.push(incorrect_answers_array[count])
                count++
            }
        }

        answer = replaceArray(answer)

        return answer
    }

    //data with an array consists of question, options, and correct_answer
    const final_data = useful_data.map((item, index) => {
        return ({
            index: index,
            question: item.question,
            correct_answer: item.random_index,
            options: combined_answer(item.incorrect_answers, item.correct_answer, item.random_index)
        })
    })

    return (
        <Block final_data={final_data} />
    )
}