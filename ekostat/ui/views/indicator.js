import React from 'react';
import ReactDOM from 'react-dom';
import {Manager, Target, Popper, Arrow} from 'react-popper';
import {PortalWithState} from 'react-portal';
import {FormattedMessage} from 'react-intl';

const _openPortal = (isOpen, openPortal, event) => {
  if (isOpen) {
    openPortal(event);
  } else {
    setTimeout(() => openPortal(), 0);
  }
}

const IndicatorSettings = () => (
  <Manager className="indicator-settings">
    <PortalWithState closeOnOutsideClick closeOnEsc>
      {({openPortal, closePortal, isOpen, portal}) => [
        <Target>
          <button className="indicator-settings-button" onClick={_openPortal.bind(null, isOpen, openPortal)}>
            <i className="icon-settings"></i>
          </button>
        </Target>,
        portal(
          <Popper placement="right-start" className="indicator-settings-content">
            <button className="indicator-settings-close" onClick={closePortal}>
              &times;
            </button>
            <label>
              Water type
              <select>
                <option>Type 1</option>
                <option>Type with longer name</option>
                <option>Type 3</option>
              </select>
            </label>
            <fieldset>
              <legend>Settings group A</legend>
              <div>
                <label><input type="checkbox" /> {' Option 1'}</label>
                <label><input type="checkbox" /> {' Option 2'}</label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Settings group B</legend>
              <div>
                <label><input type="checkbox" /> {' Option 3'}</label>
                <label><input type="checkbox" /> {' Option 4'}</label>
              </div>
            </fieldset>
          </Popper>
        )
      ]}
    </PortalWithState>
  </Manager>
);

export {IndicatorSettings}
