
var React=  require("react");

var EntitiesTable = React.createClass({ 
    

    render: function() {
    var entities = this.props.data;
        
        return (
<table>
  <thead>
    <tr>
      <th>Entity Name</th>
      <th>Relevance</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
  { entities.forEach(function (ele) { 
  
  return (
     <tr>
      <td><strong>{entities.text}</strong></td>
      <td>{Number(entities.relevance)*100}/100 </td>
      <td>{entities.type}, </td>
    </tr>)
    })
  }
    </tbody>
</table>
)}

})

module.exports = EntitiesTable;