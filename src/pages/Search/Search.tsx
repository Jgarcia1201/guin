import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ResultsLoading from "../../components/ResultsLoading/ResultsLoading";
import ReactSpeedometer, { Transition } from "react-d3-speedometer";
import { PieChart } from "react-minimal-pie-chart";
import { TagCloud } from 'react-tagcloud'
import "./Search.css";

interface TweetRes {
     sentiment: {
          negative: number,
          neutral: number,
          positive: number,
          score: number
     },
     word_counts: []
}

const Search = () => {

     const { query }: any = useParams();
     const [isLoading, setIsLoading] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
     const [userInput, setUserInput] = useState("");
     const [result, setResult] = useState("");
     const [apiWordCount, setApiWordCount] = useState([]);
     const [positiveCount, setPositiveCount] = useState(0);
     const [negativeCount, setNegativeCount] = useState(0);
     const [neutralCount, setNeutralCount] = useState(0);
     const [sentScore, setSentScore] = useState(0);
     const [showMessage, setShowMessage] = useState(false);

     const apiUrl: string = "https://guin-api.herokuapp.com/search/%23";

     const navigate = useNavigate();

     const pieData = [
          { title: 'Positive', value: positiveCount, color: '#167a00'},
          { title: 'Neutral', value: neutralCount, color: '#b89c00' },
          { title: 'Negative', value: negativeCount, color: '#a80000' },
     ]

     useEffect(() => {
          makeApiCall(query);
     }, [])


     function makeApiCall(term: string): any {
          let url: string = apiUrl + term;
          setIsLoading(true);
          fetch(url)
          .then((response) => {
               if (response.status !== 200) {
                    navigate('/null');
               }
               else {
                    return response.json();
               }
          })
          .then((data: TweetRes) => {
               setApiWordCount(data.word_counts);
               setPositiveCount(data.sentiment.positive);
               setNegativeCount(data.sentiment.negative);
               setNeutralCount(data.sentiment.neutral);
               setSentScore(data.sentiment.score)
               setUserInput(term);
               setResult(getResult(data.sentiment.score));
          })
          .finally(() => {
               setTimeout(() => {
                    setIsLoading(false);
                    makeVisible();
               }, 3000)
          });
     }

     function makeVisible() {
          const searchDisplay: HTMLDivElement = document.querySelector('#searchDisplay')!;
          searchDisplay.style.opacity = "1";
     }

     function handleSearch() {
          let isValid = validate();
          if (isValid) {
               makeApiCall(searchTerm);
          }
          else {
               setShowMessage(true);
          }
     }

     function validate() {
          if (searchTerm != "") {
               return true;
          }
          else return false;
     }

     function handleInputChange(e: any) {
          setShowMessage(false);
          let value = (e.target as HTMLInputElement).value;
          let noLower = value.toLowerCase();
          let noPunc = noLower.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
          let noSpace = noPunc.replace(" ", "");
          setSearchTerm(noSpace);
     }

     function getResult(score: number): string {
          let res: string = "";

          if (score >= -1 && score < -0.5) {
               res = "NEGATIVE";
          }
          else if (score >= -0.5 && score < -0.1) {
               res = "MOSTLY NEGATIVE";
          }
          else if (score >= -0.1 && score < 0.1) {
               res = "NEUTRAL";
          }
          else if (score >= 0.1 && score < 0.5) {
               res = "MOSTLY POSITIVE";
          }
          else if (score >= 0.5) {
               res = "POSITIVE";
          }
          return res;
     }


     return (
          <div id="searchContainer">

               {isLoading && <ResultsLoading />}

               <div id="searchDisplay">
                    
                    <h1 id='searchTitle'>ANALYSIS</h1>

                    <div id="resultDisplay">

                         <div id="scrollDisplay">

                               <div id="gaugeDisplay">
                                   <div id="gaugeBox">
                                        <ReactSpeedometer 
                                             minValue={-1.10}
                                             maxValue={1.10}
                                             value={sentScore}
                                             segments={3}
                                             labelFontSize={"0px"}
                                             needleTransition={Transition.easeQuadIn}
                                             width={300}
                                             height={150}
                                        />
                                        <h2 className="gaugeScore">Score: {Math.round(sentScore * 100)}</h2>
                                   </div>
                                   <div id="gaugeWordBox">
                                        <h2 className="searchSubtitle">Sentiment</h2>
                                        <h1 id="resultWord">{result}</h1>
                                        <p className='resultText'>
                                             {userInput} has a sentiment score of {Math.round(sentScore * 100)}.<br></br>Sentiment is calculated by comparing the number of positive tweets
                                             to the number of negative tweets.
                                        </p>
                                   </div>
                              </div>

                              <div id="visualDisplay">

                                   <div id="wordCloudDisplay">
                                        <h2 className="searchSubtitle">Most Frequent Words</h2>
                                        <TagCloud
                                        minSize={15}
                                        maxSize={30}
                                        tags={apiWordCount}
                                        />
                                   </div>

                                   <div id="pieDisplay">
                                        <h2 className="searchSubtitle">Sentiment Breakdown</h2>
                                        <PieChart data={pieData}
                                                  lineWidth={20}
                                                  viewBoxSize={[100, 120]}
                                                  label={({dataEntry}) => Math.round(dataEntry.percentage) + '%'}
                                                  labelStyle={(index) => ({
                                                       fill: pieData[index].color,
                                                       fontSize: '9px',
                                                       fontFamily: 'sans-serif',
                                                     })}
                                                  labelPosition={60}
                                        />
                                        <div id='sentimentKeyBox'>
                                             <div className='keyBox'><h4 id="posKey" className="sentKey">POSITIVE</h4></div>
                                             <div className='keyBox'><h4 id="neuKey" className="sentKey">NEUTRAL</h4></div>
                                             <div className='keyBox'><h4 id="negKey" className="sentKey">NEGATIVE</h4></div>
                                        </div>
                                   </div>
                              </div>

                              <div id="againDisplay">
                                   <h2 className="searchSubtitle">Search Again?</h2>
                                   <input type="text" id="searchInput" onChange={handleInputChange}></input>
                                   <button id='searchSubmit' onClick={handleSearch}>Analyze</button>
                                   {showMessage && <h5 id='valid'>Please Enter a Term to Analyze</h5>}
                              </div>
                         </div>
                         
                    </div>

               </div>

          </div>
     )
}

export default Search