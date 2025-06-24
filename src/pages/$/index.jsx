// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page as FDPage,
  Section as FDSection,
  Block as FDBlock,
  Cell as FDCell,
  P as FDP,
  Row as FDRow,
} from '@alifd/layout/lib/index.js';

import { NextText } from '@alilc/lowcode-materials/lib/index.js';

import { Button } from '@alifd/next';

import { BarChart } from '@alifd/fusion-ui/lib/index.js';

import { createFetchHandler as __$$createFetchRequestHandler } from '@alilc/lowcode-datasource-fetch-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import '@alilc/lowcode-materials/lib/style';

import '@alifd/next/lib/button/style';

import '@alifd/fusion-ui/lib/style';

import utils, { RefsManager } from '../../utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../constants';

import './index.css';

class $$Page extends React.Component {
  _context = this;

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = __$$createDataSourceEngine(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: { fetch: __$$createFetchRequestHandler() },
  });

  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = { text: 'outer', isShowDialog: false };
  }

  $ = (refName) => {
    return this._refsManager.get(refName);
  };

  $$ = (refName) => {
    return this._refsManager.getAll(refName);
  };

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          type: 'fetch',
          isInit: function () {
            return true;
          }.bind(_this),
          options: function () {
            return {
              params: {},
              method: 'GET',
              isCors: true,
              timeout: 5000,
              headers: {},
              uri: 'mock/info.json',
            };
          }.bind(_this),
          id: 'info',
          shouldFetch: function () {
            console.log('should fetch.....');
            return true;
          },
        },
      ],
    };
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  testFunc() {
    console.log('test func');
  }

  onClick() {
    this.setState({
      isShowDialog: true,
    });
  }

  closeDialog() {
    this.setState({
      isShowDialog: false,
    });
  }

  getHelloWorldText() {
    return this.i18n('i18n-jwg27yo4');
  }

  getHelloWorldText2() {
    return this.i18n('i18n-jwg27yo3', {
      name: '絮黎',
    });
  }

  onTestConstantsButtonClicked() {
    console.log('constants.ConstantA:', this.constants.ConstantA);
    console.log('constants.ConstantB:', this.constants.ConstantB);
  }

  onTestUtilsButtonClicked() {
    this.utils.demoUtil('param1', 'param2');
  }

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();

    console.log('did mount');
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <div
        ref={this._refsManager.linkRef('outerView')}
        style={{ height: '100%' }}
      >
        <FDPage
          contentProps={{ style: { background: 'rgba(255,255,255,0)' } }}
          ref={this._refsManager.linkRef('fdpage-bb43fbb0')}
        >
          <FDSection
            style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: '' }}
          >
            <FDBlock mode="transparent" span={12}>
              <FDCell
                align="left"
                verAlign="top"
                style={{ backgroundColor: 'rgba(255,255,255,1)' }}
                width=""
              >
                <FDP>
                  <NextText
                    type="h1"
                    mark={false}
                    code={false}
                    delete={false}
                    underline={false}
                    strong={false}
                    prefix=""
                    classname=""
                    style={{ fontSize: '25px' }}
                  >
                    Home
                  </NextText>
                </FDP>
              </FDCell>
            </FDBlock>
            <FDBlock
              mode="transparent"
              span={12}
              style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: '' }}
            >
              <FDRow style={{ backgroundColor: 'rgba(255,255,255,1)' }}>
                <FDCell
                  align="left"
                  verAlign="top"
                  style={{ backgroundColor: 'rgba(255,255,255,1)' }}
                  width=""
                >
                  <FDP>
                    <NextText
                      type="h5"
                      mark={false}
                      code={false}
                      delete={false}
                      underline={false}
                      strong={false}
                      prefix=""
                      classname=""
                      style={{ fontSize: '18px' }}
                    >
                      多语言展示
                    </NextText>
                  </FDP>
                  <FDP>
                    <NextText
                      type="inherit"
                      mark={false}
                      code={false}
                      delete={false}
                      underline={false}
                      strong={false}
                      prefix=""
                      classname=""
                    >
                      {__$$eval(() => this.getHelloWorldText())}
                    </NextText>
                    <NextText
                      type="inherit"
                      mark={false}
                      code={false}
                      delete={false}
                      underline={false}
                      strong={false}
                      prefix=""
                      classname=""
                    >
                      {__$$eval(() => this.getHelloWorldText2())}
                    </NextText>
                  </FDP>
                </FDCell>
                <FDCell
                  align="left"
                  verAlign="top"
                  style={{ backgroundColor: 'rgba(255,255,255,1)' }}
                >
                  <FDP>
                    <NextText
                      type="h5"
                      mark={false}
                      code={false}
                      delete={false}
                      underline={false}
                      strong={false}
                      prefix=""
                      classname=""
                      style={{ fontSize: '18px' }}
                    >
                      交互展示
                    </NextText>
                  </FDP>
                  <FDP>
                    <Button
                      prefix="next-"
                      type="primary"
                      size="medium"
                      htmlType="button"
                      component="button"
                      iconSize="xxs"
                      loading={false}
                      text={false}
                      warning={false}
                      disabled={false}
                      ref={this._refsManager.linkRef('button-4951c2d3')}
                      __events={{
                        eventDataList: [
                          {
                            type: 'componentEvent',
                            name: 'onClick',
                            relatedEventName: 'onTestConstantsButtonClicked',
                          },
                        ],
                        eventList: [
                          {
                            name: 'onClick',
                            description:
                              '点击按钮的回调\n@param {Object} e Event Object',
                            disabled: true,
                          },
                          { name: 'onMouseUp', disabled: false },
                        ],
                      }}
                      onClick={function () {
                        this.onTestConstantsButtonClicked.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                    >
                      constants
                    </Button>
                    <Button
                      prefix="next-"
                      type="primary"
                      size="medium"
                      htmlType="button"
                      component="button"
                      iconSize="xxs"
                      loading={false}
                      text={false}
                      warning={false}
                      disabled={false}
                      __events={{
                        eventDataList: [
                          {
                            type: 'componentEvent',
                            name: 'onClick',
                            relatedEventName: 'onTestUtilsButtonClicked',
                          },
                        ],
                        eventList: [
                          {
                            name: 'onClick',
                            description:
                              '点击按钮的回调\n@param {Object} e Event Object',
                            disabled: true,
                          },
                          { name: 'onMouseUp', disabled: false },
                        ],
                      }}
                      onClick={function () {
                        this.onTestUtilsButtonClicked.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                    >
                      utils
                    </Button>
                  </FDP>
                </FDCell>
              </FDRow>
            </FDBlock>
            <FDBlock
              mode="transparent"
              span={12}
              style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: '' }}
            >
              <FDCell
                align="left"
                verAlign="top"
                style={{ backgroundColor: 'rgba(255,255,255,1)' }}
              >
                <FDP>
                  <NextText
                    type="inherit"
                    mark={false}
                    code={false}
                    delete={false}
                    underline={false}
                    strong={false}
                    prefix=""
                    classname=""
                    style={{
                      height: '30px',
                      lineHeight: '30px',
                      fontSize: '20px',
                    }}
                  >
                    Powered By Lowcode Engine
                  </NextText>
                </FDP>
              </FDCell>
            </FDBlock>
            <FDBlock
              mode="transparent"
              span={12}
              style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: '' }}
            >
              <FDCell>
                <FDP>
                  <BarChart
                    data={[
                      { year: '1991', value: 72345678 },
                      { year: '1992', value: 4321132 },
                      { year: '1993', value: 33121112.5 },
                      { year: '1994', value: 45227221 },
                      { year: '1995', value: 4321221.9 },
                      { year: '1996', value: 6322121 },
                      { year: '1997', value: 78312213 },
                      { year: '1998', value: 4192312 },
                      { year: '1999', value: 6212332 },
                      { year: '2000', value: 3192312 },
                    ]}
                    xField="value"
                    yField="year"
                    color="#0079f2"
                    label={{ visible: true, position: 'middle' }}
                  />
                </FDP>
              </FDCell>
            </FDBlock>
            <FDBlock
              mode="transparent"
              span={12}
              style={{ backgroundColor: 'rgba(255,255,255,1)', minHeight: '' }}
            >
              <FDCell />
            </FDBlock>
          </FDSection>
        </FDPage>
      </div>
    );
  }
}

export default $$Page;

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) {}
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
