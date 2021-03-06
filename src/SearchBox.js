import React from 'react';
import { ANIMALS } from 'petfinder-client';
import { connect } from "react-redux";
import getBreeds from "./actionCreators/getBreeds";
import changeLocation from "./actionCreators/changeLocation";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";

class Search extends React.Component {

    handleFormSubmit =(event) => {
        event.preventDefault();
        this.props.search();
    }

  render() {
    return (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="location">
                Location
                <input
                    id="location"
                    value={this.props.location}
                    onChange={this.props.handleLocationChange}
                    placeholder="Location"/>
                </label>
                <label htmlFor="animal">
                Animal
                <select
                    id="animal"
                    value={this.props.animal}
                    onChange={this.props.handleAnimalChange}
                    onBlur={this.props.handleAnimalChange}
                >
                <option/> 
                {
                    ANIMALS.map(animal => (
                    <option key={animal} value={animal}>
                    {animal}
                    </option>
                    ))
                }
                </select>
                </label>
                <label htmlFor="breed">
                breed
                <select
                    id="breed"
                    value={this.props.breed}
                    onChange={this.props.handleBreedChange}
                    onBlur={this.props.handleBreedChange}
                    disabled={!this.props.breeds.length}
                >
                    <option/>
                    {this.props.breeds.map(breed => (
                    <option key={breed} value={breed}>
                        {breed}
                    </option>
                    ))}
                </select>
                </label>
                <button>Submit</button>
            </form>
          </div>
    )
  }
}

const mapStateToProps = ({ breed, breeds, animal, location }) => ({
    breed,
    breeds,
    location,
    animal
});

const mapDispatchToProps = dispatch => ({
    handleAnimalChange(event) {
        dispatch(changeAnimal(event.target.value));
        dispatch(getBreeds());
    },
    handleBreedChange(event) {
        dispatch(changeBreed(event.target.value));
    },
    handleLocationChange(event) {
        dispatch(changeLocation(event.target.value));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);