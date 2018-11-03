// Comment.js
import React from 'react';
import PropTypes from 'prop-types';

const Folder = props => (
    <option>{props.title}</option>
);

Folder.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Folder;