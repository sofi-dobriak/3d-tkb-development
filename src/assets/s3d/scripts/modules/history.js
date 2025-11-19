import { detect  } from "detect-browser";
import dispatchTrigger from "./helpers/triggers";

class History {
  constructor(data) {
    this.history = [];
    this.updateFsm = data.updateFsm;
    this.update = this.update.bind(this);
    this.next = this.next.bind(this);
    this.parseSearchUrl = this.parseSearchUrl.bind(this);
    this.replaceUrl = this.replaceUrl.bind(this);
    this.stepBack = this.stepBack.bind(this);
    this.browser = detect();
    this.init();
  }

  init() {
    window.onpopstate = e => {
      this.stepBack(e.state);
      return true;
    };
  }

  stepBack(data) {
    const config = data ?? this.history;
    this.updateFsm(config, true);
  }

  next(name) {
    window.history.pushState(
      name, '3dModule', this.createUrl(name),
      );
      this.history = name;
      dispatchTrigger('historyUpdated');
  }

  update(search) {

    const currentSearchParams = Object.entries(this.parseSearchUrl(window.location))
    .filter(([key, value]) => !/flyby|side/.test(key)).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    const searchConfig = this.parseSearchUrl(window.location);
    const newSearch = {
      ...currentSearchParams,
      ...searchConfig,
      ...search,
    };

    window.history.replaceState(
      newSearch, '3dModule', this.createUrl(newSearch),
    );
    this.history = newSearch;
    dispatchTrigger('historyUpdated');
  }

  replaceUrl(name) {
    window.history.replaceState(
      name, '3dModule', this.createUrl(name),
    );
  }

  createUrl(data) {
    const entries = Object.entries(data);
    const href = entries.reduce((acc, [key, value]) => `${acc}&${key}=${value}`, '');
    // return `?${encodeURIComponent(href)}`;
    return `?${href}`;
  }

  parseSearchUrl(url) {
    const { searchParams } = new URL(decodeURIComponent(url));
    const parseSearchParam = Object.fromEntries(searchParams.entries());
    return parseSearchParam;
  }

  deleteSearchParam(key) {
    if ('URLSearchParams' in window) {
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(key);
      var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      window.history.replaceState(null, '', newRelativePathQuery);
    } else {
      console.warn('URLSearchParams in window is not found');
    }
  }

  pushSingleSearchParam(key,value) {
    if (!value) return;
    if ('URLSearchParams' in window) { 
      var searchParams = new URLSearchParams(window.location.search)
      searchParams.set(key, value);
      var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      window.history.replaceState(null, '', newRelativePathQuery);
    } else {
      console.warn('URLSearchParams in window is not found');
    }
  }

  pushParams(params) {
    console.log('pushParams', params);
    if ('URLSearchParams' in window) {
      var searchParams = new URLSearchParams(window.location.search);
      for (let key in params) {
        searchParams.set(key, params[key]);
      }
      var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      window.history.replaceState(null, '', newRelativePathQuery);
    } else {
      console.warn('URLSearchParams in window is not found');
    }
  }

  removeParamsByRegExp(regExp) {
    if ('URLSearchParams' in window) {
      var searchParams = new URLSearchParams(window.location.search);

      Array.from(searchParams.keys()).forEach(key => {
        if (regExp.test(key)) {
          searchParams.delete(key);
        }
      });

      var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      window.history.replaceState(null, '', newRelativePathQuery);
    } else {
      console.warn('URLSearchParams in window is not found');
    }
  }
}

export default History;

export function  parseSearchUrl(url) {
  const { searchParams } = new URL(decodeURIComponent(url));
  const parseSearchParam = Object.fromEntries(searchParams.entries());
  return parseSearchParam;
}
