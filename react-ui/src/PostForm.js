// PostForm.js
import React from 'react'
import { Button, Input, Form } from 'reactstrap'
import FolderList from './FolderList'
import PropTypes from 'prop-types'



const PropForm = props => (
    <Form onSubmit={props.setFilters}>
        <FolderList data={props.folderData} className="folderSelector" />
        <Input
            type="text"
            name="filter"
            id="filterFolder"
            placeholder="malloc"
            value={props.text}
            onChange={props.handleTextChange}
        />
        <Button type="submit" color="primary" id="submitButton">Submit</Button>
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