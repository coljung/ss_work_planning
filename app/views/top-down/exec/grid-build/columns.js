import Handsontable from 'handsontable';

function coverRenderer(instance, td, row, col, prop, value, cellProperties) {

    // #VALUE!
    if (value === '#VALUE!') {
      Handsontable.renderers.TextRenderer.apply(this, arguments);
      console.log(value, cellProperties);
      cellProperties.type = 'text';
      cellProperties.className = 'newclass';
      cellProperties.innerHTML = 'N/AAAA';
      cellProperties.value = 'N/AAAAAAA';
    } else {
      cellProperties.type = 'numeric';
      cellProperties.format = '0.[00]%';
      Handsontable.renderers.NumericRenderer.apply(this, arguments);
    }
}

const columns = [
    {
        data: 'metric',
        type: 'text',
    },
    {
        data: 'seasonyear',
        type: 'text',
    },
    {
        data: 'total_stdpremarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'total_incr_stdpremarkdown',
        renderer: coverRenderer,
        // type: 'numeric',
        // format: '0.00%',
    },
    {
        data: 'total_stdpostmarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'total_incr_stdpostmarkdown',
        type: 'numeric',
        format: '0.00%',
    },
    {
        data: 'total_full',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'total_full_incr',
        type: 'numeric',
        format: '0.00.00%',
    },
    {
        data: 'women_stdpremarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'women_incr_stdpremarkdown',
        type: 'numeric',
        format: '0.00%',
    },
    {
        data: 'women_stdpostmarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'women_incr_stdpostmarkdown',
        type: 'numeric',
        format: '0.00%',
    },
    {
        data: 'women_full',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'women_full_incr',
        type: 'numeric',
        format: '0.00%',
    },
    {
        data: 'women_full_cont',
        type: 'numeric',
        format: '0.00%',
    },
    {
        data: 'men_stdpremarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'men_incr_stdpremarkdown',
        type: 'numeric',
        format: '0.00%',
    },
    {
        data: 'men_stdpostmarkdown',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'men_incr_stdpostmarkdown',
        type: 'numeric',
        format: '0.00%',
    },
    {
        data: 'men_full',
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'men_full_incr',
        type: 'numeric',
        format: '0.00%',
    },
    {
        data: 'men_full_cont',
        type: 'numeric',
        format: '0.00%',
    },
];

export default columns;
