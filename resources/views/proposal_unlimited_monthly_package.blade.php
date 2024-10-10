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
    .icon {
        margin-right: 0.75rem;
        width: 2rem;
        height: auto;
    }
</style>
{{-- <img style="position: absolute; z-index: -1" src="{{$proposal_background}}"> --}}
<div class="main">
    <span style="font-size: 0.75rem;">{{$client_name}} - {{$project_name}}</span>
    <h1>OVERVIEW</h1>
    <p>{{$client_name}} has requested a month of unlimited web development.</p>

    <h2>DELIVERABLES</h2>
    <h3>Plan</h3>
    <p>Review and consider designs with client.</p>

    <h3>Create</h3>
    <p>Custom sites, designs, or components</p>

    <h3>Deploy</h3>
    <p>Websites, apps, or components</p>

    <h2>ESTIMATE</h2>
    <h3>Unlimited Web Design</h3>
    <ul>
        <li><img class="icon" src="{{$icon}}">High quality PNG and PDF file for web and print.</li>
        <li><img class="icon" src="{{$icon}}">Additional image formats: JPG.</li>
        <li><img class="icon" src="{{$icon}}">Build out custom components for business logic.</li>
        <li><img class="icon" src="{{$icon}}">Items are completed one at a time.</li>
    </ul>

    <div style="margin-bottom: 1rem;">
    <h3 style="margin-bottom: 0.1rem;">First Last</h2>
    <span style="display: block;">Project Manager</span>
    </div>

    <img style="display: block; max-width: 7.65rem; height: auto; margin-left: -0.35rem;" src="{{$logo}}">
    <span style="display: block;">111.222.3333</span>
    <span style="display: block;">project-management.co</span>
</div>