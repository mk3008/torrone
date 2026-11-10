import './app.js';import './styles.css';import fixture from './fixture.json';
export default {title:'Workspace/DocumentTabs',component:'order-workspace',parameters:{layout:'fullscreen'}};
export const Both={render:()=>{const el=document.createElement('order-workspace');el.dataset.fixture=JSON.stringify(fixture);return el}};
export const NarrowOverflow={...Both,parameters:{viewport:{defaultViewport:'mobile1'}}};
