import React, { useState, useEffect } from 'react';


import styles from './HighProbability.module.css'




const HighProbability = () => {
    


    const [finalResultData, setFinalResultData] = useState({})
    const [finalInputData, setFinalInputData] = useState({})

    //SVM
    const [finalProbability, setFinalProbability] = useState(0)

    useEffect(() => {

        let finalResultData = localStorage.getItem('finalResultData')
        setFinalResultData(JSON.parse(finalResultData))

        let finalInputData = localStorage.getItem('finalInputData')
        setFinalInputData(JSON.parse(finalInputData))

        

    }, [])


    useEffect(() => {
        if(finalResultData.SVM_Model_more){
            setFinalProbability((finalResultData.SVM_Model_more.SVM_probability*100).toFixed(2))
            
        }
    }, [finalResultData])






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
            <h1 className={styles.headLine}>Patient has a HIGH PROBABILITY of CVD</h1>
            <div className={styles.cardsContainer}>
                <div className={styles.patientDataWindow}>
                    <div className={styles.patientDataHeaderContainer}>
                        <h2 className={styles.patientDataHeader}>
                            Patient Data    
                        </h2> 
                    </div>
                    <div className={styles.patientDataContainer}>
                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Age
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.age}
                            </label>
                        </div>

                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Gender
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.gender ? "Male" : "Female"}
                            </label>
                        </div>

                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Resting Heart <br/>Rate (trestbps)
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.trestbps}
                            </label>
                        </div>

                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Chest Pain <br/>Level (cp)
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.cp}
                            </label>
                        </div>

                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Serum Cholestoral <br/>(chol) 
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.chol}
                            </label>
                        </div>

                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Fasting Blood Sugar <br/>(fbs)
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.fbs}
                            </label>
                        </div>

                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Resting Electro-<br/>cardiographic (restecg)
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.restecg}
                            </label>
                        </div>

                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Maximum Heart Rate <br/>(thalach)
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.thalach}
                            </label>
                        </div>

                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Thalassemia <br/>(thal)
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.thal}
                            </label>
                        </div>

                        <div className={styles.patientDataElementContainer}>
                            <label className={styles.patientDataElementHeader}>
                                Has a history of <br/>heart attack? 
                            </label>
                            <label className={styles.patientDataElementValue}>
                                {finalInputData.history ? "Yes" : "No"}
                            </label>
                        </div>


                    </div>
                </div>
                <div className={styles.reportWindow}>
                    <div className={styles.headerReportWindow}>
                        <div className={styles.finalProbabilityWindow}>
                            <h1 className={styles.finalProbabilityHeader}>{finalProbability}%</h1>
                        </div>
                        <div className={styles.recommendationWindow}>
                            <p className={styles.paragraphStyle}>
                                After a thorough analysis using the SVM algorithm, it has been determined that the patient has a HIGH PROBABILITY of developing cardiovascular disease. 
                                Immediate admission for confinement is STRONGLY RECOMMENDED to undergo further specialist examination and treatment.
                            </p>
                        </div>
                    </div>
                    <div className={styles.dataVizWindow}>
                        <h3 className={styles.dataVizHeader}>
                            Data Visualization
                        </h3>
                    </div>
                    <div className={styles.footerReportWindow}>
                        <div className={styles.footerReportContent}>

                        </div>
                        <div className={styles.printTicketContainer}>
                            <button className={styles.printTicketButton} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default HighProbability;