import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      photoFile: null,
      photoUrl: null
    };
  }

  handleInput(e) {
    this.setState({title: e.currentTarget.value});
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {

      this.setState({photoFile: file, photoUrl: fileReader.result});
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', this.state.title);
    if (this.state.photoFile) {

      formData.append('post[photo]', this.state.photoFile);
    }
    $.ajax({
      url: '/api/posts',
      method: 'POST',
      data: formData,
      contentType: false,
      processData: false
    }).then(
      (response) => console.log(response.message),
      (response) => {
        console.log(response.responseJSON)
      }
    );
  }

  render() {
    console.log(this.state);
    const preview = this.state.photoUrl ? <img src={this.state.photoUrl} /> : null;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor="post-body">Body of Post</label>
        <input type="text"
          id="post-body"
          value={this.state.title}
          onChange={this.handleInput.bind(this)}/>
        <input type="file"
          onChange={this.handleFile.bind(this)}/>
        <h3>Image preview </h3>
        {preview}
        <button>Make a new Post!</button>
      </form>
    );
  }
}
