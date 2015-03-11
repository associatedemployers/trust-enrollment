import Ember from 'ember';
import renderTooltipsMixin from '../mixins/render-tooltips';

var LoginView = Ember.View.extend(renderTooltipsMixin, {
  classNames: [ 'card', 'login-card', 'center-vertical' ]
});

export default LoginView;