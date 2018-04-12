import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dialog/paper-dialog.js';

class CubeDialog extends PolymerElement {
  static get is() {return 'cube-dialog';}

  static get template()
  {
    return html`<style>
      :host {
        display: none;
      }
    </style>
    <paper-dialog id="dialog" with-backdrop="[[withBackdrop]]" modal="[[modal]]" style="border-radius:5px;overflow:hidden"></paper-dialog>

    <div id="helper">
      <slot id="cSlot"></slot>
    </div>`;
  }

  static get properties()
  {
    return {
      modal:        {type: Boolean},
      withBackdrop: {type: Boolean}
    }
  }

  connectedCallback()
  {
    super.connectedCallback();
    let self = this;
    this.$.cSlot.addEventListener('slotchange', function () {
      let elements = self.querySelectorAll('*');
      for(let i = 0; i < elements.length; i++)
      {
        self.$.dialog.appendChild(elements[i]);
      }
    });
  }

  open()
  {
    if(!this._dlg)
    {
      this._dlg = this.root.querySelector('#dialog');
      this._dlg.addEventListener('cube-dialog-close', function () {this._dlg.close()}.bind(this));
      document.body.appendChild(this._dlg);
    }

    this._dlg.open();
  }

  close()
  {
    if(this._dlg)
    {
      this._dlg.close();
    }
  }

  refit()
  {
    if(this._dlg)
    {
      this._dlg.refit();
    }
  }

  query(selector)
  {
    return this.$.dialog.querySelector(selector);
  }

  queryAll(selector)
  {
    return this.$.dialog.querySelectorAll(selector);
  }
}

customElements.define(CubeDialog.is, CubeDialog);