import React from 'react';

export default (
    <div data-style="root">
        <nav data-style="navigation_bar">
            <div data-style="navigation_bar_button"
                 data-state="back"/>
            <div data-style="navigation_bar_button"
                 data-state="forward"/>
            <div data-style="navigation_bar_title"
                 data-state="page_title"/>
        </nav>
        <div data-style="header">
            <img data-style="hero-image"
                 id="hero-image"
                 src="dashboard_hero_image_gmc.png"
                 alt="Hero"/>
        </div>
        <div data-style="garage-door">
            <p data-style="garage-door-text"
               data-state="selected_vehicle"/>
        </div>
        <div data-style="footer">
            <div data-view="card"/>
            <div data-view="card"/>
            <div data-view="card"/>
        </div>
    </div>
);