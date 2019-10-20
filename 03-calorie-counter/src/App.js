import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

const CALORIE_COUNTER_LS_KEY = 'meals-list'

function app(initModel, update, view, node) {
  let model = initModel;
  model = restore(model);
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg){
    model = update(msg, model);
    save(model);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

function save(model) {
  localStorage.setItem(CALORIE_COUNTER_LS_KEY, JSON.stringify(model.meals));
}

function restore(model) {
  let meals = JSON.parse(localStorage.getItem(CALORIE_COUNTER_LS_KEY)) || [];
  return { ...model, meals }
}

export default app;