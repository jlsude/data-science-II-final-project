import React, { useState, useEffect, } from 'react';
import styles from './HighProbability.module.css'
import BannerLogo from '../../assets/BannerLogo.png'
import Home from '../../assets/Home.png'
import axios from 'axios'
import packageJson from '../../../package.json'
import { useHistory } from 'react-router-dom';




const HighProbability = () => {
    


    const [finalResultData, setFinalResultData] = useState({})
    const [finalInputData, setFinalInputData] = useState({})

    //SVM
    const [finalProbability, setFinalProbability] = useState(0)
    const [SVMCM, setSVMCM] = useState([])
    const [SVMPrediction, setSVMPrediction] = useState(0)
    const [SVMAccuracy, setSVMAccuracy] = useState(0)

    //LR
    const [LRProbability, setLRProbability] = useState(0)
    const [LRConfusionMatrix, setLRConfusionMatrix] = useState([])
    const [LRAccuracy, setLRAccuracy] = useState(0)

    //KNN
    const [KNNProbability, setKNNProbability] = useState(0)
    const [KNNConfusionMatrix, setKNNConfusionMatrix] = useState([])
    const [KNNPrediction, setKNNPrediction] = useState(0)
    const [KNNAccuracy, setKNNAccuracy] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [imageSrc, setImageSrc] = useState('')

    const proxy = packageJson.proxy
    const history = useHistory()

    useEffect(() => {

        let finalResultData = localStorage.getItem('finalResultData')
        setFinalResultData(JSON.parse(finalResultData))

        let finalInputData = localStorage.getItem('finalInputData')
        setFinalInputData(JSON.parse(finalInputData))

        

    }, [])

    useEffect(() => {
        const fetchDataVisualization = async () => {
            try {
                const response = await axios.get(`${proxy}/dataviz_svm_more`, {
                    responseType: 'arraybuffer',
                });
        
                const arrayBufferView = new Uint8Array(response.data);
                const blob = new Blob([arrayBufferView], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);
        
                setImageSrc(imageUrl);
                setIsLoading(false);
                console.log(imageUrl)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
      
        fetchDataVisualization();
    }, []);
      


    useEffect(() => {
        if(finalResultData.SVM_Model_more){
            setFinalProbability((finalResultData.SVM_Model_more.SVM_probability*100).toFixed(2))
            setSVMCM(finalResultData.SVM_Model_more.SVM_confusion_matrix)
            setSVMPrediction(finalResultData.SVM_Model_more.SVM_prediction)
            setSVMAccuracy((finalResultData.SVM_Model_more.SVM_accuracy*100).toFixed(2))
        }

        if(finalResultData.LR_Model_more){
            setLRProbability((finalResultData.LR_Model_more.LR_probability*100).toFixed(2))
            setLRConfusionMatrix(finalResultData.LR_Model_more.LR_confusion_matrix)
            setLRAccuracy((finalResultData.LR_Model_more.LR_accuracy*100).toFixed(2))
        }

        if(finalResultData.KNN_Model_more){
            setKNNProbability((finalResultData.KNN_Model_more.KNN_probability*100).toFixed(2))
            setKNNConfusionMatrix(finalResultData.KNN_Model_more.KNN_confusion_matrix)
            setKNNPrediction(finalResultData.KNN_Model_more.KNN_prediction)
            setKNNAccuracy((finalResultData.KNN_Model_more.KNN_accuracy*100).toFixed(2))
        }
        
    }, [finalResultData])






    return (
        <div className={styles.pageBody}>
            <div className={styles.header}>
                <div className={styles.headerLogoContainer}>
                    <img src={BannerLogo} alt="BannerLogo" className={styles.headerLogo}/>
                </div>
                <div className={styles.homeContainer} onClick={() => {
                    history.push('/')
                }}>
                    <img src={Home} alt="Home" />
                </div>
            </div>
            <h1 className={styles.headLine}>The Patient is at HIGH RISK of Cardiovascular Disease</h1>
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
                            <h5 className={styles.finalProbabilityHeader}>
                                PROBABILITY
                            </h5>
                            <h1 className={styles.finalProbabilityHeaderValue}>
                                {finalProbability}%
                            </h1>
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
                        <div className={styles.dataVizContainer}>
                            {isLoading ? 
                                <label className={styles.loadingIndicator}>
                                    Fetching Data Visualization...
                                </label> 
                            : (
                                <img src={imageSrc} alt="Data Visualization" className={styles.dataVizImage}/>
                            )}
                        </div>
                    </div>
                    <div className={styles.footerReportWindow}>
                        <div className={styles.footerReportContent}>
                            <div className={styles.SVMSection}>
                                <h5 className={styles.perfMetricsHeader}>
                                    Performance Metrics
                                </h5>
                                <div className={styles.algoContainer}>
                                    <h5 className={styles.algoHeaders}>
                                        SVM
                                    </h5>
                                    <div className={styles.confusionMatrixContainer}>
                                        <div className={styles.CMPlanes}>
                                            <h5 className={styles.CMIntegers}>
                                                {SVMCM.TN}
                                            </h5>
                                        </div>
                                        <div className={styles.CMPlanes}>
                                            <h5 className={styles.CMIntegers}>
                                                {SVMCM.FP}
                                            </h5>
                                        </div>
                                        <div className={styles.CMPlanes}>
                                            <h5 className={styles.CMIntegers}>
                                                {SVMCM.FN}
                                            </h5>
                                        </div>
                                        <div className={styles.CMPlanes}>
                                            <h5 className={styles.CMIntegers}>
                                                {SVMCM.TP}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className={styles.predAndAccContainer}>
                                        <div className={styles.predictionContainer}>
                                            <h5 className={styles.metrixHeader}>
                                                Prediction
                                            </h5>
                                            <label className={styles.metrixLabelsPrediction}>
                                                {SVMPrediction ? "Heart Attack" : "No Heart Attack"}
                                            </label>
                                        </div>
                                        <div className={styles.accuracyContainer}>
                                            <h5 className={styles.metrixHeader}>
                                                Accuracy
                                            </h5>
                                            <label className={styles.metrixLabels}>
                                                {SVMAccuracy}%
                                            </label>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className={styles.LRSection}>
                                <div className={styles.algoContainer}>
                                        <h5 className={styles.algoHeaders}>
                                            LR
                                        </h5>
                                        <div className={styles.confusionMatrixContainer}>
                                            <div className={styles.CMPlanes}>
                                                <h5 className={styles.CMIntegers}>
                                                    {LRConfusionMatrix.TN}
                                                </h5>
                                            </div>
                                            <div className={styles.CMPlanes}>
                                                <h5 className={styles.CMIntegers}>
                                                    {LRConfusionMatrix.FP}
                                                </h5>
                                            </div>
                                            <div className={styles.CMPlanes}>
                                                <h5 className={styles.CMIntegers}>
                                                    {LRConfusionMatrix.FN}
                                                </h5>
                                            </div>
                                            <div className={styles.CMPlanes}>
                                                <h5 className={styles.CMIntegers}>
                                                    {LRConfusionMatrix.TP}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className={styles.predAndAccContainer}>
                                            <div className={styles.predictionContainer}>
                                                <h5 className={styles.metrixHeader}>
                                                    Probability
                                                </h5>
                                                <label className={styles.metrixLabels}>
                                                    {LRProbability}%
                                                </label>
                                            </div>
                                            <div className={styles.accuracyContainer}>
                                                <h5 className={styles.metrixHeader}>
                                                    Accuracy
                                                </h5>
                                                <label className={styles.metrixLabels}>
                                                    {LRAccuracy}%
                                                </label>
                                                
                                            </div>
                                        </div>
                                </div>
                            </div>

                            <div className={styles.KNNSection}>
                                <div className={styles.algoContainer}>
                                        <h5 className={styles.algoHeaders}>
                                            KNN
                                        </h5>
                                        <div className={styles.confusionMatrixContainer}>
                                            <div className={styles.CMPlanes}>
                                                <h5 className={styles.CMIntegers}>
                                                    {KNNConfusionMatrix.TN}
                                                </h5>
                                            </div>
                                            <div className={styles.CMPlanes}>
                                                <h5 className={styles.CMIntegers}>
                                                    {KNNConfusionMatrix.FP}
                                                </h5>
                                            </div>
                                            <div className={styles.CMPlanes}>
                                                <h5 className={styles.CMIntegers}>
                                                    {KNNConfusionMatrix.FN}
                                                </h5>
                                            </div>
                                            <div className={styles.CMPlanes}>
                                                <h5 className={styles.CMIntegers}>
                                                    {KNNConfusionMatrix.TP}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className={styles.predAndAccContainer}>
                                            <div className={styles.predictionContainer}>
                                                <h5 className={styles.metrixHeader}>
                                                    Prediction
                                                </h5>
                                                <label className={styles.metrixLabelsPrediction}>
                                                    {KNNPrediction ? "Heart Attack" : "No Heart Attack"}
                                                </label>
                                            </div>

                                            <div className={styles.KNNAccuracyAndProbContainer}>
                                                <div className={styles.KNNAccuraryContainer}>
                                                    <h5 className={styles.KNNmetrixHeader}>
                                                        Accuracy
                                                    </h5>
                                                    <label className={styles.KNNmetrixLabels}>
                                                        {KNNAccuracy}%
                                                    </label>
                                                </div>
                                                <div className={styles.KNNProbabilityContainer}>
                                                <h5 className={styles.KNNmetrixHeader}>
                                                        Probability
                                                    </h5>
                                                    <label className={styles.KNNmetrixLabels}>
                                                        {KNNProbability}%
                                                    </label>
                                                </div>
                                                
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.printTicketContainer}>
                            <button className={styles.printTicketButton} 
                                onClick={() => {
                                    window.open('/pdf')
                                    localStorage.setItem('highProbability', true)
                                }}
                            >
                                Print Ticket
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
 
export default HighProbability;