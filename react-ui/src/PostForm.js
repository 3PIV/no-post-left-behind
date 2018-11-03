// PostForm.js
import React from 'react'
import { Button, Input, Form } from 'reactstrap'
import FolderList from './FolderList'
import PropTypes from 'prop-types'

const PropForm = props => (
    <Form >
        <FolderList data={props.folderData} func={props.setFilters} className="folderSelector" />
        <Input
            type="text"
            name="filter"
            id="filterFolder"
            placeholder="*this currently doesn't work, the option select does though*"
            value={props.text}
            onChange={props.handleTextChange}
        />
        <Button onClick={() => props.setFilters("hw7")} type="button" color="primary" id="submitButton" >Submit</Button>
    </Form>
);

PropForm.propTypes = {
    setFilters: PropTypes.func.isRequired,
    folderData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

PropForm.defaultProps = {
    folderData:['nil']
};

export default PropForm;