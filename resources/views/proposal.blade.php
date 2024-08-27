<style>
    @font-face {
    font-family: 'Futura';
    src: url('fonts/futura.eot');
    src: url('fonts/futura.eot?#iefix') format('embedded-opentype'),
         url('fonts/futura.woff2') format('woff2'),
         url('fonts/futura.woff') format('woff'),
         url('fonts/futura.ttf')  format('truetype'),
         url('fonts/futura.svg#Futura') format('svg');
    }
    h1, h2, h3 {
        font-family: Futura, sans-serif;
    }
    p, span, ul, li {
        font-family: sans-serif;
        font-size: 0.95rem;
    }
    ul {
        padding-inline-start: 1.1rem;
    }
    li {
        list-style-type: none; 
    }
    .main {
        padding: 2rem 2.3rem 2rem 2.3rem;
    }
    .vue-color-red {
        color: #F8035D;
    }
    .icon {
        margin-right: 0.75rem;
        width: 2rem;
        height: auto;
    }
</style>
<img style="position: absolute; z-index: -1" src="{{$proposal_background}}">
<div class="main">
    <span style="font-size: 0.75rem;">{{$client_name}} - {{$project_name}}</span>
    <h1>OVERVIEW</h1>
    <p>{{$client_name}} has requested a double-sided, full color event flyer with event banner, and DJ spotlights.</p>

    <h2 class="vue-color-red">DELIVERABLES</h2>
    <h3>Plan</h3>
    <p>Review and consider designs with client.</p>

    <h3>Create</h3>
    <p>Custom event flyer, banners, and spotlights.</p>

    <h3>Deploy</h3>
    <p>16 bit color, CMYK 300 DPI print file (double-sided) in high definition PNG & PDF.</p>

    <h2 class="vue-color-red">ESTIMATE</h2>
    <h3>Event Flyer</h3>
    <ul>
        <li><img class="icon" src="{{$vue_design_icon}}">High quality PNG and PDF file for web and print.</li>
        <li><img class="icon" src="{{$vue_design_icon}}">Additional image formats: JPG.</li>
        <li><img class="icon" src="{{$vue_design_icon}}">16 bit color, double-sided CMYK, 300 DPI print file.</li>
    </ul>

    <h3>Banner</h3>
    <ul>
        <li><img class="icon" src="{{$vue_design_icon}}">High quality PNG and JPG for web.</li>
        <li><img class="icon" src="{{$vue_design_icon}}">1920 x 1005 px size, 16 bit color, RGB.</li>
    </ul>

    <h3>DJ Spotlights</h3>
    <ul>
        <li><img class="icon" src="{{$vue_design_icon}}">6 high quality PNG and JPG for web.</li>
        <li><img class="icon" src="{{$vue_design_icon}}">1200 x 1200 size, 16 bit color, RGB.</li>
    </ul>

    <div style="margin-bottom: 1rem;">
    <h3 style="margin-bottom: 0.1rem;">Erik Todd</h2>
    <span style="display: block;">Project Manager</span>
    <span style="display: block;">Graphic Designer</span>
    </div>

    <img style="display: block; max-width: 7.65rem; height: auto; margin-left: -0.35rem;" src="{{$vue_design_logo}}">
    <span style="display: block;">216.905.6593</span>
    <span style="display: block;">vuedesign.co</span>
</div>