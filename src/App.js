import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: '',
      msg:  'Esperando...',
      hashes: localStorage.getItem('hashes') ? localStorage.getItem('hashes').split(',') : []
     };

    this.ipfs = new window.Ipfs();
    this.ipfs.once('ready', () => {
      this.setState({ msg: 'IPFS online' });
    })

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.getText = this.getText.bind(this);
    this.addToIpfs = this.addToIpfs.bind(this);
  }

  getText() {
    return this.state.texto
  }

  addToIpfs(texto) {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.ipfs.files.add(_this.ipfs.types.Buffer.from(texto), (e, files) => {
        if (e) {
          reject(e);
        } else {
          console.log('files', files);
          resolve(files[0].hash.toString('hex'));
        }
      })
    });
  }

  listHashes = () => {
    if (this.state.hashes && this.state.hashes.length > 0) {
      const items = this.state.hashes.map(hash => <li>{hash}</li>);
      return (<ul>{items}</ul>);
    } else {
      return (<p>Nenhuma hash</p>)
    }
  }

  handleTextChange(ev) {
    this.setState({ texto: ev.target.value });
  }

  async handleTextSubmit(ev) {
    ev.preventDefault();
    const texto = this.getText();
    const hash = await this.addToIpfs(texto);
    console.log('hash: ', hash);
    localStorage.setItem('hashes', [...this.state.hashes, hash]);
    this.setState({ texto: '', hashes: [...this.state.hashes, hash] });
  }

  render() {
    return (
      <div className="App">
        <header>
          {this.state.msg}
        </header>
        { this.listHashes() }
        <form onSubmit={this.handleTextSubmit}>
          <label>Digite seu texto</label>
          <input type="text" value={this.state.texto} onChange={this.handleTextChange} />
          <input type="submit" value="Submeter" />
        </form>
      </div>
    );
  }
}

export default App;
