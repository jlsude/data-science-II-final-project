import React, { useRef, forwardRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import styles from './PDF.module.css';

import PDFTemplateMore from './PDFTemplateMore.png';
import PDFTemplateLess from './PDFTemplateLess.png';

const PDF = () => {

    
    const [finalInputData, setFinalInputData] = useState([]);
    const [finalResultData, setFinalResultData] = useState([]);
    const [highProbability, setHighProbability] = useState(undefined);

    const [SVMData, setSVMData] = useState(undefined);
    const [KNNData, setKNNData] = useState(undefined);
    const [LRData, setLRData] = useState(undefined);

    const [thalach, setThalach] = useState(0);
    const [thal, setThal] = useState(0);

    useEffect(() => {

        console.log("PDF.js useEffect() called");
        let finalInputData = localStorage.getItem('finalInputData');
        finalInputData = JSON.parse(finalInputData);
        
        let finalResultData = localStorage.getItem('finalResultData');
        finalResultData = JSON.parse(finalResultData);

        let highProbability = localStorage.getItem('highProbability');
        highProbability = JSON.parse(highProbability);
        
        
        setFinalResultData(finalResultData);
        setFinalInputData(finalInputData);
        setHighProbability(highProbability);
        setThalach(finalInputData.thalach);
        setThal(finalInputData.thal);


    }, []);

    useEffect(() => {

        if(finalInputData.thalach !== undefined && finalInputData.thal !== undefined) {
            setThalach(finalInputData.thalach);
            setThal(finalInputData.thal);
        } else {
            setThalach('N/A');
            setThal('N/A');
            
        }

        
    }, [finalInputData]);

    useEffect(() => {
        setSVMData(finalResultData.SVM_Model_more ? 
            finalResultData.SVM_Model_more : 
            finalResultData.SVM_Model_less);
        setKNNData(finalResultData.KNN_Model_more ?
            finalResultData.KNN_Model_more :
            finalResultData.KNN_Model_less);
        setLRData(finalResultData.LR_Model_more ?
            finalResultData.LR_Model_more :
            finalResultData.LR_Model_less);
    }, [finalResultData]);




    

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const PDFTemplateTicket = forwardRef((props, ref) => (

        <div ref={ref}>

            {highProbability ? (
                <img src={PDFTemplateMore} className={styles.background}/>
            ) : (
                <img src={PDFTemplateLess} className={styles.background}/>
            )}

            <div className={styles.textEnvironment}>
                <h1 style={{fontSize: 16, position: 'absolute', top: 391, left:140}}>
                    {finalInputData.age}
                </h1>
                <h1 style={{fontSize: 16, position: 'absolute', top: 391, left:267}}>
                    {finalInputData.gender ? "Male" : "Female"}
                </h1>
                <h1 style={{fontSize: 16, position: 'absolute', top: 428, left:244}}>
                    {finalInputData.trestbps}
                </h1>
                <h1 style={{fontSize: 16, position: 'absolute', top: 466, left:230}}>
                    {finalInputData.cp}
                </h1>
                <h1 style={{fontSize: 16, position: 'absolute', top: 503, left:246}}>
                    {finalInputData.chol}
                </h1>
                <h1 style={{fontSize: 16, position: 'absolute', top: 540, left:254}}>
                    {finalInputData.fbs}
                </h1>
                <h1 style={{fontSize: 16, position: 'absolute', top: 575, left:258}}>
                    {finalInputData.restecg}
                </h1>
                <h1 style={{fontSize: 16, position: 'absolute', top: 612, left:170}}>
                    {thalach}
                </h1>
                <h1 style={{fontSize: 16, position: 'absolute', top: 650, left:146}}>
                    {thal}
                </h1>

                {SVMData ? (
                    <div>
                        <h1 style={{fontSize: 16, position: 'absolute', top: 354, left:500}}>
                            {(parseInt(SVMData.SVM_accuracy)*100).toFixed(2)}%
                        </h1>
                        <h1 style={{fontSize: 16, position: 'absolute', top: 384, left:500}}>
                            {(parseInt(SVMData.SVM_probability)*100).toFixed(2)}%
                        </h1>
                        <h1 style={{fontSize: 16, position: 'absolute', top: 440, left:480}}>
                            {SVMData.SVM_prediction ? "Heart Attack" : "No Heart Attack"}
                        </h1>
                    </div>
                    
                ) : null}

                {KNNData ? (
                    <div>
                        <h1 style={{fontSize: 16, position: 'absolute', top: 354, left:750}}>
                            {(KNNData.KNN_accuracy*100).toFixed(2)}%
                        </h1>
                        <h1 style={{fontSize: 16, position: 'absolute', top: 384, left:750}}>
                            {(KNNData.KNN_probability*100).toFixed(2)}%
                        </h1>
                        <h1 style={{fontSize: 16, position: 'absolute', top: 440, left:720}}>
                            {KNNData.KNN_prediction ? "Heart Attack" : "No Heart Attack"}
                        </h1>
                    </div>
                    
                ) : null}

                {LRData ? (
                    <div>
                        <h1 style={{fontSize: 16, position: 'absolute', top: 364, left:968}}>
                            {(LRData.LR_accuracy*100).toFixed(2)}%
                        </h1>
                        <h1 style={{fontSize: 16, position: 'absolute', top: 400, left:970}}>
                            {(LRData.LR_probability*100).toFixed(2)}%
                        </h1>
                    </div>
                ) : null}

                <div style={{width: 385, height:165, borderWidth: 1, borderColor: 'red',
                                position: 'absolute', top: 545, left:405,
                                display: 'flex', flexWrap: 'wrap'
                            }}>
                    {highProbability ? (
                        <h1 style={{textAlign: 'justify', fontSize: 16, textIndent: 20}}>
                            After a thorough analysis using the SVM algorithm, it has been determined that the patient has a 
                            HIGH PROBABILITY of developing cardiovascular disease. 
                            Immediate admission for confinement is STRONGLY RECOMMENDED to undergo further specialist examination and treatment.
                        </h1>
                    ) : (
                        <h1 style={{textAlign: 'justify', fontSize: 16, textIndent: 20}}>
                            Analysis of patient data using the SVM algorithm indicates a LOW PROBABILITY of developing cardiovascular disease. 
                            It is recommended that the patient be admitted to the emergency room for further investigation of symptoms.
                        </h1>
                    )}
                </div>

                <h1 style={{fontSize: 35, position: 'absolute', 
                    top: 550, left:890, fontWeight: 'bold', color: 'white', fontWeight: 'bolder'}}>
                    {(SVMData.SVM_probability*100).toFixed(2)}%
                </h1>

                

            </div>
            
        </div>
       
    ));

    useEffect(() => {
        if (highProbability !== undefined ) { 
            
            handlePrint();
        }
    }, [highProbability, SVMData, KNNData, LRData, finalInputData]);
    

    return (
        <div className={styles.page}>
            <div className={styles.frontDrop} />
            {finalInputData && finalResultData &&
                SVMData && KNNData && LRData &&
            (
                <PDFTemplateTicket ref={componentRef} />
            )}
            {/* <button onClick={() => handlePrint()}>Print this out!</button> */}
        </div>
    );
}
 
export default PDF;