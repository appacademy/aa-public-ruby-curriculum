import React, { createRef } from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.dropdownRef = createRef();
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(e) {
    if (this.state.isOpen && !this.dropdownRef.current.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { render, className = '' } = this.props;

    return (
      <div className={className} ref={this.dropdownRef}>
        {render({
          isOpen: this.state.isOpen,
          toggleOpen: () => this.setState({ isOpen: !this.state.isOpen })
        })}
      </div>
    );
  }
}

export default Dropdown;