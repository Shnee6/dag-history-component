import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Transport from '../../../src/components/Transport';

const MdKeyboardArrowLeft = require("react-icons/lib/md/keyboard-arrow-left");
const MdKeyboardArrowRight = require("react-icons/lib/md/keyboard-arrow-right");
const MdSkipNext = require("react-icons/lib/md/skip-next");
const MdSkipPrevious = require("react-icons/lib/md/skip-previous");
const MdPlayArrow = require("react-icons/lib/md/play-arrow");
const MdPause = require("react-icons/lib/md/pause");

describe('The Transport Component', () => {
  it('can render', () => {
    let rendered = mount(<Transport />);
    expect(rendered).to.be.ok;
  });

  it('can handle play invocations', () => {
    let rendered = mount(<Transport playing />);
    (rendered.get(0) as any).play();

    let fired = false;
    rendered = mount(<Transport onPlay={() => fired = true} />);
    (rendered.get(0) as any).play();
    expect(fired).to.be.true;

    fired = false;
    rendered.find(MdPlayArrow).simulate('click');
    expect(fired).to.be.true;
  });

  it('can handle stop invocations', () => {
    let rendered = mount(<Transport playing />);
    (rendered.get(0) as any).stop();

    let fired = false;
    rendered = mount(<Transport playing onStop={() => fired = true} />);
    (rendered.get(0) as any).stop();
    expect(fired).to.be.true;

    fired = false;
    rendered.find(MdPause).simulate('click');
    expect(fired).to.be.true;
  });

  it('can handle back invocations', () => {
    let rendered = mount(<Transport />);
    (rendered.get(0) as any).back();

    let fired = false;
    rendered = mount(<Transport onBack={() => fired = true} />);
    (rendered.get(0) as any).back();
    expect(fired).to.be.true;

    fired = false;
    rendered.find(MdKeyboardArrowLeft).simulate('click');
    expect(fired).to.be.true;
  });

  it('can handle forward invocations', () => {
    let rendered = mount(<Transport />);
    (rendered.get(0) as any).forward();

    let fired = false;
    rendered = mount(<Transport onForward={() => fired = true} />);
    (rendered.get(0) as any).forward();
    expect(fired).to.be.true;

    fired = false;
    rendered.find(MdKeyboardArrowRight).simulate('click');
    expect(fired).to.be.true;
  });

  it('can handle skipToStart invocations', () => {
    let rendered = mount(<Transport />);
    (rendered.get(0) as any).skipToStart();

    let fired = false;
    rendered = mount(<Transport onSkipToStart={() => fired = true} />);
    (rendered.get(0) as any).skipToStart();
    expect(fired).to.be.true;

    fired = false;
    rendered.find(MdSkipPrevious).simulate('click');
    expect(fired).to.be.true;
  });

  it('can handle skipToEnd invocations', () => {
    let rendered = mount(<Transport />);
    (rendered.get(0) as any).skipToEnd();

    let fired = false;
    rendered = mount(<Transport onSkipToEnd={() => fired = true} />);
    (rendered.get(0) as any).skipToEnd();
    expect(fired).to.be.true;

    fired = false;
    rendered.find(MdSkipNext).simulate('click');
    expect(fired).to.be.true;
  });
});