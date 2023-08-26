import React from 'react'
import { wine } from './Data'
import './RenderPage.css';

function RenderPage() {

    const columns = ['Measure   ', 'Class 1', 'Class 2', 'Class3']


    let classAlchohal = wine.map((e) => {
        return e.Alcohol
    })
    let classAlch = new Set(classAlchohal)
    let classNameWine = [...classAlch]
    const column = Object.values(classNameWine);
    console.log(column, "aa")




    // const ThData =()=>{

    //     return column.map((data)=>{
    //         return <>
    //        <thead>
    //         <th key={data}>Class {data}</th>
    //        </thead>

    //         </>
    //     })
    // }
    // function FlavanoidaCal(){
    //     debugger
    //      let mean=  []
    //      let val=0

    // }
    // FlavanoidaCal()
    function getMean(data, className) {
        debugger
        const classData = data.filter(item => item.Alcohol === className);
        const sum = parseFloat(classData.reduce((acc, curr) => acc + curr.Flavanoids, 0));
        let mean = parseInt((sum) / classData.length);
        return parseFloat(mean.toFixed(3))
    }
    function getMode(data, className) {
        const classData = data.filter(item => item.Alcohol === className);
        const counts = {};
        let maxCount = 0;
        let mode;

        classData.forEach(item => {
            if (!counts[item.Flavanoids]) {
                counts[item.Flavanoids] = 0;
            }
            counts[item.Flavanoids]++;

            if (counts[item.Flavanoids] > maxCount) {
                maxCount = counts[item.Flavanoids];
                mode = item.Flavanoids;
            }
        });

        return mode;
    }
    function getMedian(data, className) {
        const classData = data.filter(item => item.Alcohol === className);
        const sortedData = classData.map(item => item.Flavanoids).sort((a, b) => a - b);
        const mid = Math.floor(sortedData.length / 2);
        return sortedData.length % 2 !== 0 ? sortedData[mid] : (sortedData[mid - 1] + sortedData[mid]) / 2;
    }
    function getGammaMean(data) {
        const sum = data.reduce((acc, curr) => acc + ((curr.Ash * curr.Hue) / curr.Magnesium), 0);
        return parseFloat(sum / data.length);
      }
      function getGammaMedian(data) {
        const sortedData = data.map(item => (item.Ash * item.Hue) / item.Magnesium).sort((a, b) => a - b);
        const mid = Math.floor(sortedData.length / 2);
        return parseFloat(sortedData.length % 2 !== 0 ? sortedData[mid] : (sortedData[mid - 1] + sortedData[mid]) / 2);
      }
      function getGammaMode(data) {
        const counts = {};
        let maxCount = 0;
        let mode;
        
        data.forEach(item => {
          const gamma = (item.Ash * item.Hue) / item.Magnesium;
          if (!counts[gamma]) {
            counts[gamma] = 0;
          }
          counts[gamma]++;
          
          if (counts[gamma] > maxCount) {
            maxCount = counts[gamma];
            mode = gamma;
          }
        });
        
        return parseFloat(mode);
      }
      


    const classValue = column.map((data, i) => {
        let val = 0
        val += data[i]
    })

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {column.map((data) => {
                            return <th>Class{data}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            Flavanoida Mean
                        </th>
                        <td>{getMean(wine, 1)}</td>
                        <td>{getMean(wine, 2)}</td>
                        <td>{getMean(wine, 3)}</td>
                    </tr>
                    <tr>
                        <th>
                            Flavanoida Medium
                        </th>
                        <td>{getMode(wine, 1)}</td>
                        <td>{getMode(wine, 2)}</td>
                        <td>{getMode(wine, 3)}</td>

                    </tr>
                    <tr>
                        <th>
                            Flavanoida Mode
                        </th>
                        <td>{getMedian(wine, 1)}</td>
                        <td>{getMedian(wine, 2)}</td>
                        <td>{getMedian(wine, 3)}</td>



                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {column.map((data) => {
                            return <th>Class{data}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            Gamma Mean
                        </th>
                        <td>{getGammaMean(wine, 1)}</td>
                        <td>{getGammaMean(wine, 2)}</td>
                        <td>{getGammaMean(wine, 3)}</td>
                    </tr>
                    <tr>
                        <th>
                            Gamma Medium
                        </th>
                        <td>{getGammaMedian(wine, 1)}</td>
                        <td>{getGammaMedian(wine, 2)}</td>
                        <td>{getGammaMedian(wine, 3)}</td>

                    </tr>
                    <tr>
                        <th>
                            Gamma Mode
                        </th>
                        <td>{getGammaMode(wine, 1)}</td>
                        <td>{getGammaMode(wine, 2)}</td>
                        <td>{getGammaMode(wine, 3)}</td>



                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default RenderPage