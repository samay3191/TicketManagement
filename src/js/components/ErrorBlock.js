import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ErrorBlock = ({errorMessage}) => {
    if (errorMessage) {
        return (
            <Fragment>
                <div className="InputError">{errorMessage}</div>
                <div className="clear"></div>
            </Fragment>
        );
    }
    return null;
}

ErrorBlock.propTypes = {
    errorMessage: PropTypes.string.isRequired
}

export default ErrorBlock;