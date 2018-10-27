import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import * as actions from '../actions/navigationActions';

const mapStateToProps = state => {
    return {
        activePage: state.navigationReducer.activePage
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

class Home extends Component {

    componentWillMount() {
        this.props.setNavigation("");
    }

    render() {
        return (
            <div>
                <h2>Welcome to Ticket Management Demo</h2>
                <p>Demo created by Samay Bhavsar.</p>
                <p>In this application I have used React, Redux and Router only.</p>
            </div>
        );
    }
}

Home.propTypes = {
    activePage: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
