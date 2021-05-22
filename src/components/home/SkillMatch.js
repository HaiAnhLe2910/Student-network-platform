import React, { useState, useEffect } from 'react';
import { Image, Button, Container, Row, Col, Form } from 'react-bootstrap';

const SkillMatch = ({ handleMatch,isChecked }) => {

    return (
       
            <Form>
                <Form.Group controlId="formBasicPassword">
                    <Form.Check type="checkbox" label="Skills matched" checked={isChecked} style={{ color: '#14213D', fontSize: '16px', fontWeight: 'bold', paddingRight: '1.5vh',marginTop:'2vh' }} onChange={handleMatch} />
                </Form.Group>
            </Form>

    )

}
export default SkillMatch;