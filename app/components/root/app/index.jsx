import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Header from './header';
import Footer from './footer';
import { LOAD_PAGE_CONTENT } from 'constants/admin/landingPage';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import CopyRight from './copyRight';

class App extends React.Component {

    render() {

       
        return <div>

            <Header />

            <div id="snackbar"></div>

            {this.props.children}

            <Footer {...this.props} />

            <CopyRight />

        </div>
    }

    componentWillReceiveProps(nextProps) {
        
       if(JSON.stringify(this.props.landingPage.get("lstLandingPage").toArray()) != JSON.stringify(nextProps.landingPage.get("lstLandingPage").toArray())) {
         this.props.loadPageContent();
       }
    }

    componentDidMount() {
        this.props.loadPageContent();
    }
}

const storeState = (state, ownProps) => {
    return {
        'data': Map(state.app),
        'landingPage': Map(state.admin.landingPage)
    }
}

const mapDispatchToProps = (dispatch, ownState) => {

    return {
        dispatch,
        loadPageContent: function (type) {
            dispatch(reduxAction(LOAD_PAGE_CONTENT, { 'pageType': type }))
        }
    }
}

module.exports = connect(storeState, mapDispatchToProps)(App);