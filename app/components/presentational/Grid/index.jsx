import React, { Component } from 'react';
import Griddle from 'griddle-react';

export default class Grid extends Component { 
    
    render() {

        return (<div> 
                 <Griddle 
                 resultsPerPage={this.props.resultsPerPage} 
                 showSettings={this.props.showSettings} 
                 columns={this.props.columns} 
                 results={this.props.data} 
                 columnMetadata={this.props.columnMetadata} 
                 showFilter={this.props.showFilter}
                 showPager={this.props.showPager}
                 onRowClick={this.props.onRowClick} />  
            </div>); 
    }
}

Grid.propTypes = {
    results: React.PropTypes.any,
    showFilter: React.PropTypes.bool,
    columns: React.PropTypes.array
}

Grid.defaultProps = {
    showFilter: true
}