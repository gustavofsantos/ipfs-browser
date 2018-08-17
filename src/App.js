import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import TodoList from './components/TodoList';
import TodoNew from './components/TodoNew';
import TodoHeader from './components/TodoHeader';
import TodoImport from './components/TodoImport';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: '',
      ipfsState: 'offline',
      importHash: '',
      hashes: []
    };

    // uses IPFS Companion
    this.ipfs = window.ipfs || new window.Ipfs();

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.handleImportHash = this.handleImportHash.bind(this);
    this.handleImportHashTextChange = this.handleImportHashTextChange.bind(this);
    this.getText = this.getText.bind(this);
    this.addToIpfs = this.addToIpfs.bind(this);
    this.getFromIpfs = this.getFromIpfs.bind(this);
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

  handleImportHashTextChange(ev) {
    console.log('handleImportHashTextChange');
    this.setState({ importHash: ev.target.value });
  }

  async handleImportHash(ev) {
    ev.preventDefault();

    const hash = this.state.importHash;
    if (hash) {
      const content = await this.getFromIpfs(hash);
      if (content)
        this.setState({
          hashes: [...this.state.hashes, { text: content, hash }],
          importHash: ''
        });
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
    localStorage.setItem('hashes', JSON.stringify(this.state.hashes));
  }

  componentDidMount() {
    if (this.ipfs) {
      this.setState({ ipfsState: 'online' });
    } else {
      alert('You should install IPFS Companion extension.');
    }
  }

  render() {
    return (
      <div className={css(styles.app)}>
        <TodoHeader
              status={this.state.ipfsState} />
        
        <div className={css(styles.container)}>
          <TodoNew handleTextChange={this.handleTextChange}
            handleTextSubmit={this.handleTextSubmit}
            texto={this.state.texto} />

          <TodoImport
            handleImportHash={this.handleImportHash}
            isImportHidden={true}
            handleImportHashTextChange={this.handleImportHashTextChange} />

          <TodoList items={this.state.hashes} />
        </div>
      </div>
    );
  }
}

export default App;

const RobotoMonoFont = {
  fontFamily: "Roboto Mono",
  fontStyle: "normal",
  fontWeight: "normal",
  src: "url('..\\res\\fonts\\RobotoMono-Regular.ttf') format('ttf')"
};

const styles = StyleSheet.create({
  app: {
    background: '#EAEAEA',
    color: '#1A1A1A',
    textAlign: 'center',
    fontFamity: RobotoMonoFont,
    width: '100vw',
    height: '100vh'
  },
  container: {
    display: 'inline-block',
    maxWidth: '30rem',
    width: '100%'
  }
});
