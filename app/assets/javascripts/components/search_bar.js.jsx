window.SearchBar = React.createClass({
  render: function () {
    return(
      <div className='search-bar'>
        <input type='text'
               className='search-bar-input'
               value={this.props.query}
               onChange={this.props.handleQueryChange}
               onKeyDown={this.props.handleKeyDown}
               placeholder='Search Diagnoses'/>
        <span onClick={this.props.handleSubmit}
              className="glyphicon glyphicon-search"/>
      </div>
    );
  }
})
