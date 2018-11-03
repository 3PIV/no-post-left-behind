// PostList.js
import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

const FolderList = ({ data }) => {
    return (
        <Input type="select" name="folder" id="folderSelect">
            {data.length && data.map((folder, i) => <option key={i}>{folder}</option>)}
        </Input>
    );
};

FolderList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.string,
    ),
};

FolderList.defaultProps = {
    data: ['test'],
};

export default FolderList;