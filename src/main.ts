import { mount } from 'svelte';
import App from './App.svelte';
import './styles/index.scss';

const target = document.getElementById('root');

if (!target) {
  throw new Error('Unable to mount app: #root was not found.');
}

mount(App, { target });