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
      hashes: localStorage.getItem('hashes') ? 
        JSON.parse(localStorage.getItem('hashes')) : []
     };

    this.ipfs = new window.Ipfs();
    this.ipfs.once('ready', () => {
      this.setState({ ipfsState: 'online' });
    })

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.handleImportHash = this.handleImportHash.bind(this);
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

  getFromIpfs(hash) {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.ipfs.files.get(hash, (e, files) => {
        if (e) reject(e);
        else resolve(files[0].content.toString('utf8'));
      });
    });
  }

  async handleImportHash(ev) {
    const hash = ev.target.value;
    const content = await this.getFromIpfs(hash);
    console.log(`handleImportHash hash: ${hash}, content: ${content}`);
    this.setState({ hashes: [...this.state.hashes, { text: content, hash }]});
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

  render() {
    return (
      <div className={css(styles.app)}>
        <div className={css(styles.container)}>
          <TodoHeader 
            status={this.state.ipfsState} />

          {/* <TodoNew handleTextChange={this.handleTextChange}
            handleTextSubmit={this.handleTextSubmit}
            texto={this.state.texto} /> */}

          <TodoImport 
            handleImportHash={this.handleImportHash} />

          <TodoList items={this.state.hashes} />
        </div>
      </div>
    );
  }
}

export default App;

const RobotoMonoFont = {
  fontFamily: "Roboto Mono",
  fontStyle: "monospace",
  fontWeight: "normal",
  src: "url('https://fonts.googleapis.com/css?family=Roboto+Mono')"
};

const styles = StyleSheet.create({
  app: {
    background: '#13334c',
    color: '#f6f6e9',
    textAlign: 'center',
    fontFamity: RobotoMonoFont,
    width: '100%',
    height: '100%'
  },
  container: {
    display: 'inline-block',
    maxWidth: '30rem',
    width: '100%'
  }
});
