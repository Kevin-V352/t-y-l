import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: {
      black_cat:      string;
      dark_grey:      string;
      outer_space:    string;
      indian_yellow:  string;
      sand:           string;
      saffron_mango:  string;
      light_orange:   string;
    };
    text: {
      harvest_gold: string;
      light_grey:   string;
      oslo_grey:    string;
      white:        string;
      black:        string;
      error:        string;
    };
    button: {
      mocha:              string;
      ferra:              string;
      cocoa:              string;
      oslo_grey:          string;
      transparent_white:  string;
    };
    border: {
      light_grey:         string;
      light_orange:       string;
      pastel_orange:      string;
      transparent_black:  string;
      transparent_white:  string;
      white:              string;
      error:              string;
    };
    icon: {
      black_cat:    string;
      light_grey:   string;
      light_orange: string;
      white:        string;
    };
  }
};
