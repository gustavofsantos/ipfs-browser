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

    this.ipfs = new window.Ipfs(/* {
      config: {
        Addresses: {
          Swarm: [
            "/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star"
          ]
        }
      }
    } */);
    this.ipfs.once('ready', () => {
      this.setState({ ipfsState: 'online' });
    })

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

  handleImportHashTextChange(ev) {
    console.log('handleImportHashTextChange');
    this.setState({ importHash: ev.target.value });
  }
  
  async handleImportHash(ev) {
    ev.preventDefault();

    const hash = this.state.importHash;
    console.log(`handleImportHash hash: ${hash}`);
    const content = hash ? await this.getFromIpfs(hash) : undefined;
    console.log(`handleImportHash hash: ${hash}, content: ${content}`);
    if (content)
      this.setState({ 
        hashes: [...this.state.hashes, { text: content, hash }]
      });
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

          <TodoNew handleTextChange={this.handleTextChange}
            handleTextSubmit={this.handleTextSubmit}
            texto={this.state.texto} />

          <TodoImport
            handleImportHash={this.handleImportHash}
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
  src: "url('https://fonts.googleapis.com/css?family=Roboto+Mono')"
};

const styles = StyleSheet.create({
  app: {
    background: '#FFF',
    color: '#1A1A1A',
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
