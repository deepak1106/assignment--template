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




    function getMean(data, className) {
        const classData = data.filter(item => item.Alcohol === className);
        const sum = parseFloat(classData.reduce((acc, curr) => acc + curr.Flavanoids, 0));
        let mean = ((sum) / classData.length);
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

        return parseFloat((mode).toFixed(3));
    }
    function getMedian(data, className) {
        debugger
        const classData = data.filter(item => item.Alcohol === className);
        const sortedData = classData.map(item => item.Flavanoids).sort((a, b) => a - b);
        const mid = Math.floor(sortedData.length / 2);
        return parseFloat((sortedData.length % 2 !== 0 ? sortedData[mid] : (sortedData[mid - 1] + sortedData[mid]) / 2).toFixed(3));
    }
    function getGammaMean(data, className) {
        const classData = data.filter(item => item.Alcohol === className);
        const sum = classData.reduce((acc, curr) => acc + ((curr.Ash * curr.Hue) / curr.Magnesium), 0);
        return parseFloat((sum / classData.length).toFixed(3));
      }
    function getGammaMedian(data, className) {
        const classData = data.filter(item => item.Alcohol === className);
        const sortedData = classData.map(item => (item.Ash * item.Hue) / item.Magnesium).sort((a, b) => a - b);
        const mid = Math.floor(sortedData.length / 2);
        return parseFloat((sortedData.length % 2 !== 0 ? sortedData[mid] : (sortedData[mid - 1] + sortedData[mid]) / 2).toFixed(3));
      }
      function getGammaMode(data, className) {
        

        const classData = data.filter(item => item.Alcohol === className);
        const counts = {};
        let maxCount = 0;
        let mode;
        
        classData.forEach(item => {
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
        
        return parseFloat((mode).toFixed(3));
      }




    return (
        <div className='table-container'>
            <table className='table12'>
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
                        {column.map((d, i) => {
                            return <td>
                                {getMean(wine, i + 1)}
                            </td>
                        })}

                    </tr>
                    <tr>
                        <th>
                            Flavanoida Medium
                        </th>
                        {column.map((d, i) => {
                            return <td>
                                {getMode(wine, i + 1)}
                            </td>
                        })}
                    </tr>
                    <tr>
                        <th>
                            Flavanoida Mode
                        </th>
                        {column.map((d, i) => {
                            return <td>
                                {getMedian(wine, i + 1)}
                            </td>
                        })}
                    </tr>
                </tbody>
            </table>
            <table className='table12'>

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
                        {column.map((d, i) => {
                            return <td>
                                {getGammaMean(wine, i + 1)}
                            </td>
                        })}
                    </tr>
                    <tr>
                        <th>
                            Gamma Medium
                        </th>
                        {column.map((d, i) => {
                            return <td>
                                {getGammaMedian(wine, i + 1)}
                            </td>
                        })}
                    </tr>
                    <tr>
                        <th>
                            Gamma Mode
                        </th>
                        {column.map((d, i) => {
                            return <td>
                                {getGammaMode(wine, i + 1)}
                            </td>
                        })}
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default RenderPage