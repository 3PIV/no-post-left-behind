// PostList.js
import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

const FolderList = ({ data, func }) => {
    return (
        <Input type="select" name="folder" id="folderSelect"  onChange={() => func(document.getElementById("folderSelect").options[document.getElementById("folderSelect").selectedIndex].value)}>
            {data.length && data.map((folder, i) => <option value={folder} key={i} onChange={() => func()}>{folder}</option>)}
        </Input>
    );
};

FolderList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.string,
    ),
    func: PropTypes.func
};

FolderList.defaultProps = {
    data: ['test'],
    func: (value) => {return}
};

export default FolderList;