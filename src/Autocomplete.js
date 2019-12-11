import React, { Component } from "react";
import PropTypes from "prop-types";
import KMPImage from "../assets/kmp_button.png";
import KrisImage from "../assets/kris.png";
import StottsImage from "../assets/stotts.png";
import MontekImage from "../assets/montek.png";
import JeffayImage from "../assets/jeffay.png";


class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  profName = "";


  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
    this.profName = e.currentTarget.innerText;
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div>
            <ul className="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;

                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }

                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions!</em>
          </div>
        );
      }
    }

    let professorPopUp;

    if (this.profName === "Kris") {
      professorPopUp = (<div className="profInfo">
        <img className="exampleKris" src={KrisImage} alt="kris example" />
        <p>Kris gives you .5 tickets per second!</p>
      </div>);
    } else if (this.profName === "Stotts") {
      professorPopUp = (<div className="profInfo">
        <img className="exampleStotts" src={StottsImage} alt="stotts example" />
        <p>Stotts gives you 5 tickets per second!</p>
      </div>);
    } else if (this.profName === "Montek") {
      professorPopUp = (<div className="profInfo">
        <img className="exampleMontek" src={MontekImage} alt="montek example" />
        <p>Montek gives you 10 tickets per second!</p>
      </div>);
    } else if (this.profName === "Jeffay") {
      professorPopUp = (<div className="profInfo">
        <img className="exampleJeffay" src={JeffayImage} alt="jeffay example" />
        <p>Jeffay gives you 50 tickets per second!</p>
      </div>);
    } else if (this.profName === "KMP") {
      professorPopUp = (<div className="profInfo">
        <img className="exampleKMP" src={KMPImage} alt="kmp example" />
        <p>KMP gives you 1 ticket each time he is clicked.</p>
      </div>);
    }



    return (
      <div className="profSearch">
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
        {professorPopUp}
      </div>
    );
  }
}

export default Autocomplete;
