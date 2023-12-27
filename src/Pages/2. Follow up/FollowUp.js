import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import styles from './FollowUp.module.css'
import packageJson from '../../../package.json'
import BannerLogo from '../../assets/BannerLogo.png'
import Home from '../../assets/Home.png'



const FollowUp= () => {

    const [chol, setChol] = useState(0);
    const [fbs, setFbs] = useState(0);
    const [restecg, setRestecg] = useState(0);

    const [thalach, setThalach] = useState(0);
    const [thal, setThal] = useState(0);

    const [probabilitityMoreThan35, setProbabilitityMoreThan35] = useState(false);
    const [probability, setProbability] = useState(0);
    const [preliminaryData, setPreliminaryData] = useState({});

    const historyRouter = useHistory();
    const proxy = packageJson.proxy;
    const allowedTime = 840000;

    const lastActivityChecker = () => {
        const lastAct = localStorage.getItem('timeElapsed');
        
        if (lastAct !== 0) {
            const timeElapsed = Date.now() - lastAct;
            const remainingTime = allowedTime - timeElapsed;
    
            console.log("timeElapsed: ", timeElapsed);
            console.log("remainingTime: ", remainingTime);
            
            if (timeElapsed > allowedTime) {
                alert('Server has been deactivated due to inactivity. Redirecting to home page...');
                historyRouter.push('/');
            } else {
                setTimeout(() => {
                    alert('Server has been deactivated due to inactivity. Redirecting to home page...');
                    historyRouter.push('/');
                }, remainingTime);
            }
        }
    };

    useEffect(() => {
        let preliminaryData = localStorage.getItem('preliminaryData' )
        preliminaryData = JSON.parse(preliminaryData);
        setPreliminaryData(preliminaryData);
        setProbability((preliminaryData.probability*100).toFixed(2))
        setProbabilitityMoreThan35(preliminaryData.probabilitityMoreThan35)

        lastActivityChecker();
    }, [])


    const calculate = () => {
        if (probabilitityMoreThan35) {
            console.log('Probability more than 35')
            
            axios.post(`${proxy}/more_35`, {
                history: parseInt(preliminaryData.history),
                age: parseInt(preliminaryData.age),
                gender: parseInt(preliminaryData.gender),
                trestbps: parseInt(preliminaryData.trestbps),
                cp: parseInt(preliminaryData.cp),
                chol: parseInt(chol),
                fbs: parseInt(fbs),
                restecg: parseInt(restecg),
                thalach: parseInt(thalach),
                thal: parseInt(thal)
            }).then((response) => {

                let finalResultData = response.data;
                let finalInputData = {
                    history: parseInt(preliminaryData.history),
                    age: parseInt(preliminaryData.age),
                    gender: parseInt(preliminaryData.gender),
                    trestbps: parseInt(preliminaryData.trestbps),
                    cp: parseInt(preliminaryData.cp),
                    chol: parseInt(chol),
                    fbs: parseInt(fbs),
                    restecg: parseInt(restecg),
                    thalach: parseInt(thalach),
                    thal: parseInt(thal)
                }

                let finalProbability = (finalResultData.SVM_Model_more.SVM_probability*100).toFixed(2);
                let probabilityDifference = (finalProbability - probability).toFixed(2);
                
                //if what you are thinking is right,
                //where it is still considered high probability if the final probability is >= 80%
                //even thought the probability difference is less than 10%
                //set to (probabilityDifference >= 10 || finalProbability >= 80%)
                // if (probabilityDifference >= 10) {
                //     historyRouter.push('/high_probability');
                // } else {
                //     historyRouter.push('/low_probability');
                // }

                //[TEMPORARY] the real code is above ^ ^ ^ ^ ^ 
                historyRouter.push('/high_probability')

                finalResultData = JSON.stringify(finalResultData);
                finalInputData = JSON.stringify(finalInputData);

                localStorage.setItem('finalResultData', finalResultData);
                localStorage.setItem('finalInputData', finalInputData);
            }).catch((error) => {
                console.log(error);
            })



        } else {
            console.log('Probability less than 35')
            axios.post(`${proxy}/less_35`, {
                history: parseInt(preliminaryData.history),
                age: parseInt(preliminaryData.age),
                gender: parseInt(preliminaryData.gender),
                trestbps: parseInt(preliminaryData.trestbps),
                cp: parseInt(preliminaryData.cp),
                chol: parseInt(chol),
                fbs: parseInt(fbs),
                restecg: parseInt(restecg)
            }).then((response) => {

                let finalResultData = response.data;
                let finalInputData = {
                    history: parseInt(preliminaryData.history),
                    age: parseInt(preliminaryData.age),
                    gender: parseInt(preliminaryData.gender),
                    trestbps: parseInt(preliminaryData.trestbps),
                    cp: parseInt(preliminaryData.cp),
                    chol: parseInt(chol),
                    fbs: parseInt(fbs),
                    restecg: parseInt(restecg)
                }

                let finalProbability = (finalResultData.SVM_Model_less.SVM_probability*100).toFixed(2);
                let probabilityDifference = (finalProbability - probability).toFixed(2);
                
                //if what you are thinking is right,
                //where it is still considered high probability if the final probability is >= 80%
                //even thought the probability difference is less than 10%
                //set to (probabilityDifference >= 10 || finalProbability >= 80%)
                if (probabilityDifference >= 10) {
                    historyRouter.push('/high_probability');
                } else {
                    historyRouter.push('/low_probability');
                }


                finalResultData = JSON.stringify(finalResultData);
                finalInputData = JSON.stringify(finalInputData);

                localStorage.setItem('finalResultData', finalResultData);
                localStorage.setItem('finalInputData', finalInputData);


            }).catch((error) => {
                console.log(error);
            })


        }

        
    }



    return (
        <div className={styles.pageBody}>
            <div className={styles.header}>
                <div className={styles.headerLogoContainer}>
                    <img src={BannerLogo} alt="Medical Star Symbol" className={styles.headerLogo}/>
                </div>
                <div className={styles.homeContainer} onClick={() => {
                    historyRouter.push('/');
                }}>
                    <img src={Home} alt="Home" />
                </div>
            </div>
            <h1 className={styles.headLine}>Follow-up Screening for Heart Attack Prediction</h1>
            <div className={styles.mainCardWindow}>
                <div className={styles.preliminaryResultPanel}>
                    
                    <div className={styles.resultPanel}>
                        <div className={styles.probabilityContainer}>
                            <h1 className={styles.probabilityHeader}>{probability}%</h1>
                        </div>
                    </div>
                    <div className={styles.additionalInformationPanel}>
                        <div className={styles.paragraphContainer}>
                            <p className={styles.paragraphStyle}>
                                According to the SVM algorithm, based on the preliminary screening of the patient’s data 
                                (age, history of heart attack, trestbps, chest pain level, gender), 
                                the patient has a {probability}% chance of having cardiovascular disease.
                            </p>
                            {probabilitityMoreThan35 ? 
                            (
                                <p className={styles.paragraphStyle}>
                                    We recommend acquiring additional information about the patient’s data, including Serum Cholestoral (chol), 
                                    Fasting Blood Sugar (fbs), Resting Electrocardiographic results (restecg), Maximum heart rate (thalach), and thal for further analysis.

                                </p>
                            ) : 
                            (
                                <p className={styles.paragraphStyle}>
                                    We recommend acquiring additional information about the patient’s data, including Serum Cholestoral (chol), 
                                    Fasting Blood Sugar (fbs), and Resting Electrocardiographic results (restecg) for further analysis.

                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.followUpEntriesPanel}>
                    <div className={styles.subheaderContainer}>
                        <h2 className={styles.subheader}>Follow-up Entries</h2>

                    </div>
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Serum Cholestoral (chol)</label>
                            <input className={styles.inputData} value={chol} onChange={(e) => setChol(e.target.value)}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Fasting Blood Sugar (fbs)</label>
                            <input className={styles.inputData}  value={fbs} onChange={(e) => setFbs(e.target.value)}/>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Resting Electrocardiographic (restecg)</label>
                            <input className={styles.inputData}  value={restecg} onChange={(e) => setRestecg(e.target.value)}/>
                        </div>
                        {probabilitityMoreThan35 && (
                                <div className={styles.inputContainer}>
                                    <label className={styles.inputLabel}>Maximum Heart Rate (thalach)</label>
                                    <input className={styles.inputData}  value={thalach} onChange={(e) => setThalach(e.target.value)}/>
                                </div>
                        )}
                        {probabilitityMoreThan35 && (
                                <div className={styles.inputContainer}>
                                    <label className={styles.inputLabel}>Thalassemia</label>
                                    <input className={styles.inputData}  value={thal} onChange={(e) => setThal(e.target.value)}/>
                                </div>
                        )} 
                        
                        
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
 
export default FollowUp;