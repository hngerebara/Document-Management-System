import React from 'react';

const Footer = () => (
  <div>
    <footer className="page-footer deep-purple darken-3">
    <div class="footer-copyright deep-purple darken-4">
      <div class="container">
        <time datetime="{{ site.time | date: '%Y' }}">&copy; 2016 Hope Ngerebara</time>
      </div>
    </div>
  </footer>

  </div>
);

export default Footer