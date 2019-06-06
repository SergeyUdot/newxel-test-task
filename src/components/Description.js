import React from 'react';

import { faChevronLeft, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Expandable activity description
class Description extends React.Component {
  state = { showTxt: false }

  showMore = () => this.setState({showTxt: true}); 
  showLess = () => this.setState({showTxt: false});

  render() {
    const { content } = this.props;
    const { showTxt } = this.state;
    const txtLength = 200;

    if(content.length <= txtLength) {
      return (
        <div className="artDescription"><div>{content}</div><hr /></div>
      )
    }
    if(showTxt) {
      return (
        <div className="artDescription">
          <div>{content}</div>
          <hr />
          <span className="showDescr" onClick={this.showLess}><FontAwesomeIcon icon={faChevronUp} size="xs" /> Read less</span>
        </div>
      )
    }
    
    const toShow = content.substring(0,txtLength)+"...";
    return (
      <div className="artDescription">
        <div>{toShow}</div>
        <hr />
        <span className="showDescr" onClick={this.showMore}><FontAwesomeIcon icon={faChevronLeft} size="xs" /> Read more</span>
      </div>
    )
  }
}

export default Description;
