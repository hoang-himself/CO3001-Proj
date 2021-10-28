import React, { Component } from 'react'
import { ReactComponent as Left } from "./assets/svg/left_arrow.svg";
import { ReactComponent as Right } from "./assets/svg/right_arrow.svg";

const Item = ({ image, name, onClick, backGr }) => {
  var chosen = backGr === '#2C3A57';

  return (
    <div className="category-item-container"
      onClick={onClick}
      style={{ background: backGr }} >
      <img className="category-item-image" src={image} alt={name} />
      <p className="category-item-name" style={{ color: chosen ? 'white' : 'black' }}>
        {name}
      </p>
    </div >
  )
}

class Category extends Component {

  render() {
    var offset = this.props.categories[0].id;

    return (
      <div className="category-container" >
        <Left className="arrow"
          fill={this.props.leftFull() ? '#7E8697' : '#2C3A57'}
          onMouseDown={this.props.prevCategories}
          style={!this.props.leftFull() ? { cursor: 'pointer' } : {}}
        />
        {this.props.categories.map(category => {
          return <Item
            key={category.id}
            id={category.id}
            image={category.image}
            name={category.name}
            backGr={this.props.backgrounds[category.id - offset]}
            onClick={() => {
              this.props.onClick(category.id);
            }}
            chosen={category.id === this.props.chosen}
          />
        })}
        <Right className="arrow"
          fill={this.props.rightFull() ? '#7E8697' : '#2C3A57'}
          onMouseDown={this.props.nextCategories}
          style={!this.props.rightFull() ? { cursor: 'pointer' } : {}}
        />
      </div>
    )
  }
}

export default Category
