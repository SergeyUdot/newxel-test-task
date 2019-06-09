import React from 'react';
import './App.css';
import Activities from './components/Activities'

import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const activities = Object.values(require('./data/activities.json').activities);
let categories = [];
if(activities.length) {
  activities.forEach((item) => {
    item.category.forEach((cat) => {
      if(categories.indexOf(cat.toLowerCase())===-1) {
        categories.push(cat.toLowerCase());
      }
    });
  });
  categories = categories.map((item) => {
    return {title: item, checked: false}
  })
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: categories,
      sort: 1,
      results: 2,
      openFilter: false,
      openSort: false
    }
  }

  sortOption = (sort) => {
    this.setState({sort, openSort: false});
  }

  categoryCheckboxHandle = (cat) => {
    let { categories } = this.state
    categories.forEach((categorie, i) => {
      if(cat === i) {
        categorie.checked = !categorie.checked
      }
    });
    this.setState({categories: categories});
  }

  renderCategoryFilter = () => {
    return (
      <>
        {categories.map((item, i) => {
          return <li key={i}>
            <label>
              <input type="checkbox" name="categories" value={item.title} checked={this.state.categories[i].checked} onChange={() => this.categoryCheckboxHandle(i)} /> 
              {item.title}
            </label>
          </li>
        })}
      </>
    ) 
  }

  filterByCategory = (data, categories) => {
    if(categories.every(cat => !cat.checked)) {
      return data;
    } else {
      let selectedCategories = categories.filter((item) => {
        return item.checked;
      }).map((item) => {
        return item.title;
      });
      let filteredData = data.filter((item) => {
        return item.category.some(r => selectedCategories.includes(r.toLowerCase()))
      });
      return filteredData;
    }
  }

  filterToggle = (filterName) => {
    this.setState((state) => {
      return {
        [filterName]: !state[filterName]
      }
    })
  }

  showMoreResults = (dataLength) => {
    this.setState((state) => {
      return {
        results: state.results < dataLength ? state.results + 1 : state.results
      }
    });
  }

  render() {
    const filteredData = this.filterByCategory(activities, categories);
    return (
      <div className="activitiesList">
        <div className="total">Total: <span>{activities.length}</span></div>
        <div className="filterField">
          <span onClick={() => this.filterToggle('openFilter')}><FontAwesomeIcon icon={this.state.openFilter ? faChevronUp : faChevronDown} /> Filter by category</span>
          <ul className={this.state.openFilter ? 'opened' : 'closed'}>
            {this.renderCategoryFilter()}
          </ul>
        </div>
        <div className="filterField">
          <span onClick={() => this.filterToggle('openSort')}><FontAwesomeIcon icon={this.state.openSort ? faChevronUp : faChevronDown} /> Sort by price</span>
          <ul className={this.state.openSort ? 'opened' : 'closed'}>
            <li className={this.state.sort === 1 ? 'active' : ''}><span onClick={() => this.sortOption(1)}>Cheapest first</span></li>
            <li className={this.state.sort === 2 ? 'active' : ''}><span onClick={() => this.sortOption(2)}>Expensive first</span></li>
          </ul>
        </div>
        <Activities data={filteredData} sort={this.state.sort} results={this.state.results} />
        {this.state.results<filteredData.length && <button onClick={() => this.showMoreResults(filteredData.length)} className="showMoreButton">Show more</button>}
      </div>
    );
  }
}

export default App;
