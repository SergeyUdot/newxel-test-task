import React from 'react';
import PropTypes from 'prop-types';
import Description from './Description';

import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

// Single activity block
class Article extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      photoIndex: 0,
      isOpen: false,
      quantity: 0
    };
  }

  quantityHandle = (e) => {
    const val = parseInt(e.target.value.trim(), 10);
    if (val >= 0) {
      this.setState({quantity: val});
    } else {
      this.setState({quantity: 0});
    }
  }

  quantityButton = (e) => {
    const sign = e.target.innerText;
    this.setState((state) => {
      return {
        quantity: (sign === '-') ? (state.quantity > 0 ? state.quantity-1 : 0) : state.quantity+1
      }
    });
  }

  render() {
    const { data } = this.props;
    const images = data.images;
    const { photoIndex, isOpen } = this.state;
    
    return (
      <article>
        <div className="artLeft">
          {data.popular && <div className="artPopular">Popular</div>}
          <div className="artLeftBot">
            <span>${data.price}</span>
            <button onClick={this.quantityButton}>-</button><input type="text" value={this.state.quantity} onChange={this.quantityHandle} /><button onClick={this.quantityButton}>+</button>
          </div>
        </div>
        <div className="artRight">
          <span className="artImage" onClick={() => this.setState({ isOpen: true })}><img src={data.images[0]} alt={data.name} /></span>
          <div className="artContent">
            <h2>{data.name}</h2>
            <Description content={data.description} />
            <div className="artDate">{data.dates[0]} <FontAwesomeIcon icon={faClock} /></div>
          </div>
          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
                })
              }
            />
          )}
        </div>
      </article>
    )
  }
}

Article.propTypes = {
  data: PropTypes.object
}

export default Article;
