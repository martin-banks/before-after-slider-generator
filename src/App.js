import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      before: false,
      after: false,
      start: 50,
      embed: '',
      showEmbed: true,
    }
    this.embedCode = this.embedCode.bind(this)
    this.handleUpdateBefore = this.handleUpdateBefore.bind(this)
    this.handleUpdateAfter = this.handleUpdateAfter.bind(this)
    this.toggleEmbedCode = this.toggleEmbedCode.bind(this)
    this.handleStartChange = this.handleStartChange.bind(this)
  }

  handleUpdateBefore (e) {
    this.setState({ before: e.target.value})
    this.embedCode()
  }
  
  handleUpdateAfter (e) {
    this.setState({ after: e.target.value})
    this.embedCode()
  }
  handleStartChange (e) {
    this.setState({ start: e.target.value })
    this.embedCode()
  }

  toggleEmbedCode () {
    this.setState({ showEmbed: !this.state.showEmbed })
  }


  embedCode () {
    const template = `
      <div>
        <link url="https://where-the-styles-live" rel="stylesheet" />
          <div id="slider-container">
            <div id="slider" class="beer-slider" data-beer-label="before">
              <img src="${this.state.before} alt="">
              <div class="beer-reveal" data-beer-label="after">
                <img src="${this.state.after}" alt="">
              </div>
            </div>
          </div>
        <script src="https://where-the-scripts-are" type="text/javascript"></script>
        <script type="text/javascript">
          new BeerSlider(
            document.querySelector('#slider-container'),
            { start: ${this.state.start}})
        </script>
      </div>
    `
    this.setState({ embed: template })
  }
  render() {
    return (
      <div className="App">
        <div class="background"></div>
        <div class="content">
          <h1>Before / after slider maker</h1>

          <form action="">
          
            <label htmlFor="beforeImage">URL of before image</label>
            <input
              id="beforeImage"
              name="beforeImage"
              type="url"
              onChange={ this.handleUpdateBefore }
            />

            <label htmlFor="afterImage">URL of after image</label>
            <input
              id="afterImage"
              name="beforeImage"
              type="url"
              onChange={ this.handleUpdateAfter }
            />

            <label htmlFor="start">Start position</label>
            <input
              type="range"
              value={ this.state.start }
              onChange={ this.handleStartChange }
            />
            <p>{ this.state.start }</p>


          </form>
          <button onClick={ this.toggleEmbedCode }>
            { `${this.state.showEmbed ? 'Hide' : 'Show'} embed code` }
          </button>
          {
            this.state.showEmbed
              ? <pre className="embedCode">{ this.state.embed }</pre>
              : ''
          }

          <div id="preview"></div>
        </div>


        <style jsx>{`
          * {
            text-align: left;
            box-sizing: border-box;
          }

          .App {
            padding-top: 100px
          }

          .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-image: linear-gradient(45deg, rgba(0,0,0,0) 49%, rgb(0,0,0,0.3) 50%, rgba(0,0,0,0) 51%);
            background-size: 10px 10px;
            background-repeat: repeat;
            z-index: -1
          }

          .content {
            width: 90%;
            max-width: 1100px;
            margin: 0 auto 100px auto;
            background: white;
            padding: 30px;
          }

          h1 {
            margin: 0;
            margin-bottom: 100px
          }

          form {
            position: relative;
            text-align: left;
          }

          input {
            display: block;
            margin-bottom: 20px;
            width: 100%;
            padding: 20px;
            font-size: 16px;
          }
          label {
            display: block;
          }

          pre {
            background: #333;
            color: #bada55;
            padding: 20px;
          }
          
        `}</style>
      </div>
    )
  }
}

export default App
