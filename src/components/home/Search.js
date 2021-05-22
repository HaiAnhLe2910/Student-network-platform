import React from 'react';
import {Form,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import './Homepage.css';

const Search = ({ searchQuery, handleInputChange, handleChangeSearch, suggestions, handleSearch }) => {
    return (
        <Form onSubmit={handleSearch}  className="form-group form-inline" style={{display:"flex",alignItems:"center"}}>
            <Autocomplete
                id="autocomplete"
                size={"small"}
                style={{paddingRight:'5px',justifyContent: "center", width: "75%", marginBottom:"8px"}}
                freeSolo
                autoSelect // when the user lose focus on the input - the current value will be the value of the autocomplete 
                options={suggestions}
                getOptionLabel={(option) => option.text}
                onInputChange={(e,data)=>handleInputChange(e,data)}
                onChange={handleChangeSearch}
                renderInput={params => (
                    <TextField
                        {...params}
                        label="Search for project"
                        margin="normal"
                        variant="outlined"
                    />
                )}
            />

            <Button className='button-primary' type="submit" style={{ color: 'black', backgroundColor: '#E9C46A', borderColor: '#E9C46A',float:'right', height:"37px"}}>
                Search
            </Button>

        </Form>

    )
}

export default Search;
