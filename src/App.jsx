import React, { useState } from 'react';
import { 
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Snackbar, 
  Alert,
} from '@mui/material';
import Quiz from './components/Quiz';

export default function App() {

  const styles = {
    panel: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    box: {
      minWidth: "50%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "5px"
    },
    title: {
      fontFamily: "Karla, sans-serif",
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: "48px",
      lineHeight: "56px",
    },
    hint: {
      fontFamily: "Inter, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "25px",
    },
    button: {
      width: "193px",
      height: "52px",
      background: "#4D5B9E",
      borderRadius: "15px",
      fontFamily: "Inter",
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "19px",
      color: "#F5F7FB",
    }
  }

  const [isGameStart, setIsGameStart] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [level, setLevel] = useState("Easy");
  const [category, setCategory] = useState("None");
  const [numQs, setNumQs] = useState("5");

  const numOptions = Array.from({ length: 16 }, (_, i) => (i + 5).toString());
  const levelOptions = ["Easy", "Medium", "Hard"];
  const categoryOptions = [
    "General Knowledge", 
    "Books", 
    "Film", 
    "Music", 
    "Japanese Anime & Manga", 
    "Cartoons & Animations",
    "Sports",
    "Art",
    "History",
    "Geography",
    "Television",
    "Science & Nature",
    "Celebrities",
    "Animals"
  ]

  const handleStartClick = () => {
    if (category === "None") {
      setShowAlert(true);
    } else {
      setIsGameStart(true);
    }
  };

  const handleSelectChange = (event, id) => {
    switch(id) {
      case "level":
        setLevel(event.target.value);
        break;
      case "category":
        setCategory(event.target.value);
        break;
      case "numQs":
        setNumQs(event.target.value);
        break;
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowAlert(false);
  };

  return (
    <div className="main">
      <img src='/public/images/blob1.png' className="main--img1"/>
        {isGameStart ? <Quiz/>
          : (
            <div style={styles.panel}>
              <h1 style={styles.title}>Quizzical</h1>
              <div style={styles.box}>
                <FormControl sx={{ m: 1, minWidth: 110 }} size="small">
                  <InputLabel># of Questions</InputLabel>
                  <Select
                    id="numQs"
                    value={numQs}
                    label="# of Questions"
                    autoWidth
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                    onChange={(e) => handleSelectChange(e, "numQs")}
                  >
                    {numOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    id="category"
                    value={category}
                    label="category"
                    autoWidth
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                    onChange={(e) => handleSelectChange(e, "category")}
                  >
                    {categoryOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    id="difficulty"
                    value={level}
                    label="difficulty"
                    autoWidth
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                        },
                      },
                    }}
                    onChange={(e) => handleSelectChange(e, "level")}
                  >
                    {levelOptions.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <h4 style={styles.hint}>Customize your quiz and Press button to start the game</h4>
              <Button 
                style={styles.button}
                onClick={handleStartClick}
                >
                  start quiz
              </Button>
            </div>
          )}

        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please select a valid Category to start the Quiz
          </Alert>
        </Snackbar>
      <img src='/public/images/blob2.png' className="main--img2" />
    </div>
  )
}
