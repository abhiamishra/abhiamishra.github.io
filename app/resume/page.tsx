import React from 'react'
import Layout from '../components/Layout'
import AccordionItem from '../components/AccordionItem'

const page = () => {
    return (
        <Layout>
            <h1 className="text-5xl font-bold mb-6">
                resume
            </h1>
            <h2 className="text-2xl mb-6">
                pdf resume: in the works 🔧
            </h2>
            <>
                <AccordionItem title="education">
                    <div className="px-6 flex flex-wrap justify-center space-x-6">

                        <div className="inverse-themable max-w-sm rounded-xl shadow-lg p-6 space-y-4 mb-3">
                            <h3 className="text-xl font-semibold">Georgia Tech</h3>
                            <h2 className="text-medium font-semibold">Master's in CS</h2>
                            <p className="text-sm">August 2024 &ndash; Present</p>
                            <p className="text-sm font-medium">GPA: 4.00 / 4.00</p>
                            <div>
                                <h4 className="text-sm font-medium mb-2">Relevant Coursework:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Knowledge Based AI</li>
                                <li>Robotics: AI Techniques</li>
                                <li>Computer Networks</li>
                                </ul>
                            </div>    
                        </div>  
                        <div className="inverse-themable max-w-sm rounded-xl shadow-lg p-6 space-y-4 mb-3">
                            <h3 className="text-xl font-semibold">University Of Texas At Dallas</h3>
                            <h2 className="text-medium font-semibold">Bachelor's in CS, Minor in Spanish</h2>
                            <p className="text-sm">August 2020 &ndash; May 2023</p>
                            <p className="text-sm font-medium">GPA: 4.00 / 4.00</p>
                            <p className="text-sm font-medium">Dean's List (x6), Summa Cumma Laude</p>
                            <div>
                                <h4 className="text-sm font-medium mb-2">Relevant Coursework:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Data Structures &amp; Algorithms</li>
                                <li>Artificial Intelligence</li>
                                <li>Compiler Design</li>
                                <li>Advanced Data Structures</li>
                                <li>Probability and Statistics</li>
                                <li>Unix and C++</li>
                                <li>Discrete Mathematics</li>
                                </ul>
                            </div>    
                        </div>  
                        <div className="inverse-themable max-w-sm rounded-xl shadow-lg p-6 space-y-4 mb-3">
                            <h3 className="text-xl font-semibold">Coppell High School</h3>
                            <h2 className="text-medium font-semibold">IB Graduate</h2>
                            <p className="text-sm">August 2017 &ndash; May 2020</p>
                            <div>
                                <h4 className="text-sm font-medium mb-2">Relevant Coursework:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>IB HL Mathematics</li>
                                <li>IB SL Physics</li>
                                <li>AP Statistics</li>
                                <li>IB HL Spanish</li>
                                <li>IB HL English</li>
                                <li>IB HL History</li>
                                </ul>
                            </div>    
                        </div>         
                    </div>  
                </AccordionItem>
            </>
            <>
                <AccordionItem title="research">
                    <div className='mb-3'>
                        <h1 className="flip-text text-xl font-bold"
                            style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                        >Programming Assistant for Exception Handling with CodeBERT</h1>
                        <h1 className="flip-text text-medium"
                            style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                        >ICSE 24 Research Publication</h1>
                        <h1 className="flip-text text-medium mb-3"
                            style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                        >Professor: Tien Nguyen</h1>
                            <p className="mb-3">Proposed Neurex, an exception-handling recommender learns from complete code, accepts a given Java code snippet, and gives
                            recommendations about exception handling.</p>
                            <p className="">Co-Authors: Yuchen Cai, Aashish Yadavally, Abhishek Amol Mishra, Genesis Montejo, and Tien N. Nguyen</p>
                    </div>
                    <div className='mb-3'>
                        <h1 className="flip-text text-xl font-bold"
                            style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                        >Neural Exception Handling Recommender</h1>
                        <h1 className="flip-text text-medium"
                            style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                        >ICSE 24 Poster</h1>
                        <h1 className="flip-text text-medium mb-3"
                            style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                        >Professor: Tien Nguyen</h1>
                            <p className="mb-3">Worked on a multi-tasking large language model that recommends what exception to give for a code snippet.</p>
                            <p className="">Co-Authors: Yuchen Cai, Aashish Yadavally, Abhishek Amol Mishra, Genesis Montejo, and Tien N. Nguyen</p>
                    </div>
                    <div className='mb-3'>
                        <h1 className="flip-text text-xl font-bold"
                            style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                        >Measuring Defensive Efficiency with Event Data</h1>
                        <h1 className="flip-text text-medium"
                            style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                        >StatsPerform ProForum 2022 Conference</h1>
                        <h1 className="flip-text text-medium mb-3"
                            style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                        >Research Lead: Soumyajit Bose </h1>
                            <p className="mb-3">Research proposal creating 4 machine learning solutions to solve and evaluate metrics for defensive ability in soccer center-backs was 1
                            of 10 papers accepted globally and was the only undergraduate student to present at the conference.</p>
                            <p className="">Co-Authors: Yuchen Cai, Aashish Yadavally, Abhishek Amol Mishra, Genesis Montejo, and Tien N. Nguyen</p>
                    </div>
                    
                </AccordionItem>
            </>
            <>
                <AccordionItem title="professional experience">
                <div className="mb-3">
                        <h1
                            className="flip-text text-xl font-bold"
                            style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                        >
                            CS Research Assistant for Professor Tien Nguyen
                        </h1>
                        <h1
                            className="flip-text text-medium"
                            style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                        >
                            Jan 2023 — May 2023
                        </h1>
                        <h1
                            className="flip-text text-medium mb-3"
                            style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                        >
                            University of Texas at Dallas
                        </h1>
                        <p className="mb-3">
                        Was invovled in two projects - both based in researching AI/ML for Code: API-Representational Learning and Exception Handling with ML.
                        </p>
                        <p className="mb-3">
                        Tasks included aiding the team in building and compiling projects, running tasks on state-of-the-art Ares server, and helping the research in idea creation and discussion.
                        One of the two undergraduate research assistants that Prof. Tien Nguyen hired for research in which UTD is ranked #7 among universities in the United States.
                        </p>
                    </div>

                    <h1 className="text-2xl mb-6">in the works 🔧</h1>
                </AccordionItem>
            </>
            <>
                <AccordionItem title="side projects">
                    {/* 1. ACM Development Officer */}
                    <div className="mb-3">
                        
                    <h1
                        className="flip-text text-xl font-bold"
                        style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                    >
                        ACM Development Officer
                    </h1>
                    <h1
                        className="flip-text text-medium"
                        style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                    >
                        November 2022 — Present
                    </h1>
                    <h1
                        className="flip-text text-medium mb-3"
                        style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                    >
                        {/* subtitle if any */}
                    </h1>
                    <p className="mb-3">
                        Applying my skills as a backend developer for the ACM Development Team. Primarily,
                        I am involved in helping out in building Portal v2—the next iteration of the ACM Portal.
                    </p>
                    <p className="">
                        Have been involved in building out schema for a new database system, migrating
                        databases, designing and leading the architecture of the new application system
                        within the Portal.
                    </p>
                    </div>

                    {/* 2. Toyota Sponsored Challenge Finalist */}
                    <div className="mb-3">
                    <h1
                        className="flip-text text-xl font-bold"
                        style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                    >
                        Toyota Sponsored Challenge Finalist (Top 4)
                    </h1>
                    <h1
                        className="flip-text text-medium"
                        style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                    >
                        November 2022
                    </h1>
                    <h1
                        className="flip-text text-medium mb-3"
                        style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                    >
                        HackUTD
                    </h1>
                    <p className="mb-3">
                        Led the creation of “Sobrive,” an app that used image recognition to help people
                        against drunk driving.
                    </p>
                    <p className="">
                        Successfully showcased in front of Toyota judges and placed in the top four.
                    </p>
                    </div>

                    {/* 3. HackDFW Finalist */}
                    <div className="mb-3">
                    <h1
                        className="flip-text text-xl font-bold"
                        style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                    >
                        HackDFW Finalist (Top 7)
                    </h1>
                    <h1
                        className="flip-text text-medium"
                        style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                    >
                        October 2022
                    </h1>
                    <h1
                        className="flip-text text-medium mb-3"
                        style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                    >
                        HackDFW
                    </h1>
                    <p className="mb-3">
                        Led the creation of “Themis,” a machine-learning service to aid information equality in
                        the Supreme Court.
                    </p>
                    <p className="">
                        Selected to present before a Google-judge panel as one of seven finalists out of 500+ participants.
                    </p>
                    </div>

                    {/* 4. ACM Research Technical Lead */}
                    <div className="mb-3">
                    <h1
                        className="flip-text text-xl font-bold"
                        style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                    >
                        ACM Research Technical Lead
                    </h1>
                    <h1
                        className="flip-text text-medium"
                        style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                    >
                        May 2022 — Present
                    </h1>
                    <h1
                        className="flip-text text-medium mb-3"
                        style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                    >
                        Object Detection with Thermal Imaging
                    </h1>
                    <p className="mb-3">
                        Leading research on object detection using thermal imaging (FLIR dataset). Teaching
                        transfer learning, data augmentation, preprocessing pipelines, and TensorFlow/Keras.
                    </p>
                    <p className="">
                        Goal: build, deploy, and validate a robust model in UTD’s parking structure garage.
                    </p>
                    </div>

                    {/* 5. ACM Research Mentee */}
                    <div className="mb-3">
                    <h1
                        className="flip-text text-xl font-bold"
                        style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                    >
                        ACM Research Mentee
                    </h1>
                    <h1
                        className="flip-text text-medium"
                        style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                    >
                        January 2022 — May 2022
                    </h1>
                    <h1
                        className="flip-text text-medium mb-3"
                        style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                    >
                        Determining Exoplanets
                    </h1>
                    <p className="mb-3">
                        Researched atmospheric composition of exoplanets using ML. Spearheaded FNN and CNN
                        models to replicate NASA Astrobiology Team results with fewer resources.
                    </p>
                    <p className="">
                        Led team in model development and evaluation.
                    </p>
                    </div>

                    {/* 6. AIS Projects Mentee */}
                    <div className="mb-3">
                    <h1
                        className="flip-text text-xl font-bold"
                        style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                    >
                        AIS Projects Mentee
                    </h1>
                    <h1
                        className="flip-text text-medium"
                        style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                    >
                        January 2022 — May 2022
                    </h1>
                    <h1
                        className="flip-text text-medium mb-3"
                        style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                    >
                        “Emo7ion” Emotion Detection App
                    </h1>
                    <p className="mb-3">
                        Developed backend; handled data in Amazon S3, built model in SageMaker, and deployed
                        via AWS Endpoints.
                    </p>
                    <p className="">
                        Assisted front-end team to connect webcam feed to the deployed model.
                    </p>
                    </div>

                    {/* 7. HackReason 2nd Place Winner */}
                    <div className="mb-3">
                    <h1
                        className="flip-text text-xl font-bold"
                        style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                    >
                        HackReason 2nd Place Winner
                    </h1>
                    <h1
                        className="flip-text text-medium"
                        style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                    >
                        January 2022
                    </h1>
                    <h1
                        className="flip-text text-medium mb-3"
                        style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                    >
                        Prolog & SCASP AI System
                    </h1>
                    <p className="mb-3">
                        Led a four-person team to build an AI-based support system for at-risk students,
                        placing 2nd among primarily graduate competitors.
                    </p>
                    <p className="">
                        Developed inference logic in Prolog/SCASP to recommend personalized development steps.
                    </p>
                    </div>

                    {/* 8. ACM Project Mentee */}
                    <div className="mb-3">
                    <h1
                        className="flip-text text-xl font-bold"
                        style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                    >
                        ACM Project Mentee
                    </h1>
                    <h1
                        className="flip-text text-medium"
                        style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                    >
                        January 2021 — May 2021
                    </h1>
                    <h1
                        className="flip-text text-medium mb-3"
                        style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                    >
                        “Commodity” Resource App
                    </h1>
                    <p className="mb-3">
                        Led backend development using Firebase Auth and Google Maps/Places API
                        to connect low-income users with nearby resources.
                    </p>
                    <p className="">
                        Managed data flows and authentication for the entire application.
                    </p>
                    </div>

                </AccordionItem>
            </>
            <>
                <AccordionItem title="achievements">
                    <div className="mb-3">
                        <h1
                            className="flip-text text-xl font-bold"
                            style={{ '--light-text': '#1e40af', '--dark-text': '#bfdbfe' } as React.CSSProperties}
                        >
                            AES Scholarship
                        </h1>
                        <h1
                            className="flip-text text-medium"
                            style={{ '--light-text': '#975a16', '--dark-text': '#fefcbf' } as React.CSSProperties}
                        >
                            Aug 2020 — May 2023
                        </h1>
                        <h1
                            className="flip-text text-medium mb-3"
                            style={{ '--light-text': '#991b1b', '--dark-text': '#fecaca' } as React.CSSProperties}
                        >
                            University of Texas at Dallas
                        </h1>
                        <p className="mb-3">
                            Recevied academic merit scholarship to cover 90% of tuition fees.
                        </p>
                    </div>
                </AccordionItem>
            </>

        </Layout>
      )
}

export default page