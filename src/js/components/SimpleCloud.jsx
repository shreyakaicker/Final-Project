var React = require('react');
var $ = window.$ = require('jquery');
import {TagCloud} from 'react-tagcloud';


var SimpleCloud = React.createClass({
    render: function () {
        var keywords = this.props.keywords;
      
      var ourArray= keywords.map(function (ele){
            return(
                {
                value: ele.text,
                count: ele.relevance
                }
        )
        } );
        
    
        return (
  <TagCloud minSize={15}
            maxSize={37}
          tags={ourArray}
          displayRandomColor= 'false' 
            onClick={function(tag) {console.log('clicking on tag:', tag) }} />
            
            )
    }
});


module.exports = SimpleCloud;