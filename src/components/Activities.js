import React from 'react';
import Article from './Article';

// List of activities
class Activities extends React.Component {
  sortData = (data, sort) => {
    data.sort((a, b) => {
      switch(sort) {
        case 1:
          return a.price - b.price;
        case 2:
          return b.price - a.price;
        default:
          return a.price - b.price;
      }  
    });
  }

  renderActivities = () => {
    const { data, sort, results } = this.props;
    let activitiesTemplate = null;
    if(data.length) {
      this.sortData(data, sort);
      activitiesTemplate = data.map(function(item, i) {
        if (i < results) {
          return <Article key={item.id} data={item}/>
        } else {
          return '';
        }
      })
    } else {
      activitiesTemplate = <p>No activities available for this filter combination</p>
    }
    return activitiesTemplate;
  }

  render() {
    return (
      <section>{this.renderActivities()}</section>
    )
  }
}

export default Activities;
