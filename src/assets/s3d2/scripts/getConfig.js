import config from '../../../static/settings.json';


export default function getConfig() {
  
  return window.externalS3dSettings ? window.externalS3dSettings : config;
}