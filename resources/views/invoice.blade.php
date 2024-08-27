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
    table {
        width: 100%;
        font-family: sans-serif;
        font-size: 0.85rem;
        border-spacing: 0px;
    }
    table th {
        text-align: left;
        font-size: 0.75rem;
    }
    table thead {
        border: 0.125rem solid black;
    }
    table tbody td {
        padding-bottom: 0.2rem;
    }
    tr.heading th {
        border-bottom: 0.125rem solid #000000;
    }
    tr.heading th:last-child::after {
        right: 0px;
    }
    .table-row {
        padding-top: 1rem;
    }
    .price {
        text-align: right;
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

    <div style="display: flex; justify-content: space-between; margin-bottom: 4rem;">
        <div>
            <h1>INVOICE</h1>
            <span>{{$invoice_number}}</span>
        </div>
        <div style="padding-top: 1rem;">
            <img style="display: block; max-width: 7.65rem; height: auto; margin-left: -0.35rem;" src="{{$vue_design_logo}}">
            <span style="display: block; font-size: 0.85rem;">216.905.6593</span>
            <span style="display: block; font-size: 0.85rem;">vuedesign.co</span>
        </div>
    </div>

    <table>
        <thead>
            <tr class="heading">
                <th>ITEM DESCRIPTION</th>
                <th>DATE</th>
                <th>QTY</th>
                <th class="price">PRICE</th>
                <th class="price">TOTAL</th>
            </th>
        </thead>
        <tbody>
            <tr>
                <td class="table-row">Event Flyer *</td>
                <td class="table-row">9-18-2023</td>
                <td class="table-row">1</td>
                <td class="table-row price">$150.00</td>
                <td class="table-row price">$150.00</td>
            </tr>
            <tr>
                <td>Banner</td>
                <td>9-18-2023</td>
                <td>1</td>
                <td class="price">$0.00</td>
                <td class="price">$0.00</td>
            </tr>
            <tr>
                <td>DJ Spotlights</td>
                <td>9-18-2023</td>
                <td>1</td>
                <td class="price">$0.00</td>
                <td class="price">$0.00</td>
            </tr>
        </tbody>
    </table>
</div>
<div class="main" style="position: absolute; bottom: 0;">
    <div style="padding-top: 1.5rem; width: 100%; border-bottom: 0.125rem solid #000000; margin-bottom: 1rem;"></div>
    <div style="display: flex; justify-content: flex-end; margin-bottom: 2rem;">
        <div style="width: 50%;"></div>
        <div style="width: 50%;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-size: 0.85rem; font-family: Futura, sans-serif;">AMOUNT PAID</span><span style="font-size: 0.85rem; font-family: sans-serif;">$0.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-size: 0.85rem; font-family: Futura, sans-serif;">SUB TOTAL</span><span style="font-size: 0.85rem; font-family: sans-serif;">$0.00</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span style="font-size: 0.85rem; font-family: Futura, sans-serif;">TOTAL DUE*</span><span style="font-size: 0.85rem; font-family: sans-serif;">$150.00</span>
            </div>

            <span style="font-size: 0.7rem;">*All amounts must be paid in full to begin or complete project, before website deployment, transfer of passwords, files, or other project related materials.<span>
        </div>
    </div>

    <div style="margin-bottom: 1rem;">
        <h3 style="margin-bottom: 0.1rem; font-size: 0.9rem;">PAYMENT METHODS</h2>
        <span style="display: block; font-size: 0.85rem;">PAYPAL - INFO@VUEDESIGN.CO</span>
        <span style="display: block; font-size: 0.85rem;">CASH APP - $VUEDESIGN</span>
    </div>

    <div style="margin-bottom: 1rem;">
        <h3 style="margin-bottom: 0.1rem; font-size: 0.9rem;">THANK YOU</h2>
        <span style="display: block;">Vue Design</span>
        <span style="display: block; font-size: 0.85rem;">6943 York Rd, Apt 104</span>
        <span style="display: block; font-size: 0.85rem;">Parma Heights, OH 44130</span>
    </div>
</div>