import React, { Component } from 'react';
import { Tabs } from 'antd';

export default class Header extends Component {
  activeTab = (activeKey) => {
    const { takeTab } = this.props;
    takeTab(activeKey);
  };

  render() {
    const items = [
      {
        key: 'Search',
        label: 'Search',
      },
      {
        key: 'Rated',
        label: 'Rated',
      },
    ];

    return <Tabs defaultActiveKey="1" items={items} centered onChange={this.activeTab} />;
  }
}
