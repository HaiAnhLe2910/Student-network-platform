import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectList from './ProjectList';
import Banner from '../Common/Banner';
import '../Common/Button.css';
import Search from './Search';
import SkillMatch from './SkillMatch';
import Filters from './Filters';
import axios from '../config.js';
import history from '../history';
import './Homepage.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { ToastProvider} from 'react-toast-notifications';



const Homepage = ({ location }, props) => {

    /*token*/
    //Retrieve token from params 'token' of homepage url
    const [token, setToken] = useState(new URLSearchParams(location.search).get('token'));


    //Store token in localStorage
    if (token != null) {
        localStorage.setItem('token', token);
    }

    

    /*  */
    const [projects, setProjects] = useState({});
    const [categories, setCategories] = useState({});

    const [categoryChosen, setCategoryChosen] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    //const { addToast } = useToasts();

    //Retrieve category,skillMatch,searchQuery from params 'category' of homepage url
    /*     const [categoryQuery, setcategoryQuery] = useState(new URLSearchParams(location.search).get('category'));
        const [skillMatchQuery, setskillMatchQuery] = useState(new URLSearchParams(location.search).get('skillMatch'));
        const [searchQueryUrl, setsearchQueryUrl] = useState(new URLSearchParams(location.search).get('search')); */



    useEffect(() => {
        fetchAllCategories();
    }, [])

    const fetchAllCategories = async () => {
        const response = await axios.get('projects/category/all')
        setCategories(response.data);
    }

    //fetching API data
    useEffect(() => {
        fetchAllProjects();
    }, []);

    const fetchAllProjects = () => {
        setIsLoading(true);

        axios.get('projects/all')
            .then(res => {
                setProjects(res.data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            })
    }

    //Add query string to URL
    const AddQuery = (key, value) => {
        let currentUrlParams = new URLSearchParams(location.search);
        currentUrlParams.set(key, value);
        history.push(location.pathname + "?" + currentUrlParams.toString());
    }

    //Delete query string from URL
    const DeleteQuery = (key) => {
        let currentUrlParams = new URLSearchParams(location.search);
        currentUrlParams.delete(key);
        history.replace({
            search: currentUrlParams.toString(),
        });
    }

    const DeleteAllQuery = () => {
        DeleteQuery('search');
        DeleteQuery('skillMatch');
        DeleteQuery('category');
    }

    const ResetInput = () => {
        setIsChecked(false);
        setCategoryChosen('');
        setSearchQuery('');
    }

    /*Search*/
    const [tempSearchQuery,setTempSearchQuery]=useState('');
    const handleInputChange = (event, newValue) => {
        ResetInput();
        DeleteAllQuery();
        //console.log("this is new value from input change: " + newValue)
        if (newValue != '') {
            getSuggestions(newValue);
            //setTempSearchQuery(newValue);
        }
    }

     const getSuggestions = async(input) => {

        await axios.get('projects/search/typeahead/' + input)
            .then(res => {
                //console.log(res.data);
                setSuggestions(res.data);
               /*setIsLoading(false);  */
            })
            .catch(error => {
                setError(error);
                //setIsLoading(false);
            })
        
    }

    const handleChangeSearch=(event,newValue)=>{
        ResetInput();
        DeleteAllQuery(); 

        if(newValue!=null){
            setSearchQuery(newValue);
        }

    }

    const handleSearch = async(event) => {
        event.preventDefault();

        if (searchQuery != '') {
            console.log(searchQuery);
            console.log("Temp: "+tempSearchQuery);

            //Add query string to URL
            //AddQuery('search', searchQuery);

            setIsLoading(true);

            await axios.get('projects/search/' + searchQuery)
                .then(res => {
            
                    setProjects(res.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setIsLoading(false);
                })

        } else {
            fetchAllProjects();

            //Delete query string search when user input is empty
            DeleteQuery('search');
        }

    }

    /*Skill matching  */
    const handleMatch = (event) => {

        ResetInput();
        DeleteAllQuery();

        setIsChecked(event.target.checked);

        if (event.target.checked) {

            //Add query string to URL
            //AddQuery('skillMatch', event.target.checked);

            //GET the corresponding projects based on URL
            setIsLoading(true);
            axios.get('projects/search/skillmatch/'+localStorage.getItem('currentStudentId'))
                .then(res => {
                    setProjects(res.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setError(error);
                })
        } else {
            fetchAllProjects();

            //Delete query string skillMatch when user unchecks the checkbox
            DeleteQuery('skillMatch');
        }
    }

    const handleFilters = (optionChosen) => {
        ResetInput();
        DeleteAllQuery();

        setCategoryChosen(optionChosen);
        
        if (optionChosen != 'Select') {
            
            console.log(optionChosen);

            //Add query string to URL
            //AddQuery('category', optionChosen);

            //GET the corresponding projects based on URL 
            setIsLoading(true);
            axios.post('projects/search/filter', { term: '*', category: optionChosen })
                .then(res => {
                    console.log(res.data);
                    setProjects(res.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setError(error);
                })
        } else {
            fetchAllProjects();

            //Delete query string skillMatch when user unchecks the checkbox
            DeleteQuery('category');
        }
    }

    /*Filter by category */
    const handleSubmitFilters = (event) => {

        let value = event.target.value;
        handleFilters(value);
    }

    return (
        <div>
            <Banner />
            <Container className="top" >
                <Row>
                    <Col md={4}><Filters className="filtering" handleSubmitFilters={handleSubmitFilters} categories={categories} categoryChosen={categoryChosen} /> </Col>
                    <Col md={2}><SkillMatch handleMatch={handleMatch} isChecked={isChecked} /></Col>
                    <Col md={6}><Search searchQuery={tempSearchQuery} handleSearch={handleSearch} handleInputChange={handleInputChange} handleChangeSearch={handleChangeSearch} suggestions={suggestions} /></Col>
                </Row>
            </Container>
            <ToastProvider>
                <ProjectList location={location} projects={projects} isLoading={isLoading} />
            </ToastProvider>

        </div>
    );
}


export default Homepage;