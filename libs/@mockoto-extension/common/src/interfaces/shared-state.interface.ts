import { responseTypes } from '../constants';

export interface selectItem {
  id: any;
  label: string;
  value: string;
}

export interface Item {
  _id: any;
  label: string;
  name?: string;
}

export interface Tab {
  id: any;
  label: string;
}

export interface Group {
  _id: any;
  name?: string;
  spaceId?: string;
}

export interface Space {
  _id: any;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CaptureState {
  domainValue: string;
  space: Space | null;
  group: Group | null;
  selectedTab: Tab | null;
  responseType: selectItem;
  mocks: any[];
}

export interface SharedState {
  captureState: CaptureState | null;
}

export const defaultCaptureState: CaptureState = {
  domainValue: 'https://gw.yad2.co.il',
  space: null,
  group: null,
  selectedTab: null,
  responseType: responseTypes()[0],
  mocks: [],
};

export const defaultSharedState: SharedState = {
  captureState: null,
};
