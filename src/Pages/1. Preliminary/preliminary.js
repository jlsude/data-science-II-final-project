import styles from './Preliminary.module.css'
import React from 'react';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';


const Preliminary= () => {

    const [history, setHistory] = useState(0);
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState(0);
    const [trestbps, setTrestbps] = useState(0);
    const [cp, setCp] = useState(0);

    const [highProbability, setHighProbability] = useState(false);

    const genderSelection = ['Male', 'Female'];
    const chestPainSelection = [0, 1, 2, 3, 4];
    const historyRouter = useHistory(); 

    useEffect(() => {
        console.log(`age: ${age}`);
        console.log(`gender: ${gender}`)
        console.log(`trestbps: ${trestbps}`)
        console.log(`cp: ${cp}`)
        console.log(`history: ${history}`)
    }, [age, gender, trestbps, cp, history])

    const calculate = () => {
        const preliminaryData = {
            history: history,
            age: parseInt(age),
            gender: gender,
            trestbps: parseInt(trestbps),
            cp: parseInt(cp)

        }

        localStorage.setItem('preliminaryData', JSON.stringify(preliminaryData));
        
    }



    return (
        <div className={styles.pageBody}>
            <div className={styles.header}>
                <div className={styles.headerLogo}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="75px" height="75px" viewBox="0 0 512 512">
                        <path fill="var(--ci-primary-color, #FFFFFF)" 
                            d="M344,16H168V168H16V344H168V496H344V344H496V168H344ZM464,200V312H312V464H200V312H48V200H200V48H312V200Z" 
                            //class="ci-primary"
                            />
                    </svg>
                </div>
                <div className={styles.harmburgerMenu}>
                    <div className={styles.harmburgerMenuLine} />
                    <div className={styles.harmburgerMenuLine} />
                    <div className={styles.harmburgerMenuLine} />
                </div>
            </div>
            <h1 className={styles.headLine}>Preliminary Screening</h1>
            <div className={styles.mainCardWindow}>
                <div className={styles.doctorPicturePanel}>
                    Picture of a doctor here
                </div>
                <div className={styles.preliminaryEntriesPanel}>
                    <div className={styles.subheaderContainer}>
                        <h2 className={styles.subheader}>Preliminary Entries</h2>

                    </div>
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Age</label>
                            <input className={styles.inputData} value={age} onChange={(e) => setAge(e.target.value)}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Gender</label>
                            <select className={styles.inputDataDropdown}
                                onChange={(e) => {
                                    if (e.target.value == "male") {
                                        setGender(1)
                                    } else {
                                        setGender(0)
                                    }
                                }}
                            >
                                {genderSelection.map((gender, index) => (
                                    <option key={index} value={gender}>
                                        {gender}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Resting Heart Rate</label>
                            <input className={styles.inputData}  value={trestbps} onChange={(e) => setTrestbps(e.target.value)}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Chest Pain Level</label>
                            <select className={styles.inputDataDropdown}
                                onChange={(e) => setCp(e.target.value)}
                            >
                                {chestPainSelection.map((level, index) => (
                                    <option key={index} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.historyContainer}>
                            <label className={styles.historyQuestion}>
                                Has a history of heart attack?
                            </label>
                            <div className={styles.radioButtons}>
                                <div className={styles.radioButtonContainer}>
                                    <input type="radio" className={styles.radioButton} 
                                        value={1} checked={history == 1} onChange={(e) => setHistory(1)}/>
                                    <label className={styles.radioButtonLabel}>Yes</label>
                                </div>

                                <div className={styles.radioButtonContainer}>
                                    <input type="radio" className={styles.radioButton} 
                                        value={0} checked={history == 0} onChange={(e) => setHistory(0)}/>
                                    <label className={styles.radioButtonLabel}>No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => calculate()}>
                    Calculate
                </button>
            </div>

        </div>
    );
}
 
export default Preliminary;