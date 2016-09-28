var React = require('react');
var Loading = require('react-loading');
 
var Loader = React.createClass({
  render: function() {
    return (
      <Loading type='spin' color='#e3e3e3' />
    );
  }
});

module.exports = Loader;
