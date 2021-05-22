import React from 'react';
import { Col, Form } from 'react-bootstrap';

const Filters = ({ handleSubmitFilters, categoryChosen, categories}) => {

    //Mock data
    /*     const categories = [
            { id: 1, name: 'IT' },
            { id: 2, name: 'Healthcare' },
            { id: 3, name: 'Education' }
        ] */

     var categoryDropDown= categories.length? categories.map((item, index)=>{
       return( <option key={index} value={item.name}>{item.name}</option>);
    }): <option value={''}></option>;

    return (
        <Form className="form-group form-inline">
            <Form.Label style={{ color: '#14213D', fontSize: '16px', fontWeight: 'bold', paddingRight: '1vh',marginTop:'2vh' }}>Category</Form.Label>
            <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                style={{marginTop:'2vh'}}
                value={categoryChosen}
                option={categories}
                onChange={(event) => handleSubmitFilters(event)}
                custom
            >
                <option value={''}>Select</option>
                {categoryDropDown}  
            </Form.Control>
        </Form>
    )

}
export default Filters;