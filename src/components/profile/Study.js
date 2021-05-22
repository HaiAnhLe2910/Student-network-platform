import React from 'react';

const Study = (props) =>{
    
    const study = props.study;
    
    return (
        <>
        <h2>Study Information</h2>
        <div className="info-con">
            <table>
                <tbody>
                    <tr>
                        <th>University</th>
                        <td>{study.university}</td>
                    </tr>
                    <tr>
                        <th>Degree</th>
                        <td>{study.degree}</td>
                    </tr>
                    <tr>
                        <th>Study Program</th>
                        <td>{study.program}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
    );
}

export default Study;