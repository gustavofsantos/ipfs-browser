import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import TodoList from './components/TodoList';
import TodoNew from './components/TodoNew';
import TodoHeader from './components/TodoHeader';
import TodoImport from './components/TodoImport';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: '',
      ipfsState: 'offline',
      placeholder: 'aguardando...',
      importHash: '',
      isImportHidden: true,
      hashes: []
    };

    // uses IPFS Companion or Ipfs object that comes from script
    this.ipfs = window.ipfs || new window.Ipfs();

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.handleImportHash = this.handleImportHash.bind(this);
    this.handleImportHashTextChange = this.handleImportHashTextChange.bind(this);
    this.importButtonHandler = this.importButtonHandler.bind(this);
    this.getText = this.getText.bind(this);
    this.addToIpfs = this.addToIpfs.bind(this);
    this.getFromIpfs = this.getFromIpfs.bind(this);
    this.importHashes = this.importHashes.bind(this);
    this.storeHashes = this.storeHashes.bind(this);
  }

  importHashes() {
    const hashes = localStorage.getItem('hashes') ? localStorage.getItem('hashes').split(',') : null;

    if (hashes) {
      (_this => new Promise(() => {
        if (_this.ipfs.on) {
          _this.ipfs.on('ready', () => {
            hashes.forEach(hash => {
              _this.ipfs.files.get(hash, (e, files) => {
                if (!e) {
                  const content = files[0].content.toString('utf8');
                  this.setState({ hashes: [ ...this.state.hashes, { text: content, hash }] });
                }
              });
            });
          });
        } else {
          hashes.forEach(hash => {
            _this.ipfs.files.get(hash, (e, files) => {
              if (!e) {
                const content = files[0].content.toString('utf8');
                this.setState({ hashes: [ ...this.state.hashes, { text: content, hash }] });
              }
            });
          });
        }
      }))(this);
    }
  }

  storeHashes() {
    const hashes = this.state.hashes.reduce((prev, curr) => [ ...prev, curr.hash], [])
    localStorage.setItem('hashes', hashes);
  }

  getText() {
    return this.state.texto
  }

  addToIpfs(texto) {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.ipfs.files.add(Buffer.from(texto), (e, files) => {
        if (e) {
          reject(e);
        } else {
          console.log('files', files);
          resolve(files[0].hash.toString('hex'));
        }
      })
    });
  }

  getFromIpfs(hash) {
    return new Promise((_this => (resolve, reject) => {
      _this.ipfs.files.get(hash, (e, files) => {
        if (e) reject(e);
        else resolve(files[0].content.toString('utf8'));
      });
    })(this));
  }

  importButtonHandler(ev) {
    this.setState({ isImportHidden: false });
  }

  handleImportHashTextChange(ev) {
    this.setState({ importHash: ev.target.value });
  }

  async handleImportHash(ev) {
    ev.preventDefault();

    const hash = this.state.importHash;
    console.log('handleImportHash hash:', hash);
    if (hash) {
      const content = await this.getFromIpfs(hash);
      console.log('content: ', content, 'hash: ', hash);
      if (content)
        this.setState({
          hashes: [...this.state.hashes, { text: content, hash }],
          importHash: '',
          isImportHidden: true
        });
        this.storeHashes();
    }
  }

  handleTextChange(ev) {
    this.setState({ texto: ev.target.value });
  }

  async handleTextSubmit(ev) {
    ev.preventDefault();

    const text = this.getText();
    const hash = await this.addToIpfs(text);

    this.setState({ texto : '', hashes: [...this.state.hashes, { text, hash } ] });
    this.storeHashes();
  }

  componentDidMount() {
    if (this.ipfs) {
      if (this.ipfs.on) {
        this.ipfs.once('ready', () => {
          this.setState({ ipfsState: 'online', placeholder: null });
          this.importHashes();
        });
      } else {
        this.setState({ ipfsState: 'online', placeholder: null });
        this.importHashes();
      }
    } else {
      alert('You should install IPFS Companion extension.');
    }
  }

  render() {
    return (
      <div className="App">
        <div className={css(styles.app)}>
          <TodoHeader
            importButtonHandler={this.importButtonHandler}
            status={this.state.ipfsState} />
          
          <div className={css(styles.container)}>
            <TodoNew 
              isNewDisabled={this.state.ipfsState === 'offline' ? true : false}
              handleTextChange={this.handleTextChange}
              handleTextSubmit={this.handleTextSubmit}
              texto={this.state.texto}
              placeholder={this.state.placeholder} />

            <TodoImport
              isImportHidden={this.state.isImportHidden}
              isImportDisabled={this.state.ipfsState === 'offline' ? true : false}
              handleImportHash={this.handleImportHash}
              handleImportHashTextChange={this.handleImportHashTextChange}
              placeholder={this.state.placeholder} />

            <TodoList items={this.state.hashes} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  app: {
    background: '#EAEAEA',
    color: '#1A1A1A',
    textAlign: 'center',
    width: '100vw',
    height: '100vh'
  },
  container: {
    display: 'inline-block',
    maxWidth: '30rem',
    width: '100vw'
  }
});
