import React, { useEffect, useState } from "react";
import { QsBlock } from "./QsBlock";

export const MainPage = (props) => {

    const {
        setIsGameStart,
        level,
        category,
        numQs,
    } = props;

    const styles = {
        title: {
            fontFamily: "Karla, sans-serif",
            fontStyle: "normal",
            fontSize: "48px",
        },
    }

    const categoryOptions = {
        "General Knowledge" : 9, 
        "Books": 10, 
        "Films": 11, 
        "Music": 12, 
        "Television": 14,
        "Science & Nature": 17,
        "Sports": 21,
        "Geography": 22,
        "History": 23,
        "Art": 25,
        "Celebrities": 26,
        "Animals": 27,
        "Japanese Anime & Manga": 31, 
        "Cartoons & Animations": 32,
    };

    // construct uri from game setting
    const uri = `amount=${numQs}&category=${categoryOptions[category]}&difficulty=${level.toLowerCase()}`;

    // retrieve data from API
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://opentdb.com/api.php?${uri}&type=multiple`);

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

    // decode HTML entities representing special characters: &ntilde; and &aacute;
    const decodeHTMLEntities = (text) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(
            `<!doctype html><body>${text}`, 'text/html'
        ).body.textContent;
        return decodedString;
    };

    // function to reformat weird character in fetched data strings
    const replaceChar = (text) => {
        text = text.replaceAll("&quot;", "\"");
        text = text.replaceAll("&#039;", "\'");
        text = decodeHTMLEntities(text);
        return text;
    };

    // list of formated data displayed for the game with question, answers, and correct answer
    const formatedData = data.map(({ question, correct_answer, incorrect_answers }) => {
        const randomIndex = Math.floor(Math.random()*4);

        // randomly insert the correct answer into the incorrect answers list
        const uniqueOptions = [...new Set(incorrect_answers)];
        uniqueOptions.splice(randomIndex, 0, correct_answer);

        // reformat data
        const formatedUniOpts = uniqueOptions.map((item) => {
            return replaceChar(item);
        });

        return{
            question: replaceChar(question),
            answers: formatedUniOpts,
            correct_answer_index: randomIndex, 
        }
    });

    return (
        <div className="content">
            <h1 style={styles.title}>Quizzical</h1>

            <QsBlock
                data={formatedData}
                setIsGameStart={setIsGameStart}/>
        </div>
    )
} 