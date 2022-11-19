import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      black_cat:      string;
      dark_grey:      string;
      indian_yellow:  string;
      outer_space:    string;
      saffron_mango:  string;
      sand:           string;
    };
    text: {
      harvest_gold: string;
      light_grey:   string;
      oslo_grey:    string;
      white:        string;
    };
    button: {
    };
    border: {
      light_grey:         string;
      light_orange:       string;
      pastel_orange:      string;
      transparent_black:  string;
      transparent_white:  string;
      white:              string;
    };
    icon: {
      black_cat:    string;
      light_grey:   string;
      light_orange: string;
      white:        string;
    };
  }
};
