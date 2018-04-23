'use babel';

import TwitchStreamerView from './twitch-streamer-view';
import { CompositeDisposable } from 'atom';

export default {

  twitchStreamerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.twitchStreamerView = new TwitchStreamerView(state.twitchStreamerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.twitchStreamerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'twitch-streamer:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.twitchStreamerView.destroy();
  },

  serialize() {
    return {
      twitchStreamerViewState: this.twitchStreamerView.serialize()
    };
  },

  toggle() {
    console.log('TwitchStreamer was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
