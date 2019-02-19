import React, { Component } from 'react'
import './App.css'
import './BeerSlider.css'

import BeerSlider from 'beerslider'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      before: 'https://placekitten.com/600/300',
      after: 'https://placekitten.com/g/600/300',
      start: 50,
      embed: '',
      showEmbed: true,
      labelRight: 'Right label',
      labelLeft: 'Left label',
      title: 'Before / after title',
      intro: 'Before / after introduction, Aliqua ipsum ipsum et sint elit labore nisi irure cillum.'
    }
    this.embedCode = this.embedCode.bind(this)
    this.handleUpdateRightLabel = this.handleUpdateRightLabel.bind(this)
    this.handleUpdateRightImage = this.handleUpdateRightImage.bind(this)

    this.handleUpdateLeftLabel = this.handleUpdateLeftLabel.bind(this)
    this.handleUpdateLeftImage = this.handleUpdateLeftImage.bind(this)

    this.toggleEmbedCode = this.toggleEmbedCode.bind(this)
    this.handleStartChange = this.handleStartChange.bind(this)

    this.handleUpdateTitle = this.handleUpdateTitle.bind(this)
    this.handleUpdateIntro = this.handleUpdateIntro.bind(this)

    this.previewRef = React.createRef()
  }

  handleUpdateRightImage (e) {
    this.setState({ before: e.target.value})
    this.embedCode()
  }
  handleUpdateLeftImage (e) {
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

  handleUpdateRightLabel (e) {
    this.setState({ labelRight: e.target.value })
    this.embedCode()
  }
  handleUpdateLeftLabel (e) {
    this.setState({ labelLeft: e.target.value })
    this.embedCode()
  }

  handleUpdateTitle (e) {
    this.setState({
      title: e.target.value
    })
    this.embedCode()
  }
  handleUpdateIntro (e) {
    this.setState({
      intro: e.target.value
    })
    this.embedCode()
  }

  jsEmbed () {
    const content = {
      header: {
        title: this.state.title,
        intro: this.state.intro,
      },
      left: {
        image: this.state.left,
        label: this.state.labelLeft,
        alt: '',
      },
      right: {
        image: this.state.right,
        label: this.state.labelRight,
        alt: '',
      },
      start: this.state.start
    }



    const template =
`<div>
  <link href="https://unpkg.com/beerslider/dist/BeerSlider.css" rel="stylesheet" />
    <div id="slider-container">
      <div class="header">
        <h3>${this.state.title}</h3>
        <p>${ this.state.intro }</p>
      </div>
      <div id="slider" class="beer-slider" data-beer-label="${this.state.labelRight}">
        <img src="${this.state.before}" alt="">
        <div class="beer-reveal" data-beer-label="${this.state.labelLeft}">
          <img src="${this.state.after}" alt="">
        </div>
      </div>
    </div>
  <script src="https://unpkg.com/beerslider/dist/BeerSlider.js" type="text/javascript"></script>
  <script type="text/javascript">
    new BeerSlider(
      document.querySelector('#slider'),
      { start: ${this.state.start} })
  </script>
</div>`
  }


  embedCode () {
    const template =
`<div>
  <link href="https://unpkg.com/beerslider/dist/BeerSlider.css" rel="stylesheet"/>
    <div id="slider-container">
      ${
        (this.state.title || this.state.intro)
          && `<div class="header">
              ${this.state.title && `<h3>${this.state.title}</h3>`}
              ${this.state.intro && `<p>${ this.state.intro }</p>`}
            </div>`
      }
      
      <div id="slider" class="beer-slider" data-beer-label="${this.state.labelRight}">
        <img src="${this.state.before}" alt="">
        <div class="beer-reveal" data-beer-label="${this.state.labelLeft}">
          <img src="${this.state.after}" alt="">
        </div>
      </div>
    </div>
  <script src="https://unpkg.com/beerslider/dist/BeerSlider.js" type="text/javascript"></script>
  <script type="text/javascript">
    new BeerSlider(
      document.querySelector('#slider'),
      { start: ${this.state.start} })
  </script>
</div>`.replace(/\>\s+\</gi, '><')

    this.setState({ embed: template })
  }

  componentDidMount () {
    const bs = new BeerSlider(
      this.previewRef.current,
      { start: this.state.start }
    )
    this.embedCode()
    console.log(bs)
  }

  render() {
    return (
      <div className="App">
        <div class="background" />

        <div className="title">
          <h1>Before / after slider maker</h1>
        </div>

        <div className="editor">
          <div className="content">
            <form action="">

              <label htmlFor="title">Slider title</label>
              <input
                name="title"
                type="text"
                value={ this.state.title }
                onChange={ this.handleUpdateTitle }
              />

              <label htmlFor="intro">Slider intro</label>
              <textarea
                name="intro"
                id=""
                cols="100"
                rows="5"
                onChange={ this.handleUpdateIntro }
              >{ this.state.intro }</textarea>

              <hr />

              <label htmlFor="labelLeft">Left side image label</label>
              <input
                id="labelLeft"
                name="labelLeft"
                type="text"
                onChange={ this.handleUpdateLeftLabel }
                value={ this.state.labelLeft }
              />

              <label htmlFor="afterImage">URL of left image</label>
              <input
                id="afterImage"
                name="rightImage"
                type="url"
                onChange={ this.handleUpdateLeft }
                value={ this.state.before }
              />

              <hr />

              <label htmlFor="labelRight">Right side image label</label>
              <input
                id="labelRight"
                name="labelRight"
                type="text"
                onChange={ this.handleUpdateRightLabel }
                value={ this.state.labelRight }
                />
 
              <label htmlFor="rightImage">URL of right side image</label>
              <input
                id="rightImage"
                name="rightImage"
                type="url"
                onChange={ this.handleUpdateRightImage }
                value={ this.state.after }
              />

              <hr />

              <label htmlFor="start">{ `Start position: ${this.state.start}` }</label>
              <input
                type="range"
                value={ this.state.start }
                onChange={ this.handleStartChange }
              />


            </form>

            {/* <button onClick={ this.toggleEmbedCode }>
              { `${this.state.showEmbed ? 'Hide' : 'Show'} embed code` }
            </button> */}

          </div>
          <div className="content">
            <div id="preview">
              <div>
                <div id="slider-container">
                  <div className="header">
                    <h3>{ this.state.title }</h3>
                    <p>{ this.state.intro }</p>
                  </div>
                  <div
                    id="slider"
                    className="beer-slider"
                    data-beer-label={ this.state.labelRight }
                    ref={ this.previewRef }
                    >
                    <img src={ this.state.before } alt="" />
                    <div
                      className="beer-reveal"
                      data-beer-label={ this.state.labelLeft }
                    >
                      <img src={ this.state.after } alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <h2>Embed code</h2>
            {
              this.state.showEmbed
                ? <pre className="embedCode">{ this.state.embed }</pre>
                : ''
            }
          </div>
        </div>


        <style jsx>{`
          * {
            text-align: left;
            box-sizing: border-box;
          }

          .App {
            padding: 100px 50px;
          }

          .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-image: linear-gradient(45deg, rgba(0,0,0,0) 49%, rgb(0,0,0,0.15) 50%, rgba(0,0,0,0) 51%);
            background-size: 10px 10px;
            background-repeat: repeat;
            z-index: -1
          }

          .editor {
            display: flex;
          }

          .title {
            
          }

          .content {
            {/* outline: solid 1px red; */}
            width: 50%;
            max-width: 50vw;
            margin: 0 10px 100px 10px;
            background: white;
            padding: 30px;
            flex: 1 1 0;
          }

          h1 {
            margin: 0;
            margin-bottom: 100px
          }
          h2 {
            margin: 0;
            margin-bottom: 20px;
          }
          h3 {
            margin: 0;
            margin-bottom: 10px
          }
          p {
            margin: 0;
            margin-bottom: 10px
          }

          form {
            position: relative;
            text-align: left;
          }

          label {
            display: block;
            margin-bottom: 4px;
          }

          input, textarea {
            display: block;
            margin-bottom: 20px;
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: solid 1px #c2c2c2;
            border-radius: 4px;
          }

          textarea {
              width: 100%;
          }

          pre {
            background: #333;
            color: #bada55;
            padding: 20px;
            overflow: auto;
            width: 100%;
            border-radius: 4px
          }

          button {
            background: white;
            padding: 10px 20px;
            border-radius: 4px;
            font-size: 18px;
            margin-bottom: 20px;
            width: 100%;
            text-align: center;
            cursor: pointer;
          }

          hr {
            margin: 30px 0;
            border-color: rgba(0,0,0, 0.08);
          }

        `}</style>
      </div>
    )
  }
}

export default App
